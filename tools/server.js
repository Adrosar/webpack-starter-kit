
// Moduły:
const express = require('express');
const app = express();


// Ustawienia:
const port = 8080;


// Aplikacja:
var staticOptions = {
    etag: false,
    maxAge: 86400
};

app.use('/', express.static('build', staticOptions));
app.use('/', express.static('web', staticOptions));
app.use('/assets', express.static('assets', staticOptions));
app.use('/assets', express.static('bower_components', staticOptions));


app.listen(port, function () {
    console.log('Example app listening on port ' + port + ' !');
})
