#!/usr/bin/env node

// Moduły:
const fse = require('fs-extra');
const path = require('path');

// Foldery:
const dir = require('../lib/directories.js');

// Kopiowanie plików z katalogu `build` do katalogu `dist`:
try {
    fse.copySync(dir.build, dir.dist);
} catch (err) {
    throw err;
}

// Kopiowanie plików z katalogu `assets` do katalogu `dist`:
try {
    fse.copySync(dir.assets, dir.dist);
} catch (err) {
    throw err;
}