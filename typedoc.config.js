const resolvePath = require('./lib/resolvePath');

module.exports = {
    out: resolvePath('docs'),
    mode: 'file',
    module: 'commonjs',
    target: 'es5',
    exclude: [
        resolvePath('source/test', '**', '*'),
        resolvePath('source/entry', '**', '*'),
        resolvePath('source/html', '**', '*'),
        resolvePath('source/style', '**', '*'),
        resolvePath('source/resources', '**', '*'),
        resolvePath('node_modules', '**', '*')
    ],
    experimentalDecorators: true,
    excludeExternals: true,
    excludeNotExported: true,
    excludePrivate: true,
};