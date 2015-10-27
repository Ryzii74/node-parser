"use strict";

var request = require('request');
var cheerio = require('cheerio');
var cheerioAdv = require('cheerio-advanced-selectors');

class Page {
    constructor(url, config) {
        this.url = url;
        this.config = config;
    }

    get(callback) {
        request(this.url, (error, response, body) => {
            if (error || response.statusCode != 200) {
                callback(error, {});
                return;
            }

            callback(null, this.parse(body));
        });
    }

    parse(body) {
        var $ = cheerio.load(body);
        var $blocks = cheerioAdv.find($, this.config.element);
        var elements = [];

        $blocks.each((index, $block) => {
            var element = {};
            this.config.fields.forEach((field) => {
                var $el = cheerioAdv.find($, field.selector, $block);
                if (field.attribute) return element[field.name] = $el.attr(field.attribute);
                if (field.method) return element[field.name] = $el[field.method]();
                return element[field.name] = $el.text();
            });
            elements.push(element);
        });

        return elements;
    }
}

module.exports = (url, config, callback) => {
    var page = new Page(url, config);
    page.get(callback);
};