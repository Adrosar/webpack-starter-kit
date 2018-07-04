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

function init() {
    let config = undefined;

    for (let i = 0; i < process.argv.length; i++) {
        const arg = process.argv[i];
        const next = process.argv[i + 1];

        if (arg === "--config") {
            config = next;
        }
    }

    if (typeof config === "undefined") {
        throw "[Error] Brak parametru `--config <string>` !!!";
    }

    if (!(typeof config === "string" && config.length > 0)) {
        throw "[Error] Niepoprawny parametr `--config <string>` !!!";
    }

    run(getConfig(config));
}

init();