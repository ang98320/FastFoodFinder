$(document).ready(function() {
	getLocation(function () {
	console.log(currLat);
	var googleDirections = "https://www.google.com/maps/dir/?api=1&origin=";
	googleDirections = googleDirections + currLat + "," + currLong + "&";
	userLocation = googleDirections;
	});
	currIndex == -1;
	setTimeout(goNext(), 20000);
	// $(".next").click(nextSlideshow());
});

// INIT VARS

var imgArray = [];
var currLat = 32.871229;
var currLong = -117.217869;
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


var autoFill = ["afghani", "african", "senegalese", "southafrican", "newamerican", "tradamerican", "arabian", "argentine", "armenian"];

function openNav() {
	console.log("openNav");
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
	console.log("openModal");
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

function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
  setTimeout(callback(), 20000);
}

function showPosition(position) {
	currLat = position.coords.latitude;
	currLong = position.coords.longitude;
	// console.log(currLat);
	// console.log(currLong);
	// googleDirections = googleDirections + currLong + "&";
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

function goNext() {
	currIndex++;
	// $.get("https://a6-fasteats.herokuapp.com/calls", function(data) {
	// $.get("http://localhost:3000/calls", function(data) {
	$.get("/calls", function(data) {
		$("#heartButton").removeClass("fa");
		$("#links").empty();
		$("#links").append('<a href="' + data.restaurants[currIndex].img + '" class="slideshowImg"> </a>');
		$("#links").append('<a href="/img/beers.jpg" class="slideshowImg"> </a>');

		$("#additionalImg").attr("src", data.restaurants[currIndex].img);
		$("#phoneNumber").html(data.restaurants[currIndex].phone);
		$("#moreName").html(data.restaurants[currIndex].restName);
		googleDirections = userLocation + "destination=" + data.restaurants[currIndex].lat + "," + data.restaurants[currIndex].long + "&travelmode=driving";
		// console.log(googleDirections);
		$("#navi").attr("href", googleDirections)
		var gallery = blueimp.Gallery(
		    document.getElementById('links').getElementsByTagName('a'),
				//list,
		    {
		        container: '#blueimp-gallery-carousel',
		        carousel: true,
						startSlideshow: false,
						fullScreen: false,
						toggleControlsOnSlideClick: false,
						toggleControlsOnSlideClick: false,
		    }
		);
	});
}

function goBack() {
	if (currIndex == 0) {
		alert("There aren't any restaurants that way, turn around Danger Robinson!");
		return;
	}
	currIndex--;
	// console.log("click successful!");
	// $.get("https://a6-fasteats.herokuapp.com/calls", function(data) {
	// $.get("http://localhost:3000/calls", function(data) {
	$.get("/calls", function(data) {
		$("#links").empty();
		$("#links").append('<a href="' + data.restaurants[currIndex].img + '" class="slideshowImg"> </a>');
		$("#links").append('<a href="/img/beers.jpg" class="slideshowImg"> </a>');
		$("#phoneNumber").html(data.restaurants[currIndex].phone);
		$("#moreName").html(data.restaurants[currIndex].restName);

		var gallery = blueimp.Gallery(
		    document.getElementById('links').getElementsByTagName('a'),
				//list,
		    {
		        container: '#blueimp-gallery-carousel',
		        carousel: true,
						startSlideshow: false,
						fullScreen: false,
						toggleControlsOnSlideClick: false,
						toggleControlsOnSlideClick: false,
		    }
		);
	});
}

function save() {
	// $.get("https://a6-fasteats.herokuapp.com/calls", function(data) {
	// $.get("http://localhost:3000/calls", function(data) {
		$.get("/calls", function(data) {
		stringJSON = JSON.stringify(data.restaurants[currIndex]);
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

function appendJSONText(string) {
	if (this.endsWith("}]")) {
		this.replace("}]", "");
	}
		return this.concat("," + string + "}]");
}


function nextSlideshow() {
	// This should work on click of a.next
	// $.get("https://a6-fasteats.herokuapp.com/calls", function(data) {
	$.get("http://localhost:3000/calls", function(data) {
		// var imgLink = '"' +  data.restaurants[currIndex].img + '"';
		// console.log(imgLink)
		 var gallery = blueimp.Gallery(
		    document.getElementById('links').getElementsByTagName('a'),
				//list,
		    {
		        container: '#blueimp-gallery-carousel',
		        carousel: true,
						startSlideshow: false,
						fullScreen: false,
						toggleControlsOnSlideClick: false,
						toggleControlsOnSlideClick: false,
						onslide: function (index, slide) {
							 // will need to keep track if going forward or backward
							// console.log('next');
							//gallery.add(['/img/udon.jpg']);
						},
		    }
		);
}); 
// /*
		var gallery = blueimp.Gallery(
	    document.getElementById('links').getElementsByTagName('a'),
			//list,
	    {
	        container: '#blueimp-gallery-carousel',
	        carousel: true,
					startSlideshow: false,
					fullScreen: false,
					toggleControlsOnSlideClick: false,
					toggleControlsOnSlideClick: false,
					onslide: function (index, slide) {
						 // will need to keep track if going forward or backward 
						 console.log('next');
						gallery.add(["/img/udon.jpg"]);
					},
	    }
	); 
}


function lastSlideshow() {
	//This should work on click of a.prev
}
