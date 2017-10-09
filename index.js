var express = require('express'); // require express -> web framework
var path = require('path'); // require path -> simplificar paths
var bodyParser = require('body-parser'); // require body-parser -> pegar informações de POSTS
var cors = require('cors') // require cors
var mongoose = require('mongoose'); // require mongoose -> banco de dados
const config = require('./config/database.js'); // database config


//conectando ao banco de dados
mongoose.connect(config.database, {
	useMongoClient: true,
});

// testa conexão!
mongoose.connection.on('connected', function () {
	console.log('Connect to database');
});

// iniciando express. 
var app = express();

// rotas!
var maps = require('./routes/maps');
var locals = require('./routes/locals');
var events = require('./routes/events');
var services = require('./routes/services');

// set CORS MW
app.use(cors());

// set port
var port = 5000;

// Set Static Folder 
app.use(express.static(path.join(__dirname, 'public'))); 
 
// Body Parser MW 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false})); 

app.use('/api/maps', maps);
app.use('/api', locals);
app.use('/api', events);
app.use('/api', services);


// default route
// direciona todas as rotas para o arquivo principal do frontend -> arquivo ainda não criado!!!
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'react-src/build/index.html'));
});


app.listen(port, function () {
	console.log('app listening on port ' + port);
});