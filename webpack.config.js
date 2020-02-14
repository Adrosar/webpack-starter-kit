const os = require('os');

const processArgv = require('./tools/processArgv');
const resolvePath = require('./tools/resolvePath');
const packageObject = require('./tools/packageObject');
const distName = require('./tools/distName');

console.log("\n# Name:", packageObject.name);
console.log("# Version:", packageObject.version);
console.log("\n");

const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const sass = require('sass');
const fiber = require('fibers');

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
    loader: 'sass-loader',
    options: {
        sourceMap: false,
        implementation: sass,
        sassOptions: {
            fiber: fiber
        }
    }
}

//→ https://github.com/dearrrfish/preprocess-loader
const preprocessLoaderObject = {
    loader: 'preprocess-loader?' + JSON.stringify({
        ENV: (processArgv.mode === 'production') ? 'PROD' : 'DEV',
        DEBUG: (processArgv.watch === true) ? true : false,
        MIN: (processArgv.mode === 'production') ? 0 : 1,
    })
}

//→ https://github.com/webpack-contrib/terser-webpack-plugin
const terserPlugin = new TerserPlugin({
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
});

const webpackConfigForNodeJs = {
    devtool: '(none)',
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        "server": resolvePath('source/server/index.ts')
    },
    output: {
        filename: '[name].js',
        path: resolvePath(distName()),
        chunkFilename: '[name].wm.js', //← `wm` - Webpack Module.
        publicPath: '/' + distName() //← konfiguracja zależna od środowiska jest na dole pliku ↓↓↓
    },
    module: {
        rules: [{
            //→ https://github.com/TypeStrong/ts-loader
            //→ https://webpack.js.org/guides/typescript/
            test: /\.tsx?$/,
            use: [{
                loader: 'ts-loader',
                options: {
                    configFile: resolvePath('tsconfig.nodejs.json')
                }
            }, preprocessLoaderObject],
            exclude: /(node_modules|bower_components)/
        },
        {
            //→ https://github.com/babel/babel-loader
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }, preprocessLoaderObject]
        }]
    },
    resolve: {
        modules: [resolvePath('source'), resolvePath('node_modules')],
        extensions: ['.ts', '.js'],
        alias: {}
    },
    optimization: {
        minimize: !!(processArgv.mode === 'production'),
        minimizer: [terserPlugin]
    }
}

const webpackConfigForWeb = {
    devtool: undefined, //→ https://webpack.js.org/configuration/devtool/
    target: 'web',
    entry: {
        // ↓ Kod JS/TS dla fornt-end-u i style SCSS.
        "app": [resolvePath('source/client/index.ts'), resolvePath('source/style/index.scss')]
    },
    output: {
        filename: '[name].js',
        path: resolvePath(distName()),
        chunkFilename: '[name].wm.js', //← `wm` - Webpack Module.
        publicPath: '/' + distName() //← konfiguracja zależna od środowiska jest na dole pliku ↓↓↓
    },
    module: {
        rules: [{
            //→ https://webpack.js.org/guides/typescript/
            test: /\.tsx?$/,
            use: [{
                loader: 'ts-loader',
                options: {
                    configFile: resolvePath('tsconfig.json')
                }
            }, preprocessLoaderObject],
            exclude: /(node_modules|bower_components)/
        },
        {
            //→ https://github.com/babel/babel-loader
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
        minimizer: [terserPlugin]
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

//→ https://webpack.js.org/concepts/mode/
if ((processArgv.mode === 'production') && (processArgv.forDEV !== true)) {

    //→ https://webpack.js.org/guides/public-path/
    webpackConfigForWeb.output.publicPath = '';
    webpackConfigForNodeJs.output.publicPath = '';

    //→ https://github.com/webpack-contrib/copy-webpack-plugin
    const CopyPlugin = require('copy-webpack-plugin');
    webpackConfigForWeb.plugins.push(new CopyPlugin([{
        from: resolvePath('assets'),
        to: resolvePath('dist')
    }]));
}

if (processArgv.watch === true) {
    //→ https://webpack.js.org/configuration/watch/
    webpackConfigForWeb.watchOptions = {
        aggregateTimeout: 300,
        poll: 1000
    }
}

if (processArgv.liveReload === true) {
    //→ https://www.npmjs.com/package/webpack-livereload-plugin
    const LiveReloadPlugin = require('webpack-livereload-plugin');
    webpackConfigForWeb.plugins.push(new LiveReloadPlugin({
        port: 35729,
        appendScriptTag: true,
        delay: 100
    }));
}

const webpackConfig = [];

if (processArgv.disableWeb !== true) {
    webpackConfig.push(webpackConfigForWeb);
}

if (processArgv.disableNodeJs !== true) {
    webpackConfig.push(webpackConfigForNodeJs);
}

module.exports = webpackConfig;