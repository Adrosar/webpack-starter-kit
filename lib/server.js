#!/usr/bin/env node
'use strict';

// Moduły:
const express = require('express');
const serveIndex = require('serve-index');
const nocache = require('nocache');
const resolvePath = require('./resolvePath');

const staticOptions = {
    etag: false,
    immutable: false,
    maxAge: 0,
    lastModified: false
};

function allowOrigin(_req, _res) {
    _res.setHeader('Access-Control-Allow-Origin', _req.protocol + "://" + _req.hostname);
    _res.setHeader('Access-Control-Allow-Methods', '*');
    _res.setHeader('Access-Control-Allow-Headers', '*');
}

function createApp() {
    const app = express();

    app.use((_req, _res, _next) => {
        console.log('> ' + _req.method + " " + _req.url);
        _next();
    });

    app.use((_req, _res, _next) => {
        if (_req.method === "OPTIONS") {
            _res.status(204);
            allowOrigin(_req, _res);
            _res.end();
        } else {
            _next();
        }
    });

    // app.use('/~typedoc', express.static(resolvePath('docs'), staticOptions));
    // app.use('/~docs', express.static(resolvePath('docs'), staticOptions));

    return app;
}

function runServer(_port) {
    const app = createApp();
    const root = resolvePath();

    app.use(nocache());
    app.use('/', express.static(root, staticOptions));
    app.use('/', serveIndex(root, {
        'icons': true
    }));

    app.listen(_port, () => {
        console.log('> Server DEV listening on port: ' + _port + ' !');
    })
}

function init() {
    let port = undefined;

    for (let i = 0; i < process.argv.length; i++) {
        const arg = process.argv[i];
        const argNext = process.argv[i + 1];

        if (arg.indexOf("--port") === 0) {
            port = parseInt(argNext);
        }
    }

    if (port === undefined) {
        throw "[Error] Brak parametru `--port {number}` !!!";
    }

    if (!(typeof port === "number" && port > 0 && port <= 65535)) {
        throw "[Error] Port nie jest liczbą z zakresu 1-65535 !!!"
    }

    runServer(port);
}

if (true) {
    init();
}