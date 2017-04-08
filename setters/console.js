'use strict';

class ConsoleSetter {
    constructor(config) {
        this.config = config;
    }

    save(url, data) {
        console.log(url, data);
    }
}

module.exports = {
    init(config) {
        return new ConsoleSetter(config);
    },
};
