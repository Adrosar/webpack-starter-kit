// Moduły:
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

// Biblioteki własne:
const dir = require('./lib/directories.js');
const mergeEnv = require('./lib/mergeEnv.js');
const nameResolve = require('./lib/nameResolve.js');
const getPackageJSON = require('./lib/getPackageJSON.js')

// Stałe:
const packageJSON = getPackageJSON();

// ...
function webpackConfigFactory(webpackEnv) {

    // Odczyt i interpretacja zmiennych środowiskowych:
    const ENVAR = mergeEnv({
        ENV: "DEV", // DEV, PROD, TEST
        DEBUG: false, // true, false
        MIN: 0 // 0, 1, 2
    }, process.env, webpackEnv);


    // rzypisanie ustawień `preprocess-loader` do stałej:
    // - dokumentacja https://github.com/dearrrfish/preprocess-loader
    const preprocessLoaderStr = 'preprocess-loader?' + JSON.stringify(ENVAR);
    const preprocessLoaderObject = {
        loader: preprocessLoaderStr
    }


    // Uruchomienie `html-minify-loader` w zależności od środowiska:
    var htmlMinifyLoaderStr;

    if (ENVAR.MIN > 0) {
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
                ["env", {
                    "loose": true,
                    "targets": {
                        "browsers": ["last 3 versions", "safari >= 7", "ie >= 9"]
                    }
                }]
            ],
            plugins: []
        }
    }

    if (ENVAR.MIN > 0) {
        // Wtyczki mogą powodować błędy w kodzie wynikowym ze względu na przekształcenia, które wykonują na kodzie źródłowym.
        // Dlatego jeżeli TWÓJ projekt się nie kompiluje to za-komentuj TĄ sekcję. 
        babelLoaderObject.options.plugins = ["transform-minify-booleans", "transform-property-literals", "transform-regexp-constructors", "minify-replace", "minify-type-constructors", ["minify-mangle-names", {
            keepFnName: true
        }]]
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

    if (ENVAR.MIN > 0) {
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
    const webpackConfig = {
        context: dir.source,
        entry: {
            "app/album-1": "./entry/album-1.ts",
            "app/album-2": "./entry/album-2.ts",
            "app/album-3": "./entry/album-3.ts"
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
                            tsLoaderObject,
                            preprocessLoaderObject
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
                            preprocessLoaderObject
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
                            preprocessLoaderObject
                        ]
                    },
                    {
                        // JavaScript ( ES5 / ES2015 / ES6 ):
                        test: /(\.es6\.js|\.es5\.js|\.js)$/,
                        use: [
                            uglifyLoaderObject,
                            babelLoaderObject,
                            preprocessLoaderObject
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
                        // Kopiowanie plików HTML nie będących szablonami:
                        test: /\.html$/,
                        include: [path.resolve(dir.source, 'html')], // <- lista dodatkowych reguł, które muszą zostać spełnione
                        use: [{
                                loader: 'file-loader',
                                options: {
                                    name: nameResolve('[name]', 'html', ENVAR),
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
                    },
                    {
                        // Wczytuję pliki jako surowe dane.
                        // Są one przypisywane do zmiennej.
                        // Przykład użycia: `var data = require("index.html")`
                        // - https://github.com/webpack-contrib/raw-loader
                        test: /\.(html|mustache|handlebars)?/,
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
                    }
                ]
            }]
        },
        resolve: {
            modules: [dir.source, dir.nm, dir.bc],
            extensions: [".tsx", ".ts", ".es6.js", ".es5.js", ".js", ".css", ".sass", ".scss", ".json", ".xml", ".html"]
        },
        plugins: [
            extractCSS,
            new webpack.optimize.CommonsChunkPlugin({
                name: "app/commons",
                chunks: ["app/album-1", "app/album-2", "app/album-3"]
            })
        ]
    }

    // Włączam generowanie "sourcemaps":
    if (ENVAR.ENV === "DEV" && ENVAR.MIN === 0) {
        webpackConfig.devtool = 'source-map';
    }

    // Dla środowiska produkcyjnego ustawiam wyjściowy katalog na `/dist`:
    if (ENVAR.ENV === "PROD") {
        webpackConfig.output.path = dir.dist
    }

    // Dla środowiska testowego ustawiam jako plik wejścia, plik z testami jednostkowymi:
    if (ENVAR.ENV === "TEST") {
        webpackConfig.entry = {
            "test": "./test/index.ts"
        }
    }


    // Optymalizacja i minimalizacja kodu:
    if (ENVAR.MIN > 0) {

        // Dodaję wtyczkę `NoEmitOnErrorsPlugin`:
        webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());

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