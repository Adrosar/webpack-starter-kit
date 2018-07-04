#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const getConfig = require('./getConfig');
const dir = require('./directories');

function readFile(file) {
    const fullname = path.resolve(dir.root, file);

    const text = fs.readFileSync(fullname, {
        encoding: "utf8",
        flag: "r"
    });

    return "\n" + "// > " + file + "\n" + text;
}

function run(config) {
    if (config.rules instanceof Array) {
        for (let i = 0; i < config.rules.length; i++) {
            const rule = config.rules[i];

            const output = rule.output || "__bundle.js";
            const files = rule.files || [];
            const mode = rule.mode || "merge";

            let buffer = "";

            if (mode === "after") {
                buffer = buffer + readFile(output);
            }

            for (let j = 0; j < files.length; j++) {
                buffer = buffer + readFile(files[j]);
            }

            if (mode === "before") {
                buffer = buffer + readFile(output);
            }

            const fulloutput = path.resolve(dir.root, output);

            fs.writeFileSync(fulloutput, buffer.toString('utf8'), {
                encoding: 'utf8',
                mode: 0o666,
                flag: 'w'
            });
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