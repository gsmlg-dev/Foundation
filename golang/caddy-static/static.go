package staticsite

import (
	"bytes"
	"embed"
	"encoding/json"
	"flag"
	"fmt"
	"io/fs"
	"log"
	weakrand "math/rand"
	"mime"
	"net"
	"net/http"
	"net/url"
	"os"
	"path"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/caddyserver/caddy/v2"
	"github.com/caddyserver/caddy/v2/caddyconfig"
	"github.com/caddyserver/caddy/v2/caddyconfig/httpcaddyfile"
	caddycmd "github.com/caddyserver/caddy/v2/cmd"
	"github.com/caddyserver/caddy/v2/modules/caddyhttp"
	"github.com/caddyserver/certmagic"

	"go.uber.org/zap"
)

const DirectiveName = "static_site"
const FlagName = "static-site"

func init() {
	httpcaddyfile.RegisterHandlerDirective(DirectiveName, parseCaddyfile)
	weakrand.Seed(time.Now().UnixNano())

	caddy.RegisterModule(StaticSite{})

	caddycmd.RegisterCommand(caddycmd.Command{
		Name:  FlagName,
		Func:  cmdStaticSite,
		Usage: "[--domain <example.com>] [--listen <addr>] [--access-log] [--backend <addr>]",
		Short: "Spins up a production-ready static server",
		Long: `
A simple but production-ready static server. Useful for quick deployments,
demos, and development.

The listener's socket address can be customized with the --listen flag.

If a domain name is specified with --domain, the default listener address
will be changed to the HTTPS port and the server will use HTTPS. If using
a public domain, ensure A/AAAA records are properly configured before
using this option.`,
		Flags: func() *flag.FlagSet {
			fs := flag.NewFlagSet(FlagName, flag.ExitOnError)
			fs.String("domain", "", "Domain name at which to serve the files")
			fs.String("listen", "", "The address to which to bind the listener")
			fs.String("backend", "", "The backend address will forward non match request to")
			fs.Bool("access-log", false, "Enable the access log")
			return fs
		}(),
	})
}

// StaticSite implements a static file server responder for Caddy.
type StaticSite struct {
	// A list of files or folders to hide; the file server will pretend as if
	// they don't exist. Accepts globular patterns like `*.ext` or `/foo/*/bar`
	// as well as placeholders. Because site roots can be dynamic, this list
	// uses file system paths, not request paths. To clarify, the base of
	// relative paths is the current working directory, NOT the site root.
	//
	// Entries without a path separator (`/` or `\` depending on OS) will match
	// any file or directory of that name regardless of its path. To hide only a
	// specific file with a name that may not be unique, always use a path
	// separator. For example, to hide all files or folder trees named "hidden",
	// put "hidden" in the list. To hide only ./hidden, put "./hidden" in the list.
	//
	// When possible, all paths are resolved to their absolute form before
	// comparisons are made. For maximum clarity and explictness, use complete,
	// absolute paths; or, for greater portability, use relative paths instead.
	Hide []string `json:"hide,omitempty"`

	// The names of files to try as index files if a folder is requested.
	IndexNames []string `json:"index_names,omitempty"`

	// Append suffix to request filename if origin name is not exists.
	SuffixNames []string `json:"suffix_names,omitempty"`

	// Enables file listings if a directory was requested and no index
	// file is present.
	// Browse *Browse `json:"browse,omitempty"`

	// Use redirects to enforce trailing slashes for directories, or to
	// remove trailing slash from URIs for files. Default is true.
	//
	// Canonicalization will not happen if the last element of the request's
	// path (the filename) is changed in an internal rewrite, to avoid
	// clobbering the explicit rewrite with implicit behavior.
	CanonicalURIs *bool `json:"canonical_uris,omitempty"`

	// Override the status code written when successfully serving a file.
	// Particularly useful when explicitly serving a file as display for
	// an error, like a 404 page. A placeholder may be used. By default,
	// the status code will typically be 200, or 206 for partial content.
	StatusCode caddyhttp.WeakString `json:"status_code,omitempty"`

	// If pass-thru mode is enabled and a requested file is not found,
	// it will invoke the next handler in the chain instead of returning
	// a 404 error. By default, this is false (disabled).
	PassThru bool `json:"pass_thru,omitempty"`

	logger *zap.Logger
}

