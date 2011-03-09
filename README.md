# Geo for Node.js
by Felipe Oliveira (http://twitter.com/_felipera)

Geo is a very basic, but simple, geocode library for Node.js using Google's Geocode API (V3) - Geo Spatial features are coming out soon.

## Usage

		var geo = require('../lib/geo');
		
		var address = '885 6th Ave #15D New York, NY 10001';
		var sensor = false;
		geo.geocoder(geo.google, address, sensor, function(formattedAddress, latitude, longitude) {
			console.log("Formatted Address: " + formattedAddress);
			console.log("Latitude: " + latitude);
			console.log("Longitude: " + longitude);
		});

