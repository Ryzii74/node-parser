'use strict';

const fs = require('fs');

const config = require('../config');

class FileSetter {
    constructor(config) {
        this.config = config;
    }

    save(url, data, callback) {
        const rowsToAppend = `${data.map(obj => Object.keys(obj).map(key => obj[key]).join(this.config.fieldDelimiter)).join('\r\n')}\r\n`;
        const filePath = config.setters.fileSetterFolder + this.config.file;

        fs.appendFile(filePath, rowsToAppend, callback);
    }
}

module.exports = {
    async init(config) {
        return new FileSetter(config);
    },
};
