// *********************************************
// *********************************************
// GeoNode by Felipe Oliveira
// March 2011
// http://geeks.aretotally.in/projects/geonode
// http://twitter.com/_felipera
// *********************************************
// *********************************************

var geonode = require('../lib/geonode');

// Good Address
var address = '885 6th Ave #15D New York, NY 10001';
var sensor = false;
geonode.geocoder(geonode.google, address, sensor, function(formattedAddress, latitude, longitude) {
	console.log("Formatted Address: " + formattedAddress);
	console.log("Latitude: " + latitude);
	console.log("Longitude: " + longitude);
});

// Bad Address
var address = '1111 Foobar Ave #15D New York, NY 9999';
var sensor = false;
geonode.geocoder(geonode.google, address, sensor, function(formattedAddress, latitude, longitude) {
	console.log("Formatted Address: " + formattedAddress);
	console.log("Latitude: " + latitude);
	console.log("Longitude: " + longitude);
});
