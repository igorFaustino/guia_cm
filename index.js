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

app.use(express.static(path.join(__dirname, 'react-src/build')));

// rotas!
var maps = require('./routes/maps');

app.use('/api/maps', maps);

// default route
// direciona todas as rotas para o arquivo principal do frontend -> arquivo ainda não criado!!!
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'react-src/build/index.html'));
});


app.listen(port, function () {
	console.log('app listening on port ' + port);
});