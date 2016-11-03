var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
const jsesc = require('jsesc');
var slug = require('slug');
var app = express();

app.use(bodyParser());

app.use(express.static(__dirname + '/public'));

app.post('/Article', function(req, res){
	//Ce qui est écrit dans la requête du client
	var post = req.body;
	//Création de l'article en fichier.md
	var escapedPath = '/' + jsesc(slug(post.title)) + '.md';
	//Ajout du fichier dans le répertoire Article
	var path = __dirname + '/public/Article' + escapedPath;
	//Trouver le fichier menu.json dans son répertoire

	var fileExist = fs.existsSync(path);
	//Ecrit le nouveau fichier dans son répertoire avec son contenu
	fs.writeFile(path, post.content, function(err){
		if(err){
			console.log(err);
		}
	});
	if(!fileExist){
		updateMenu(escapedPath, post.title);
	}

	res.json({message:'fichier envoyé'});
});

function updateMenu(escapedPath, title){
	var menuPath = __dirname + '/public/menu.json';
	fs.readFile(menuPath, 'utf8', function(err, data){
		//transformer en objet les données reçues du client
		var content = JSON.parse(data);
		//mettre l'objet dans l'objet menu
		content.menu.push({path: escapedPath, title: title});
		//transformer l'objet en string 
		var jsonified = JSON.stringify(content);

		//Ecrire dans le menu.json l'objet mis en string 
		fs.writeFile(menuPath, jsonified, function(err){
			if(err){
				console.log(err);
			}
		});
	});
}

app.listen(2314);