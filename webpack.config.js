const os = require('os');

const processArgv = require('./lib/processArgv');
const resolvePath = require('./lib/resolvePath');
const packageObject = require('./lib/packageObject');
const distName = require('./lib/distName');

console.log("\n# Name:", packageObject.name);
console.log("# Version:", packageObject.version);
console.log("\n");

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

// → https://github.com/webpack-contrib/mini-css-extract-plugin
const cssExtractPlugin = new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
});

// → https://github.com/webpack-contrib/mini-css-extract-plugin
const cssExtractLoaderObject = {
    loader: MiniCssExtractPlugin.loader,
    options: {
        publicPath: resolvePath('dist'),
        hmr: !!(processArgv.mode === 'development'),
        reloadAll: true
    },
}

// Przypisanie ustawień `css-loader` do stałej: 
// → https://github.com/webpack-contrib/css-loader
const cssLoaderObject = {
    loader: "css-loader",
    options: {
        url: false,
        import: true
    }
}

// Przypisanie ustawień `postcss-loader` do stałej: 
// → https://github.com/postcss/postcss-loader
const postcssLoaderObject = {
    loader: "postcss-loader",
    options: {
        ident: 'postcss',
        plugins: (loader) => [
            // Wtyczka "Autoprefixer" dla narzędzia "PostCSS":
            // → https://github.com/postcss/autoprefixer
            autoprefixer({
                // Biblioteka "Browserslist" używana we wtyczce "Autoprefixer":
                // → https://github.com/ai/browserslist#queries
                //
                // Można użyć pliku `.browserslistrc` lub poniższego pola `overrideBrowserslist`:
                // KOD: `overrideBrowserslist: ["last 2 versions", "last 5 Chrome versions", "Firefox ESR", "last 2 major versions"]`
            })
        ]
    }
}

//→ https://github.com/webpack-contrib/sass-loader
const sassLoaderObject = {
    loader: "sass-loader?outputStyle=expanded"
}

//→ https://github.com/dearrrfish/preprocess-loader
const preprocessLoaderObject = {
    loader: 'preprocess-loader?' + JSON.stringify({
        ENV: (processArgv.mode === 'production') ? 'PROD' : 'DEV',
        DEBUG: (processArgv.watch === true) ? true : false,
        MIN: (processArgv.mode === 'production') ? 0 : 1,
    })
}

const webpackConfig = {
    devtool: '(none)', //→ https://webpack.js.org/configuration/devtool/
    entry: {
        "app": resolvePath('source/entry/app.ts')
    },
    output: {
        filename: '[name].js',
        path: resolvePath(distName()),
        chunkFilename: '[name].wm.js', //← `wm` - Webpack Module.
        publicPath: '/' + distName() //← konfiguracja zależna od środowiska jest na dole pliku ↓↓↓
    },
    module: {
        rules: [{
            // → https://webpack.js.org/guides/typescript/
            test: /\.tsx?$/,
            use: ['ts-loader', preprocessLoaderObject],
            exclude: /node_modules/
        },
        {
            // → https://github.com/babel/babel-loader
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }, preprocessLoaderObject]
        },
        {
            test: /\.scss$/,
            use: [cssExtractLoaderObject,
                cssLoaderObject,
                postcssLoaderObject,
                sassLoaderObject,
                preprocessLoaderObject
            ]
        }, {
            test: /\.css$/,
            use: [cssExtractLoaderObject,
                cssLoaderObject,
                postcssLoaderObject,
                preprocessLoaderObject
            ]
        }, {
            test: /\.txt$/,
            use: ['raw-loader']
        }
        ]
    },
    resolve: {
        modules: [resolvePath('source'), resolvePath('node_modules')],
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss', '.sass', '.txt'],
        alias: {}
    },
    optimization: {
        minimize: !!(processArgv.mode === 'production'),
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: os.cpus().length - 1,
                terserOptions: {
                    ecma: undefined,
                    warnings: false,
                    parse: {},
                    compress: {},
                    mangle: true,
                    module: false,
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: true,
                    keep_classnames: false,
                    keep_fnames: false,
                    safari10: true,
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [cssExtractPlugin],
    devServer: {
        open: false,
        contentBase: resolvePath('.'),
        compress: true,
        port: 8080,
        publicPath: '/' + distName()
    }
}

// → https://webpack.js.org/concepts/mode/
if ((processArgv.mode === 'production') && (processArgv.forDEV !== true)) {

    // → https://webpack.js.org/guides/public-path/
    webpackConfig.output.publicPath = '';

    // → https://github.com/webpack-contrib/copy-webpack-plugin
    const CopyPlugin = require('copy-webpack-plugin');
    webpackConfig.plugins.push(new CopyPlugin([{
        from: resolvePath('assets'),
        to: resolvePath('dist')
    }]));
}

if (processArgv.watch === true) {
    // → https://webpack.js.org/configuration/watch/
    webpackConfig.watchOptions = {
        aggregateTimeout: 300,
        poll: 1000
    }
}

if (processArgv.liveReload === true) {
    // → https://www.npmjs.com/package/webpack-livereload-plugin
    const LiveReloadPlugin = require('webpack-livereload-plugin');
    webpackConfig.plugins.push(new LiveReloadPlugin({
        port: 35729,
        appendScriptTag: true,
        delay: 100
    }));
}

module.exports = webpackConfig