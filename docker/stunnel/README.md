# stunnel proxy

PROXY_MODE=master

## mode = master

http => https

turn http server to https

PROXY_TARGET="localhost:3128"

## mode = client

https => http

turn https server to http

PROXY_SERVER="gsmlg.org:443"

VERIFY_CHAIN="no"
