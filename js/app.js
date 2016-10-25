(function(){
	"use strict";
	var app = {
		url:'http://192.168.1.21:1337/alice.md',

		init:function(){
			$.ajax(this.url)
			.done(this.ajaxDone)
			.fail(this.ajaxFail)
			.always(this.ajaxAlways);
		},

		ajaxDone: function(alice){
			var converter = new showdown.Converter();
			var html = converter.makeHtml(alice);
			$('#md').text(html);			
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