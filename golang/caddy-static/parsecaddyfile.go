// Copyright 2015 Matthew Holt and The Caddy Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package fileserver

import (
	"path/filepath"
	"strings"

	"github.com/caddyserver/caddy/v2/caddyconfig/httpcaddyfile"
	"github.com/caddyserver/caddy/v2/modules/caddyhttp"
)

func init() {
	httpcaddyfile.RegisterHandlerDirective("static_site", parseCaddyfile)
}

// parseCaddyfile parses the file_server directive. It enables the static file
// server and configures it with this syntax:
//
//    file_server [<matcher>] [browse] {
//        hide          <files...>
//        index         <files...>
//        precompressed <formats...>
//        status        <status>
//        disable_canonical_uris
//    }
//
func parseCaddyfile(h httpcaddyfile.Helper) (caddyhttp.MiddlewareHandler, error) {
	var fsrv StaticSite

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

			case "pass_thru":
				if h.NextArg() {
					return nil, h.ArgErr()
				}
				fsrv.PassThru = true

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
