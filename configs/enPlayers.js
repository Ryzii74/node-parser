'use strict';

module.exports = {
    getter: {
        type: 'list',
        urlList: [
            'http://cp.en.cx/UserList.aspx?mode=full',
        ],
        pageStructure: {
            element: '#MainForm table:eq(1) tr',
            fields: [
                {
                    name: 'id',
                    selector: 'td:eq(1)',
                },
            ],
        },
    },
    setter: {
        type: 'mongo',
        collection: 'players',
    },
};
