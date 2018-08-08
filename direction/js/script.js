$(document).ready(function() {
	var map;
	var directionDisplay;
	var directionService;
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
			url: 'https://maps.googleapis.com/maps/api/js?key=' + key,
			dataType: 'jsonp',
			type: 'GET',
			success: function() {
				directionService = new google.maps.DirectionsService();
				initMap();
			},
			error: function(error) {
				console.log('Error');
				console.log(error);
			}
		});
	}

	function initMap() {
		directionDisplay = new google.maps.DirectionsRenderer();

		var wellington = new google.maps.LatLng(-41.28646, 174.776236);

		var myOptions = {
			zoom: 6,
			mapTypeID: 'roadmap',
			center: wellington
		};

		map = new google.maps.Map(document.getElementById('map'), myOptions);

		directionDisplay.setMap(map);
		calcRoute();
	}

	function calcRoute() {
		var waypts = [];

		stop = new google.maps.LatLng(-38.685692, 176.07021);
		waypts.push({
			location: stop,
			stopover: true
		});

		start = new google.maps.LatLng(-41.28646, 174.776236);
		end = new google.maps.LatLng(-36.84846, 174.763332);

		var request = {
			origin: start,
			destination: end,
			waypoints: waypts,
			optimizeWaypoints: true,
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};

		directionService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionDisplay.setDirections(response);
				var route = response.routes[0];
			}
		});
	}

	function findMe() {}

	// close of doc
});
