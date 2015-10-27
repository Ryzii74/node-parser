var async = require('async');
var globalConfig = require('./config.js');

var settersFiles = require("fs").readdirSync(globalConfig.setters.path);

async.map(settersFiles, (file, callback) => {
    require(globalConfig.setters.path + file).init(callback);
}, (err) => {
    if (err) return console.log(err);

    var options = require('optimist').argv;
    if (!options.config) {
        return console.log('no config');
    }

    var config = require(`./configs/${options.config}`);
    if (!config.getter || !config.setter) {
        return console.log('bad config');
    }

    var setter = require(globalConfig.setters.path + config.setter.type).create(config.setter);
    var getter = require('./libs/getter')(config.getter);

    getter.start(setter);
});