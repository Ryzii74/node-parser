module.exports = {
    mongo: {
        host: '127.0.0.1',
        port: '27017',
        db: 'parser',
    },
    defaultEncoding: 'utf-8',
    setters: {
        path: './setters/',
        default: 'mongo',
        fileSetterFolder: './resultFiles/',
        defaultSaveType: 'insert',
    },
    getters: {
        path: './getters/',
        default: 'default',
        pageNumberReplacement: '{{pageNumber}}',
        fileGetterFolder: './initFiles/',
    },
};
