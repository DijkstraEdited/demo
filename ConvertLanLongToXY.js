
//1- Input sample rof jeddah, alkhalduah district 
//4 locations has been chosen randoly 

const A = {
lan: 21.551304,
lon: 39.127365
};

const B={
lan: 21.556488,
lon: 39.127812
};

const C={
lan: 21.557661,
lon: 39.131405
};

const D={
lan: 21.552447,
lon: 39.133609
};

console.log('  Ax,                    Ay');
console.log(LatLonToMercator(A.lan, A.lon));  
console.log('');


console.log('  Bx,                    By');
console.log(LatLonToMercator(B.lan, B.lon));  
console.log('');

console.log('  Cx,                    Cy');
console.log(LatLonToMercator(C.lan, C.lon));  
console.log('');

console.log('  Dx,                    Dy');
console.log(LatLonToMercator(D.lan, D.lon));  
console.log('');

/* 
**   THIS FUNCTION CONVERTS FROM   **
**   LATITIDE & LANGITUDE TO       **
**   (X,Y)                         **
*/

function LatLonToMercator(lat, lon) {

  var rMajor = 6378137; //Equatorial Radius, WGS84
  var shift  = Math.PI * rMajor;
  var x      = lon * shift / 180;
  var y      = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
  y = y * shift / 180;
  
  return {'X': x, 'Y': y};
}



/*

//   THIS FUNCTION CONVERTS FROM   
//   LATITIDE & LANGITUDE TO       
//   DISTANCE IN KM                


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}


*/