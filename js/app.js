(function(){
	"use strict";
	var app = {
		url: 'http://192.168.1.28:8000',
		urlMenu: 'http://192.168.1.28:8000/menu.json',
		allMenu: null,

		init:function(){
			this.ajaxMenu();
			this.listener();
		},

		listener : function(){
			$('#menu').on('click','a', function(){
				var index = $(this).data('lien');
				app.getUrl(index);
			});
		},

		getUrl: function(index){
			var newUrl = this.url + this.allMenu[index].path;
			app.ajaxRequest(newUrl);
		},

		ajaxMenu: function(){
			$.ajax(this.urlMenu)
			.done(this.ajaxDoneMenu)
			.fail(this.ajaxFail)
			.always(this.ajaxAlways);
		},

		ajaxDoneMenu: function(menu){
			console.log(menu);
			app.allMenu = menu.menu;
			for(var i = 0; i < app.allMenu.length; i++){
				$('ul').append('<li><a data-lien='+i+'>' + app.allMenu[i].title + '</a></li>');
			}
		},

		ajaxRequest: function(newUrl){
			$.ajax(newUrl)
			.done(this.ajaxDoneRequest)
			.fail(this.ajaxFail)
			.ajaxAlways(this.ajaxAlways);
		},


		ajaxDoneRequest: function(request){
			var converter = new showdown.Converter();
			var html = converter.makeHtml(request);
			$('#md').html(html);
		},

		ajaxFail: function(){
			console.log('fail!');
		},

		ajaxAlways: function(){
			console.log('always');
		}

	};


	$(document).ready(function(){
		app.init();
	});
})();
				/*
				if($('a').data('Markdown Example')){
					this.ajaxMarkdown();
				} else if ($('a').data('Alice in wonderland')){
					this.ajaxAlice();
				}*/