google.maps.event.addDomListener(window, 'load', initMap);

function initMap() {
	var mapOptions = {
		center: {
			lat: -41.279214,
			lng: 174.78034
		},
		zoom: 15,
		disableDefaultUI: true
	};

	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
