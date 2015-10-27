"use strict";

var async = require('async');
var Page = require('../libs/page.js');
var config = require('../config.js');

class DefaultGetter {
    constructor(config, callback) {
        this.config = config;
        this.currentPosition = 1;
        this.lastPageElementsFound = 0;
        this.elementsParsed = 0;

        callback(null, this);
    }

    start(setter) {
        var _this = this;
        async.doWhilst(
            (callback) => {
                var pageUrl = this.getCurrentPage() || callback('no data');
                console.log(pageUrl);

                Page(pageUrl, this.config.pageStructure, (err, data) => {
                    if (err || !data || !data.length) return callback(err || "no data");

                    var dataToSave = data.slice(0, _this.getRealCountToSave(data.length));
                    _this.lastPageElementsFound && setter.save(dataToSave, callback);
                });
            },
            () => this.isLastPage(),
            (err) => {
                console.log('elements parsed:', this.elementsParsed);
                err && console.log(err);
                process.exit();
            }
        );
    }

    getRealCountToSave(count) {
        this.lastPageElementsFound = count;
        this.elementsParsed += count;

        if (this.config.elementsLimit < this.elementsParsed) {
            this.lastPageElementsFound = count - this.elementsParsed + this.config.elementsLimit;
            this.elementsParsed = this.config.elementsLimit;
        }

        return this.lastPageElementsFound;
    }

    getCurrentPage() {
        return this.config.pageTemplate.replace(config.getters.pageNumberReplacement, this.currentPosition++);
    }

    isLastPage() {
        return this.lastPageElementsFound
            && (!this.config.pageLimit || this.config.pageLimit > this.currentPosition)
            && (!this.config.elementsLimit || this.config.elementsLimit > this.elementsParsed);
    }
}

module.exports = {
    create : (config, callback) => new DefaultGetter(config, callback),
    getter : () => DefaultGetter
};