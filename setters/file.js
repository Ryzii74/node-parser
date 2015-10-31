"use strict";

var fs = require('fs');

var config = require('../config');
var Iconv = require('iconv').Iconv;

module.exports = {
    init(callback) {
        callback(null);
    },

    create(config) {
        return new FileSetter(config);
    }
};

class FileSetter {
    constructor(config) {
        this.config = config;
    }

    save(data, callback) {
        var rowsToAppend = data.map(obj => Object.keys(obj).map(key => obj[key]).join(this.config.fieldDelimiter)).join('\r\n') + "\r\n";
        var filePath = config.setters.fileSetterFolder + this.config.file;

        if (this.config.encoding && this.config.encoding !== config.defaultEncoding) {
            return fs.appendFile(filePath, new Iconv(this.config.encoding, config.defaultEncoding).convert(rowsToAppend).toString(), callback);
        }

        fs.appendFile(filePath, rowsToAppend, callback);
    }
}