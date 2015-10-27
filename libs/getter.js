"use strict";

var async = require('async');
var Page = require('./page.js');
var config = require('../config.js');

class Getter {
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

module.exports = (config) => {
    var getter = new Getter(config);
    return getter;
};