#!/usr/bin/env node

// Moduły:
const path = require('path');
const express = require('express');
const serveIndex = require('serve-index')

// Katalogi:
const dir = require('./directories.js');

const staticOptions = {
    etag: false,
    maxAge: 86400
};

const app = express();

function serverBuild(port) {

    app.use('/', express.static(dir.build, staticOptions));
    app.use('/', express.static(dir.assets, staticOptions));
    app.use('/', express.static(dir.web, staticOptions));

    app.use('/', serveIndex(dir.web, {
        'icons': true
    }));

    app.listen(port, function () {
        console.log('Example app listening on port ' + port + ' !');
    })
}

function serverDist(port) {

    app.use('/', express.static(dir.dist, staticOptions));
    app.use('/', serveIndex(dir.dist, {
        'icons': true
    }));

    app.listen(port, function () {
        console.log('Example app listening on port ' + port + ' !');
    })
}

for (let i = 0; i < process.argv.length; i++) {
    const arg = process.argv[i];

    if (arg === "--dev") {
        serverBuild(8080);
        break;
    }

    if (arg === "--prod") {
        serverDist(80);
        break;
    }

    if (arg === "--test") {
        serverBuild(50180);
        break;
    }
}