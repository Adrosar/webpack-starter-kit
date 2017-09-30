
const path = require('path');
const projectDir = path.resolve(__dirname, "..");
const serverExec = path.resolve(projectDir, "tools", "server.js");
process.chdir(projectDir);
process.env["DEBUG"] = "express:*";
require(serverExec);
