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

/*eslint-disable */
require(globalConfig.setters.path + (config.setter.type || globalConfig.setters.default))
/*eslint-enable */
    .init(config.setter, (err, setter) => {
        if (err) {
            error(err);
            return;
        }

        try {
            /*eslint-disable */
            require(globalConfig.getters.path + (config.getter.type || globalConfig.getters.default))
            /*eslint-enable */
                .create(config.getter, (err, getter) => {
                    if (err) {
                        error('err creating getter');
                        return;
                    }

                    getter.start(setter);
                });
        } catch (e) {
            console.log(e.stack);
            error('bad getter', config.getter.type);
        }
    });
