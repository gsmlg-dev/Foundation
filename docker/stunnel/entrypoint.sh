#!/bin/sh

set -e

CHOWN=$(/usr/bin/which chown)
STUNNEL=$(/usr/bin/which stunnel)

# Ensure permissions are set correctly on the Squid cache + log dir.
mkdir -p /run/stunnel
"$CHOWN" -R stunnel:stunnel /run/stunnel

CERT=/etc/stunnel/cert.pem
KEY=/etc/stunnel/pkey.pem

PROXY_MODE=${PROXY_MODE:-master}
PROXY_SERVER=${PROXY_SERVER}
PRIVATE_KEY=${PRIVATE_KEY:-$KEY}
CERTIFICATE=${CERTIFICATE:-$CERT}

CONF=/etc/stunnel/stunnel.conf

if test "$PROXY_MODE" "==" "master"
then
  # server mode
  cat <<EOF > "${CONF}"
# Certificate/key is needed in server mode
cert = $CERTIFICATE
key = $PRIVATE_KEY
CApath = /etc/ssl/certs

# Some security enhancements for UNIX systems - comment them out on Win32
# chroot = /chroot/stunnel/
setuid = stunnel
setgid = stunnel

# PID is created inside chroot jail
pid = /run/stunnel/stunnel.pid

# foreground
foreground = yes

# Some performance tunings
socket = l:TCP_NODELAY=1
socket = r:TCP_NODELAY=1
#compression = rle

[https]
accept = 443
connect = localhost:3128
TIMEOUTclose = 0

EOF
else
  # client mode
  cat <<EOF > "${CONF}"
# Certificate/key is optional in client mode
cert = $CERTIFICATE
key = $PRIVATE_KEY
CApath = /etc/ssl/certs

# Some security enhancements for UNIX systems - comment them out on Win32
# chroot = /chroot/stunnel/
setuid = stunnel
setgid = stunnel

# PID is created inside chroot jail
pid = /run/stunnel/stunnel.pid

# foreground
foreground = yes

# Some performance tunings
socket = l:TCP_NODELAY=1
socket = r:TCP_NODELAY=1
#compression = rle

[http]
client = yes
accept = 80
connect = $PROXY_SERVER
TIMEOUTclose = 0
verifyChain = ${VERIFY_CHAIN}

EOF
fi


# start stunnel in foreground
echo "Starting Stunnel..."
exec "$STUNNEL" "$CONF"

