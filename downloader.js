var request = require('request');

module.exports = {
	get : function (page, callback) {
		request(page, function (error, response, body) {
			if (error || response.statusCode != 200) {
				callback(error, {});
				return;
			}

			callback(null, body);
		});
	}
};