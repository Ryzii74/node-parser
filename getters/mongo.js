"use strict";

var mongo = require('mongodb').MongoClient;
var ListGetter = require('./list').getter();

class MongoGetter extends ListGetter {
    constructor(config, callback) {
        super(config);

        var _this = this;
        mongo.connect(config.dbUrl, (err, database) => {
            if (err) return callback(err);

            database.collection(config.collection).find({}).toArray((err, data) => {
                if (err) return console.log(err);

                _this.config.urlList = data.map(config.dbMapper);
                callback(null, _this);
            });
        });
    }
}

module.exports = {
    create : (config, callback) => new MongoGetter(config, callback),
    getter : () => MongoGetter
};