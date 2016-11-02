(function(){
	var app = {
		url: '/menu.json',

		init: function(){
			this.listeners();
		},

		listeners: function(){
			$('#formSelect').on('submit', this.selectForm.bind(this));
			$('#formEdit').on('submit', this.editForm.bind(this));
		},

		selectForm: function(){
			$.ajax(this.url)
			.done(this.selectAjax)
			.fail(this.failAjax)
			.always(this.alwaysAjax);
		},

		selectAjax: function(){
			$('select').append('<option></option>')
		},

		editForm: function(event){
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
			})
		},

		success: function(){
			alert('Article édité');
			
		}
	}

	$(document).ready(function(){
		app.init();
	});
})();