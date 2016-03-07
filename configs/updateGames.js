var $ = require('cheerio');
var cheerioAdv = require('cheerio-advanced-selectors');
const DOMEN = 'yaroslavl.en.cx';

module.exports = {
    getter : {
        type : 'list',
        urlList : [ `http://minsk.en.cx/GameDetails.aspx?gid=53962` ],
        pageStructure : {
            element : '.gameInfo',
            fields : [
                {
                    name : 'scenario',
                    selector : 'tbody tr:eq(8) span.white_bo'
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