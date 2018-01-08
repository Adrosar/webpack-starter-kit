// Moduły:
const path = require('path');

// Katalog (folder) projektu;
const rootDir = path.resolve(__dirname, '..');

// Foldery:
const dir = {
    root: rootDir,
    source: path.resolve(rootDir, 'source'),
    build: path.resolve(rootDir, 'build'),
    dist: path.resolve(rootDir, 'dist'),
    assets: path.resolve(rootDir, 'assets'),
    nm: path.resolve(rootDir, 'node_modules'),
    bc: path.resolve(rootDir, 'bower_components'),
    test: path.resolve(rootDir, 'test'),
    web: path.resolve(rootDir, 'web')
}

// Eksport:
module.exports = dir;