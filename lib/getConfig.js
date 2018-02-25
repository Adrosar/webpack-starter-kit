const path = require('path');
const dir = require('./directories');

module.exports = function (configName) {
    const config = require(path.resolve(dir.root, "config.js"));

    if (typeof config[configName] === "object") {
        return config[configName];
    }

    throw new Error('The "' + configName + '" configuration was not found in the "config.js" file!');
}