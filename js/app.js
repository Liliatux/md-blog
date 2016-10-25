(function(){
	"use strict";
	var app = {
		init:function(){
			var url = 'http://192.168.1.21:1337/alice.md'
			$.ajax(url)
			.done(this.ajaxDone)
			.fail(this.ajaxFail)
			.always(this.ajaxAlways);
		},

		ajaxDone: function(alice){
			var alice = alice;
			var converter = new showdown.Converter();
			text = $('#md').text(alice);
			html = converter.makeHTML(text);			
		},

		ajaxFail: function(){
			console.log('fail!');
		},

		ajaxAlways: function(){
			console.log('always');
		},
	};


	$(document).ready(function(){
		app.init();
	});
})();