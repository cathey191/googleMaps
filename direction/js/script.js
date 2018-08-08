$(document).ready(function() {
	var map;
	var markersArray = [];
	var infoBox;
	document.querySelector('#findMe').addEventListener('click', findMe, false);

	$.ajax({
		url: 'config.json',
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			getMap(data[0].API_KEY);
		},
		error: function(error) {
			console.log('Error');
			console.log(error);
		}
	});

	function getMap(key) {
		$.ajax({
			url:
				'https://maps.googleapis.com/maps/api/js?key=AIzaSyDT99gEi6xQmHKc62NlhC1lq2rOfpIwAVQ',
			dataType: 'jsonp',
			type: 'GET',
			success: function() {
				initMap();
			},
			error: function(error) {
				console.log('Error');
				console.log(error);
			}
		});
	}

	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {
				lat: -41.306978,
				lng: 174.786988
			},
			zoom: 14
		});
	}

	function findMe() {}

	// close of doc
});
