$(document).ready(function() {
	getLocation();
})

// INIT VARS 

var imgArray = [];
var currLat;
var currLong;
var navState = 0;

function openNav() {
	if (navState == 0) {
		document.getElementById("pullOutMenu").style.width = "20%";
		document.getElementById("pushField").style.marginLeft = "20%";
		document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
		navState++;
	}
	else {
		document.getElementById("pullOutMenu").style.width = "0";
		document.getElementById("pushField").style.marginLeft = "0";
		document.body.style.backgroundColor = "white";
		navState--;
	}
}

function closeNav() {
	
}


//https://www.w3schools.com/html/html5_geolocation.asp geolocation info

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
	currLat = position.coords.latitude;
	currLong = position.coords.longitude;
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}
