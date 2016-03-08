var $ = require('cheerio');
var cheerioAdv = require('cheerio-advanced-selectors');
const DOMEN = 'yaroslavl.en.cx';

module.exports = {
    getter : {
        type : 'mongo',
        collection : 'games',
        query : { scenario : { $exists : false } },
        dbUrl : 'mongodb://127.0.0.1:27017/parser',
        dbMapper : (el) => el.url,
        pageStructure : {
            element : '.gameInfo',
            fields : [
                {
                    name : 'scenario',
                    selector : 'tr:eq(8) span.white_bold',
                    getter : function ($el) {
                        return $el.text()
                            .replace(/\n/g, '')
                            .replace(/\r/g, '')
                            .replace(/\t/g, '')
                    }
                }
            ]
        }
    },
    setter : {
        type : 'mongo',
        saveType : 'update',
        getQuery : function (url) {
            return {
                url : url
            }
        },
        collection : "games"
    }
};