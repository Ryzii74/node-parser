'use strict';

module.exports = {
    getter: {
        pageTemplate: 'https://www.mvideo.ru/promo/tehnoskidki-do-50-mark104402689/f/page={{pageNumber}}?sort=priceLow&categoryId=0',
        pageStructure: {
            element: '.product-tile-info',
            fields: [
                {
                    name: 'name',
                    selector: '.product-tile-title-link',
                    method: 'text',
                    noNewLinesAndTabulates: true,
                },
                {
                    name: 'price',
                    selector: '.product-price-current',
                    method: 'text',
                    noNewLinesAndTabulates: true,
                },
                {
                    name: 'oldPrice',
                    selector: '.product-price-old',
                    method: 'text',
                    noNewLinesAndTabulates: true,
                },
            ],
        },
    },
    setter: {
        type: 'file',
        fieldDelimiter: ';',
        file: 'mvideo.txt',
    },
};
