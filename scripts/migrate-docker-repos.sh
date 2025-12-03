#!/bin/bash
set -e

# Migration script: Move docker/* folders to gsmlg-ci organization repos
# Each docker image gets its own repository at gsmlg-ci/{name}

ORG="gsmlg-ci"
SOURCE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TEMP_DIR="/tmp/docker-migration"
DOCS_DIR="${SOURCE_DIR}/docs"

# List of all docker images
IMAGES=(
  alpine antlr baidupcs-go build-base caddy code-server
  couch-alpine couchdb curl daedalos dell-openmanage dell-poweredge
  devdocs echo editor-server geoip2 go-ethereum keycloak
  kubectl log-forwarder mariadb meshcentral nginx nix-builder
  openssl openwrt phoenix python rabbitmq semantic-release
  snapdrop squid stunnel svg-autocrop tinyproxy unbound
  varnish zerotier zerotier-ui
)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
  echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
  log_info "Checking prerequisites..."

  if ! command -v gh &> /dev/null; then
    log_error "gh CLI is not installed. Please install it first."
    exit 1
  fi

  if ! gh auth status &> /dev/null; then
    log_error "gh CLI is not authenticated. Please run 'gh auth login' first."
    exit 1
  fi

  log_info "Prerequisites OK"
}

# Transform workflow file for standalone repo
transform_workflow() {
  local IMAGE=$1
  local WORKFLOW_SRC=$2
  local WORKFLOW_DST=$3

  if [ ! -f "$WORKFLOW_SRC" ]; then
    log_warn "No workflow found for $IMAGE at $WORKFLOW_SRC"
    return 1
  fi

  # Transform paths from docker/{image}/ to current directory
  sed -e "s|context: docker/${IMAGE}/|context: .|g" \
      -e "s|file: docker/${IMAGE}/|file: |g" \
      -e "s|'docker/${IMAGE}/\*\*'|'Dockerfile'|g" \
      -e "s|\"docker/${IMAGE}/\*\*\"|\"Dockerfile\"|g" \
      -e "s|- 'docker/${IMAGE}/\*\*'|- 'Dockerfile'|g" \
      -e "s|- '.github/workflows/docker-buildimage-${IMAGE}.yml'|- '.github/workflows/build.yml'|g" \
      "$WORKFLOW_SRC" > "$WORKFLOW_DST"

  return 0
}

