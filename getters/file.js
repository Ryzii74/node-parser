'use strict';

const DefaultGetter = require('./default').getter();
const fs = require('fs');
const config = require('../config');

class FileGetter extends DefaultGetter {
    init() {
        const filePath = config.setters.fileGetterFolder + this.config.file;
        this.list = fs.readFileSync(filePath);
    }

    getCurrentPage() {
        return this.list.shift();
    }

    isExit(isLastPage) {
        return false;
    }

    isExitOnNoPageData(data) {
        return false;
    }

    isNotLastPage() {
        return true;
    }
}

module.exports = {
    create: config => new FileGetter(config),
    getter: () => FileGetter,
};
