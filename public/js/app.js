(function(){
	"use strict";
	var app = {
		urlMenu: '/menu.json',
		urlArticle: '/Article',
		menu: null,

		init:function(){
			this.ajaxMenu();
			this.listener();
		},

		//Clique sur les liens et boutons des formulaires
		listener : function(){
			$('#editer').on('click', this.ajaxMenu.bind(this));
			$('#formSelect').on('submit', this.selectForm.bind(this));
			$('#formEdit').on('submit', this.submitForm.bind(this));
			$('#formAjout').on('submit', this.ajoutForm.bind(this));
			$('#menu').on('click','a', function(){
				var index = $(this).data('path');
				var content = app.urlArticle + '/' + this.menu[index].path;
				app.ajaxRequest(content);
			});
		},
		
		//Récupération des données du menu.json
		ajaxMenu: function(){
			$.ajax(this.urlMenu)
			.done(this.ajaxDoneMenu)
			.fail(this.ajaxFail)
			.always(this.ajaxAlways);
		},

		//Affichage des données dans le menu(accueil) et select(page editer)
		ajaxDoneMenu: function(menu){
			app.menu = menu.menu;
			for(var i = 0; i < app.menu.length; i++){
				$('#menu').append('<a class="active item" data-path='+i+'>' + app.menu[i].title + '</a>');
				$('select').append('<option value='+i+'>'+ app.menu[i].title +'</option>');
			}
		},

		//récupérer les fichiers contenus dans l'url du serveur et enregistrés dans le menu.json
		ajaxRequest: function(content){
			$.ajax(content)
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
		},

		//Récupération du titre + contenu de l'article entrés dans le formulaire d'ajout
		ajoutForm: function(event){
			event.preventDefault();
			var title = $('#title').val();
			var content = $('#content').val();
			this.ajaxAjout({title: title, content: content});
		},

		//Envoyer au serveur les données ajoutées
		ajaxAjout: function(data){
			$.ajax({
				type: "POST",
				url: $('form').attr('action'),
				data: data,
				success: this.success
			});
		},

		//Message de l'article envoyé et reset du formulaire
		success: function(){
			swal({
				title:'Posté',
				text:'Votre article a été posté !',
				type: success,
				confirmButtonText:'Back'
			});
			$('#formAjout').trigger('reset');		
		},

		//Récupération de l'article selectionné
		selectForm: function(event){
			event.preventDefault();
			var article = $('select').val();
			var title = app.menu[article].title;
			var content = app.urlArticle + app.menu[article].path;
			app.ajaxDoneEdit(title);
			app.ajaxEdit(content);
		},

		//Récupération du contenu de l'article selectionné
		ajaxEdit: function(content){
			$.ajax(content)
			.done(this.ajaxDoneEdit)
			.fail(this.failAjax)
			.always(this.always);
		}

		//Convertis le fichier md en html dans les inputs
		ajaxDoneEdit: function(data, title){
			var converter = new showdown.Converter();
			var html = converter.makeHtml(data);
			$('#title').val(title);
			$('#content').val(html);
		},

		submitForm: function(data){
			$.ajax({
				type: "POST",
				url: $('form').attr('action'),
				data: data,
				success: this.success
			})
		},

		success: function(){
			alert('Article édité');			
		}
	}

	$(document).ready(function(){
		app.init();
	});
})();