'use strict';

const processArgv = require('./processArgv');
const packageObject = require('./packageObject');

module.exports = function distName(_file) {
    let name = "";

    if (typeof _file !== 'string') {
        _file = "";
    }

    if ((processArgv.mode === 'development') || (processArgv.forDEV === true)) {
        name = 'dist/' + packageObject.name + '/dev/' + _file;
    } else {
        name = 'dist/' + packageObject.name + '/' + packageObject.version + '/' + _file;
    }

    return name;
}