// CaddyModule returns the Caddy module information.
func (StaticSite) CaddyModule() caddy.ModuleInfo {
	return caddy.ModuleInfo{
		ID:  "http.handlers." + DirectiveName,
		New: func() caddy.Module { return new(StaticSite) },
	}
}

// Provision sets up the static files responder.
func (fsrv *StaticSite) Provision(ctx caddy.Context) error {
	fsrv.logger = ctx.Logger(fsrv)

	if fsrv.IndexNames == nil {
		fsrv.IndexNames = defaultIndexNames
	}
	if fsrv.SuffixNames == nil {
		fsrv.SuffixNames = defaultSuffixNames
	}

	// for hide paths that are static (i.e. no placeholders), we can transform them into
	// absolute paths before the server starts for very slight performance improvement
	for i, h := range fsrv.Hide {
		if !strings.Contains(h, "{") && strings.Contains(h, separator) {
			if abs, err := filepath.Abs(h); err == nil {
				fsrv.Hide[i] = abs
			}
		}
	}

	return nil
}

//go:embed all:build/*
var buildFs embed.FS

func (fsrv *StaticSite) ServeHTTP(w http.ResponseWriter, r *http.Request, next caddyhttp.Handler) error {
	repl := r.Context().Value(caddy.ReplacerCtxKey).(*caddy.Replacer)

	filesToHide := fsrv.transformHidePaths(repl)

	// PathUnescape returns an error if the escapes aren't well-formed,
	// meaning the count % matches the RFC. Return early if the escape is
	// improper.
	if _, err := url.PathUnescape(r.URL.Path); err != nil {
		fsrv.logger.Debug("improper path escape",
			zap.String("request_path", r.URL.Path),
			zap.Error(err))
		return err
	}
	filename := "build" + r.URL.Path

	fsrv.logger.Debug("sanitized path join",
		zap.String("request_path", r.URL.Path),
		zap.String("result", filename))

	// get information about the file
	opF, err := buildFs.Open(filename)
	if err != nil {
		fsrv.logger.Debug("open file error",
			zap.String("error", err.Error()),
			zap.String("File", fmt.Sprintf("%v", opF)),
			zap.String("FileSystem", fmt.Sprintf("%v", buildFs)))
		err = mapDirOpenError(err, filename)
		if os.IsNotExist(err) {
			var info fs.FileInfo
			if len(fsrv.IndexNames) > 0 {
				for _, indexPage := range fsrv.IndexNames {
					indexPage := repl.ReplaceAll(indexPage, "")
					indexPath := caddyhttp.SanitizedPathJoin(filename, indexPage)
					if fileHidden(indexPath, filesToHide) {
						// pretend this file doesn't exist
						fsrv.logger.Debug("hiding index file",
							zap.String("filename", indexPath),
							zap.Strings("files_to_hide", filesToHide))
						continue
					}

					opF, err = buildFs.Open(indexPath)
					if err != nil {
						continue
					}
					info, _ = opF.Stat()
					filename = indexPath
					// implicitIndexFile = true
					fsrv.logger.Debug("located index file", zap.String("filename", filename))
					break
				}
			}
			if info == nil && strings.HasSuffix(filename, "/") == false {
				suffixList := []string{"html", "htm", "txt"}
				for _, suffix := range suffixList {
					suffix := repl.ReplaceAll(suffix, "")
					filePath := fmt.Sprintf("%s.%s", filename, suffix)
					if fileHidden(filePath, filesToHide) {
						// pretend this file doesn't exist
						fsrv.logger.Debug("hiding index file",
							zap.String("filename", filePath),
							zap.Strings("files_to_hide", filesToHide))
						continue
					}

					opF, err = buildFs.Open(filePath)
					if err != nil {
						continue
					}
					info, _ = opF.Stat()
					filename = filePath
					// implicitIndexFile = true
					fsrv.logger.Debug("located file with suffix", zap.String("filename", filename), zap.String("suffix", suffix))
					break
				}
			}
			if info == nil {
				return fsrv.notFound(w, r, next)
			}
		} else if os.IsPermission(err) {
			return caddyhttp.Error(http.StatusForbidden, err)
		}
	}
	info, err := opF.Stat()
	if err != nil {
		return caddyhttp.Error(http.StatusInternalServerError, err)
	}

	// if the request mapped to a directory, see if
	// there is an index file we can serve
	var implicitIndexFile bool
	if info.IsDir() && len(fsrv.IndexNames) > 0 {
		for _, indexPage := range fsrv.IndexNames {
			indexPage := repl.ReplaceAll(indexPage, "")
			indexPath := caddyhttp.SanitizedPathJoin(filename, indexPage)
			if fileHidden(indexPath, filesToHide) {
				// pretend this file doesn't exist
				fsrv.logger.Debug("hiding index file",
					zap.String("filename", indexPath),
					zap.Strings("files_to_hide", filesToHide))
				continue
			}

			opF, err := buildFs.Open(indexPath)
			if err != nil {
				continue
			}
			indexInfo, _ := opF.Stat()

			// don't rewrite the request path to append
			// the index file, because we might need to
			// do a canonical-URL redirect below based
			// on the URL as-is

			// we've chosen to use this index file,
			// so replace the last file info and path
			// with that of the index file
			info = indexInfo
			filename = indexPath
			implicitIndexFile = true
			fsrv.logger.Debug("located index file", zap.String("filename", filename))
			break
		}
	}

	// if still dir try to find out if it is a file with suffix
	if info.IsDir() && !strings.HasSuffix(filename, "/") {
		suffixList := fsrv.SuffixNames
		for _, suffix := range suffixList {
			suffix := repl.ReplaceAll(suffix, "")
			filePath := fmt.Sprintf("%s.%s", filename, suffix)
			if fileHidden(filePath, filesToHide) {
				// pretend this file doesn't exist
				fsrv.logger.Debug("hiding index file",
					zap.String("filename", filePath),
					zap.Strings("files_to_hide", filesToHide))
				continue
			}

			opF, err = buildFs.Open(filePath)
			if err != nil {
				continue
			}
			info, _ = opF.Stat()
			filename = filePath
			// implicitIndexFile = true
			fsrv.logger.Debug("located file with suffix", zap.String("filename", filename), zap.String("suffix", suffix))
			break
		}
	}

	// if still referencing a directory, delegate
	// to browse or return an error
	if info.IsDir() {
		fsrv.logger.Debug("no index file in directory",
			zap.String("path", filename),
			zap.Strings("index_filenames", fsrv.IndexNames))
		return fsrv.notFound(w, r, next)
	}

	// one last check to ensure the file isn't hidden (we might
	// have changed the filename from when we last checked)
	if fileHidden(filename, filesToHide) {
		fsrv.logger.Debug("hiding file",
			zap.String("filename", filename),
			zap.Strings("files_to_hide", filesToHide))
		return fsrv.notFound(w, r, next)
	}

	// if URL canonicalization is enabled, we need to enforce trailing
	// slash convention: if a directory, trailing slash; if a file, no
	// trailing slash - not enforcing this can break relative hrefs
	// in HTML (see https://github.com/caddyserver/caddy/issues/2741)
	if info == nil && (fsrv.CanonicalURIs == nil || *fsrv.CanonicalURIs) {
		// Only redirect if the last element of the path (the filename) was not
		// rewritten; if the admin wanted to rewrite to the canonical path, they
		// would have, and we have to be very careful not to introduce unwanted
		// redirects and especially redirect loops!
		// See https://github.com/caddyserver/caddy/issues/4205.
		origReq := r.Context().Value(caddyhttp.OriginalRequestCtxKey).(http.Request)
		if path.Base(origReq.URL.Path) == path.Base(r.URL.Path) {
			if implicitIndexFile && !strings.HasSuffix(origReq.URL.Path, "/") {
				to := origReq.URL.Path + "/"
				fsrv.logger.Debug("redirecting to canonical URI (adding trailing slash for directory)",
					zap.String("from_path", origReq.URL.Path),
					zap.String("to_path", to))
				return redirect(w, r, to)
			} else if !implicitIndexFile && strings.HasSuffix(origReq.URL.Path, "/") {
				to := origReq.URL.Path[:len(origReq.URL.Path)-1]
				fsrv.logger.Debug("redirecting to canonical URI (removing trailing slash for file)",
					zap.String("from_path", origReq.URL.Path),
					zap.String("to_path", to))
				return redirect(w, r, to)
			}
		}
	}

	var file []byte

	// no precompressed file found, use the actual file
	if file == nil {
		fsrv.logger.Debug("opening file", zap.String("filename", filename))

		// open the file
		file, err = fsrv.openFile(filename, w)
		if err != nil {
			if herr, ok := err.(caddyhttp.HandlerError); ok &&
				herr.StatusCode == http.StatusNotFound {
				return fsrv.notFound(w, r, next)
			}
			return err // error is already structured
		}
	}

	// set the ETag - note that a conditional If-None-Match request is handled
	// by http.ServeContent below, which checks against this ETag value
	w.Header().Set("ETag", calculateEtag(info))

	if w.Header().Get("Content-Type") == "" {
		mtyp := mime.TypeByExtension(filepath.Ext(filename))
		if mtyp == "" {
			// do not allow Go to sniff the content-type; see
			// https://www.youtube.com/watch?v=8t8JYpt0egE
			// TODO: If we want a Content-Type, consider writing a default of application/octet-stream - this is secure but violates spec
			w.Header()["Content-Type"] = nil
		} else {
			w.Header().Set("Content-Type", mtyp)
		}
	}

	var statusCodeOverride int

	// if this handler exists in an error context (i.e. is part of a
	// handler chain that is supposed to handle a previous error),
	// we should set status code to the one from the error instead
	// of letting http.ServeContent set the default (usually 200)
	if reqErr, ok := r.Context().Value(caddyhttp.ErrorCtxKey).(error); ok {
		statusCodeOverride = http.StatusInternalServerError
		if handlerErr, ok := reqErr.(caddyhttp.HandlerError); ok {
			if handlerErr.StatusCode > 0 {
				statusCodeOverride = handlerErr.StatusCode
			}
		}
	}

	// if a status code override is configured, run the replacer on it
	if codeStr := fsrv.StatusCode.String(); codeStr != "" {
		statusCodeOverride, err = strconv.Atoi(repl.ReplaceAll(codeStr, ""))
		if err != nil {
			return caddyhttp.Error(http.StatusInternalServerError, err)
		}
	}

	// if we do have an override from the previous two parts, then
	// we wrap the response writer to intercept the WriteHeader call
	if statusCodeOverride > 0 {
		w = statusOverrideResponseWriter{ResponseWriter: w, code: statusCodeOverride}
	}

	// let the standard library do what it does best; note, however,
	// that errors generated by ServeContent are written immediately
	// to the response, so we cannot handle them (but errors there
	// are rare)
	http.ServeContent(w, r, info.Name(), info.ModTime(), bytes.NewReader(file))

	return nil
}

