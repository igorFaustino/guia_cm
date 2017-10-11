const express = require('express'); // require express -> web framework
const path = require('path'); // require path -> simplificar paths
const bodyParser = require('body-parser'); // require body-parser -> pegar informações de POSTS
const cors = require('cors') // require cors
const mongoose = require('mongoose'); // require mongoose -> banco de dados
const config = require('./config/database.js'); // database config
const admin = require("firebase-admin");

const serviceAccount = require("./config/guia-cm-firebase-adminsdk-300eh-9a36388415.json");

// firebase admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://guia-cm.firebaseio.com",
});

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