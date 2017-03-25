'use strict';

const mongo = require('mongodb').MongoClient;
const globalConfig = require('../config');

let db;

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

module.exports = {
    init(config, callback) {
        const conf = globalConfig.mongo;
        const dbUrl = `mongodb://${conf.host}:${conf.port}/${conf.db}`;
        mongo.connect(dbUrl, (err, database) => {
            if (err) {
                callback(err);
                return;
            }

            db = database;
            callback(null, new MongoSetter(config));
        });
    },
};
