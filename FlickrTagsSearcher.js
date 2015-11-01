function ok(tags){
	var output = '';
	var APIKey = '6a8f39a372143229c537cd123625340d';
	if(tags==undefined) tags = document.getElementById("tags").value;
	alert(tags);
	var SearchAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key='+ APIKey + '&tags='+ tags +'&jsoncallback=?';
				
	$.getJSON(SearchAPI, function(data) { 
		if (data.stat == 'ok') {
			result = data.photos.photo;
			for (var i = 0; i < result.length; i++) {
				var farm_id = result[i].farm;
				var server_id = result[i].server;
				var id = result[i].id;
				var secret = result[i].secret;
				var url= 'http://farm' + farm_id + '.staticflickr.com/' + server_id + '/' + id + '_' + secret + '.jpg';
				output += '<img src="' + url + '" onclick="getInfo('+ id +')">';
			}
			document.getElementById("photos").innerHTML = output;
		}
		else {
		    result = null;
		} 
	});
}

function getInfo(id){
	var output = '';
	var APIKey = '6a8f39a372143229c537cd123625340d';
	var secret = '926275dd091e0f9c';
	var photo_id = id;
	var GetInfoAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.getinfo&format=json&api_key='+ APIKey + '&photo_id='+ photo_id + '&secret='+ secret + '&jsoncallback=?';
	$.getJSON(GetInfoAPI, function(data) {
		if (data.stat == 'ok') {
			result = data.photo;
			var farm_id = result.farm;
			var server_id = result.server;
			var id = result.id;
			var secret = result.secret;
			var url= 'http://farm' + farm_id + '.staticflickr.com/' + server_id + '/' + id + '_' + secret + '.jpg';
			var title = result.title._content;
			output += '<h1>' + title +  '</h1>';
			output += '<div><img src="' + url + '"></div>';
			result_tags = data.photo.tags.tag;
			for (var i = 0; i < result_tags.length; i++) {
				var tag_name = result_tags[i]._content;
				var tag_url = '<a href="#" onclick="ok(\''+ tag_name +'\')">'+ tag_name +'</a>';
				output += tag_url + '&nbsp;&nbsp;';
			}
			document.getElementById("photos").innerHTML = output;
		}
		else {
		    result = null;
		} 
	});
}