console.log("-- Distribute --");

const path = require('path');

const binDir = path.resolve(__dirname);
process.chdir(binDir);

const forkQueue = require('../lib/forkQueue.js')
forkQueue(['clear.js', 'build.js', 'minimize.js', 'copy.js'], function () {
    console.log("-- Done --");
});