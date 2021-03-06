'use strict';

module.exports = {
    getter: {
        pageTemplate: 'http://www.sportmaster.ru/catalog/muzhskaya_obuv/botinki/?page={{pageNumber}}',
        pageStructure: {
            element: '.sm-category__items-wrap .sm-category__item',
            fields: [
                {
                    name: 'name',
                    selector: 'h2',
                },
                {
                    name: 'price',
                    selector: '.sm-category__item-actual-price',
                    method: 'text',
                },
                {
                    name: 'image',
                    selector: '.sm-category__item-photo img',
                    attribute: 'src',
                },
            ],
        },
    },
    setter: {
        type: 'file',
        fieldDelimiter: ';',
        file: 'sportmaster-botinki.txt',
    },
};
