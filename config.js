module.exports = {
	mongo : {
		host : '127.0.0.1',
		port : '27017',
		db	 : 'parser'
	},
    setters : {
        path : './setters/',
        default : 'mongo'
    },
    getters : {
        path : './getters/',
        default : 'defaultGetter',
        pageNumberReplacement : '{{pageNumber}}'
    }
};