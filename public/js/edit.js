(function(){
	var app = {

		init: function(){
			this.listeners();
		},

		listeners: function(){
			$('form').on('submit', this.handleForm.bind(this));
		},

		handleForm: function(event){
			event.preventDefault();
			var title = $('#title').val();
			var content = $('#content').val();

			this.submitForm({title: title, content: content});
		},

		submitForm: function(){
			$.ajax({
				type: "POST",
				url: $('form').attr('action'),
				data: data,
				success: this.success
			})
		},

		success: function(){
			console.log('win!');
		}
	}

	$(document).ready(function(){
		app.init();
	});
})();