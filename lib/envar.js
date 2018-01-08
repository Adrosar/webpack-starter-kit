// Moduły:
const fs = require('fs');
const path = require('path');

// Biblioteki własne:
const dir = require('./directories.js');

// Stała `ENVAR` do której zostają przypisane wartości zmiennych środowiskowych:
const ENVAR = {// Environment Variables => ENVAR :)

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

    ENV: (() => {// <- możliwe wartości: DEV, PROD, TEST
        if (typeof process.env['ENV'] === "undefined") {
            return "DEV";
        } else {
            if ("|DEV|TEST|PROD|".indexOf(process.env['ENV'] + "") === -1) {
                return "DEV";
            }

            return process.env['ENV'];
        }
    })(),

    VER: (() => {
        if (typeof process.env['VER'] !== "undefined") {
            return ("" + process.env['VER']);
        } else {

            var packageString = fs.readFileSync(path.resolve(dir.root, 'package.json'), {
                encoding: null,
                flag: "r"
            });

            var packageObject = JSON.parse(packageString.toString());
            var version = ("" + packageObject['version']).trim();

            return version;
        }
    })()

}

// Eksport:
module.exports = ENVAR;