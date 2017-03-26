'use strict';

const mongo = require('mongodb').MongoClient;
const ListGetter = require('./list').getter();

class MongoGetter extends ListGetter {
    constructor(config, callback) {
        super(config);

        mongo.connect(config.dbUrl, (err, database) => {
            if (err) {
                callback(err);
                return;
            }

            database.collection(config.collection).find(config.query || {}).toArray((err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }

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
    create: config => new MongoGetter(config),
    getter: () => MongoGetter,
};
