'use strict';

module.exports = {
    getter: {
        type: 'list',
        urlList: [
            'http://chel.en.cx/UserList.aspx?page=2',
            'http://chel.en.cx/UserList.aspx?page=4',
        ],
        pageStructure: {
            element: '#MainForm table:eq(1) tr:nth-child(odd)',
            fields: [
                {
                    name: 'name',
                    selector: 'td:eq(4) a',
                },
                {
                    name: 'points',
                    selector: 'td:eq(4) span',
                },
            ],
        },
    },
    setter: {
        type: 'file',
        fieldDelimiter: ';',
        file: 'en.txt',
    },
};
