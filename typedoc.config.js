// Biblioteki własne:
const dir = require('./lib/directories.js');

module.exports = {
    out: dir.typedoc,
    module: 'commonjs',
    target: 'es5',
    exclude: '**/node_modules/**/*.*',
    exclude: [
        '**/node_modules/**/*',
        '**/test/**/*'
    ],
    experimentalDecorators: true,
    excludeExternals: true,
    excludeNotExported: true,
    excludePrivate: true,
};