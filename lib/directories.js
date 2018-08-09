// Moduły:
const path = require('path');

// Katalog (folder) projektu;
const rootDir = path.resolve(__dirname, '..');

// Foldery:
const dir = {
    root: rootDir,
    bin: path.resolve(rootDir, 'bin'),
    lib: path.resolve(rootDir, 'lib'),
    source: path.resolve(rootDir, 'source'),
    build: path.resolve(rootDir, 'build'),
    dist: path.resolve(rootDir, 'dist'),
    assets: path.resolve(rootDir, 'assets'),
    nm: path.resolve(rootDir, 'node_modules'),
    bc: path.resolve(rootDir, 'bower_components'),
    test: path.resolve(rootDir, 'source', 'test'),
    web: path.resolve(rootDir, 'web'),
    doc: path.resolve(rootDir, 'doc'),
    typedoc: path.resolve(rootDir, 'typedoc')
}

// Eksport:
module.exports = dir;