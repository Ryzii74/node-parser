'use strict';

const globalConfig = require('../config');
const db = require('../libs/db');

class MongoSetter {
    constructor(config) {
        this.config = config;
    }

    async save(url, data) {
        const collection = db.get().collection(this.config.collection);
        const type = this.config.saveType || globalConfig.setters.defaultSaveType;

        if (type === 'insert') {
            return await collection.insertMany(data);
        }

        if (type === 'update') {
            data.forEach(async el => {
                const query = this.config.getQuery(el) || { url };
                el.url = url;
                await collection.updateOne(query, {
                    $set: el,
                }, {
                    upsert: true,
                });
            });
        }

        throw new Error('bad_save_type');
    }
}

module.exports = {
    async init(config) {
        return new MongoSetter(config);
    },
};
