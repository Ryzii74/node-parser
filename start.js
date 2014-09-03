var async = require('async'),
    config = require('./config'),
    saver = require('./savers/mongo'),
	loader = require('./loader'),
	error = false;

async.whilst(
	function () {
		return !error;
	},

	function (callback) {
        getUrl(function (err, data) {
            if (err) {
                error = err;
                callback();
                return;
            }

            loader.load(data, function (err) {
                if (err) {
                    error = err;
                    callback();
                    return;
                }

                callback();
            });
        });
	},

	function () {
        console.log(error);
	}
);

function getUrl(callback) {
    if (!config.start && !config.getter) {
        callback("No start point in config");
        return;
    }

    if (config.start) {
        callback(null, config.start);
        return;
    }

    try {
        var getter = require('./getters/' + config.getter);
    } catch (e) {
        callback("No such getter");
        return;
    }

    getter.get(function (err, data) {
        if (err) {
            callback(err, {});
            return;
        }

        callback(null, data);
    });
}