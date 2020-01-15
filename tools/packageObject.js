'use strict';

const fs = require('fs');
const resolvePath = require('./resolvePath');
module.exports = JSON.parse(fs.readFileSync(resolvePath('package.json'), 'utf8'));