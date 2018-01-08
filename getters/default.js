'use strict';

const Page = require('../libs/page.js');
const config = require('../config.js');
const log = require('debug')('urls');

class DefaultGetter {
    constructor(config) {
        this.config = config;
        this.currentPosition = config.startPage || 1;
        this.lastPageElementsFound = 999;
        this.elementsParsed = 0;
    }

    async init() {}

    async start(setter) {
        while (this.isNotLastPage()) {
            const pageUrl = this.getCurrentPage();
            log(pageUrl);
            if (!pageUrl) throw new Error('no pageUrls');

            const { data, isLastPage } = await Page(pageUrl, this.config.pageStructure);
            log(data);
            const dataToSave = data && data.slice(0, this.getRealCountToSave(data.length));

            log('lastPageElementsFound', this.lastPageElementsFound);
            if (this.lastPageElementsFound && dataToSave) {
                await setter.save(pageUrl, dataToSave);
            }

            if (this.isExit(isLastPage)) throw new Error('last page detected');
        }

        console.log('elements parsed:', this.elementsParsed);
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
