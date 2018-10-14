const path = require('path');
const fs = require('fs');
const dir = require('./directories');

/**
 * Użycie:
 * ```
 * const getPackageJSON = require('./getPackageJSON.js');
 * const package = getPackageJSON();
 * ```
 */
module.exports = function () {
    const packageString = fs.readFileSync(path.resolve(dir.root, 'package.json'), {
        encoding: null,
        flag: "r"
    });

    return JSON.parse(packageString.toString());
}