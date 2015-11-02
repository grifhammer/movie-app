$(document).ready(function(){
	var posters = $('.poster-wrapper')
	var movieObjIndex = 0;
	$(posters).each(function(){
		var currPoster = $(this).find('img')
		$(currPoster).attr('src', objectArray[movieObjIndex++].poster_path);
	});
});