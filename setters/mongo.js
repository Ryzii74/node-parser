'use strict';

const globalConfig = require('../config');
const db = require('../libs/db');

class MongoSetter {
    constructor(config) {
        this.config = config;
    }

    save(url, data, callback) {
        const collection = db.get().collection(this.config.collection);
        const type = this.config.saveType || globalConfig.setters.defaultSaveType;

        if (type === 'insert') {
            collection.insert(data, err => callback(err));
        }

        if (type === 'update') {
            const query = this.config.getQuery(url);
            collection.update(query, {
                $set: data[0],
            }, err => callback(err));
        }
    }
}

module.exports = {
    async init(config) {
        await db.init();
        return new MongoSetter(config);
    },
};
