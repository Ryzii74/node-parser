'use strict';

module.exports = {
    getter: {
        type: 'mongo',
        collection: 'test',
        dbUrl: 'mongodb://127.0.0.1:27017/parser',
        dbMapper: (el) => `http://chel.en.cx${el.url}`,
        pageStructure: {
            element: '#tdContentCenter',
            fields: [
                {
                    name: 'name',
                    selector: '.enPnl1 td:eq(1) td:eq(0) span:eq(0)',
                },
                {
                    name: 'photo',
                    selector: '.enPnl1 td:eq(0) img',
                    attribute: 'src',
                },
            ],
        },
    },
    setter: {
        type: 'console',
        printUrl: false,
    },
};
