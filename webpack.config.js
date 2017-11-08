
// Moduły:
const path = require('path');
const fse = require('fs-extra');
const webpack = require('webpack');
const WebpackOnBuildPlugin = require('on-build-webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


// Foldery:
const dir = {
    source: path.resolve(__dirname, 'source'),
    build: path.resolve(__dirname, 'build'),
    dist: path.resolve(__dirname, 'dist'),
    assets: path.resolve(__dirname, 'assets'),
    nm: path.resolve(__dirname, 'node_modules'),
    bc: path.resolve(__dirname, 'bower_components')
}


// Zmienne środowiskowe:
const ENVAR = {// Environment Variables => ENVAR :)
    // Odczyt i interpretacja zmiennej `DEBUG`:
    DEBUG: (() => {
        if (typeof process.env['DEBUG'] === "undefined") {
            return false;
        } else {
            if ("|0|false|FALSE|".indexOf(process.env['DEBUG'] + "") >= 0) {
                return false;
            }

            return true;
        }
    })(),
    // Odczyt i interpretacja zmiennej `ENV`:
    // Możliwe wartości: DEV, PROD, TEST
    ENV: (() => {
        if (typeof process.env['ENV'] === "undefined") {
            return "DEV";
        } else {
            if ("|DEV|TEST|PROD|".indexOf(process.env['ENV'] + "") === -1) {
                return "DEV";
            }

            return process.env['ENV'];
        }
    })()
}


// Stałe środowiskowe dla `preprocess-loader`:
// - dokumentacja https://github.com/dearrrfish/preprocess-loader
const preprocessLoaderStr = 'preprocess-loader?' + JSON.stringify(ENVAR);


// Uruchomienie `html-minify-loader` w zależności od środowiska:
var htmlMinifyLoaderStr;

if (ENVAR.ENV === "PROD") {
    htmlMinifyLoaderStr = 'html-minify-loader';
} else {
    // https://github.com/alex-shnayder/do-nothing-loader
    htmlMinifyLoaderStr = 'do-nothing-loader';
}


// Przypisanie ustawień `babel-loader` do stałej:
// - https://github.com/babel/babel-loader
const babelLoaderObject = {
    loader: 'babel-loader',
    options: {
        presets: [
            "es2015",
            "stage-0"
        ]
    }

}


// Uruchomienie `uglify-loader` w zależności od środowiska:
// - https://github.com/bestander/uglify-loader
var uglifyLoaderObject;

if (ENVAR.ENV === "PROD") {
    uglifyLoaderObject = {
        loader: 'uglify-loader',
        options: {
            unsafe: true,
            mangle: true
        }
    }
} else {
    uglifyLoaderObject = {
        loader: 'do-nothing-loader'
    }
}


// Przypisanie ustawień `skeleton-loader` do stałej: 
// - https://github.com/anseki/skeleton-loader
const skeletonLoaderObject = {
    loader: 'skeleton-loader',
    options: {
        procedure: function (content) {

            // Każda linia która kończy się poleceniem `//@DEL` zostaje usunięta
            content = ("" + content).replace(/.+\/\/@DEL/gm, "");

            if (ENVAR.ENV === "DEV") {
                // Składnia: `//@DEV xyz` wstawia do kodu `xyz` dla wersji DEV.
                content = ("" + content).replace(/\/\/@DEV\s+(.+)/gm, "$1");
            }

            if (ENVAR.ENV === "PROD") {
                // Składnia: `//@PROD xyz` wstawia do kodu `xyz` dla wersji PROD.
                content = ("" + content).replace(/\/\/@PROD\s+(.+)/gm, "$1");
            }

            if (ENVAR.DEBUG === true) {
                // Składnia: `//@DEBUG xyz` wstawia do kodu `xyz`,
                // jeżeli zmienna środowiskowa `DEBUG` jest ustawiona na `true`.
                content = ("" + content).replace(/\/\/@DEBUG\s+(.+)/gm, "$1");
            }

            return content;
        }
    }
}


// Wyodrębnione pliki przy pomocy wtyczki `ExtractTextPlugin`:
const extractCSS = new ExtractTextPlugin('[name].css');


// Konfiguracja dla Webpack 2.x
// - dokumentacja https://webpack.js.org/configuration/
var webpackConfig = {
    context: dir.source,
    entry: {
        'app/index': './index.ts'
    },
    output: {
        path: dir.build,
        filename: "[name].js",
        chunkFilename: 'app/[name].js',// <- Wykorzystywane przez 'bundle-loader'.
        publicPath: ""
    },
    module: {
        rules: [
            {
                /* WAŻNE !!!
                
                Jedna reguła która zawiera listę reguł `oneOf`.
                
                Lista reguł `oneOf` działa w następujący sposób:
                - lista jest analizowana od początku do końca (od góry w dół)
                - po pierwszym dopasowaniu pliku do reguły następuje przetworzenie treści pliku przez loader'y, a następnie zakończenie działania i przejście do następnego pliku.
        
                Działa to odwrotnie niż reguły na liście `rules`. Reguły na liście `rules` są przetwarzane od końca do początku (z dołu w górę), a dopasowanie pliku do reguły nie przerywa działania "pętli", tylko wynik (po przetworzeniu treści pliku przez loader'y danej reguły) jest przekazywany do następnej pasującej reguły jako dane wejściowe.
                */
                oneOf: [
                    {
                        // TypeScript:
                        test: /\.tsx?$/,
                        use: [
                            uglifyLoaderObject,
                            babelLoaderObject,
                            {
                                loader: 'ts-loader',
                                options: {
                                    configFile: 'tsconfig.json'
                                }
                            },
                            {
                                loader: preprocessLoaderStr
                            },
                            skeletonLoaderObject
                        ]
                    },
                    {
                        // Przetwarzanie pliku `config.js`:
                        include: path.resolve(dir.source, "config.js"),
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: "[name].[ext]"
                                }
                            },
                            uglifyLoaderObject,
                            {
                                loader: preprocessLoaderStr
                            },
                            skeletonLoaderObject
                        ],
                    },
                    {
                        // Wczytanie pliku o końcówce `.raw.js` jako zwykły plik tekstowy:
                        test: /\.raw\.js$/,
                        use: [
                            {
                                loader: 'raw-loader'
                            },
                            uglifyLoaderObject,
                            babelLoaderObject,
                            {
                                loader: preprocessLoaderStr
                            },
                            skeletonLoaderObject
                        ]
                    },
                    {
                        // JavaScript ( ES5 / ES2015 / ES6 ):
                        test: /(\.es6\.js|\.es5\.js|\.js)$/,
                        use: [
                            uglifyLoaderObject,
                            babelLoaderObject,
                            {
                                loader: preprocessLoaderStr
                            },
                            skeletonLoaderObject
                        ],
                    },
                    {
                        // Style CSS:
                        test: /\.css$/,
                        use: extractCSS.extract({
                            fallback: "style-loader",
                            use: "css-loader"
                        }),
                    },
                    {
                        // Style SASS:
                        // - https://github.com/webpack-contrib/sass-loader
                        test: /\.sass$/,
                        use: extractCSS.extract({
                            fallback: "style-loader",
                            use: "css-loader!sass-loader?outputStyle=expanded&indentedSyntax"
                        })
                    },
                    {
                        // Style SCSS:
                        test: /\.scss$/,
                        use: extractCSS.extract({
                            fallback: "style-loader",
                            use: "css-loader!sass-loader?outputStyle=expanded"
                        })
                    },
                    {
                        // Style LESS:
                        // - https://github.com/webpack-contrib/less-loader
                        test: /\.less$/,
                        use: extractCSS.extract({
                            fallback: "style-loader",
                            use: "css-loader!less-loader"
                        })
                    },
                    {
                        // Obrazki jako Base64:
                        // -https://www.npmjs.com/package/base64-image-loader
                        test: /\.(jpg|png|gif)$/gm,
                        loader: 'base64-image-loader'
                    },
                    {
                        // JSON:
                        // - https://github.com/webpack-contrib/json-loader
                        test: /\.json$/,
                        loader: 'json-loader'
                    },
                    {
                        // XML:
                        // - https://github.com/gisikw/xml-loader
                        test: /\.xml$/,
                        loader: 'xml-loader'
                    },
                    {
                        // Wczytuję pliki html i mustache jako surowe dane.
                        // Są one przypisywane do zmiennej.
                        // Przykład użycia: `var data = require("index.html")`
                        // - https://github.com/webpack-contrib/raw-loader
                        test: /\.(html|mustache)?/,
                        include: [path.resolve(dir.source, "templates")],
                        use: [
                            {
                                loader: 'raw-loader'
                            },
                            {
                                loader: htmlMinifyLoaderStr
                            },
                            {
                                loader: preprocessLoaderStr
                            }
                        ]
                    },
                    {
                        test: /\.tpl\.\w*$/,
                        use: [
                            {
                                loader: 'raw-loader'
                            },
                            {
                                loader: htmlMinifyLoaderStr
                            },
                            {
                                loader: preprocessLoaderStr
                            }
                        ]
                    },
                    {
                        // Kopiowanie plików HTML nie będących szablonami:
                        test: /\.html$/,
                        include: [path.resolve(dir.source)],// <- lista dodatkowych reguł, które muszą zostać spełnione
                        exclude: [
                            path.resolve(dir.source, "templates"),
                            /\.tpl\.\w*$/
                        ],// <- lista dodatkowych reguł, które NIE mogą zostać spełnione
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: "[name].[ext]"
                                }
                            },
                            {
                                loader: htmlMinifyLoaderStr
                            },
                            {
                                loader: preprocessLoaderStr
                            }
                        ]
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: [dir.source, dir.nm, dir.bc],
        extensions: [".tsx", ".ts", ".es6.js", ".es5.js", ".js", ".css", ".sass", ".scss", ".json", ".xml"]
    },
    plugins: [
        extractCSS
    ]
}


