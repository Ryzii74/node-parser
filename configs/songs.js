module.exports = {
    getter : {
        type : 'mongo',
        collection : 'artists',
        dbUrl : 'mongodb://127.0.0.1:27017/parser',
        dbMapper : (el) => `http://melody24.net${el.url}`,
        pageStructure : {
            element : '.col_1 .block',
            fields : [
                {
                    name : 'name',
                    selector : 'a.listen_href span'
                }
            ]
        }
    },
    setter : {
        type : 'mongo',
        collection : "songs"
    }
};