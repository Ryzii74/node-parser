'use strict';

const $ = require('cheerio');
const cheerioAdv = require('cheerio-advanced-selectors');

const DOMEN = 'yaroslavl.en.cx';

module.exports = {
    getter: {
        pageTemplate: `http://${DOMEN}/Games.aspx?page={{pageNumber}}`,
        pageStructure: {
            element: '#tdContentCenter td table table:has(table)',
            filter(el) {
                const type = cheerioAdv.find($, 'tr:eq(3) span', el).text();
                const players = cheerioAdv.find($, 'tr:eq(4) span', el).text();
                return (type === 'Схватка'
                    || type === 'Точки'
                    || type === 'Квест'
                    || type === 'Мозговой штурм')
                    && players !== 'Персонально';
            },
            fields: [
                {
                    name: 'name',
                    selector: '#lnkGameTitle',
                },
                {
                    name: 'domen',
                    type: 'const',
                    value: 'chel.en.cx',
                },
                {
                    name: 'type',
                    selector: 'tr:eq(3) span',
                },
                {
                    name: 'players',
                    selector: 'tr:eq(4) span',
                },
                {
                    name: 'mark',
                    selector: 'tr:eq(7) span',
                },
                {
                    name: 'authors',
                    selector: 'tr:eq(8)',
                    getter($el) {
                        return $el.find('a').map((i, el) => $(this).text()).get();
                    },
                },
                {
                    name: 'date',
                    selector: 'tr:eq(9) span',
                },
                {
                    name: 'url',
                    selector: '#lnkGameTitle',
                    getter($el) {
                        return `http://${DOMEN}${$el.attr('href')}`;
                    },
                },
            ],
        },
    },
    setter: {
        type: 'mongo',
        collection: 'games',
    },
};
