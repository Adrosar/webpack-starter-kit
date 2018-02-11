#!/usr/bin/env node

const path = require('path');
const cp = require('child_process');
const dir = require('../lib/directories.js');
const testPhantomJS = path.resolve(dir.root, "test", "phantom.js")
const command = `phantomjs "${testPhantomJS}" "http://127.0.0.1:8080/runTest.html"`;

console.log(`\n### Run TEST in PhantomJS`);
console.log(`$> ${command}\n`);

cp.exec(command, {
    cwd: dir.root
}, function (error, stdout, stderr) {
    if (!!error) {
        throw error;
    }

    stdout = ("" + stdout).trim();
    if (!!stdout) {
        console.log(stdout);
    }

    stderr = ("" + stderr).trim();
    if (!!stderr) {
        console.log(stderr);
    }
});