module.exports = {
    getter : {
        cookie : "list_col_pp=300",
        pageTemplate : 'http://domchel.ru/realty/sell/residential/new/{{pageNumber}}.php?order=DateUpdate&dir=desc&PriceUnit=1&AreaUnit=1&expand=0&PriceUnit=1&CityCode=0010010220000010000000#1.php%order=DateUpdate&dir=desc&PriceUnit=1&AreaUnit=1&expand=0&PriceUnit=1&CityCode=0010010220000010000000',
        pageLimit : 1,
        pageStructure : {
            element : '.adv_table tr:has(.rl_note)',
            fields : [
                {
                    name : 'address',
                    selector : 'td:eq(2) a'
                },
                {
                    name : 'rooms',
                    selector : 'td:eq(3)'
                },
                {
                    name : 'square',
                    selector : 'td:eq(4)'
                },
                {
                    name : 'square',
                    selector : 'td:eq(6) .price_realty_table'
                }
            ]
        }
    },
    setter : {
        type : 'file',
        fieldDelimiter : ';',
        file : 'domchel.csv'
    }
};