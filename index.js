var express = require('express'); // require express -> web framework
var path = require('path'); // require path -> simplificar paths
var bodyParser = require('body-parser'); // require body-parser -> pegar informações de POSTS
var mongoose = require('mongoose'); // require mongoose -> banco de dados
const config = require('./config/database.js'); // database config

// Banco de dados ainda não criado !!!
//////////////////////////////////////////////////////////////////////////

// conectando ao banco de dados
// mongoose.connect(config.database, {
// 	useMongoClient: true,
// });
// // on connetion
// mongoose.connection.on('connected', function () {
// 	console.log('Connect to database');
// });

//////////////////////////////////////////////////////////////////////////

// iniciando express. 
var app = express();

// set port
var port = 5000;

// configurando body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// default route
app.get('/', function (req, res){
	res.send('<h1>Hello World</h1>');
});

app.listen(port, function () {
	console.log('app listening on port ' + port);
});