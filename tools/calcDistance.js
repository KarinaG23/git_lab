let  rad = function(x) {
	return x * Math.PI / 180;
  };
 module.exports = function(p1, p2) {
	var R = 6378137; // Earth’s mean radius in meter
	var dLat = rad(p2.lat - p1.lat);
	var dLong = rad(p2.lng - p1.lng);
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	  Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
	  Math.sin(dLong / 2) * Math.sin(dLong / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	return d; // returns the distance in meter
  };
//   getDistance({lat:48.26457471434441,lng:25.91208169723737},{lat:48.26461756691893,lng:25.915257432512515} 