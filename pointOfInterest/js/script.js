google.maps.event.addDomListener(window, 'load', initMap);
var map;

function initMap() {
	var mapOptions = {
		center: {
			lat: -41.2865,
			lng: 174.7762
		},
		zoom: 13,
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
					icon: icons[markers[i].stock].icon
				});
			}
		},
		error: function(error) {
			console.log('Error, something went wrong getting markers');
			console.log(error);
		}
	});
}
