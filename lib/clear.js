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
            fse.emptyDirSync(dir.typedoc);
            break;

        case 'build':
            fse.emptyDirSync(dir.build);
            break;

        case 'dist':
            fse.emptyDirSync(dir.dist);
            break;

        case 'typedoc':
            fse.emptyDirSync(dir.typedoc);
            break;

        case 'types':
            fse.emptyDirSync(dir.types);
            break;

        case 'nm':
            fse.emptyDirSync(dir.nm);
            break;

        case 'all+nm':
            fse.emptyDirSync(dir.build);
            fse.emptyDirSync(dir.dist);
            fse.emptyDirSync(dir.typedoc);
            fse.emptyDirSync(dir.nm);
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
        } else if (arg.indexOf('--typedoc') === 0) {
            run('typedoc');
        } else if (arg.indexOf('--types') === 0) {
            run('typedoc');
        } else if (arg.indexOf('--nm') === 0) {
            run('all+nm');
        } else if (arg.indexOf('--nm') === 0) {
            run('nm');
        }
    }
}

init();