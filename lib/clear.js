#!/usr/bin/env node

// Moduły:
const fse = require('fs-extra');
const path = require('path');

// Foldery:
const dir = require('../lib/directories.js');

for (let i = 0; i < process.argv.length; i++) {
    const element = process.argv[i];

    if (element === "--all") {
        fse.emptyDirSync(dir.build);
        fse.emptyDirSync(dir.dist);
        break;
    }

    if (element === "--build") {
        fse.emptyDirSync(dir.build);
    }

    if (element === "--dist") {
        fse.emptyDirSync(dir.dist);
    }
}