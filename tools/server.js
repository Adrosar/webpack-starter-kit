
// Moduły:
const path = require('path');
const express = require('express');
const serveIndex = require('serve-index')


// Ustawienia:
const port = 8080;


// Katalogi:
const projectDir = path.resolve(__dirname, '..');
const dir = {
    test: path.resolve(projectDir, 'test'),
    build: path.resolve(projectDir, 'build'),
    web: path.resolve(projectDir, 'web'),
    assets: path.resolve(projectDir, 'assets'),
    bc: path.resolve(projectDir, 'assets'),
    nw: path.resolve(projectDir, 'assets'),
}


// Aplikacja:
const app = express();

const staticOptions = {
    etag: false,
    maxAge: 86400
};

app.use('/', express.static(dir.build, staticOptions));
app.use('/', express.static(dir.assets, staticOptions));
app.use('/', express.static(dir.web, staticOptions));

app.use('/spec', express.static(path.resolve(dir.test, 'spec'), staticOptions));
app.use('/', express.static(path.resolve(dir.test, 'assets'), staticOptions));

app.use('/', serveIndex(dir.web, {
    'icons': true
}));

app.all('/runTest.html', function (req, res, next) {
    res.sendFile(path.resolve(dir.test, 'runTest.html'));
});

app.listen(port, function () {
    console.log('Example app listening on port ' + port + ' !');
})
