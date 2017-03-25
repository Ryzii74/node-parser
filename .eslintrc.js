module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'script'
    },
    extends: 'airbnb-base',
    'rules': {
        "no-plusplus": 0,
        "arrow-parens": 0,
        "indent": ["error", 4],
        "no-param-reassign": 0,
        "no-shadow": 0,
        "no-underscore-dangle": 0,
        "no-console": 0,
        "no-mixed-operators": 0,

        // только на клиенте пока нет нормального импорта
        "no-unused-vars": 0,
        "no-undef": 0
    }
};