@ECHO OFF

:: Skrypt `required.cmd` dodaje i instaluje wymagane moduły przy pomocy NPM,
:: a następnie uruchamia polecenie `yarn install` w celu wygenerowania pliku "yarn.lock".

:: Przed uruchomieniem skryptu należy usunąć:
:: - folder "node_modules"
:: - plik "package-lock.json"
:: - plik "yarn.lock"
:: - w pliku "package.json" sekcję `dependencies` i `devDependencies`

echo --STATR--

npm install express@~4.16.3 serve-index@~1.9.1 && npm install --save-dev @types/jquery@~2.0.49 @types/node@~8.9.4 autoprefixer@~7.2.6 babel-core@~6.26.0 babel-loader@~7.1.4 babel-preset-env@~1.6.1 babel-preset-es2015@~6.24.1 babel-preset-stage-0@~6.24.1 babel-plugin-minify-mangle-names@0.4.3 babel-plugin-minify-replace@~0.4.3 babel-plugin-minify-type-constructors@~0.4.3 babel-plugin-transform-minify-booleans@~6.9.4 babel-plugin-transform-property-literals@~6.9.4 babel-plugin-transform-regexp-constructors@~0.4.3 base64-image-loader@~1.2.1 bundle-loader@~0.5.6 css-loader@~0.28.10 do-nothing-loader@~1.0.0 extract-text-webpack-plugin@~3.0.2 file-loader@~1.1.11 fs-extra@~5.0.0 html-minify-loader@~1.3.0 json-loader@~0.5.7 less@~3.0.0 less-loader@~4.0.6 node-sass@~4.7.2 postcss-loader@~2.1.1 preprocess-loader@~0.2.2 raw-loader@~0.5.1 sass-loader@~6.0.7 style-loader@~0.20.2 ts-loader@~3.5.0 typescript@~2.9.2 uglify-loader@~2.0.0 webpack@~3.12.0 xml-loader@~1.2.1 typedoc@~0.11.1 && yarn install

echo --DONE--