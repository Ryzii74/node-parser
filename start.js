var async = require('async');
var globalConfig = require('./config.js');

var options = require('optimist').argv;
if (!options.config) error('no config');

try {
    var config = require(`./configs/${options.config}`);
} catch (e) {
    return error('no such config', options.config);
}

if (!config.setter || !config.getter) return error('bad config');

require(globalConfig.setters.path + (config.setter.type || globalConfig.setters.default)).init(config.setter, function (err, setter) {
    if (err) return error(err);

    try {
        require(globalConfig.getters.path + (config.getter.type || globalConfig.getters.default)).create(config.getter, (err, getter) => {
            if (err) return error('err creating getter');

            getter.start(setter);
        });
    } catch (e) {
        console.log(e.stack);
        return error('bad getter', config.getter.type);
    }
});

function error() {
    console.log.apply(null, arguments);
    process.exit();
}