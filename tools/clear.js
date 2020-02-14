#!/usr/bin/env node
'use strict';

const fse = require('fs-extra');
const resolvePath = require('./resolvePath');

fse.removeSync(resolvePath('dist'));
fse.removeSync(resolvePath('docs'));
