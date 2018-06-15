var user = 'DATABASE USER';
var password = 'DATABASE PASSWORD';

module.exports = {
	database: 'mongodb://' + user + ':' + password + '@ds159493.mlab.com:59493/guia_cm',
	// database: 'mongodb://localhost:27017/guia_cm',
	secret: 'SECRET KEY',
};