# Migrate a single image
migrate_image() {
  local IMAGE=$1

  echo ""
  log_info "=========================================="
  log_info "Migrating: $IMAGE"
  log_info "=========================================="

  local REPO_DIR="${TEMP_DIR}/${IMAGE}"
  local DOCKER_SRC="${SOURCE_DIR}/docker/${IMAGE}"
  local WORKFLOW_SRC="${SOURCE_DIR}/.github/workflows/docker-buildimage-${IMAGE}.yml"

  # Check if source exists
  if [ ! -d "$DOCKER_SRC" ]; then
    log_error "Source directory not found: $DOCKER_SRC"
    return 1
  fi

  # 1. Create repo (ignore error if already exists)
  log_info "Creating repository ${ORG}/${IMAGE}..."
  if gh repo create "${ORG}/${IMAGE}" --public --description "Docker image: ${IMAGE}" 2>/dev/null; then
    log_info "Repository created"
  else
    log_warn "Repository may already exist, continuing..."
  fi

  # 2. Clone the repo
  log_info "Cloning repository..."
  rm -rf "$REPO_DIR"

  # Wait a moment for GitHub to be ready
  sleep 2

  if ! git clone "git@github.com:${ORG}/${IMAGE}.git" "$REPO_DIR" 2>/dev/null; then
    # Try HTTPS if SSH fails
    git clone "https://github.com/${ORG}/${IMAGE}.git" "$REPO_DIR"
  fi

  # 3. Copy Docker files
  log_info "Copying Docker files..."
  cp -r "${DOCKER_SRC}/"* "$REPO_DIR/" 2>/dev/null || true
  cp -r "${DOCKER_SRC}/".[!.]* "$REPO_DIR/" 2>/dev/null || true

  # 4. Create workflow directory and transform workflow
  log_info "Setting up GitHub Actions workflow..."
  mkdir -p "$REPO_DIR/.github/workflows"

  if transform_workflow "$IMAGE" "$WORKFLOW_SRC" "$REPO_DIR/.github/workflows/build.yml"; then
    log_info "Workflow transformed successfully"
  else
    log_warn "Skipping workflow setup"
  fi

  # 5. Add README
  log_info "Creating README.md..."
  cat > "$REPO_DIR/README.md" << EOF
# ${IMAGE}

[![Build](https://github.com/${ORG}/${IMAGE}/actions/workflows/build.yml/badge.svg)](https://github.com/${ORG}/${IMAGE}/actions/workflows/build.yml)

Docker image published to:
- \`docker.io/gsmlg/${IMAGE}\`
- \`ghcr.io/gsmlg-dev/${IMAGE}\`

## Usage

\`\`\`bash
# From Docker Hub
docker pull gsmlg/${IMAGE}:latest

# From GitHub Container Registry
docker pull ghcr.io/gsmlg-dev/${IMAGE}:latest
\`\`\`

## Build

\`\`\`bash
docker build -t gsmlg/${IMAGE} .
\`\`\`
EOF

  # 6. Add LICENSE
  log_info "Adding LICENSE..."
  cp "${SOURCE_DIR}/LICENSE" "$REPO_DIR/"

  # 7. Commit and push
  log_info "Committing and pushing..."
  cd "$REPO_DIR"
  git add .

  if git diff --staged --quiet; then
    log_warn "No changes to commit"
  else
    git commit -m "feat: initial import from Foundation repo"
    git push origin main
    log_info "Pushed successfully"
  fi

  cd "$SOURCE_DIR"

  log_info "Completed: $IMAGE"
  return 0
}

# Generate tracking document
generate_tracking_doc() {
  log_info "Generating docs/DOCKER_REPOS.md..."

  mkdir -p "$DOCS_DIR"

  cat > "$DOCS_DIR/DOCKER_REPOS.md" << 'EOF'
# Docker Image Repositories

Docker images have been migrated to the [gsmlg-ci](https://github.com/gsmlg-ci) organization.

## Repository List

| Repository | Docker Hub | GHCR | Build Status |
|------------|------------|------|--------------|
EOF

  for IMAGE in "${IMAGES[@]}"; do
    echo "| [${IMAGE}](https://github.com/${ORG}/${IMAGE}) | \`docker.io/gsmlg/${IMAGE}\` | \`ghcr.io/gsmlg-dev/${IMAGE}\` | [![Build](https://github.com/${ORG}/${IMAGE}/actions/workflows/build.yml/badge.svg)](https://github.com/${ORG}/${IMAGE}/actions/workflows/build.yml) |" >> "$DOCS_DIR/DOCKER_REPOS.md"
  done

  cat >> "$DOCS_DIR/DOCKER_REPOS.md" << 'EOF'

## Internal Dependencies

Some images use other images from this collection as base images:

- `alpine` is used by: baidupcs-go, go-ethereum, zerotier
- `curl` is used by: kubectl, geoip2
- `code-server` is used by: editor-server

## Building

Each repository has its own GitHub Actions workflow that builds and pushes images to both Docker Hub and GitHub Container Registry.

Images are built for multiple architectures:
- `linux/amd64`
- `linux/arm64`
EOF

  log_info "Generated docs/DOCKER_REPOS.md"
}

# Main execution
main() {
  echo ""
  echo "============================================"
  echo "  Docker Migration Script"
  echo "  Moving docker/* to gsmlg-ci organization"
  echo "============================================"
  echo ""

  check_prerequisites

  mkdir -p "$TEMP_DIR"

  local FAILED=()
  local SUCCESS=()

  for IMAGE in "${IMAGES[@]}"; do
    if migrate_image "$IMAGE"; then
      SUCCESS+=("$IMAGE")
    else
      FAILED+=("$IMAGE")
    fi
  done

  # Generate tracking document
  generate_tracking_doc

  echo ""
  echo "============================================"
  echo "  Migration Summary"
  echo "============================================"
  echo ""
  log_info "Successful: ${#SUCCESS[@]} images"

  if [ ${#FAILED[@]} -gt 0 ]; then
    log_error "Failed: ${#FAILED[@]} images"
    for img in "${FAILED[@]}"; do
      echo "  - $img"
    done
  fi

  echo ""
  log_info "Tracking document created at: docs/DOCKER_REPOS.md"
  log_info "Temporary files at: $TEMP_DIR"
  echo ""
  log_info "Next steps:"
  echo "  1. Review the migrated repositories"
  echo "  2. Set organization secrets in gsmlg-ci (DOCKERHUB_USER, DOCKERHUB_PASSWD, GHCR_TOKEN)"
  echo "  3. Trigger test builds for a few repos"
  echo "  4. Update README.md to reference the new repos"
  echo "  5. Remove docker/ directory and docker workflows from Foundation"
  echo ""
}

# Run if executed directly (not sourced)
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  main "$@"
fi
