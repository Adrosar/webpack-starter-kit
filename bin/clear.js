// Moduły:
const fse = require('fs-extra');
const path = require('path');

// Foldery:
const dir = require('../lib/directories.js');

// Czyszczę pliki i foldery z katalogu "build" i "dist":
fse.emptyDirSync(dir.build);
fse.emptyDirSync(dir.dist);