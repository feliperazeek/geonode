# GeoNode for Node.js
by Felipe Oliveira (http://twitter.com/_felipera)

GeoNode is a basic, but simple, geocode library for Node.js using Google's Geocode API (V3) - Geo Spatial capability hopefully is coming out soon.

## Usage

		var geonode = require('../lib/geonode');
		
		var address = '885 6th Ave #15D New York, NY 10001';
		var sensor = false;
		geonode.geocoder(geonode.google, address, sensor, function(formattedAddress, latitude, longitude) {
			console.log("Formatted Address: " + formattedAddress);
			console.log("Latitude: " + latitude);
			console.log("Longitude: " + longitude);
		});