// openFile opens the file at the given filename. If there was an error,
// the response is configured to inform the client how to best handle it
// and a well-described handler error is returned (do not wrap the
// returned error value).
func (fsrv *StaticSite) openFile(filename string, w http.ResponseWriter) ([]byte, error) {
	file, err := buildFs.ReadFile(filename)
	if err != nil {
		err = mapDirOpenError(err, filename)
		if os.IsNotExist(err) {
			fsrv.logger.Debug("file not found", zap.String("filename", filename), zap.Error(err))
			return nil, caddyhttp.Error(http.StatusNotFound, err)
		} else if os.IsPermission(err) {
			fsrv.logger.Debug("permission denied", zap.String("filename", filename), zap.Error(err))
			return nil, caddyhttp.Error(http.StatusForbidden, err)
		}
		// maybe the server is under load and ran out of file descriptors?
		// have client wait arbitrary seconds to help prevent a stampede
		//nolint:gosec
		backoff := weakrand.Intn(maxBackoff-minBackoff) + minBackoff
		w.Header().Set("Retry-After", strconv.Itoa(backoff))
		fsrv.logger.Debug("retry after backoff", zap.String("filename", filename), zap.Int("backoff", backoff), zap.Error(err))
		return nil, caddyhttp.Error(http.StatusServiceUnavailable, err)
	}
	return file, nil
}

