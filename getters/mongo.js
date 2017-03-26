'use strict';

const db = require('../libs/db');
const ListGetter = require('./list').getter();

class MongoGetter extends ListGetter {
    async init() {
        const data = await db.get()
            .collection(this.config.collection)
            .find(this.config.query || {})
            .toArray();
        this.config.urlList = data.map(this.config.dbMapper);
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
    create: config => new MongoGetter(config),
    getter: () => MongoGetter,
};
