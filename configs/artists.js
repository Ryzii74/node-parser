module.exports = {
    getter : {
        type : 'list',
        urlList : [
            'http://melody24.net/artists/%D1%8D',
            'http://melody24.net/artists/%D1%8E',
            'http://melody24.net/artists/%D1%8F',
            'http://melody24.net/artists/09'
        ],
        pageStructure : {
            element : '.col_1 .tab li strong',
            fields : [
                {
                    name : 'name',
                    selector : 'a'
                },
                {
                    name : "url",
                    selector : "a",
                    attribute : "href"
                }
            ]
        }
    },
    setter : {
        type : 'mongo',
        collection : "artists"
    }
};