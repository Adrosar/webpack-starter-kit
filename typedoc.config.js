// Biblioteki własne:
const path = require('path');
const dir = require('./lib/directories.js');

module.exports = {
    out: dir.typedoc,
    mode: 'file',
    module: 'commonjs',
    target: 'es5',
    exclude: [
        path.resolve(dir.source, 'test', '**', '*'),
        path.resolve(dir.source, 'entry', '**', '*'),
        path.resolve(dir.source, 'html', '**', '*'),
        path.resolve(dir.source, 'style', '**', '*'),
        path.resolve(dir.nm, '**', '*')
    ],
    experimentalDecorators: true,
    excludeExternals: true,
    excludeNotExported: true,
    excludePrivate: true,
};