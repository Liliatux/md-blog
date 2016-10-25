(function(){
	"use strict";
	var app = {
		urlAlice:'http://192.168.1.21:1337/alice.md',
		urlMenu: 'http://192.168.1.21:1337/menu.json',

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
			$('#md').text(html);			
		},

		ajaxDoneMenu: function(menu){
			var allMenu = menu.menu;
			for(var i = 0; i < allMenu.length; i++){
				var converter = new showdown.Converter();
				var html = converter.makeHtml(allMenu[i]);
				$('#md').text(html);
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