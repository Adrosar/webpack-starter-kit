#!/usr/bin/env node

const path = require('path');
const dir = require('../lib/directories.js');
const serverExec = path.resolve(dir.root, "lib", "server.js");
process.chdir(dir.root);
process.env["DEBUG"] = "express:*";
require(serverExec);