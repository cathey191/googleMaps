$(document).ready(function() {
	var map;
	var markersArray = [];
	var dataArray = [];
	var directionDisplay;
	var directionService;
	var infoBox;
	var start;
	var end;
	var service;
	document.querySelector('#submit').addEventListener('click', filter, false);
	document
		.querySelector('#travelMode')
		.addEventListener('change', changeTravMode, false);

	// get key
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

	// Use key to get google api
	function getMap(key) {
		$.ajax({
			url:
				'https://maps.googleapis.com/maps/api/js?key=' +
				key +
				'&libraries=places',
			dataType: 'jsonp',
			type: 'GET',
			success: function() {
				directionService = new google.maps.DirectionsService();
				start = new google.maps.LatLng(-41.2792, 174.7803);
				initMap();
			},
			error: function(error) {
				console.log('Error');
				console.log(error);
			}
		});
	}

	// create map
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

	// get marker data
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

	// create markers
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

	// list places in dom
	function listPlaces(data) {
		var newPlace = '<div class="place" data-id=' + data.id + '>';
		newPlace += '<h3>' + data.place_name + '</h3>';
		newPlace += '<p id="type">' + data.place_type + '</p>';
		newPlace += '<p id="price">Price: ' + checkPrice(data) + '</p>';
		newPlace += '</div><hr>';

		$('#places').append(newPlace);
	}

	// display price of venue
	function checkPrice(data) {
		if (data.cost === false) {
			return 'Free';
		} else {
			return '$' + data.cost;
		}
	}

	// event listener for markers
	function markerListner(marker) {
		infoBox = new google.maps.InfoWindow();
		google.maps.event.addListener(marker, 'click', function() {
			infoBox.setContent('<div><strong>' + marker.title + '</strong></div>');
			infoBox.open(map, marker);
			calcRoute(marker);
			findPlaceInfo(marker);
		});
	}

	// event listener for list items
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
				calcRoute(markersArray[i]);
				findPlaceInfo(markersArray[i]);
			}
		}
	}

	// filter markers
	function filter(e) {
		event.preventDefault();
		var inputData = $('#filters').serializeArray();

		for (var i = 0; i < markersArray.length; i++) {
			markersArray[i].setMap(null);
		}
		markersArray = [];

		for (var i = 0; i < inputData.length; i++) {
			for (var j = 0; j < dataArray.length; j++) {
				if (inputData[i].value === dataArray[j].place_type) {
					createMarkers(dataArray[j]);
				}
			}
		}
	}

	// calculate route
	function calcRoute(location) {
		var locPos = location.getPosition();

		end = location.position;

		var request = {
			origin: start,
			destination: end,
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};

		directionService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionDisplay.setDirections(response);
				var route = response.routes[0];
			}
		});
	}

	// change travel mode
	function changeTravMode() {
		var mode = $('#travelMode').serializeArray()['0'].value;

		var request = {
			origin: start,
			destination: end,
			travelMode: google.maps.TravelMode[mode]
		};

		directionService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionDisplay.setDirections(response);
				var route = response.routes[0];
			}
		});
	}

	// get info about places
	function findPlaceInfo(marker) {
		var request = {
			query: marker.title + ' Wellington, New Zealand',
			fields: [
				'id',
				'name',
				'photos',
				'formatted_address',
				'rating',
				'opening_hours'
			]
		};

		service = new google.maps.places.PlacesService(map);
		service.findPlaceFromQuery(request, getPlaces);
	}

	// info from places
	function getPlaces(results, status) {
		if (status == 'OK') {
			for (var i = 0; i < results.length; i++) {
				console.log(results[i]);
			}
		} else {
			console.log('Something went wrong with getting places');
		}
	}

	// close of doc
});
