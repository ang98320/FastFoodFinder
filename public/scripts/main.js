var resturants = [];

$(document).ready(function() {
	if(sessionStorage.hasLat) {
		currLat = sessionStorage.hasLat;
		currLong = sessionStorage.hasLong;
		googleDirections = googleDirections + currLat + "," + currLong + "&";
		userLocation = googleDirections;
		console.log(userLocation);
	}
	else {
		getLocation();
	}
	currIndex == -1;
	//goNext();
	getProfileImage();
	fetchData(function(result) {
		var json = JSON.parse(result);
		console.log(json);
		for (i = 0; i < json.businesses.length; i++) {
			var resturant = {
				title: json.businesses[i].name,
				alias: json.businesses[i].alias,
				href: json.businesses[i].image_url,
				// phone: json.businesses[i].display_phone,
				phone: json.businesses[i].phone,
				lat: json.businesses[i].coordinates.latitude,
				long: json.businesses[i].coordinates.longitude,
				categories: json.businesses[i].categories,
			}
			resturants.push(resturant);
		}
		var currentIndex = 0;
		var maxIndex = 0;
		console.log(resturants);
		var gallery = blueimp.Gallery(
				//document.getElementById('links').getElementsByTagName('a'),
				//list,
				resturants,
				{
						container: '#blueimp-gallery-carousel',
						carousel: true,
						continuous: false,
						startSlideshow: false,
						fullScreen: false,
						toggleControlsOnSlideClick: false,
						toggleControlsOnSlideClick: false,
						onslide: function (index, slide) {
							if ((currentIndex + 1) == index) {
								currentIndex = index;
								galleryInd = index;
								console.log('next: ' + index);
								if (maxIndex < index) {
									maxIndex++;
									goNext(index, function(result) {
										console.log(result);
										gallery.add(result);
									});
								}
							} else if ((currentIndex - 1) == index) {
								currentIndex = index;
								console.log('prev: ' + index);
							}
						},
				}
		);
	});
});

// INIT VARS

var imgArray = [];
var currLat;
var currLong;
var navState = 0;
var currIndex = 0;
var savedFood = [];
sessionStorage.setItem('savedFoods', []);
document.cookie = [];
//var modal = document.getElementById("moreInfoModal");
var modalOpener = document.getElementById("mainImg");
var modalCloser = document.getElementById("modalClose");
var savedJSONString = '{ "saved" : [';
var saveIndex = 0;
var googleDirections = "https://www.google.com/maps/dir/?api=1&origin=";
var userLocation;
var galleryInd = 0;

$.get("/", function(data) {
  //var yelp = JSON.parse('<%- JSON.stringify(yelp) %>');
	//console.log(data);
	console.log("inside main.js after / called in app.js")
});

/*
$.get("/getnext", function(data) {
  //var yelp = JSON.parse('<%- JSON.stringify(yelp) %>');
	console.log("/getnext called");
	console.log(data);
});
*/

function openNav() {
	if (navState == 0) {
		console.log("openNav");
		document.getElementById("pullOutMenu").style.width = "65%";
		//document.getElementById("pushField").style.marginLeft = "65%";
		document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
		navState++;
	}
	else {
		console.log("closeNav");
		document.getElementById("pullOutMenu").style.width = "0";
		document.getElementById("pushField").style.marginLeft = "0";
		document.body.style.backgroundColor = "white";
		navState--;
	}
}

