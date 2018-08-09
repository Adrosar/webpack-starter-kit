#!/usr/bin/env node

// Moduły:
const path = require('path');
const express = require('express');
const serveIndex = require('serve-index')

// Katalogi:
const dir = require('./directories.js');

const staticOptions = {
    etag: true,
    maxAge: 60
};

function createApp() {
    const app = express();

    app.use((req, res, next) => {
        console.log('[' + req.method + ']', req.url);
        next();
    });

    app.use('/~typedoc', express.static(dir.typedoc, staticOptions));

    return app;
}

function serverDev(port) {
    const app = createApp();

    app.use('/', express.static(dir.build, staticOptions));
    app.use('/', express.static(dir.assets, staticOptions));
    app.use('/', express.static(dir.web, staticOptions));

    app.use('/', serveIndex(dir.web, {
        'icons': true
    }));

    app.listen(port, () => {
        console.log('Server DEV listening on port ' + port + ' !');
    })
}

function serverProd(port) {
    const app = createApp();

    app.use('/', express.static(dir.dist, staticOptions));

    app.use('/', serveIndex(dir.dist, {
        'icons': true
    }));

    app.listen(port, () => {
        console.log('Server PROD listening on port ' + port + ' !');
    })
}

function runServer(mode, port) {
    switch (mode) {
        case 'dev':
            serverDev(port);
            break;

        case 'prod':
            serverProd(port);
            break;
    }
}

function init() {

    let port = undefined;
    let mode = undefined;

    for (let i = 0; i < process.argv.length; i++) {
        const arg = process.argv[i];
        const argNext = process.argv[i + 1];

        if (arg.indexOf("--port") === 0) {
            port = parseInt(argNext);
        }

        if (arg.indexOf("--") === 0) {
            if (arg.indexOf("dev") === 2) {
                mode = 'dev';
            } else if (arg.indexOf("prod") === 2) {
                mode = 'prod';
            }
        }
    }

    if (port === undefined) {
        throw "[Error] Brak parametru `--port {number}` !!!";
    }

    if (!(typeof port === "number" && port >= 1 && port <= 65535)) {
        throw "[Error] Port nie jest liczbą z zakresu 1-65535 !!!"
    }

    if (mode === undefined) {
        throw "[Error] Brak jednego z parametrów `--dev` lub `--prod` !!!";
    }

    runServer(mode, port);
}

init();