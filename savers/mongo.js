var mongo = require('mongodb').MongoClient,
	config = require('../config');

module.exports = {
	save : function (data, callback) {
		var dbUrl = 'mongodb://' + config.saverOptions.host + ':' + config.saverOptions.port + '/' + config.saverOptions.db;
		mongo.connect(dbUrl, function(err, db) {
			if (err) {
				callback(err);
				return;
			}

			var collection = db.collection(config.saverOptions.collection);
			collection.insert(data, function(err) {
				if (err) {
					callback(err);
				}

				callback(null);
				db.close();
			});
		});
	}
};