function transform(map) {
    var buffer = {};

    for (const key in map) {
        if (map.hasOwnProperty(key)) {

            const value = map[key] + "";
            const name = (key + "").trim();

            if (name === "MIN") {
                buffer[name] = Math.floor(value);
            } else {
                if (value === "0") {
                    buffer[name] = false;
                } else if (value === "1") {
                    buffer[name] = true;
                } else if (value.toLowerCase() === "false") {
                    buffer[name] = false;
                } else if (value.toLowerCase() === "true") {
                    buffer[name] = true;
                } else if (value.length === 0) {
                    buffer[name] = false;
                } else {
                    buffer[name] = value.trim();
                }
            }
        }
    }

    return buffer;
}

module.exports = function (...args) {
    let buffer = {};

    for (let i = 0; i < args.length; i++) {
        const item = args[i];
        buffer = Object.assign(buffer, transform(item));
    }

    return buffer;
}