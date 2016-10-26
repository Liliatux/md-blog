(function(){
	"use strict";
	var app = {
		urlAlice:'http://localhost:8000/alice.md',
		urlMenu: 'http://localhost:8000/menu.json',

		init:function(){
			this.ajaxAlice();
			this.ajaxMenu();

		},

		ajaxAlice: function(){
			$.ajax(this.urlAlice)
			.done(this.ajaxDoneAlice)
			.fail(this.ajaxFail)
			.always(this.ajaxAlways);
		},

		ajaxMenu: function(){
			$.ajax(this.urlMenu)
			.done(this.ajaxDoneMenu)
			.fail(this.ajaxFail)
			.always(this.ajaxAlways);
		},

		ajaxDoneAlice: function(alice){
			var converter = new showdown.Converter();
			var html = converter.makeHtml(alice);
			$('#md').html(html);			
		},

		ajaxDoneMenu: function(menu){
			var url = 'http://localhost:8000';
			var allMenu = menu.menu;
			for(var i = 0; i < allMenu.length; i++){
				$('ul').append('<li><a href='+url+allMenu[i].path+'>' + allMenu[i].title + '</a></li>');
			}
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