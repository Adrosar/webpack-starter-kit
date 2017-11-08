
const path = require('path');
const cp = require('child_process');

const projectDir = path.resolve(__dirname, "..");
const testPhantomJS = path.resolve(projectDir, "test", "phantom.js")
const command = `phantomjs "${testPhantomJS}" "http://127.0.0.1:8080/runTest.html"`;

console.log(`\n### Run TEST in PhantomJS`);
console.log(`$> ${command}\n`);

cp.exec(command, {
    cwd: projectDir
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
})
