google.maps.event.addDomListener(window, 'load', initMap);

function initMap() {
	var mapOptions = {
		center: {
			lat: -41.279214,
			lng: 174.78034
		},
		zoom: 6,
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
				featureType: 'water',
				stylers: [{ color: '#F0F0F0' }]
			},
			{
				featureType: 'road',
				elementType: 'geometry',
				stylers: [{ color: '#7CE9E6' }]
			},
			{
				featureType: 'landscape',
				elementType: 'geometry',
				stylers: [{ color: '#FFFFFF' }]
			},
			{
				featureType: 'landscape',
				elementType: 'labels',
				stylers: [{ visibility: 'off' }]
			},
			{
				featureType: 'poi.park',
				stylers: [{ visibility: 'off' }]
			},
			{
				featureType: 'administrative',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#403042' }]
			}
		]
	};

	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
