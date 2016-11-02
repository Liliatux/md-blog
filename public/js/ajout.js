(function(){
	var app = {

		init: function(){
			$('form').on('submit', this.handleForm.bind(this));
		},

		handleForm: function(event){
			event.preventDefault();
			var title = $('#title').val();
			var content = $('#content').val();
			this.submitForm({title: title, content: content});
		},

		submitForm: function(data){
			$.ajax({
				type: "POST",
				url: $('form').attr('action'),
				data: data,
				success: this.success
			});
		},

		success: function(){
			alert('Article posté');
			
		}
	}

	$(document).ready(function(){
		app.init();
	});
})();