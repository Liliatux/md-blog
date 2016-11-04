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
			$('#formAjout').on('submit', this.ajoutForm.bind(this));
			$('#menu').on('click','a', this.linkArticle);
		},
		
		//Récupération des données du menu.json
		ajaxMenu: function(){
			$.ajax(this.urlMenu)
			.done(this.ajaxDoneMenu)
			.fail(this.ajaxFail);
		},

		//Affichage des titres du menu.json (dans accueil + select du edit)
		ajaxDoneMenu: function(menu){
			app.menu = menu.menu;
			for(var i = 0; i < app.menu.length; i++){
				$('#menu').append('<a class="active item" data-path='+i+'>' + app.menu[i].title + '</a>');
				$('select').append('<option value='+i+'>'+ app.menu[i].title +'</option>');
			}
		},

		//Reconnaissance de l'article cliqué
		linkArticle: function(){
			var index = $(this).data('path');
			var content = app.urlArticle + app.menu[index].path;
			app.ajaxArticle(content);
		},

		//Récupération du contenu de l'article cliqué
		ajaxArticle: function(content){
			$.ajax(content)
			.done(this.ajaxDoneArticle)
			.fail(this.ajaxFail);
		},

		//Convertis le contenu de l'article.md en html
		ajaxDoneArticle: function(request){
			var converter = new showdown.Converter();
			var html = converter.makeHtml(request);
			$('#md').html(html);
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

		//Récupération de l'article selectionné et affichage du titre
		selectForm: function(event){
			event.preventDefault();
			var article = $('select').val();
			var title = app.menu[article].title;
			var content = app.urlArticle + app.menu[article].path;
			$('#title').val(title);
			app.ajaxEdit(content);
		},

		//Récupération du contenu de l'article selectionné
		ajaxEdit: function(content){
			$.ajax(content)
			.done(this.ajaxDoneEdit)
			.fail(this.failAjax);
		},

		//Affichage du contenu de l'article dans l'input 'content'
		ajaxDoneEdit: function(content){
			$('#content').val(content);
		},

		//en cas d'erreur l'afficher dans la console
		ajaxFail: function(){
			console.log('fail!');
		},

		//Envoie au serveur du titre + contenu de l'article
		submitForm: function(data){
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
				type:'success',
				confirmButtonText:'Back'
			});
			$('#formAjout').trigger('reset');		
		}
	}

	$(document).ready(function(){
		app.init();
	});
})();