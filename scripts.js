$(document).ready(function(){
	var html = '';
	var movieObjIndex = 0;

	var basePath = '';
	var sizeOptions = '';
	var logoSizes = '';
	var posterSizes = '';
	var profileSizes = '';

	var siteConfig = 'https://api.themoviedb.org/3/configuration?api_key='+apiKey;
	// console.log(siteConfig);
	

	$.getJSON(siteConfig, function(data){
	 	basePath = data.images.base_url;
		sizeOptions	= data.images.poster_sizes;
		posterSize = 'w300';
		logoSizes = logoSizes['original'];
		profileSizes = profileSizes['original'];


		var nowPlaying = 'http://api.themoviedb.org/3/movie/now_playing?page=1&api_key='+apiKey;

		$.getJSON(nowPlaying, function(data) {
			/*optional stuff to do after success */
			movieObjIndex = 0;
			var objectArray = data.results;
			$(objectArray).each(function(){
				if(movieObjIndex != 0 && movieObjIndex%4 == 0){
					html += '</div>'
				}
				if(movieObjIndex % 4 == 0){
					html += '<div class="row-wrapper">'
				}
				posterSource = basePath + 'w300' + objectArray[movieObjIndex++].poster_path;
				html += '<div class="poster-wrapper">'
				html += '<img class="poster" src="' + posterSource +'">';
				html +='</div>'
			});
			$('#now-playing-wrapper').html(html);
		});
	 });

	$('#search-form-wrapper').submit(function(){
		html = '';
		var userSearch = $('#user-search').val();
		var selectBoxVar = $('#search-select').val();

		var searchURL = 'http://api.themoviedb.org/3/search/'+ selectBoxVar + '?query=' +userSearch + '&api_key='+ apiKey;
		$.getJSON(searchURL, function(data){
			movieObjIndex = 0;
			var numPictures = 0;
			var objectArray = data.results;

			var actorFunction = function(){

				if(this.profile_path){
					if(numPictures != 0 && numPictures%4 == 0){
						html += '</div>'
					}
					if(numPictures % 4 == 0){
						html += '<div class="row-wrapper">'
					}
					profileSource = basePath + 'w300' + this.profile_path;
					html += '<div class="poster-wrapper">'
					html += '<img class="poster" src="' + profileSource +'">' + this.name;
					html +='</div>'
					// makeModalHTML(this);
					numPictures++;
				}
			}
			var movieFunction = function(){
				if(this.poster_path){
					if(numPictures != 0 && numPictures%4 == 0){
						html += '</div>'
					}
					if(numPictures % 4 == 0){
						html += '<div class="row-wrapper">'
					}
					posterSource = basePath + 'w300' + this.poster_path;
					html += '<div class="poster-wrapper">'
					html += '<img class="poster" src="' + posterSource +'">' + this.title;
					html +='</div>'
					// makeModalHTML(this);
					numPictures++;
				}
			}
			var tvFunction =function(){
				if(this.poster_path){
					if(numPictures != 0 && numPictures%4 == 0){
						html += '</div>'
					}
					if(numPictures % 4 == 0){
						html += '<div class="row-wrapper">'
					}
					posterSource = basePath + 'w300' + this.poster_path;
					html += '<div class="poster-wrapper">'
					html += '<img class="poster" src="' + posterSource +'">' + this.original_name;
					html +='</div>'
					// makeModalHTML(this);
					numPictures++;
				}
			}
			var anyFunction = function(){
				switch(this.media_type){
					case 'tv':
						$(this).each(tvFunction)
						break;
					case 'movie':
						$(this).each(movieFunction)
						break;
					case 'person':
						$(this).each(actorFunction)
						break;
				}

			}
			switch(selectBoxVar){
				case 'movie':
					$(objectArray).each(movieFunction);
					break;
				case 'person':
					$(objectArray).each(actorFunction);
					break;
				case 'director':
					$(objectArray).each(directorFunction);
					break;
				case 'multi':
					$(objectArray).each(anyFunction);
					break;
			}
			$('#searched-movies').html(html);

			// $('.poster-wrapper').click(function(){
			// 	var modalId = 'posterModal' + $(this).find('img').attr('src');
			// 	$(modalId).modal();
			// });
		});
		// function makeModalHTML(object){
		// 	var modalHTML = '<div class="modal" id="posterModal'+ $(this).find('poster').attr('src') + '">'
		// 	modalHTML += '<div class="modal-dialog" role="document">'
		// 	modalHTML += '<div class="modal-content">'
		// 	modalHTML += '<div class="modal-header">'
		// 	modalHTML += '<h4 class="modal-title" id="myModalTitle">BUTSSBUTSSBUTTSBUTTS</h4>'
		// 	modalHTML += '</div>'
		// 	modalHTML += '<div class="modal-body">DICKSDICKSDICKSDICKS'
		// 	modalHTML += '</div>'
		// 	modalHTML += '</div>'
		// 	modalHTML += '</div>'
		// 	modalHTML += '</div>'
		// 	$('body').appendTo(modalHTML)
		// }
		event.preventDefault();
		
	});
	
});