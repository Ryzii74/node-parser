'use strict';

const globalConfig = require('../config');
const db = require('../libs/db');

class MongoSetter {
    constructor(config) {
        this.config = config;
    }

    save(url, data) {
        const collection = db.get().collection(this.config.collection);
        const type = this.config.saveType || globalConfig.setters.defaultSaveType;

        if (type === 'insert') {
            return collection.insertMany(data);
        }

        if (type === 'update') {
            const query = this.config.getQuery(url);
            return collection.updateOne(query, {
                $set: data[0],
            });
        }

        throw new Error('bad_save_type');
    }
}

module.exports = {
    async init(config) {
        await db.init();
        return new MongoSetter(config);
    },
};
