(function(){
	"use strict";
	var app = {
		url: '',
		urlMenu: '/menu.json',
		allMenu: null,

		init:function(){
			this.ajaxMenu();
			this.listener();
		},

		//quand on clique sur les liens, on est amené sur une page web avec l'url sur serveur et l'url dans le path du menu/json
		listener : function(){
			$('#menu').on('click','a', function(){
				var index = $(this).data('path');
				app.getUrl(index);
			});
		},

		//création d'une nouvelle url se référant à chaque contenu des path du menu/json
		getUrl: function(index){
			var newUrl = this.url + this.allMenu[index].path;
			app.ajaxRequest(newUrl);
		},
		
		//récupérer le fichier menu.json dans le serveur
		ajaxMenu: function(){
			$.ajax(this.urlMenu)
			.done(this.ajaxDoneMenu)
			.fail(this.ajaxFail)
			.always(this.ajaxAlways);
		},

		//Afficher dans des liens sur la page html le contenu de menu.json
		ajaxDoneMenu: function(menu){
			app.allMenu = menu.menu;
			for(var i = 0; i < app.allMenu.length; i++){
				$('#menu').append('<a class="item" data-path='+i+'>' + app.allMenu[i].title + '</a>');
			}
		},

		//récupérer les fichiers contenus dans l'url du serveur et enregistrés dans le menu.json
		ajaxRequest: function(newUrl){
			$.ajax(newUrl)
			.done(this.ajaxDoneRequest)
			.fail(this.ajaxFail)
			.ajaxAlways(this.ajaxAlways);
		},

		//convertir, avec le framework showdown, les fichiers md (articles du blog)
		ajaxDoneRequest: function(request){
			var converter = new showdown.Converter();
			var html = converter.makeHtml(request);
			$('#md').html(html);
		},

		//en cas d'erreur l'afficher dans la console
		ajaxFail: function(){
			console.log('fail!');
		},

		//ce qui est toujours fait
		ajaxAlways: function(){
			console.log('always');
		}

	};


	$(document).ready(function(){
		app.init();
	});
})();