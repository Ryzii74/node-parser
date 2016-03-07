"use strict";

var async = require('async');
var Page = require('../libs/page.js');
var config = require('../config.js');
var log = require('debug')('urls');

class DefaultGetter {
    constructor(config, callback) {
        this.config = config;
        this.currentPosition = config.startPage || 1;
        this.lastPageElementsFound = 0;
        this.elementsParsed = 0;

        callback && callback(null, this);
    }

    start(setter) {
        async.doWhilst(
            (callback) => {
                var pageUrl = this.getCurrentPage();
                if (!pageUrl) return callback('no pageUrls');
                log(pageUrl);

                Page(pageUrl, this.config.pageStructure, (err, data, isLastPage) => {
                    if (err || this.isExitOnNoPageData(data)) return callback(err || "no data on page");

                    log(data);
                    var dataToSave = data && data.slice && data.slice(0, this.getRealCountToSave(data.length)) || null;

                    log("lastPageElementsFound", this.lastPageElementsFound);
                    if (this.lastPageElementsFound && dataToSave) return setter.save(pageUrl, dataToSave, callback);

                    if (this.isExit(isLastPage)) return callback("last page detected");
                    callback(null);
                });
            },
            () => this.isNotLastPage(),
            (err) => {
                console.log('elements parsed:', this.elementsParsed);
                err && console.log(err);
                process.exit();
            }
        );
    }

    isExit(isLastPage) {
        return isLastPage;
    }

    isExitOnNoPageData(data) {
        return !data || !data.length;
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

    isNotLastPage() {
        return this.lastPageElementsFound
            && (!this.config.pageLimit || this.config.pageLimit > this.currentPosition)
            && (!this.config.elementsLimit || this.config.elementsLimit > this.elementsParsed);
    }
}

module.exports = {
    create : (config, callback) => new DefaultGetter(config, callback),
    getter : () => DefaultGetter
};