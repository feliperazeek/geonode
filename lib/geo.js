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
var geohash = require('geohash');
var Shred = require( 'shred' );
var shred = new Shred();

// Google Geocode Provider
function GoogleGeocoder() {};

// Google Geocode Provider - Request
GoogleGeocoder.prototype.request = function(location, sensor) {
  if (typeof location == 'object' && location['latitude'] != null && location['longitude'] != null) {
    // if location is an object with lat and long properties, we do reverse geocoding
    var path = '/maps/api/geocode/json?latlng=' + escape(location['latitude'].toString() + ',' + location['longitude'].toString()) + '&sensor=' + sensor;
  } else {
    // normal forward geocoding
    var path = '/maps/api/geocode/json?address=' + escape(location) + '&sensor=' + sensor;
  }

	return {
		host: 'maps.googleapis.com',
		port: 80,
		path: path,
		method: 'GET'
	};
};

// Google Geocode Provider - Response
GoogleGeocoder.prototype.responseHandler = function(json, callback ) {
    var _details = function (data) {
        var details = {};
        data.address_components.map(function (d) {
            d.types.map(function (k) {
                details[k] = {long_name: d.long_name,
                              short_name: d.short_name};
            });
        });
        return details;
    };

	if ( json == null || json.results == null || json.results[0] == null ) {
		callback(null, null, null, null);
	} else {
		callback( json.results[0].formatted_address, json.results[0].geometry.location.lat, json.results[0].geometry.location.lng, _details(json.results[0]));
	}
};

// OSM nominatim Geocode Provider
function OSMnominatim() {};

// OSM nominatim Provider - Request
OSMnominatim.prototype.request = function(location, sensor) {

	// Path information: http://wiki.openstreetmap.org/wiki/Nominatim
	var path = '/search/?format=json&q=' + escape(location) + '&sensor=' + sensor;

	return {
		host: 'nominatim.openstreetmap.org',
		port: 80,
		path: path,
		method: 'GET'
	};
};

// OSM nominatim Provider - Response
OSMnominatim.prototype.responseHandler = function(json, callback) {
	if ( json == null || json.length == null || json[0] == null ) {
		callback(null, null, null, null);
	} else {
		callback(
			json[0].display_name,
			Math.round( json[0].lat * 10000000) / 10000000,
			Math.round(json[0].lon * 10000000) / 10000000
		);
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
  self.osm = new OSMnominatim();

};

// Get Geocode
Geo.prototype.geocoder = function(geocoder, location, sensor, callback, timeout) {
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
    shred.get({
        timeout: timeout ? timeout : ( 60 * 1000 ),
        url: "http://" + options.host + ":" + options.port + options.path,
        on: {
            response: function( response ) {
                geocoder.responseHandler( response.content.data, callback );
            },
            error: function( response ) {
                geocoder.responseHandler( null, callback );
            },
            timeout: function() {
                geocoder.responseHandler( null, callback );
            }
        }
    });        
    
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
