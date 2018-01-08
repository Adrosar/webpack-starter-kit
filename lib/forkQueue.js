/**
 * Funkcja `forkQueue` uruchamia kolejno pliki `*.js` jako nowe procesy.
 * @param {Array<string>} queue 
 * @param {Function} done 
 */
function forkQueue(queue, done = null) {
    if (queue instanceof Array) {
        const cp = require('child_process');

        var list = [];
        var index = 0;

        var next = function () {
            const jsFile = queue[index];

            list[index] = cp.fork(jsFile);

            list[index].on('close', function () {
                index = index + 1;

                if (index < queue.length) {
                    next();
                } else {
                    if (typeof done === "function") {
                        done();
                    }
                }
            });
        }

        if (index === 0) {
            next();
        }
    } else {
        throw new Error("forkQueue: queue must type Array!");
    }
}

// Eksport:
module.exports = forkQueue;