google.maps.event.addDomListener(window, 'load', initMap);
var map;
var infoBox;

function initMap() {
	var mapOptions = {
		center: {
			lat: -41.2765,
			lng: 174.8262
		},
		zoom: 12,
		disableDefaultUI: true,
		mapTypeControl: true,
		mapTypeControlOptions: {
			position: google.maps.ControlPosition.RIGHT_BOTTOM
		},
		fullscreenControl: true,
		fullscreenControlOptions: {
			position: google.maps.ControlPosition.RIGHT_BOTTOM
		},
		streetViewControl: true,
		streetViewControlOptions: {
			position: google.maps.ControlPosition.RIGHT_BOTTOM
		},
		styles: [
			{
				stylers: [{ hue: '#079992' }, { saturation: -60 }]
			},
			{
				featureType: 'road',
				elementType: 'geometry',
				stylers: [
					{
						hue: '#079992'
					}
				]
			},
			{
				featureType: 'water',
				stylers: [
					{
						color: '#82ccdd'
					}
				]
			},
			{
				featureType: 'water',
				elementType: 'labels.text.fill',
				stylers: [
					{
						color: '#079992'
					}
				]
			},
			{
				featureType: 'administrative',
				elementType: 'labels.text.fill',
				stylers: [
					{
						color: '#079992'
					}
				]
			},
			{
				featureType: 'transit',
				stylers: [
					{
						visibility: 'off'
					}
				]
			},
			{
				featureType: 'poi',
				stylers: [
					{
						visibility: 'off'
					}
				]
			}
		]
	};

	map = new google.maps.Map(document.getElementById('map'), mapOptions);

	addMarkers();
}

function addMarkers() {
	var icons = {
		knitting: {
			icon: 'icons/knitting.png'
		},
		sewing: {
			icon: 'icons/pincushion.png'
		}
	};

	$.ajax({
		url: 'data/markers.json',
		type: 'GET',
		dataType: 'json',
		success: function(markers) {
			for (var i = 0; i < markers.length; i++) {
				$('#places').append(
					'<div class="place"><h3>' + markers[i].place_name + '</h3></div><hr>'
				);

				var marker = new google.maps.Marker({
					position: {
						lat: markers[i].lat,
						lng: markers[i].long
					},
					title: markers[i].place_name,
					map: map,
					icon: icons[markers[i].stock].icon,
					animation: google.maps.Animation.DROP
				});

				markerClickEvent(marker);
			}
			$('#places')[0].addEventListener('click', moveMap, false);
		},
		error: function(error) {
			console.log('Error, something went wrong getting markers');
			console.log(error);
		}
	});
}

function markerClickEvent(marker) {
	if (infoBox) {
		infoBox.close();
	}

	infoBox = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, 'click', function() {
		infoBox.setContent('<div><strong>' + marker.title + '</strong></div>');
		infoBox.open(map, marker);
	});
}

function moveMap(e) {
	$.ajax({
		url: 'data/markers.json',
		type: 'GET',
		dataType: 'json',
		success: function(markers) {
			for (var i = 0; i < markers.length; i++) {
				if (markers[i].place_name === e.target.innerHTML) {
					var latlng = new google.maps.LatLng(markers[i].lat, markers[i].long);
					map.panTo(latlng);
					map.setZoom(15);
				}
			}
		},
		error: function(error) {
			console.log('Error, something went wrong getting markers');
			console.log(error);
		}
	});
}
