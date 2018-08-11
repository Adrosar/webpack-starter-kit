#!/bin/bash

SCRIPT_PATH=$(readlink -f "$0")
DIR_PATH=$(dirname "$SCRIPT_PATH")

docker run --rm -i -t \
    --name "wsk_node-10.7.0_devserver" \
    -v "$DIR_PATH/..:/app" \
    -v "wsk_node-10.7.0_volume-nm:/app/node_modules" \
    -p 60088:60088 \
    -p 60080:60080 \
    --env HTTP_PROXY=$HTTP_PROXY \
    --env HTTPS_PROXY$HTTPS_PROXY \
    --env FTP_PROXY=$FTP_PROXY \
    --env NO_PROXY=$NO_PROXY \
    node:10.7.0 /bin/bash