#!/usr/bin/env node

const fse = require('fs-extra');
const path = require('path');
const getConfig = require('./getConfig');
const dir = require('./directories');

function run(config) {
    if (config.rules instanceof Array) {
        for (let i = 0; i < config.rules.length; i++) {

            const source = path.resolve(dir.root, config.rules[i].source);
            const destiny = path.resolve(dir.root, config.rules[i].destiny);

            try {
                fse.copySync(source, destiny);
            } catch (err) {
                throw err;
            }
        }
    }
}

for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === "--config") {
        return run(getConfig(process.argv[i + 1]));
    }
}