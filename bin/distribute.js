
const path = require('path');
const projectDir = path.resolve(__dirname, "..");
const webpackExec = path.resolve(projectDir, "node_modules", "webpack", "bin", "webpack.js");
process.chdir(projectDir);
process.env["ENV"] = "PROD";
process.env["DEBUG"] = 0;
process.argv.push("--optimize-minimize");
process.argv.push("--display-chunks");
require(webpackExec);
