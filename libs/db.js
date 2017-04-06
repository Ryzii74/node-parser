'use strict';

const mongo = require('mongodb').MongoClient;
const globalConfig = require('../config');

let db;

module.exports = {
    async init() {
        const conf = globalConfig.mongo;
        const dbUrl = `mongodb://${conf.host}:${conf.port}/${conf.db}`;
        db = await mongo.connect(dbUrl);
    },

    get() {
        return db;
    },
};
