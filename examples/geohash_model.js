// *********************************************
// *********************************************
// Geo by Felipe Oliveira
// March 2011
// http://geeks.aretotally.in/projects/geo
// http://twitter.com/_felipera
// *********************************************
// *********************************************

var geo = require('../lib/geo');

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