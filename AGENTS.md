# Agent Guidelines for Foundation Repository

## Build Commands
- **Go projects**: `CGO_ENABLED=0 go build -o <binary> ./...`
- **Rust projects**: `cargo build --release`
- **Docker images**: `docker build -t <tag> <context>`
- **Make targets**: Use `make` in project directories (e.g., `golang/pac-server`)

## Code Style
- **Indentation**: 2 spaces (default), 4 spaces for Python, tabs for Makefiles
- **Line endings**: LF with final newline
- **Charset**: UTF-8
- **Imports**: Follow language conventions (Go stdlib first, then third-party)

## Commit Messages
Use conventional commits: feat, fix, docs, style, refactor, perf, test, chore

## Testing
No specific test framework configured. Check individual project directories.