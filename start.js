var async = require('async');
var globalConfig = require('./config.js');

var settersFiles = require("fs").readdirSync(globalConfig.setters.path);

async.map(settersFiles, (file, callback) => {
    require(globalConfig.setters.path + file).init(callback);
}, (err) => {
    if (err) return error(err);

    var options = require('optimist').argv;
    if (!options.config) error('no config');

    try {
        var config = require(`./configs/${options.config}`);
    } catch (e) {
        return error('no such config', options.config);
    }
    if (!config.getter || !config.setter) return error('bad config');

    try {
        var setter = require(globalConfig.setters.path + (config.setter.type || globalConfig.setters.default)).create(config.setter);
    } catch (e) {
        return error('bad setter', config.setter.type);
    }

    try {
        var getter = require(globalConfig.getters.path + (config.getter.type || globalConfig.getters.default)).create(config.getter);
    } catch (e) {
        return error('bad getter', config.getter.type);
    }

    getter.start(setter);
});

function error() {
    console.log.apply(null, arguments);
    process.exit();
}