"use strict";

var async = require('async');
var Page = require('../libs/page.js');
var config = require('../config.js');

class DefaultGetter {
    constructor(config) {
        this.config = config;
        this.currentPosition = 1;
        this.lastPageElementFound = 0;
        this.elementsParsed = 0;
    }

    start(setter) {
        var _this = this;
        async.doWhilst(
            (callback) => {
                var pageUrl = this.getCurrentPage() || callback('no data');
                console.log(pageUrl);

                Page(pageUrl, this.config.pageStructure, (err, data) => {
                    if (err || !data || !data.length) return callback(err || "no data");

                    _this.lastPageElementFound = data.length;
                    _this.elementsParsed += data.length;
                    _this.lastPageElementFound && setter.save(data, callback);
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

    getCurrentPage() {
        if (this.config.pageLimit < this.currentPosition) return;
        return this.config.pageTemplate.replace(config.getters.pageNumberReplacement, this.currentPosition++);
    }

    isLastPage() {
        return this.lastPageElementFound;
    }
}

module.exports = {
    create : (config) => new DefaultGetter(config),
    getter : () => DefaultGetter
};