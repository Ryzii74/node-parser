"use strict";

var mongo = require('mongodb').MongoClient,
	config = require('../config');

var db;

module.exports = {
    init(callback) {
        var dbUrl = 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.db;
        mongo.connect(dbUrl, (err, database) => {
            if (err) return callback(err);

            db = database;
            callback(null);
        });
    },

    create(config) {
        return new mongoSetter(config);
    }
};

class mongoSetter {
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