function openModal() {
	document.getElementById("moreInfoModal").style.display = "block";
	console.log("openModal");
	console.log(galleryInd);
	$("#phoneNumber").html(resturants[galleryInd].phone);
	$("#additionalImg").attr('src', resturants[galleryInd].href);
	$("#moreName").html(resturants[galleryInd].title);
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

/*
function loadList(callback) {
	$.get("/calls", function(data) {
		var res = []
		for (i = 0; i < 3; i++) {
			currIndex++;
			var a = {
				title: data.restaurants[i].restName,
				href: data.restaurants[i].img,
				phone: data.restaurants[i].phone,
			}
			res.push(a);
		}
		callback(res)
	});
} */

function fetchData(callback) {
	console.log(sessionStorage.hasLat)
	console.log(sessionStorage.hasLong)
	$.get("/getnext/:lat/:long", {lat:sessionStorage.hasLat, long:sessionStorage.hasLong} ,function(data) {
		console.log(data);
		callback(data.yelp.body);
		// $("#navigator".attr("href",))
	});
}

function goNext(index, callback) {
	//console.log("index: ", index);
	//currIndex++;
	//console.log("currIndex: ", currIndex);
	/*
	$.get("/calls", function(data) {
		$("#heartButton").removeClass("fa");
		var a = {
			title: data.restaurants[currIndex].restName,
			href: data.restaurants[currIndex].img,
			phone: data.restaurants[currIndex].phone,
		}
		callback(a);
	}); */
	//return "hi";
}

function goBack() {
	if (currIndex == 0) {
		return;
	}
	currIndex--;
	console.log("click successful!");
	$.get("https://a6-fasteats.herokuapp.com/calls", function(data) {
		//console.log("AJAX successful");
		//console.log(data);
		//console.log(data.restaurants[currIndex].restName);
		$("#links").empty();
		$("#links").append('<a href="' + data.restaurants[currIndex].img + '" class="slideshowImg"> </a>');
		$("#phoneNumber").html(data.restaurants[currIndex].phone);
		$("#moreName").html(data.restaurants[currIndex].restName);
	});
}

function save() {
	$.get("/calls", function(data) {
	// $.get("http://localhost:3000/calls", function(data) {
		stringJSON = JSON.stringify(data.restaurants[currIndex - 3]);
		savedFood.push(stringJSON);
		if(savedJSONString.includes(',' + stringJSON)) {
			// console.log("Checked ,");
			alert("You already saved this! Removing!");
			appendedString = ',' + stringJSON;
			// console.log(appendedString);
			savedJSONString = savedJSONString.replace(appendedString, '');
			$("#heartButton").removeClass("fa");
			return;
		}
		if(savedJSONString.includes(stringJSON)) {
			console.log("Checked empty");
			alert("You already saved this! Removing!");
			savedJSONString = savedJSONString.replace(stringJSON, "");
			$("#heartButton").removeClass("fa");
			return;
		}
		if (savedJSONString.endsWith("]}")) {
			// console.log("ends with }]");
			savedJSONString = savedJSONString.replace("]}", "");
		}
		if (savedJSONString ===  '{ "saved" : [') {
			savedJSONString = savedJSONString.concat(stringJSON + "]}");
		}
		else {
			savedJSONString = savedJSONString.concat("," + stringJSON + "]}");
		}
		if($("#heartButton").hasClass("fa")) {
			$("#heartButton").removeClass("fa");
		}
		else {
			$("#heartButton").addClass("fa");
		}
		console.log(savedJSONString);
		sessionStorage.setItem('savedFoods', savedJSONString);
		saveIndex++;
	});
}

function loadSaved() {
	savedInfo = window.name;
	console.log(savedInfo);
	for (i =0; i < savedInfo.length; i++) {
		if (i % 3 ==0) {
			$("#morePictures").append('<tr id=imageBar"' + i +'"> \n </tr>')
		}
		//do divide then floor * 3 to get correct location of tr
		var barToPut = "imageBar" + (Math.floor(i/3) * 3);
		$(barToPut).append('<img class="instaStyle" src="' + savedInfo[i].img +'" </th>');
	}
}


function appendJSON(string) {
	if (this.endsWith("}]")) {
		this.replace("}]", "");
	}
		return this.append("," + string + "}]")
}

function changeUser(response) {
  //Add code to change name and image
  //$(".facebookLogin").hide();
  //document.getElementById("name").innerHTML = response.name;
  //document.getElementById("photo").src = response.picture.data.url;
}
