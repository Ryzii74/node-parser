'use strict';

const async = require('async');
const Page = require('../libs/page.js');
const config = require('../config.js');
const log = require('debug')('urls');

class DefaultGetter {
    constructor(config) {
        this.config = config;
        this.currentPosition = config.startPage || 1;
        this.lastPageElementsFound = 0;
        this.elementsParsed = 0;
    }

    async init() {}

    start(setter) {
        async.doWhilst(
            (callback) => {
                const pageUrl = this.getCurrentPage();
                if (!pageUrl) {
                    callback('no pageUrls');
                    return;
                }
                log(pageUrl);

                Page(pageUrl, this.config.pageStructure, (err, data, isLastPage) => {
                    if (err || this.isExitOnNoPageData(data)) {
                        callback(err || 'no data on page');
                        return;
                    }

                    log(data);
                    let dataToSave;
                    if (data) {
                        dataToSave = data.slice(0, this.getRealCountToSave(data.length));
                    }

                    log('lastPageElementsFound', this.lastPageElementsFound);
                    if (this.lastPageElementsFound && dataToSave) {
                        setter
                            .save(pageUrl, dataToSave)
                            .then(() => callback())
                            .catch(callback);
                        return;
                    }

                    if (this.isExit(isLastPage)) {
                        callback('last page detected');
                        return;
                    }
                    callback(null);
                });
            },
            () => this.isNotLastPage(),
            (err) => {
                console.log('elements parsed:', this.elementsParsed);
                if (err) console.log(err);
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
        return this.config.pageTemplate.replace(
            config.getters.pageNumberReplacement,
            this.currentPosition++
        );
    }

    isNotLastPage() {
        return this.lastPageElementsFound
            && (!this.config.pageLimit || this.config.pageLimit > this.currentPosition)
            && (!this.config.elementsLimit || this.config.elementsLimit > this.elementsParsed);
    }
}

module.exports = {
    create: config => new DefaultGetter(config),
    getter: () => DefaultGetter,
};
