// *********************************************
// *********************************************
// Geo by Felipe Oliveira
// March 2011
// http://geeks.aretotally.in/projects/geo
// http://twitter.com/_felipera
// *********************************************
// *********************************************

var geo = require('../lib/geo');

// Good Address
var address = '885 6th Ave #15D New York, NY 10001';
var sensor = false;
geo.geocoder(geo.google, address, sensor, function(formattedAddress, latitude, longitude) {
	console.log("Formatted Address: " + formattedAddress);
	console.log("Latitude: " + latitude);
	console.log("Longitude: " + longitude);
});

// Bad Address
// var address = '1111 Foobar Ave #15D New York, NY 9999';
// var sensor = false;
// geo.geocoder(geo.google, address, sensor, function(formattedAddress, latitude, longitude) {
	// console.log("Formatted Address: " + formattedAddress);
	// console.log("Latitude: " + latitude);
	// console.log("Longitude: " + longitude);
// });


