[![build status](https://secure.travis-ci.org/feliperazeek/geonode.png)](http://travis-ci.org/feliperazeek/geonode)
# Geo for Node.js
by Felipe Oliveira (http://twitter.com/_felipera)

Geo is a very basic, but simple, geo library for Node.js using Google's Geocode API (V3) for Geocoding and GeoHash for GeoSpatial support.



## Installation

		npm install geo



## Usage - Geocode

		var geo = require('geo');

		var address = '885 6th Ave #15D New York, NY 10001';
		var sensor = false;
		geo.geocoder(geo.google, address, sensor,
		function(formattedAddress, latitude, longitude, details) {
			console.log("Formatted Address: " + formattedAddress);
			console.log("Latitude: " + latitude);
			console.log("Longitude: " + longitude);
                        console.log("Address details:", details);
		});

		// Reverse Geocoding also works
		var latlong = { 'latitude': 52.5112, 'longitude': 13.45155};
		geo.geocoder(geo.google, latlong, sensor,
		function(formattedAddress, latitude, longitude, details) {
			console.log("Formatted Address: " + formattedAddress);
			console.log("Latitude: " + latitude);
			console.log("Longitude: " + longitude);
                        console.log("Address details:", details);
		});

## Usage - GeoHash

		// First define a model instance
		var model = {'address': '885 6th #15D, New York, NY 10001', 'baths': '1', 'beds': '1'};

		// Define callback that gets the location (from a single field, multiple fields, whatever) from the model instance (model can be anything, DB class, JSON, array)
		var locationGetterCallback = function(model) { return model['address']; };

		// Define callback that will augment the model instance with geo information such as latitude, longitude and geohash
		var geoSetterCallback = function(model, latitude, longitude, hash, callback) {
			console.log('Geo Hash: ' + hash);
			model['latitude'] = latitude;
			model['longitude'] = longitude;
			model['geohash'] = hash;
			callback( model );
		};

		// Now let's see what happens with the model
		geo.geomodel(model, locationGetterCallback, geoSetterCallback, function(model) {
			console.log("Model: " + model['address'] + ', Geo: ' + model['geohash']);
		});



## More Information on GeoHash

1. See it in action at http://openlocation.org/geohash/geohash-js/.

2. Go understand how it works at http://en.wikipedia.org/wiki/Geohash and http://hitching.net/2009/11/10/scalable-fast-accurate-geo-apps-using-google-app-engine-geohash-faultline-correction/.
