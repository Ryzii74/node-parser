module.exports = {
	saver : 'mongo',
	saverOptions : {
		host : '127.0.0.1',
		port : '27017',
		db	 : 'node-parser',
		collection : 'ENusers'
	},

	start : 'http://chel.en.cx/UserList.aspx',
	target : [
		{
			name : 'name',
			selector : "#MainForm table tr td a[target]"
		},
		{
			name : 'href',
			selector : "#MainForm table tr td a[target]",
			attr : 'href'
		}
	]
};