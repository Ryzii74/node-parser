module.exports = {
    getter : {
        pageTemplate : 'http://chel.en.cx/UserList.aspx?page={{pageNumber}}',
        elementsLimit : 50,
        pageStructure : {
            element : '#MainForm table:eq(1) tr:nth-child(odd)',
            fields : [
                {
                    name : 'name',
                    selector : 'td:eq(4) a'
                },
                {
                    name : 'points',
                    selector : 'td:eq(4) span'
                },
                {
                    name : 'url',
                    selector : 'td:eq(4) a',
                    attribute : 'href'
                }
            ]
        }
    },
    setter : {
        type : 'mongo',
        collection : 'test'
    }
};