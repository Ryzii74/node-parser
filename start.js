'use strict';

const fs = require('fs');
const globalConfig = require('./config.js');
const optimist = require('optimist');

function error(...args) {
    console.log.apply(null, args);
    process.exit();
}

const options = optimist.argv;
if (!options.config) error('no config');
if (!fs.existsSync(`./configs/${options.config}`)) error('no config file');

const config = require(`./configs/${options.config}`);
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
        const getter = await require(globalConfig.getters.path + getterType).create(config.getter);
        await getter.init();
        /*eslint-enable */
        getter.start(setter);
    } catch (err) {
        error(err);
    }
})();
