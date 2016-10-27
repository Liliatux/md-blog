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

		listener : function(){
			$('#menu').on('click','a', function(){
				var index = $(this).data('path');
				event.preventDefault();
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
				$('#menu').append('<a data-path='+i+'>' + app.allMenu[i].title + '</a>' + " | ");
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