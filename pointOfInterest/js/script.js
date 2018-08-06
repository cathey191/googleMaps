google.maps.event.addDomListener(window, 'load', initMap);

function initMap() {
	var mapOptions = {
		center: {
			lat: -41.279214,
			lng: 174.78034
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

	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
