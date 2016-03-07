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

    save(url, data, callback) {
        var collection = db.collection(this.config.collection);
        var type = this.config.saveType || globalConfig.setters.defaultSaveType;

        if (type === 'insert') {
            collection.insert(data, function(err) {
                if (err) return callback(err);

                callback(null);
            });
        }

        if (type === 'update') {
            var query = this.config.getQuery(url);
            collection.updateOne(query, {
                $set : data[0]
            }, function(err) {
                if (err) return callback(err);

                callback(null);
            });
        }
    }
}