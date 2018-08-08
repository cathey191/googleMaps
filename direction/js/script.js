$(document).ready(function() {
	var map;
	var directionDisplay;
	var directionService;
	document
		.querySelector('#submit')
		.addEventListener('click', findLocations, false);

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

	// function getLocations() {
	// 	$.ajax({
	// 		url: 'data/locations.json',
	// 		dataType: 'json',
	// 		type: 'GET',
	// 		success: function(data) {
	// 			calcRoute(data);
	// 		},
	// 		error: function(error) {
	// 			console.log('Error');
	// 			console.log(error);
	// 		}
	// 	});
	// }

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
		// getLocations();
	}

	// function calcRoute(data) {
	// 	var locations = data;
	// 	var waypts = [];
	//
	// 	stop = new google.maps.LatLng(locations[2].lat, locations[2].long);
	// 	waypts.push({
	// 		location: stop,
	// 		stopover: true
	// 	});
	//
	// 	start = new google.maps.LatLng(locations[1].lat, locations[1].long);
	// 	end = new google.maps.LatLng(locations[0].lat, locations[0].long);
	//
	// 	var request = {
	// 		origin: start,
	// 		destination: end,
	// 		waypoints: waypts,
	// 		optimizeWaypoints: true,
	// 		travelMode: google.maps.DirectionsTravelMode.DRIVING
	// 	};
	//
	// 	directionService.route(request, function(response, status) {
	// 		if (status == google.maps.DirectionsStatus.OK) {
	// 			directionDisplay.setDirections(response);
	// 			var route = response.routes[0];
	// 		}
	// 	});
	// }

	function findLocations(e) {
		event.preventDefault();
		var inputData = $('form').serializeArray();

		var start = inputData[0].value;
		var waypoint = inputData[1].value;
		var end = inputData[2].value;

		console.log(start.coords.latitude());

		// position.coords.latitude()
	}

	// close of doc
});
