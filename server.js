var express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');

var app = express();

app.use(express.static(__dirname +'/public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
	res.setHeader('Content-Type', 'text/plain');
	res.send('Hello bloggers');
});


/*app.get('/', function(req, res){
	var edit = {path: '/edit.html', title:'Edition'};
	var ajout = {path: '/ajout.html', title:'AJouter'};
	fs.open('/menu.json', );
});*/

app.listen(8000);