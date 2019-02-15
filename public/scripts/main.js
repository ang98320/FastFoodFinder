$(document).ready(function() {
	//getLocation();
	//getRestaurantsList();
});

// INIT VARS

// Order will be {name, img, lat, long, menu}
var imgArray = '{ "restaurants": [' + 
'{ "restName": "Placeholder" , "img": "img/placeholder.jpg" , "lat": "32.1759" , "long": "32.1759", "menu": "#"},' + 
'{ "restName": "Hash Hash a Go Go", "img": "img/Eggs-Benedict-3.jpg", "lat": "32.1475", "long": "32.1475", "menu": "#"},' +
'{ "restName": "Hash Hash a Go Go", "img": "img/Eggs-Benedict-3.jpg", "lat": "32.1475", "long": "32.1475", "menu": "#"} ]}';

var debugimgArray = { 
	"restaurants":[
		{ "restName": "Placeholder" , "img": "img/placeholder.jpg" , "lat": "32.1759" , "long": "32.1759", "menu": "#"},
		{ "restName": "Hash Hash a Go Go", "img": "img/Eggs-Benedict-3.jpg", "lat": "32.1475", "long": "32.1475", "menu": "#"},
		{ "restName": "Hash Hash a Go Go", "img": "img/Eggs-Benedict-3.jpg", "lat": "32.1475", "long": "32.1475", "menu": "#"} ]};
var currLat;
var currLong;
var navState = 0;
var currIndex = 0;

//var modal = document.getElementById("moreInfoModal");
var modalOpener = document.getElementById("mainImg");
var modalCloser = document.getElementById("modalClose");

/*
var restauants = $.getJSON("../../restaurants.json");
console.log(restauants);
*/


function openNav() {
	if (navState == 0) {
		document.getElementById("pullOutMenu").style.width = "65%";
		//document.getElementById("pushField").style.marginLeft = "65%";
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

function openModal() {
	document.getElementById("moreInfoModal").style.display = "block";
	//console.log("openModal");
}

function closeModal() {
	//var modal = document.getElementById("moreInfoModal").style.display = "none";
	document.getElementById("moreInfoModal").style.display = "none";
}

function openModal2() {
	document.getElementById("main-info").style.display = "block";
	console.log("openModal");
}

function closeModal2() {
	//var modal = document.getElementById("moreInfoModal").style.display = "none";
	document.getElementById("main-info").style.display = "none";
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

$.ajax({
    dataType: 'json',
    url: myApiUrl,
    data: data,
    type: 'POST',
    success: function(result)
    { alert("success");}
});

function nextFood() {
	if (currIndex == imgArray.length -1) {
		return;
	}
	currIndex++;
	//var newRest = debugimgArray[currIndex];
	//console.log(newRest);
	var restJSON = JSON.parse(imgArray);
	$("#moreName").html(restJSON.restaurants[currIndex].restName);
	$("#firstScrollPic").attr("href", restJSON.restaurants[currIndex].img);
}

/*
function getRestaurantsList() {
	$.getJSON("http://localhost:3000/restaurants", function(data) {
		console.log(data);
		console.log("AJAX run successful!");
		var index = 0;
		for (var item in data.restaurants) {
			console.log(item);
			var tempItem = item[index];
			console.log(tempItem);
			 var restaurantObject = '{ "info" : [';
			 restaurantObject = restaurantObject + '{ "name":' + tempItem.name + '},';
			 //restaurantObject = restaurantObject + '{ "img"' + tempItem.thumb + '},';
			 //restaurantObject = restaurantObject + '{ "lat"' + tempItem.location.latitude + '},';
			 //restaurantObject = restaurantObject + '{ "long"' + tempItem.location.longitude + '},';
			 //restaurantObject = restaurantObject + '{ "menu"' + tempItem.menu_url + '} ]}';
			 imgArray.push(restaurantObject);
			 index++;
		}
	});
	console.log(imgArray);
}*/