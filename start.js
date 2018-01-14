'use strict';

const fs = require('fs');
const globalConfig = require('./config.js');
const optimist = require('optimist');
const db = require('./libs/db');

function error(...args) {
    console.log.apply(null, args);
    process.exit();
}

const options = optimist.argv;
if (!options.config) error('no config');
if (!fs.existsSync(`./configs/${options.config}.json`)) error('no config file');

/*eslint-disable */
const config = require(`./configs/${options.config}`);
/*eslint-enable */
if (!config.setter || !config.getter) {
    error('bad config');
    process.exit(0);
}

(async function () {
    const setterType = config.setter.type || globalConfig.setters.default;
    const setterPath = globalConfig.setters.path + setterType;

    try {
        /*eslint-disable */
        if (config.setter.type === 'mongo' || config.getter.type === 'mongo') {
            await db.init();
        }
        const setter = await require(setterPath).init(config.setter);
        const getterType = config.getter.type || globalConfig.getters.default;
        const getter = await require(globalConfig.getters.path + getterType).create(config.getter);
        await getter.init();
        /*eslint-enable */
        await getter.start(setter);

        process.exit(0);
    } catch (err) {
        error(err);
    }
})();
