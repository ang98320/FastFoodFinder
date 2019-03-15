$(document).ready(function() {
	sessionStorage.clear();
	if(sessionStorage.hasLat) {
		currLat = sessionStorage.hasLat;
		currLong = sessionStorage.hasLong;
		var googleDirections = "https://www.google.com/maps/dir/?api=1&origin=";
		googleDirections = googleDirections + currLat + "," + currLong + "&";
		userLocation = googleDirections;
		console.log(userLocation);
	}
	else {
		getLocation();
	}
  	console.log("at login");
});

function login() {
  $.get("/main", function(data) {
    //var yelp = JSON.parse('<%- JSON.stringify(yelp) %>');
    //console.log(data);
    console.log("going to main");
  });
}

function getLocation() {
	if (sessionStorage.hasLat) {
		return;
	}
	else{
	  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(showPosition, showError);
	  } else {
	    alert("Geolocation is not supported by this browser.");
	  }
	}
}

function showPosition(position) {
	sessionStorage.hasLat = position.coords.latitude;
	sessionStorage.hasLong = position.coords.longitude;
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.")
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.")
      break;
  }
}
