(function(){
	var app = {
		init: function(){

		},

		listeners: function(){
			$('#nom').submit(function(){
				event.preventDefault();
			});
			$('#contenu').submit(function(){
				event.preventDefault();
			});
		}
	}
});