// mapDirOpenError maps the provided non-nil error from opening name
// to a possibly better non-nil error. In particular, it turns OS-specific errors
// about opening files in non-directories into os.ErrNotExist. See golang/go#18984.
// Adapted from the Go standard library; originally written by Nathaniel Caza.
// https://go-review.googlesource.com/c/go/+/36635/
// https://go-review.googlesource.com/c/go/+/36804/
func mapDirOpenError(originalErr error, name string) error {
	if os.IsNotExist(originalErr) || os.IsPermission(originalErr) {
		return originalErr
	}

	parts := strings.Split(name, separator)
	for i := range parts {
		if parts[i] == "" {
			continue
		}
		fi, err := os.Stat(strings.Join(parts[:i+1], separator))
		if err != nil {
			return originalErr
		}
		if !fi.IsDir() {
			return os.ErrNotExist
		}
	}

	return originalErr
}

// transformHidePaths performs replacements for all the elements of fsrv.Hide and
// makes them absolute paths (if they contain a path separator), then returns a
// new list of the transformed values.
func (fsrv *StaticSite) transformHidePaths(repl *caddy.Replacer) []string {
	hide := make([]string, len(fsrv.Hide))
	for i := range fsrv.Hide {
		hide[i] = repl.ReplaceAll(fsrv.Hide[i], "")
		if strings.Contains(hide[i], separator) {
			abs, err := filepath.Abs(hide[i])
			if err == nil {
				hide[i] = abs
			}
		}
	}
	return hide
}

