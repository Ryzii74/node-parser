"use strict";

var async = require('async');
var Page = require('../libs/page.js');
var config = require('../config.js');

class DefaultGetter {
    constructor(config) {
        this.config = config;
        this.currentPosition = 0;
        this.lastPageElementFound = 0;
    }

    start(setter) {
        var _this = this;
        async.doWhilst(
            (callback) => {
                var pageUrl = this.getCurrentPage();
                if (!pageUrl) return callback('no data');
                console.log(pageUrl);

                Page(pageUrl, this.config.pageStructure, (err, data) => {
                    if (err) return callback(err);
                    if (!data || !data.length) return callback('no data');

                    _this.lastPageElementFound = data.length;
                    _this.lastPageElementFound && setter.save(data, callback);
                });
            },
            () => {
                return this.isLastPage();
            },
            (err) => {
                err && console.log(err);
                process.exit();
            }
        );
    }

    getCurrentPage() {
        if (this.currentPosition++ === 0) return this.config.startPage;

        return this.config.pageTemplate.replace(config.getters.pageNumberReplacement, this.currentPosition);
    }

    isLastPage() {
        return this.lastPageElementFound;
    }
}

module.exports = {
    create : (config) => {
        var getter = new DefaultGetter(config);
        return getter;
    },
    getter : () => {
        return DefaultGetter;
    }
};