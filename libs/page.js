'use strict';

const request = require('request');
const cheerio = require('cheerio');
const cheerioAdv = require('cheerio-advanced-selectors');
const config = require('../config.js');
const Iconv = require('iconv').Iconv;

function isElementEmpty(obj = {}) {
    const data = Object.values(obj)
            .map(el => el.toString())
            .join('');
    return !data.length;
}

class Page {
    constructor(url, config) {
        this.url = url;
        this.config = config;
    }

    get(callback) {
        const requestObject = {
            url: this.url,
            followRedirect: false,
            headers: {
                cookie: this.config.cookie,
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
            },
        };
        if (this.config.encoding) {
            requestObject.encoding = 'binary';
        }

        request(requestObject, (error, response, body) => {
            if (this.config.encoding) {
                body = new Buffer(body, 'binary');
                body = new Iconv(this.config.encoding, 'utf8').convert(body).toString();
            }

            if (error || response.statusCode !== 200) {
                callback(error, {});
                return;
            }

            const data = this.parse(body);
            callback(null, data.data, data.isLastPage);
        });
    }

    parse(body) {
        const $ = cheerio.load(body);
        const $blocks = cheerioAdv.find($, this.config.element);
        const elements = [];

        $blocks.each((index, $block) => {
            if (this.config.filter && !this.config.filter($block)) return;

            const element = {};
            this.config.fields.forEach((field) => {
                if (field.type === 'const') {
                    element[field.name] = field.value;
                }

                const $el = cheerioAdv.find($, field.selector, $block);
                if (field.getter) {
                    element[field.name] = field.getter($el);
                    return;
                }
                if (field.attribute) {
                    element[field.name] = $el.attr(field.attribute);
                    return;
                }
                if (field.method) {
                    element[field.name] = $el[field.method]();
                    return;
                }
                element[field.name] = $el.text();
            });
            if (isElementEmpty(element)) return;
            elements.push(element);
        });
        let isLastPage = false;
        if (this.config.endElement) {
            isLastPage = !cheerioAdv.find($, this.config.endElement).length;
        }

        return { data: elements, isLastPage };
    }
}

module.exports = (url, config, callback) => {
    const page = new Page(url, config);
    page.get(callback);
};