// fileHidden returns true if filename is hidden according to the hide list.
// filename must be a relative or absolute file system path, not a request
// URI path. It is expected that all the paths in the hide list are absolute
// paths or are singular filenames (without a path separator).
func fileHidden(filename string, hide []string) bool {
	if len(hide) == 0 {
		return false
	}

	// all path comparisons use the complete absolute path if possible
	filenameAbs, err := filepath.Abs(filename)
	if err == nil {
		filename = filenameAbs
	}

	var components []string

	for _, h := range hide {
		if !strings.Contains(h, separator) {
			// if there is no separator in h, then we assume the user
			// wants to hide any files or folders that match that
			// name; thus we have to compare against each component
			// of the filename, e.g. hiding "bar" would hide "/bar"
			// as well as "/foo/bar/baz" but not "/barstool".
			if len(components) == 0 {
				components = strings.Split(filename, separator)
			}
			for _, c := range components {
				if hidden, _ := filepath.Match(h, c); hidden {
					return true
				}
			}
		} else if strings.HasPrefix(filename, h) {
			// if there is a separator in h, and filename is exactly
			// prefixed with h, then we can do a prefix match so that
			// "/foo" matches "/foo/bar" but not "/foobar".
			withoutPrefix := strings.TrimPrefix(filename, h)
			if strings.HasPrefix(withoutPrefix, separator) {
				return true
			}
		}

		// in the general case, a glob match will suffice
		if hidden, _ := filepath.Match(h, filename); hidden {
			return true
		}
	}

	return false
}

// notFound returns a 404 error or, if pass-thru is enabled,
// it calls the next handler in the chain.
func (fsrv *StaticSite) notFound(w http.ResponseWriter, r *http.Request, next caddyhttp.Handler) error {
	if fsrv.PassThru {
		return next.ServeHTTP(w, r)
	}
	return caddyhttp.Error(http.StatusNotFound, nil)
}

// parseCaddyfile parses the static_site directive. It enables the static file
// server and configures it with this syntax:
//
//    static_site [<matcher>] [browse] {
//        hide          <files...>
//        index         <files...>
//        precompressed <formats...>
//        status        <status>
//        disable_canonical_uris
//    }
//
func parseCaddyfile(h httpcaddyfile.Helper) (caddyhttp.MiddlewareHandler, error) {
	var fsrv StaticSite

	fsrv.PassThru = true

	for h.Next() {
		for h.NextBlock(0) {
			switch h.Val() {
			case "hide":
				fsrv.Hide = h.RemainingArgs()
				if len(fsrv.Hide) == 0 {
					return nil, h.ArgErr()
				}

			case "index":
				fsrv.IndexNames = h.RemainingArgs()
				if len(fsrv.IndexNames) == 0 {
					return nil, h.ArgErr()
				}

			case "suffix":
				fsrv.SuffixNames = h.RemainingArgs()
				if len(fsrv.SuffixNames) == 0 {
					return nil, h.ArgErr()
				}

			case "status":
				if !h.NextArg() {
					return nil, h.ArgErr()
				}
				fsrv.StatusCode = caddyhttp.WeakString(h.Val())

			case "disable_canonical_uris":
				if h.NextArg() {
					return nil, h.ArgErr()
				}
				falseBool := false
				fsrv.CanonicalURIs = &falseBool

			case "no_pass_thru":
				if h.NextArg() {
					return nil, h.ArgErr()
				}
				fsrv.PassThru = false

			default:
				return nil, h.Errf("unknown subdirective '%s'", h.Val())
			}
		}
	}

	// hide the Caddyfile (and any imported Caddyfiles)
	if configFiles := h.Caddyfiles(); len(configFiles) > 0 {
		for _, file := range configFiles {
			file = filepath.Clean(file)
			if !fileHidden(file, fsrv.Hide) {
				// if there's no path separator, the file server module will hide all
				// files by that name, rather than a specific one; but we want to hide
				// only this specific file, so ensure there's always a path separator
				if !strings.Contains(file, separator) {
					file = "." + separator + file
				}
				fsrv.Hide = append(fsrv.Hide, file)
			}
		}
	}

	return &fsrv, nil
}

