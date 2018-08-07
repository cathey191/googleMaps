google.maps.event.addDomListener(window, 'load', initMap);
var map;
var infoBox;
var globalMarkers = [];

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
					'<div class="place"><h3>' +
						markers[i].place_name +
						'</h3><p>Ph: ' +
						markers[i].phone_number +
						'</p></div><hr>'
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
				globalMarkers.push(marker);

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
		map.panTo(marker.position);
		map.setZoom(15);
	});
}

function moveMap(e) {
	for (var i = 0; i < globalMarkers.length; i++) {
		if (globalMarkers[i].title === e.target.innerHTML) {
			map.panTo(globalMarkers[i].position);
			map.setZoom(15);
			infoBox.setContent(
				'<div><strong>' + globalMarkers[i].title + '</strong></div>'
			);
			infoBox.open(map, globalMarkers[i]);
		}
	}
}