// Optymalizacja i minimalizacja kodu dla wersji produkcyjnej (dystrybucji):
if (ENVAR.ENV === "PROD") {
    // Dodaję wtyczkę `NoErrorsPlugin`:
    webpackConfig.plugins.push(new webpack.NoErrorsPlugin());

    // Dodaję wtyczkę `OccurrenceOrderPlugin`:
    webpackConfig.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());

    // Dodaję wtyczkę `AggressiveMergingPlugin`:
    webpackConfig.plugins.push(new webpack.optimize.AggressiveMergingPlugin());

    // Dodaję wtyczkę `UglifyJsPlugin`:
    // - dokumentacja https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
            warnings: true,
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            screw_ie8: true
        },
        output: {
            comments: false,
        },
        exclude: [/\.min\.js$/]
    }));

    // Dodaje wtyczkę `BundleAnalyzerPlugin`
    // - https://github.com/th0r/webpack-bundle-analyzer
    webpackConfig.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8888,
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info'
    }));

    // Wtyczka `WebpackOnBuildPlugin` uruchamia funkcję zwrotną (callback) po tym jak `webpack` zbuduje aplikacje:
    // - https://github.com/kossnocorp/on-build-webpack
    webpackConfig.plugins.push(new WebpackOnBuildPlugin(function (stats) {

        // 1) Kopiowanie plików z katalogu `build` do katalogu `dist`:
        try {
            fse.copySync(dir.build, dir.dist);
        } catch (err) {
            throw err;
        }

        // 2) Kopiowanie plików z katalogu `assets` do katalogu `dist/assets`:
        try {
            fse.copySync(dir.assets, path.join(dir.dist, 'assets'));
        } catch (err) {
            throw err;
        }

    }));

}


// Czynności wykonywane jednorazowo przed zbudowaniem aplikacji przez Webpack'a:

// 1) Czyszczę pliki i foldery z katalogu "build":
fse.emptyDirSync(dir.build);

if (ENVAR.ENV === "PROD") {
    // 1a) Czyszczę pliki i foldery z katalogu `dist`:
    fse.emptyDirSync(dir.dist);
}


// Eksport konfiguracji dla Webpack'a 2.x:
module.exports = webpackConfig;