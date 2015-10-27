module.exports = {
    getter : {
        pageTemplate : 'http://chel.en.cx/UserList.aspx?page={{pageNumber}}',
        pageLimit : 5,
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
                }
            ]
        }
    },
    setter : {
        type : 'mongo',
        collection : 'test'
    }
};