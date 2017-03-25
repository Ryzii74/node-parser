'use strict';

const globalConfig = require('../config');

class MongoSetter {
    constructor(config) {
        this.config = config;
    }

    save(url, data, callback) {
        const collection = db.collection(this.config.collection);
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

module.exports = config => new MongoSetter(config);
