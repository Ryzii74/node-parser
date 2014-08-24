var async = require('async'),
	loader = require('./loader'),
	error = false;

async.whilst(
	function () {
		return !error;
	},
	function (url, callback) {
		loader.load(function (err) {
			if (err) {
				error = true;
				callback(error);
				return;
			}

			callback(null);
		})
	},
	function (err) {

	}
);