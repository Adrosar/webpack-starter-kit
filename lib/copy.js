#!/usr/bin/env node

// Moduły:
const fse = require('fs-extra');
const path = require('path');

// Foldery:
const dir = require('../lib/directories.js');

for (let i = 0; i < process.argv.length; i++) {
    const element = process.argv[i];

    if (element === "--assets") {
        // Kopiowanie plików z katalogu `assets` do katalogu `dist`:
        try {
            fse.copySync(dir.assets, dir.dist);
        } catch (err) {
            throw err;
        }
    }
}