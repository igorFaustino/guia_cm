var express = require('express');
var app = express();
var port = 5000;

app.listen(port, function () {
	console.log('app listening on port ' + port);
});

app.get('/', function (req, res){
	res.send('<h1>Hello World</h1>');
});