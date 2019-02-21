$(document).ready(function() {
	//getLocation();
	loadSaved();
});

// INIT VARS

var imgArray = [];
var currLat;
var currLong;
var navState = 0;
var currIndex = 0;
var savedFood = [];

document.cookie = [];
//var modal = document.getElementById("moreInfoModal");
var modalOpener = document.getElementById("mainImg");
var modalCloser = document.getElementById("modalClose");



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
/*
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

function goNext() {
	currIndex++;
	console.log("click successful!");
	$.get("http://localhost:3000/calls", function(data) {
		//console.log("AJAX successful");
		//console.log(data);
		//console.log(data.restaurants[currIndex].restName);
		//$("#firstSlideshow").attr("href", "beers.jpg");
		//$("#secondSlideshow").attr("href", "beers.jpg");
		//$("#thirdSlideshow").attr("href", "beers.jpg");
		//$("#links").remove(".slideshowImg");
		$("#links").empty();
		$("#links").append('<a href="' + data.restaurants[currIndex].img + '" class="slideshowImg"> </a>');
		$("#phoneNumber").html(data.restaurants[currIndex].phone);
		$("#moreName").html(data.restaurants[currIndex].restName);
	});
}

function goBack() {
	if (currIndex == 0) {
		return;
	}
	currIndex--;
	console.log("click successful!");
	$.get("http://localhost:3000/calls", function(data) {
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
	$.get("http://localhost:3000/calls", function(data) {
		savedFood.push(data.restaurants[currIndex]);
		window.name = savedFood;
	});
	console.log("Cookie written to");
	console.log(savedFood);
	console.log(window.name);
}

*/

function loadSaved() {
	var savedInfo = sessionStorage.getItem("savedFoods");
	console.log(savedInfo);
	var savedJSONObject = JSON.parse(savedInfo);
	console.log(savedJSONObject);

	console.log(generateTable(savedJSONObject.saved.length));

	$("#saved-body").append(generateTable(savedJSONObject.saved.length));
	
	var JSONIndex = 0;

	for (i =0; i < savedJSONObject.saved.length; i++) {
		var appendJSON = ".col" + JSONIndex;
		$(appendJSON).append('<img src="' + savedJSONObject.saved[JSONIndex].img + '">');
		JSONIndex++;
	}

	/*for (i =0; i < savedInfo.length; i++) {
		console.log("in for loop");
		if (i % 3 ==0) {
			$("#morePictures").append('<tr id=imageBar"' + i +'"> \n </tr>')
		}
		//do divide then floor * 3 to get correct location of tr
		var barToPut = "imageBar" + (Math.floor(i/3) * 3);
		$(barToPut).append('<img class="instaStyle" src="' + savedInfo[i].img +'" </th>');
	}*/
	// for (i = 0; i < )
}

function generateTable(numObjects) {
	var tableCode = "<table id='saved-food' style='width: 100%; margin: 0px 0px;'>";
	var currAddIndex = 0;
	// var numRows = Math.floor(numObjects / 3) + 1;
	// var intCast = parseInt(numObjects);
	// console.log(intCast);
	// var numRows = intCast + 2;
	// console.log(numRows);
	for (i =0; i < numObjects; i++){
		var indexClass = "col" + currAddIndex;
		tableCode += '<tr class="saveStyle ' + indexClass + '"">';
		/*
		for (j = 0; j < 3; j++) {
			var indexClass = "col" + currAddIndex;
			tableCode += '<td class="saveStyle ' + indexClass + '"> </td>';
			currAddIndex++;
		}
		*/
		tableCode += "</tr>";
		currAddIndex++;
	}
	tableCode += "</table>";
	return tableCode;
}