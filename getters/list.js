"use strict";

var DefaultGetter = require('./default').getter();

class ListGetter extends DefaultGetter {
    getCurrentPage() {
        return this.config.urlList.shift();
    }
}

module.exports = {
    create : (config) => new ListGetter(config),
    getter : () => ListGetter
};