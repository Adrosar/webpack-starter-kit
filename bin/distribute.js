#!/usr/bin/env node

const path = require('path');
const dir = require('../lib/directories.js');

process.chdir(dir.bin);

const forkQueue = require('../lib/forkQueue.js');

forkQueue(['clear.js', 'build.js', 'minimize.js', 'copy.js'], function () {
    console.log("-- Done --");
});