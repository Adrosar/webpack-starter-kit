'use strict';

const path = require('path');

module.exports = function resolvePath(_name) {
    if (typeof _name !== 'string') {
        _name = '';
    }

    if ((typeof _name === 'string') && (_name.length > 0)) {
        return path.resolve(__dirname, '..', _name);
    }

    return path.resolve(__dirname, '..');
}