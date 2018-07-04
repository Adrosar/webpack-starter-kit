#!/usr/bin/env node

// Moduły:
const fse = require('fs-extra');
const path = require('path');

// Foldery:
const dir = require('../lib/directories.js');

function run(mode) {
    switch (mode) {
        case 'all':
            fse.emptyDirSync(dir.build);
            fse.emptyDirSync(dir.dist);
            break;

        case 'build':
            fse.emptyDirSync(dir.build);
            break;

        case 'dist':
            fse.emptyDirSync(dir.dist);
            break;
    }
}

function init() {
    let config = undefined;

    for (let i = 0; i < process.argv.length; i++) {
        const arg = process.argv[i];

        if (arg.indexOf('--all') === 0) {
            run('all');
        } else if (arg.indexOf('--build') === 0) {
            run('build');
        } else if (arg.indexOf('--dist') === 0) {
            run('dist');
        }
    }
}

init();