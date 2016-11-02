var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
const jsesc = require('jsesc');
var slug = require('slug');
var app = express();

app.use(bodyParser());

app.use(express.static(__dirname + '/public'));

app.post('/Article', function(req, res){
	var post = req.body;
	var escapedPath = jsesc(slug(post.title)) + '.md';
	var path = __dirname + '/public/Article/' + escapedPath;
	var menuPath = __dirname + '/public/menu.json';

	fs.writeFile(path, post.content, function(err){
		if(err){
			console.log(err);
		}
	});

	fs.readFile(menuPath, 'utf8', function(err, data){
		//transformer en objet
		var content = JSON.parse(data);
		//mettre l'objet dans le menu
		content.menu.push({path: escapedPath, title: post.title});
		//transformer en string
		var jsonified = JSON.stringify(content);

		fs.writeFile(menuPath, jsonified, function(err){
			if(err){
				console.log(err);
			}
		});
	});

	res.json({message:'fichier envoyé'});
});

app.listen(2314);