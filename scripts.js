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
	
	var configJSON = $.ajax({
	 dataType: "json",
	 url: siteConfig
	});

	configJSON.done(function(data){
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
				
				if(objectArray[movieObjIndex].poster_path){
					if(numPictures != 0 && numPictures%4 == 0){
						html += '</div>'
					}
					if(numPictures % 4 == 0){
						html += '<div class="row-wrapper">'
					}
					posterSource = basePath + 'w300' + objectArray[movieObjIndex++].poster_path;
					html += '<div class="poster-wrapper">'
					html += '<img class="poster" src="' + posterSource +'">' + objectArray[movieObjIndex-1].title;
					html +='</div>'
					numPictures++;
				} else{
					movieObjIndex++;
				}
			}
			var movieFunction = function(){

				if(objectArray[movieObjIndex].poster_path){
					if(numPictures != 0 && numPictures%4 == 0){
						html += '</div>'
					}
					if(numPictures % 4 == 0){
						html += '<div class="row-wrapper">'
					}
					posterSource = basePath + 'w300' + objectArray[movieObjIndex++].poster_path;
					html += '<div class="poster-wrapper">'
					html += '<img class="poster" src="' + posterSource +'">' + objectArray[movieObjIndex-1].title;
					html +='</div>'
					numPictures++;
				} else{
					movieObjIndex++;
				}
			}


			var directorFunction = function(){}
			var anyFunction = function(){}
			switch(selectBoxVar){
				case 'movie':
					$(objectArray).each(movieFunction());
					break;
				case 'actor':
					$(objectArray).each(actorFunction());
					break;
				case 'director':
					$(objectArray).each(directorFunction());
					break;
				case 'multi':
					$(objectArray).each(directorFunction());
					break;
			}
			$(objectArray).each(movieFunction());
			$('#searched-movies').html(html);
		})
		event.preventDefault();
	});




	// $.getJSON( "https://api.themoviedb.org/3/configuration?api_key=053c97e8525ebeb4ca1e347bea38a1c8", function(data){
	// 	basePath = data.images.base_url;
	// 	sizeOptions - data.images.poster_sizes;
	// 	posterSize = 'w300';
	// 	logoSizes = logoSizes['original'];
	// 	profileSizes = profileSizes['original'];
	// });

	
});