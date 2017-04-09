module.exports = {
    getter: {
        type: 'file',
        file: 'enPlayers.txt',
        pageStructure: {
            element: '#MainForm table:eq(1) tr:nth-child(odd)',
            fields: [
                {
                    name: 'name',
                    selector: 'td:eq(4) a',
                },
                {
                    name: 'points',
                    selector: 'td:eq(4) span',
                },
            ],
        },
    },
    setter: {
        type: 'file',
        fieldDelimiter: ';',
        file: 'enFile.txt',
    },
};
