// *********************************************
// *********************************************
// Geo by Felipe Oliveira
// March 2011
// http://geeks.aretotally.in/projects/geo
// http://twitter.com/_felipera
// *********************************************
// *********************************************

// Version
this.version = [0, 0, 1];

// Import HTTP to Request Geocode
var http = require('http'); 
var geohash = require('geohash');

// Google Geocode Provider
function GoogleGeocoder() {};

// Google Geocode Provider - Request
GoogleGeocoder.prototype.request = function(location, sensor) {
	return {
		host: 'maps.googleapis.com',
		port: 80,
		path: '/maps/api/geocode/json?address=' + escape(location) + '&sensor=' + sensor,
		method: 'GET'
	};
};

// Google Geocode Provider - Response
GoogleGeocoder.prototype.responseHandler = function(response, callback) {
	json = JSON.parse(response);
	if ( json.results == null || json.results[0] == null ) {
		callback(null, null, null);
	} else {
		callback( json.results[0].formatted_address, json.results[0].geometry.location.lat, json.results[0].geometry.location.lng);
	}
};


// Main Geo Class
function Geo() {
	
  // Read more about it: http://ejohn.org/blog/adv-javascript-and-processingjs/
  if (! (this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }

  // Init Class
  var self = this;
  self.init();
  
};

// Constructor
Geo.prototype.init = function() {
	
  var self = this;
  self.google = new GoogleGeocoder();
  
};

// Get Geocode
Geo.prototype.geocoder = function(geocoder, location, sensor, callback) {
	// Check Input
	if ( geocoder == null ) {
		throw new Error("Invalid Geocoder");
	}
	if ( location == null ) {
		throw new Error("Invalid Location");
	}
	if ( sensor == null ) {
		sensor = false;
	}
	if ( callback == null ) {
		throw new Error("Invalid Callback");
	}
	
	// Get HTTP Request Options
	var options = geocoder.request(location, sensor);

	// Make Request
	connection = http.createClient(options.port, options.host);
    var request = connection.request("GET", options.path);
    
    // Handle Response
    request.addListener("response", function (response) {
    	var responseBody = "";  
    	response.addListener("data", function(chunk) {
    		responseBody += chunk;
    	});
    	response.addListener("end", function() {
    		geocoder.responseHandler(responseBody, callback);
    	});
    });
    
    // End Request - Listener will take care of Response
    request.end();
    
};

// Get GeoHash
Geo.prototype.geohash = function(latitude, longitude, callback) {
	callback( geohash.GeoHash.encodeGeoHash(latitude, longitude) );
};

// Augment GeoHash to a Model Class
Geo.prototype.geomodel = function(modelInstance, locationGetterCallback, geohashSetterCallback, callback) {
	console.log("Location: " + locationGetterCallback(modelInstance));
	Geo.prototype.geocoder(new GoogleGeocoder(), locationGetterCallback(modelInstance), false, function(formattedAddress, latitude, longitude) {
		console.log("Latitude: " + latitude);
		console.log("Longitude: " + longitude);
		console.log("Model: " + modelInstance['address']);
		Geo.prototype.geohash( latitude, longitude, function(geohash) {
			geohashSetterCallback(modelInstance, latitude, longitude, geohash, callback);
		} );
	});
};



// Export Main Class
module.exports = new Geo();

