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

	$('#search-button').click(function(){
		html = '';
		var userSearch = $('#user-search').val();
		var searchURL = 'http://api.themoviedb.org/3/search/movie?query=' +userSearch + '&api_key='+ apiKey;
		$.getJSON(searchURL, function(data){
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
			$('#searched-movies').html(html);
		})
	});




	// $.getJSON( "https://api.themoviedb.org/3/configuration?api_key=053c97e8525ebeb4ca1e347bea38a1c8", function(data){
	// 	basePath = data.images.base_url;
	// 	sizeOptions - data.images.poster_sizes;
	// 	posterSize = 'w300';
	// 	logoSizes = logoSizes['original'];
	// 	profileSizes = profileSizes['original'];
	// });

	
});