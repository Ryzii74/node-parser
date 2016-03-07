"use strict";

var mongo = require('mongodb').MongoClient;
var ListGetter = require('./list').getter();

class MongoGetter extends ListGetter {
    constructor(config, callback) {
        super(config);

        mongo.connect(config.dbUrl, (err, database) => {
            if (err) return callback(err);

            database.collection(config.collection).find({}).toArray((err, data) => {
                if (err) return console.log(err);

                this.config.urlList = data.map(config.dbMapper);
                callback(null, this);
            });
        });
    }

    isExit(isLastPage) {
        return false;
    }

    isExitOnNoPageData(data) {
        return false;
    }

    isNotLastPage() {
        return true;
    }
}

module.exports = {
    create : (config, callback) => new MongoGetter(config, callback),
    getter : () => MongoGetter
};