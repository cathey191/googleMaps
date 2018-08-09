$(document).ready(function() {
	var map;
	var markersArray = [];
	var dataArray = [];
	var directionDisplay;
	var directionService;
	var infoBox;
	document.querySelector('#submit').addEventListener('click', filter, false);

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
		directionDisplay = new google.maps.DirectionsRenderer({
			suppressMarkers: true
		});

		map = new google.maps.Map(document.getElementById('map'), {
			center: {
				lat: -41.306978,
				lng: 174.786988
			},
			mapTypeID: 'roadmap',
			zoom: 14
		});

		directionDisplay.setMap(map);
		getMarkers();
	}

	function getMarkers() {
		$.ajax({
			url: 'data/poi.json',
			dataType: 'json',
			type: 'GET',
			success: function(data) {
				for (var i = 0; i < data.length; i++) {
					createMarkers(data[i]);
					listPlaces(data[i]);
					dataArray.push(data[i]);
				}

				document.querySelector('#places');
				addEventListener('click', placeListner, false);
			},
			error: function(error) {
				console.log('Error');
				console.log(error);
			}
		});
	}

	function createMarkers(data) {
		var marker = new google.maps.Marker({
			position: {
				lat: data.lat,
				lng: data.long
			},
			title: data.place_name,
			dataID: data.id,
			dataType: data.place_type,
			map: map
		});

		markerListner(marker);

		markersArray.push(marker);
	}

	function listPlaces(data) {
		var newPlace = '<div class="place" data-id=' + data.id + '>';
		newPlace += '<h3>' + data.place_name + '</h3>';
		newPlace += '<p id="type">' + data.place_type + '</p>';
		newPlace += '<p id="price">Price: ' + checkPrice(data) + '</p>';
		newPlace += '</div><hr>';

		$('#places').append(newPlace);
	}

	function checkPrice(data) {
		if (data.cost === false) {
			return 'Free';
		} else {
			return '$' + data.cost;
		}
	}

	function markerListner(marker) {
		infoBox = new google.maps.InfoWindow();
		google.maps.event.addListener(marker, 'click', function() {
			infoBox.setContent('<div><strong>' + marker.title + '</strong></div>');
			infoBox.open(map, marker);
			// map.panTo(marker.position);
			// map.setZoom(15);
			calcRoute(marker);
		});
	}

	function placeListner(e) {
		if (typeof e.target.parentElement.dataset.id === 'string') {
			var id = e.target.parentElement.dataset.id;
		} else if (typeof e.target.dataset.id === 'string') {
			var id = e.target.dataset.id;
		} else {
			return;
		}

		for (var i = 0; i < markersArray.length; i++) {
			if (id == markersArray[i].dataID) {
				infoBox.setContent(
					'<div><strong>' + markersArray[i].title + '</strong></div>'
				);
				infoBox.open(map, markersArray[i]);
				// map.panTo(markersArray[i].position);
				// map.setZoom(15);
				calcRoute(markersArray[i]);
			}
		}
	}

	function filter(e) {
		event.preventDefault();
		var inputData = $('form').serializeArray();

		for (var i = 0; i < markersArray.length; i++) {
			markersArray[i].setMap(null);
		}
		markersArray = [];

		for (var i = 0; i < inputData.length; i++) {
			for (var j = 0; j < dataArray.length; j++) {
				if (inputData[i].value === dataArray[j].place_type) {
					console.log('pass');
					createMarkers(dataArray[j]);
				}
			}
		}
	}

	function calcRoute(location) {
		console.log(location.position);

		var locPos = location.getPosition();

		start = new google.maps.LatLng(-41.2792, 174.7803);
		end = location.position;

		var request = {
			origin: start,
			destination: end,
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};

		directionService.route(request, function(response, status) {
			console.log(status);
			if (status == google.maps.DirectionsStatus.OK) {
				console.log('pass');
				directionDisplay.setDirections(response);
				var route = response.routes[0];
			}
		});
	}

	// close of doc
});
