"use strict";

var mongo = require('mongodb').MongoClient;
var globalConfig = require('../config');

var db;

module.exports = {
    init(config, callback) {
        var dbUrl = 'mongodb://' + globalConfig.mongo.host + ':' + globalConfig.mongo.port + '/' + globalConfig.mongo.db;
        mongo.connect(dbUrl, (err, database) => {
            if (err) return callback(err);

            db = database;
            callback(null, new MongoSetter(config));
        });
    }
};

class MongoSetter {
    constructor(config) {
        this.config = config;
    }

    save(data, callback) {
        var collection = db.collection(this.config.collection);
        collection.insert(data, function(err) {
            if (err) return callback(err);

            callback(null);
        });
    }
}