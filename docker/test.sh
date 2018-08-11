#!/bin/bash

SCRIPT_PATH=$(readlink -f "$0")
DIR_PATH=$(dirname "$SCRIPT_PATH")

docker run --rm -i -t \
    --name "wsk_node-10.7.0_testserver" \
    -v "$DIR_PATH/..:/app" \
    --env HTTP_PROXY=$HTTP_PROXY \
    --env HTTPS_PROXY$HTTPS_PROXY \
    --env FTP_PROXY=$FTP_PROXY \
    --env NO_PROXY=$NO_PROXY \
    node:10.7.0 /bin/bash -c "mkdir /app-tmp && cp -f -r /app/. /app-tmp && cd /app-tmp && npm install && npm run build && npm run test && npm run min && npm run prod && npm run dist && npm run typedoc npm run clear && pause"