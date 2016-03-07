"use strict";

var request = require('request');
var cheerio = require('cheerio');
var cheerioAdv = require('cheerio-advanced-selectors');
var config = require('../config.js');
var iconv = require('iconv').Iconv;

class Page {
    constructor(url, config) {
        this.url = url;
        this.config = config;
    }

    get(callback) {
        var requestObject = {
            url : this.url,
            followRedirect : false,
            headers : {
                cookie : this.config.cookie,
                "User-Agent" : "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36"
            }
        };
        if (this.config.encoding) {
            requestObject.encoding = 'binary';
        }

        request(requestObject, (error, response, body) => {
            if (this.config.encoding) {
                body = new Buffer(body, 'binary');
                body = new iconv(this.config.encoding, 'utf8').convert(body).toString();
            }

            if (error || response.statusCode != 200) return callback(error, {});

            var data = this.parse(body);
            callback(null, data.data, data.isLastPage);
        });
    }

    parse(body) {
        var $ = cheerio.load(body);
        var $blocks = cheerioAdv.find($, this.config.element);
        var elements = [];

        $blocks.each((index, $block) => {
            var element = {};
            this.config.fields.forEach((field) => {
                if (field.type === 'const') return element[field.name] = field.value;

                var $el = cheerioAdv.find($, field.selector, $block);
                if (field.getter) return element[field.name] = field.getter($el);
                if (field.attribute) return element[field.name] = $el.attr(field.attribute);
                if (field.method) return element[field.name] = $el[field.method]();
                return element[field.name] = $el.text();
            });
            elements.push(element);
        });
        var isLastPage = (this.config.endElement) ? !cheerioAdv.find($, this.config.endElement).length : false;

        return { data : elements, isLastPage : isLastPage };
    }
}

module.exports = (url, config, callback) => {
    var page = new Page(url, config);
    page.get(callback);
};