// calculateEtag produces a strong etag by default, although, for
// efficiency reasons, it does not actually consume the contents
// of the file to make a hash of all the bytes. ¯\_(ツ)_/¯
// Prefix the etag with "W/" to convert it into a weak etag.
// See: https://tools.ietf.org/html/rfc7232#section-2.3
func calculateEtag(d os.FileInfo) string {
	t := strconv.FormatInt(d.ModTime().Unix(), 36)
	s := strconv.FormatInt(d.Size(), 36)
	return `"` + t + s + `"`
}

func redirect(w http.ResponseWriter, r *http.Request, to string) error {
	for strings.HasPrefix(to, "//") {
		// prevent path-based open redirects
		to = strings.TrimPrefix(to, "/")
	}
	http.Redirect(w, r, to, http.StatusPermanentRedirect)
	return nil
}

func cmdStaticSite(fs caddycmd.Flags) (int, error) {
	caddy.TrapSignals()

	domain := fs.String("domain")
	listen := fs.String("listen")
	accessLog := fs.Bool("access-log")
	backend := fs.String("backend")

	var handlers []json.RawMessage

	handler := StaticSite{
		PassThru: backend != "",
	}

	handlers = append(handlers, caddyconfig.JSONModuleObject(handler, "handler", DirectiveName, nil))

	if backend != "" {

		toAddr, toScheme, err := parseUpstreamDialAddress(backend)
		if err != nil {
			return caddy.ExitCodeFailedStartup, fmt.Errorf("invalid backend address %s: %v", backend, err)
		}

		// proceed to build the handler and server
		ht := reverseproxy.HTTPTransport{}
		if toScheme == "https" {
			ht.TLS = new(reverseproxy.TLSConfig)
			ht.TLS.InsecureSkipVerify = true
		}

		handler := reverseproxy.Handler{
			TransportRaw: caddyconfig.JSONModuleObject(ht, "protocol", "http", nil),
			Upstreams:    reverseproxy.UpstreamPool{{Dial: toAddr}},
		}
		handlers = append(handlers, caddyconfig.JSONModuleObject(handler, "handler", "reverse_proxy", nil))
	}

	route := caddyhttp.Route{HandlersRaw: handlers}

	if domain != "" {
		route.MatcherSetsRaw = []caddy.ModuleMap{
			{
				"host": caddyconfig.JSON(caddyhttp.MatchHost{domain}, nil),
			},
		}
	}

	server := &caddyhttp.Server{
		ReadHeaderTimeout: caddy.Duration(10 * time.Second),
		IdleTimeout:       caddy.Duration(30 * time.Second),
		MaxHeaderBytes:    1024 * 10,
		Routes:            caddyhttp.RouteList{route},
	}
	if listen == "" {
		if domain == "" {
			listen = ":80"
		} else {
			listen = ":" + strconv.Itoa(certmagic.HTTPSPort)
		}
	}
	server.Listen = []string{listen}
	if accessLog {
		server.Logs = &caddyhttp.ServerLogConfig{}
	}

	httpApp := caddyhttp.App{
		Servers: map[string]*caddyhttp.Server{"static": server},
	}

	cfg := &caddy.Config{
		Admin: &caddy.AdminConfig{Disabled: true},
		AppsRaw: caddy.ModuleMap{
			"http": caddyconfig.JSON(httpApp, nil),
		},
	}

	err := caddy.Run(cfg)
	if err != nil {
		return caddy.ExitCodeFailedStartup, err
	}

	log.Printf("Caddy 2 serving static files on %s", listen)

	select {}
}

