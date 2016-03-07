"use strict";

var fs = require('fs');

var config = require('../config');

module.exports = {
    init(config, callback) {
        callback(null, new FileSetter(config));
    }
};

class FileSetter {
    constructor(config) {
        this.config = config;
    }

    save(data, callback) {
        var rowsToAppend = data.map(obj => Object.keys(obj).map(key => obj[key]).join(this.config.fieldDelimiter)).join('\r\n') + "\r\n";
        var filePath = config.setters.fileSetterFolder + this.config.file;

        fs.appendFile(filePath, rowsToAppend, callback);
    }
}