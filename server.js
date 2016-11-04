
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
const jsesc = require('jsesc');
var slug = require('slug');
var routes = express();

routes.use(bodyParser());
routes.use(express.static(__dirname + '/public'));

var blog = {
	
	newArticle: function(req, res){
		var post = req.body;
		var escapedPath = '/' + jsesc(slug(post.title)) + '.md'; //transformer l'article en md
		var path = __dirname + '/public/Article' + escapedPath; //le mettre dans le dossier article
		blog.writeArticle(path, post); //l'écrire
		if(!fileExist){
			blog.updateMenu(escapedPath, post.title);//le mettre dans menu.json
		}
		res.json({message:'fichier envoyé'});

	},

	writeArticle: function(path, post){
		fs.writeFile(path, post.content, function(err){
			if(err){
				console.log(err);
			}
		});
	},

	updateMenu: function(escapedPath, title){
		var urlMenu = __dirname + '/public/menu.json'; //Aller dans le menu.json
		fs.readFile(urlMenu, 'utf8', function(err, data){
			var content = JSON.parse(data);	//transformer l'article en objet
			content.menu.push({path: escapedPath, title: title}); //mettre l'objet dans le menu
			var jsonified = JSON.stringify(content); //transformer en string
			blog.writeMenu(urlMenu, jsonified); //écrire le tout dans menu.json
		});			
	},

	writeMenu: function(urlMenu, jsonified){
		fs.writeFile(urlMenu, jsonified, function(err){
			if(err){
				console.log(err);
			}
		});			
	}
}

routes.post('/Article', blog.newArticle);

routes.listen(2314);