// parseUpstreamDialAddress parses configuration inputs for
// the dial address, including support for a scheme in front
// as a shortcut for the port number, and a network type,
// for example 'unix' to dial a unix socket.
//
// TODO: the logic in this function is kind of sensitive, we
// need to write tests before making any more changes to it
func parseUpstreamDialAddress(upstreamAddr string) (string, string, error) {
	var network, scheme, host, port string

	if strings.Contains(upstreamAddr, "://") {
		// we get a parsing error if a placeholder is specified
		// so we return a more user-friendly error message instead
		// to explain what to do instead
		if strings.Contains(upstreamAddr, "{") {
			return "", "", fmt.Errorf("due to parsing difficulties, placeholders are not allowed when an upstream address contains a scheme")
		}

		toURL, err := url.Parse(upstreamAddr)
		if err != nil {
			return "", "", fmt.Errorf("parsing upstream URL: %v", err)
		}

		// there is currently no way to perform a URL rewrite between choosing
		// a backend and proxying to it, so we cannot allow extra components
		// in backend URLs
		if toURL.Path != "" || toURL.RawQuery != "" || toURL.Fragment != "" {
			return "", "", fmt.Errorf("for now, URLs for proxy upstreams only support scheme, host, and port components")
		}

		// ensure the port and scheme aren't in conflict
		urlPort := toURL.Port()
		if toURL.Scheme == "http" && urlPort == "443" {
			return "", "", fmt.Errorf("upstream address has conflicting scheme (http://) and port (:443, the HTTPS port)")
		}
		if toURL.Scheme == "https" && urlPort == "80" {
			return "", "", fmt.Errorf("upstream address has conflicting scheme (https://) and port (:80, the HTTP port)")
		}
		if toURL.Scheme == "h2c" && urlPort == "443" {
			return "", "", fmt.Errorf("upstream address has conflicting scheme (h2c://) and port (:443, the HTTPS port)")
		}

		// if port is missing, attempt to infer from scheme
		if toURL.Port() == "" {
			var toPort string
			switch toURL.Scheme {
			case "", "http", "h2c":
				toPort = "80"
			case "https":
				toPort = "443"
			}
			toURL.Host = net.JoinHostPort(toURL.Hostname(), toPort)
		}

		scheme, host, port = toURL.Scheme, toURL.Hostname(), toURL.Port()
	} else {
		// extract network manually, since caddy.ParseNetworkAddress() will always add one
		if idx := strings.Index(upstreamAddr, "/"); idx >= 0 {
			network = strings.ToLower(strings.TrimSpace(upstreamAddr[:idx]))
			upstreamAddr = upstreamAddr[idx+1:]
		}
		var err error
		host, port, err = net.SplitHostPort(upstreamAddr)
		if err != nil {
			host = upstreamAddr
		}
		// we can assume a port if only a hostname is specified, but use of a
		// placeholder without a port likely means a port will be filled in
		if port == "" && !strings.Contains(host, "{") {
			port = "80"
		}
	}

	// for simplest possible config, we only need to include
	// the network portion if the user specified one
	if network != "" {
		return caddy.JoinNetworkAddress(network, host, port), scheme, nil
	}

	// if the host is a placeholder, then we don't want to join with an empty port,
	// because that would just append an extra ':' at the end of the address.
	if port == "" && strings.Contains(host, "{") {
		return host, scheme, nil
	}

	return net.JoinHostPort(host, port), scheme, nil
}

// statusOverrideResponseWriter intercepts WriteHeader calls
// to instead write the HTTP status code we want instead
// of the one http.ServeContent will use by default (usually 200)
type statusOverrideResponseWriter struct {
	http.ResponseWriter
	code int
}

// WriteHeader intercepts calls by the stdlib to WriteHeader
// to instead write the HTTP status code we want.
func (wr statusOverrideResponseWriter) WriteHeader(int) {
	wr.ResponseWriter.WriteHeader(wr.code)
}

var defaultIndexNames = []string{"index.html", "index.htm", "index.txt"}

var defaultSuffixNames = []string{"html", "htm", "txt"}

const (
	minBackoff, maxBackoff = 2, 5
	separator              = string(filepath.Separator)
)

// Interface guards
var (
	_ caddy.Provisioner           = (*StaticSite)(nil)
	_ caddyhttp.MiddlewareHandler = (*StaticSite)(nil)
)
