module.exports = {
    getter: {
        type: 'mongo',
        collection: 'games',
        query: { scenario: { $exists: false } },
        dbUrl: 'mongodb://127.0.0.1:27017/parser',
        dbMapper: (el) => el.url,
        pageStructure: {
            element: '.gameInfo',
            fields: [
                {
                    name: 'scenario',
                    selector: 'tr:eq(8) span.white_bold',
                    getter($el) {
                        return $el.text()
                            .replace(/\n/g, '')
                            .replace(/\r/g, '')
                            .replace(/\t/g, '');
                    },
                },
            ],
        },
    },
    setter: {
        type: 'mongo',
        saveType: 'update',
        getQuery(url) {
            return {
                url,
            };
        },
        collection: 'games',
    },
};
