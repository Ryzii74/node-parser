'use strict';

const globalConfig = require('./config.js');
const optimist = require('optimist');

function error(...args) {
    console.log.apply(null, args);
    process.exit();
}

const options = optimist.argv;
if (!options.config) error('no config');

let config;
try {
    /*eslint-disable */
    config = require(`./configs/${options.config}`);
    /*eslint-enable */
} catch (e) {
    error('no such config', options.config);
    process.exit(0);
}

if (!config.setter || !config.getter) {
    error('bad config');
    process.exit(0);
}

(async function () {
    const setterType = config.setter.type || globalConfig.setters.default;
    const setterPath = globalConfig.setters.path + setterType;

    try {
        /*eslint-disable */
        const setter = await require(setterPath).init(config.setter);
        const getterType = config.getter.type || globalConfig.getters.default;
        const getter = require(globalConfig.getters.path + getterType).create(config.getter);
        /*eslint-enable */
        getter.start(setter);
    } catch (err) {
        error(err);
    }
})();
