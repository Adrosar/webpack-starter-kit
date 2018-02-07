#!/usr/bin/env node

const path = require('path');
const dir = require('../lib/directories.js');
const webpackExec = path.resolve(dir.root, "node_modules", "webpack", "bin", "webpack.js");
process.chdir(dir.root);
process.env["ENV"] = "PROD";
process.env["DEBUG"] = 0;
process.argv.push("--optimize-minimize");
process.argv.push("--display-chunks");
require(webpackExec);