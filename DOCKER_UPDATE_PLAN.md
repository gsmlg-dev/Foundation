# Docker Images Update Plan

## Overview
This plan outlines the necessary updates for 38 Docker image projects in the docker/ directory to improve security, compatibility, and maintainability.

## Phase 1: Critical Security Updates (High Priority)

### 1.1 Kubernetes Tools Update
- **File**: `kubectl/Dockerfile:3`
- **Current**: Kubernetes 1.22 (EOL Oct 2022)
- **Update to**: Kubernetes 1.31
- **Reason**: Critical security updates, EOL version

### 1.2 CentOS Migration
- **File**: `dell-openmanage/Dockerfile:2`
- **Current**: `centos:7.6.1810` (EOL June 2024)
- **Update to**: `rockylinux:9` or `almalinux:9`
- **Reason**: EOL OS, security vulnerabilities
- **Additional**: Update Dell OpenManage repository URLs

### 1.3 Ubuntu LTS Update
- **Files**: `dell-poweredge/Dockerfile:1`, `openwrt/Dockerfile:1`
- **Current**: `ubuntu:20.04` (EOL April 2025)
- **Update to**: `ubuntu:24.04`
- **Reason**: Upcoming EOL, security updates
- **Additional**: Fix deprecated `apt-key add` usage in dell-poweredge

## Phase 2: Base Image Updates (Medium Priority)

### 2.1 Alpine Linux Updates
- **Files**: 
  - `couch-alpine/Dockerfile:39`
  - `curl/Dockerfile:1`
  - `squid/Dockerfile:1`
  - `stunnel/Dockerfile:1`
  - `tinyproxy/Dockerfile:1`
  - `unbound/Dockerfile:1`
  - `zerotier-ui/Dockerfile:5`
- **Current**: `alpine:3.20`
- **Update to**: `alpine:3.21`
- **Reason**: Latest stable release, security patches

### 2.2 Go Language Updates
- **Files**: `geoip2/Dockerfile:10`, and other Go-based images
- **Current**: `golang:1.22`
- **Update to**: `golang:1.23`
- **Reason**: Latest stable release, performance improvements

### 2.3 Node.js LTS Update
- **File**: `meshcentral/Dockerfile:1`
- **Current**: `node:lts-slim` (Node 20)
- **Update to**: `node:22-slim`
- **Reason**: Latest LTS version, security updates

## Phase 3: Language Runtime Updates (Medium Priority)

### 3.1 Java/OpenJDK Update
- **File**: `antlr/Dockerfile:1`
- **Current**: `openjdk:11`
- **Update to**: `openjdk:21`
- **Reason**: Latest LTS, security and performance improvements

### 3.2 Python Update
- **File**: `python/Dockerfile:1`
- **Current**: `python:3.10`
- **Update to**: `python:3.13`
- **Reason**: Latest stable release, security patches

### 3.3 Erlang Update
- **File**: `couch-alpine/Dockerfile:1`
- **Current**: `erlang:26-alpine`
- **Update to**: `erlang:27-alpine`
- **Reason**: Latest stable release

## Phase 4: Package Version Updates (Low Priority)

### 4.1 ANTLR Version Update
- **File**: `antlr/Dockerfile:7`
- **Current**: ANTLR `4.9.2`
- **Update to**: ANTLR `4.13.2`
- **Reason**: Latest version with bug fixes

### 4.2 MeshCentral Version Update
- **File**: `meshcentral/Dockerfile:5`
- **Current**: `MESHCENTRAL2_VERSION="0.8.21"`
- **Action**: Check and update to latest npm version

### 4.3 ZeroTier UI Version Update
- **File**: `zerotier-ui/Dockerfile:1-2`
- **Current**: Commit `00592d9`, version `1.5.8`
- **Action**: Check for newer commits/releases

## Phase 5: Security and Best Practices (High Priority)

### 5.1 Remove Hardcoded Credentials
- **Files**: 
  - `couch-alpine/Dockerfile:49-50`
  - `couchdb/Dockerfile:10-11`
- **Issue**: Hardcoded `COUCHDB_USER=gao`, `COUCHDB_PASSWORD=gsmlg-dev`
- **Solution**: Use environment variables or secrets

### 5.2 Fix Deprecated apt-key Usage
- **File**: `dell-poweredge/Dockerfile:23-24`
- **Issue**: Deprecated `apt-key add`
- **Solution**: Use `gpg --dearmor` and place in `/etc/apt/trusted.gpg.d/`

### 5.3 Root User Privilege Reduction
- **File**: `dell-openmanage/Dockerfile`
- **Issue**: Multiple operations as root
- **Solution**: Follow principle of least privilege

## Testing Requirements

### Build Testing
- Test each image build after updates
- Verify no build failures

### Compatibility Testing
- Verify application functionality
- Test with dependent services

### Security Scanning
- Run security scans on updated images
- Check for vulnerabilities

### Performance Testing
- Ensure no performance degradation
- Compare resource usage

## Execution Order

1. **Phase 1**: Critical security updates (kubectl, CentOS, Ubuntu)
2. **Phase 5**: Security fixes (credentials, deprecated practices)
3. **Phase 2**: Base image updates (Alpine, Go, Node.js)
4. **Phase 3**: Language runtime updates (Java, Python, Erlang)
5. **Phase 4**: Package version updates (ANTLR, MeshCentral, ZeroTier)

## Notes

- Each update should be tested individually
- Monitor for breaking changes in major version updates
- Update documentation if needed
- Consider backward compatibility requirements
- Plan for rollback if issues arise