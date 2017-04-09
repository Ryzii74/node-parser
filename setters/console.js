'use strict';

class ConsoleSetter {
    constructor(config) {
        this.config = config;
    }

    save(url, data) {
        if (this.config.printUrl) {
            console.log(url, data);
        } else {
            console.log(data);
        }
    }
}

module.exports = {
    init(config) {
        return new ConsoleSetter(config);
    },
};
