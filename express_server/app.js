//Inclusion d'express
var express = require('express');
var bodyParser = require('body-parser');

//app où on appel la fonction express
var app = express();

app.use(express.static(__dirname +'/public'));
app.use(bodyParser.json('/public'));

//Indique les différentes routes (url) auxquelles notre appli doit répondre + callback quand quelqu'un demande la route
app.get('/', function(req, res){
	res.setHeader('Content-Type', 'text/plain');
	res.send('Hello bloggers');
});

app.listen(8000);