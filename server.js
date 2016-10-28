var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(express.static(__dirname +'/public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/create', function(req, res){
	var post = req.body;
	var escapedPath = jsesc(slug(post.title)) + '.md';
	var path = __dirname + '/public' + escapedPath;

	fs.writeFile(__dirname + '/public/'+ post.path + '.md', post.content, function(err){
		if(err){
			console.log(err);
		}
	});

	fs.readFile(__dirname + '/public/menu.json', 'utf8', function(err, data){
		var content = JSON.parse(data);
		content.menu.push({path: escapedPath, title: post.title});
	})
	res.json('fichier envoyé');
})

app.listen(2314);