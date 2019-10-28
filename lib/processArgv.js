'use strict';

const params = {};

for (let i = 0; i < process.argv.length; i++) {
    const key = process.argv[i];
    const value = process.argv[i + 1];

    switch (key) {
        case '--mode':
            params['mode'] = value;
            break;

        case '--config':
            params['config'] = value;
            break;

        case '--watch':
            params['watch'] = true;
            break;

        case '--liveReload':
            params['liveReload'] = true;
            break;

        case '--forDEV':
            params['forDEV'] = true;
            break;

        case '--disableWeb':
            params['disableWeb'] = true;
            break;

        case '--disableNodeJs':
            params['disableNodeJs'] = true;
            break;

        default:
            break;
    }
}

module.exports = params;