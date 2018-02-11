// Moduły:
const path = require('path');
const fse = require('fs-extra');
const webpack = require('webpack');
const WebpackOnBuildPlugin = require('on-build-webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const autoprefixer = require('autoprefixer');

function webpackConfigFactory(webpackEnv) {
    // Foldery:
    const dir = require('./lib/directories.js');

    // Odczyt i interpretacja zmiennych środowiskowych:
    const mergeEnv = require('./lib/mergeEnv.js');
    const ENVAR = mergeEnv({
        ENV: "DEV",
        DEBUG: false
    }, process.env, webpackEnv);

    // Dzięki tej funkcji do nazwy jest dodawane słowo "min", np: "app.min.js" dla wersji produkcyjnej:
    const nameResolve = require('./lib/nameResolve.js');


    // rzypisanie ustawień `preprocess-loader` do stałej:
    // - dokumentacja https://github.com/dearrrfish/preprocess-loader
    const preprocessLoaderStr = 'preprocess-loader?' + JSON.stringify(ENVAR);
    const preprocessLoaderObject = {
        loader: preprocessLoaderStr
    }


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


    // Przypisanie ustawień `ts-loader` do stałej:
    // - https://github.com/TypeStrong/ts-loader
    const tsLoaderObject = {
        loader: 'ts-loader',
        options: {
            configFile: 'tsconfig.json'
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


    // Przypisanie ustawień `css-loader` do stałej: 
    // - https://github.com/webpack-contrib/css-loader
    const cssLoaderObject = {
        loader: "css-loader",
        options: {
            url: false,
            import: true
        }
    }


    // Przypisanie ustawień `postcss-loader` do stałej: 
    // - https://github.com/postcss/postcss-loader
    const postcssLoaderObject = {
        loader: "postcss-loader",
        options: {
            ident: 'postcss',
            plugins: (loader) => [
                // Wtyczka "Autoprefixer" dla narzędzia "PostCSS":
                // - https://github.com/postcss/autoprefixer
                autoprefixer({
                    // Biblioteka "Browserslist" używana we wtyczce "Autoprefixer":
                    // - https://github.com/ai/browserslist#queries
                    browsers: ["last 2 versions", "last 5 Chrome versions", "Firefox ESR", "last 2 major versions"]
                })
            ]
        }
    }


    // Wyodrębnione pliki przy pomocy wtyczki `ExtractTextPlugin`:
    const extractCSS = new ExtractTextPlugin({
        filename: (getPath) => {
            return getPath(nameResolve('[name]', 'css', ENVAR));
        }
    });


    // Konfiguracja dla Webpack'a:
    // - dokumentacja https://webpack.js.org/configuration/
    var webpackConfig = {
        context: dir.source,
        entry: {
            'app/main': './index.ts'
        },
        output: {
            path: dir.build,
            filename: nameResolve('[name]', 'js', ENVAR),
            chunkFilename: nameResolve('[name]', 'js', ENVAR),
            // Pole `chunkFilename` jest wykorzystywane przez 'bundle-loader'
            // - https://github.com/webpack-contrib/bundle-loader
            publicPath: ""
        },
        module: {
            rules: [{
                /* WAŻNE !!!

                Jedna reguła która zawiera listę reguł `oneOf`.

                Lista reguł `oneOf` działa w następujący sposób:
                - lista jest analizowana od początku do końca (od góry w dół)
                - po pierwszym dopasowaniu pliku do reguły następuje przetworzenie treści pliku przez loader'y, a następnie zakończenie działania i przejście do następnego pliku.

                Działa to odwrotnie niż reguły na liście `rules`. Reguły na liście `rules` są przetwarzane od końca do początku (z dołu w górę), a dopasowanie pliku do reguły nie przerywa działania "pętli", tylko wynik (po przetworzeniu treści pliku przez loader'y danej reguły) jest przekazywany do następnej pasującej reguły jako dane wejściowe.
                */
                oneOf: [{
                        // TypeScript:
                        test: /\.tsx?$/,
                        use: [
                            uglifyLoaderObject,
                            babelLoaderObject,
                            tsLoaderObject,
                            preprocessLoaderObject,
                            skeletonLoaderObject
                        ]
                    },
                    {
                        // Przetwarzanie pliku `config.js`:
                        include: path.resolve(dir.source, "config.js"),
                        use: [{
                                loader: 'file-loader',
                                options: {
                                    name: nameResolve('[name]', '[ext]', ENVAR)
                                }
                            },
                            uglifyLoaderObject,
                            preprocessLoaderObject,
                            skeletonLoaderObject
                        ],
                    },
                    {
                        // Wczytanie pliku o końcówce `.raw.js` jako zwykły plik tekstowy:
                        test: /\.raw\.js$/,
                        use: [{
                                loader: 'raw-loader'
                            },
                            uglifyLoaderObject,
                            babelLoaderObject,
                            preprocessLoaderObject,
                            skeletonLoaderObject
                        ]
                    },
                    {
                        // JavaScript ( ES5 / ES2015 / ES6 ):
                        test: /(\.es6\.js|\.es5\.js|\.js)$/,
                        use: [
                            uglifyLoaderObject,
                            babelLoaderObject,
                            preprocessLoaderObject,
                            skeletonLoaderObject
                        ],
                    },
                    {
                        // Style CSS:
                        test: /\.css$/,
                        use: extractCSS.extract({
                            fallback: "style-loader",
                            use: [cssLoaderObject, postcssLoaderObject]
                        }),
                    },
                    {
                        // Style SASS:
                        // - https://github.com/webpack-contrib/sass-loader
                        test: /\.sass$/,
                        use: extractCSS.extract({
                            fallback: "style-loader",
                            use: [
                                cssLoaderObject,
                                postcssLoaderObject,
                                {
                                    loader: "sass-loader?outputStyle=expanded&indentedSyntax"
                                }
                            ]
                        })
                    },
                    {
                        // Style SCSS:
                        test: /\.scss$/,
                        use: extractCSS.extract({
                            fallback: "style-loader",
                            use: [
                                cssLoaderObject,
                                postcssLoaderObject,
                                {
                                    loader: "sass-loader?outputStyle=expanded"
                                }
                            ]
                        })
                    },
                    {
                        // Style LESS:
                        // - https://github.com/webpack-contrib/less-loader
                        test: /\.less$/,
                        use: extractCSS.extract({
                            fallback: "style-loader",
                            use: [
                                cssLoaderObject,
                                postcssLoaderObject,
                                {
                                    loader: "less-loader"
                                }
                            ]
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
                        use: [{
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
                        use: [{
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
                        include: [path.resolve(dir.source)], // <- lista dodatkowych reguł, które muszą zostać spełnione
                        exclude: [
                            path.resolve(dir.source, "templates"),
                            /\.tpl\.\w*$/
                        ], // <- lista dodatkowych reguł, które NIE mogą zostać spełnione
                        use: [{
                                loader: 'file-loader',
                                options: {
                                    name: "[path]" + nameResolve('[name]', 'html', ENVAR),
                                    context: dir.source
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
            }]
        },
        resolve: {
            modules: [dir.source, dir.nm, dir.bc],
            extensions: [".tsx", ".ts", ".es6.js", ".es5.js", ".js", ".css", ".sass", ".scss", ".json", ".xml"]
        },
        plugins: [
            extractCSS
        ]
    }


    // Optymalizacja i minimalizacja kodu:
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
    }

    return webpackConfig;
}

// Eksport konfiguracji dla Webpack'a:
module.exports = webpackConfigFactory;