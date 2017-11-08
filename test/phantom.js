/*
Aplikacja dla PhantomJS, która uruchamia stronę HTML w środowisku przeglądarki.

Polecenie:

    phantomjs TEN_PLIK ADRES_URL

*/

const system = require('system');

var linkToPage = null;
if (typeof system.args[1] === "string") {
    linkToPage = system.args[1].trim();

    if (!!linkToPage) {
        const page = require('webpage').create();

        page.onConsoleMessage = function (msg, lineNum, sourceId) {
            console.log("[PhantomJS] " + msg);
        };

        page.onError = function (msg, trace) {
            console.log("--- -- -");
            console.log("[PhantomJS]", msg);

            for (var key in trace) {
                if (trace.hasOwnProperty(key)) {
                    var item = trace[key];
                    console.log("[PhantomJS]    " + item.file + ": " + item.line);
                }
            }

            console.log("--- -- -");
        };

        page.open(linkToPage, function (status) {
            console.log("\n[PhantomJS] " + status);
            phantom.exit();
        });
    }
}
