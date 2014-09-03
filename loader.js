var cheerio = require('cheerio'),
	config = require('./config'),
	downloader = require('./downloader'),
	async = require('async');

module.exports = {
	load : function (url, callback) {
		async.waterfall([
			function getData (callback) {
				downloader.get(url, function (err, body) {
					if (err) {
                        callback(err, {});
						return false;
					}

					callback(null, body);
				})
			},

			function parseData (body, callback) {
				var $ = cheerio.load(body),
					data = [];

				config.target.forEach(function (item) {
					$(item.selector).map(function (i) {
						if (data.length < i + 1) data.push({});
						data[i][item.name] = (item.attr) ? $(this).attr(item.attr) : $(this).text();
					});
				});

				if (data.length === 0) {

				}

				callback(null, data);
			},

			function saveData (data, callback) {
				try {
					var saver = require('./savers/' + config.saver);
				} catch (e) {
					callback('error - no such saver', {});
					return;
				}

				saver.save(data, function (err) {
					if (err) {
						callback(err, {});
						return;
					}

					callback(null);
				});
			}
		], function (err) {
			if (err) {
				callback(err);
			}

			callback(null);
		});
	}
};

