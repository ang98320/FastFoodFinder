var resturants = [];
var gallery;

$(document).ready(function() {
	initializePage();
	console.log("user id is:", sessionStorage.id)
	//console.log("currIndex:", sessionStorage.currIndex)
	if(sessionStorage.hasLat) {
		console.log("already has location")
		currLat = sessionStorage.hasLat;
		currLong = sessionStorage.hasLong;
		googleDirections = googleDirections + currLat + "," + currLong + "&";
		userLocation = googleDirections;
		console.log(userLocation);
		sessionStorage.setItem("userLocation", userLocation);
	}
	else {
		getLocation(function (result) {
			console.log("getLocation:", result);
		});
		currLat = sessionStorage.hasLat;
		currLong = sessionStorage.hasLong;
		googleDirections = googleDirections + currLat + "," + currLong + "&";
		userLocation = googleDirections;
		console.log(userLocation);
		sessionStorage.setItem("userLocation", userLocation);
	}
	currIndex == -1;

	if (sessionStorage.savedFoods) {
		savedJSONString = sessionStorage.getItem("savedFoods");
	}
	else {
		sessionStorage.setItem("savedFoods", []);
	}
	//goNext();
	getProfileImage();
	fetchData(function(result) {
		var json = JSON.parse(result);
		console.log(json);
		for (i = 0; i < json.businesses.length; i++) {
			var resturant = {
				title: json.businesses[i].name,
				href: json.businesses[i].image_url,
				// phone: json.businesses[i].display_phone,
				phone: json.businesses[i].phone,
				lat: json.businesses[i].coordinates.latitude,
				long: json.businesses[i].coordinates.longitude,
				alias: json.businesses[i].alias,
				categories: json.businesses[i].categories,
				liked: false,
			}
			resturants.push(resturant);
		}
		// $("#navigator").attr("href", userLocation + "&destination=" + resturants[0].lat + "," + resturants[0].long +"&travelmode=driving");
		$("#director").attr("href", userLocation + "&destination=" + resturants[0].lat + "," + resturants[0].long +"&travelmode=driving");
		var currentIndex = 0;
		var maxIndex = 0;
		console.log(resturants);
		gallery = blueimp.Gallery(
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
						hidePageScrollbars:false,
						stretchImages: true,
						index: sessionStorage.currIndex,
						onslide: function (index, slide) {
							sessionStorage.currIndex = index;
							var liked = resturants[index].liked;
							// console.log("liked:", liked)
							toggleHeart(liked);
							openMap(userLocation, resturants[sessionStorage.currIndex].lat, resturants[sessionStorage.currIndex].long);
							if ((currentIndex + 1) == index) {
								sessionStorage.currIndex = index;
								currentIndex = index;
								galleryInd = index;
								console.log('next: ' + index);
								if (resturants[index].liked == true) {
									$(".fa-heart").addClass("fa");
								}
								else {
									$(".fa-heart").removeClass("fa");
								}
								if (maxIndex < index) {
									maxIndex++;
									goNext(index, function(result) {
										console.log(result);
										gallery.add(result);
									});
								}
								console.log(index);
								console.log(userLocation + "&destination=" + resturants[sessionStorage.currIndex].lat + "," + resturants[sessionStorage.currIndex].long +"&travelmode=driving");
								$("#director").attr("href", userLocation + "&destination=" + resturants[sessionStorage.currIndex].lat + "," + resturants[sessionStorage.currIndex].long +"&travelmode=driving");
							} else if ((currentIndex - 1) == index) {
								sessionStorage.currIndex = index;
								currentIndex = index;
								galleryInd = index;
								console.log('prev: ' + index);
								if (resturants[index].liked == true) {
									// $("#heartButton").addClass("fa");
									$(".fa-heart").addClass("fa");
								}
								else {
									// $("#heartButton").removeClass("fa");
									$(".fa-heart").removeClass("fa");
								}
								console.log(index);
								console.log(userLocation + "&destination=" + resturants[sessionStorage.currIndex].lat + "," + resturants[sessionStorage.currIndex].long +"&travelmode=driving");
								$("#director").attr("href", userLocation + "&destination=" + resturants[sessionStorage.currIndex].lat + "," + resturants[sessionStorage.currIndex].long +"&travelmode=driving");
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
//sessionStorage.setItem('savedFoods', []);
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

function toggleHeart(liked) {
	if (liked) {
		$("#heartButton").addClass("fa");
	} else {
		$("#heartButton").removeClass("fa");
	}
}

function openMap(userLocation, latitude, longitude) {
	// $("#navigator").attr("href", userLocation + "&destination=" + latitude + "," + longitude +"&travelmode=driving");
	$("#director").attr("href", userLocation + "&destination=" + latitude + "," + longitude +"&travelmode=driving");
}

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
	var index = gallery.getIndex();
	$("#callOut").attr('href', 'tel:' +resturants[index].phone);
	$("#phoneNumber").html(" " + resturants[index].phone);
	$("#phoneNumber").prepend('<i class="fas fa-mobile-alt"></i>');
	$("#additionalImg").attr('src', resturants[index].href);
	$("#moreName").html(resturants[index].title);
}

function closeModal() {
	//var modal = document.getElementById("moreInfoModal").style.display = "none";
	document.getElementById("moreInfoModal").style.display = "none";
}

//https://www.w3schools.com/html/html5_geolocation.asp geolocation info

function getLocation() {
	if (sessionStorage.hasLat) {
		return;
	}
	else{
	  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(showPosition, showError);
	    $("#clickLocation").attr("class", "");
	    $("#clickLocation").attr("class", "fas fa-map-marker-alt");
	  } else {
	    alert("Geolocation is not supported by this browser.");
	  }
	}
}

function showPosition(position) {
	sessionStorage.hasLat = position.coords.latitude;
	sessionStorage.hasLong = position.coords.longitude;
	console.log("showPosition: ", sessionStorage.hasLat, sessionStorage.hasLong)
}

function showError(error) {
	$("#clickLocation").attr("class", "");
	$("#clickLocation").attr("class", 'fas fa-exclamation-triangle')
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
	var latitude = sessionStorage.hasLat
	var longitude = sessionStorage.hasLong
	if (latitude == null) {
		latitude = 32.906694699999996
	}
	if (longitude == null) {
		longitude = -117.168471
	}
	$.get("/getnext/:lat/:long", {lat:latitude, long:longitude} ,function(data) {
		console.log(data);
		callback(data.yelp.body);
		// $("#navigator".attr("href",))
	});
}

function goNext(index, callback) {
	//console.log("index: ", index);
	//currIndex++;
	//console.log("currIndex: ", currIndex);
	$("#fa-heart").removeClass("fa");
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

function save() {/*
	var index = gallery.getIndex()
	$.get("/calls", function(data) {
	// $.get("http://localhost:3000/calls", function(data) {
		stringJSON = JSON.stringify(data.restaurants[currIndex - 3]);
		savedFood.push(stringJSON);
		*/
		var index = gallery.getIndex()
		var liked = resturants[index].liked = true;
		if (resturants[index].liked) {
			// $("#heartButton").addClass("fa");
			$(".fa-heart").addClass("fa");
		}

		var id = sessionStorage.id

		console.log(resturants[index])
		$.post("/saveItem", {id: id, resturant: resturants[index]}, function callback(err, data) {
			console.log("success")
		});
		//$("#heartButton").className = "far fa-heart heart"

		//stringJSON = JSON.stringify(resturants[galleryInd]);
		stringJSON = JSON.stringify(resturants[index]);
		if(savedJSONString.includes(',' + stringJSON)) {
			// console.log("Checked ,");
			alert("You already saved this! Removing!");
			appendedString = ',' + stringJSON;
			resturants[index].liked = false
			// console.log(appendedString);
			savedJSONString = savedJSONString.replace(appendedString, '');
			// $("#heartButton").removeClass("fa");
			$(".fa-heart").removeClass("fa");
			return;
		}
		// Checks if first is removed, but with other things in the array
		if(savedJSONString.includes(stringJSON + ',')) {
			alert("You already saved this! Removing!");
			appendedString = stringJSON + ",";
			resturants[index].liked = false
			// console.log(appendedString);
			savedJSONString = savedJSONString.replace(appendedString, '');
			// $("#heartButton").removeClass("fa");
			$(".fa-heart").removeClass("fa");
			return;
		}
		//Checks if first is alone in array
		if(savedJSONString.includes(stringJSON)) {
			console.log("Checked empty");
			alert("You already saved this! Removing!");
			savedJSONString = savedJSONString.replace(stringJSON, "");
			// $("#heartButton").removeClass("fa");
			$(".fa-heart").removeClass("fa");
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
		/*
		if($("#heartButton").hasClass("fa")) {
			$("#heartButton").removeClass("fa");
		}
		else {
			$("#heartButton").addClass("fa");
		}
		*/
		console.log(savedJSONString);
		console.log("saving: ", stringJSON)
		sessionStorage.setItem('savedFoods', savedJSONString);
		saveIndex++;
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


function initializePage() {
	// your code here
	$(".gobutton").click( function() {
		ga("send", "event", 'like', 'click');

	});
}

function askLocation() {
  var location = prompt("Please enter a location (or Current Location):");
	console.log(location)
	changeLocation(location, function(result) {
		//window.mySwipe = ""
		//window.mySwipe.kill()
		resturants = []
		//document.getElementById("data-container").innerHTML = "";
		var json = JSON.parse(result);
		console.log("new len:", json.businesses.length);
		for (i = 0; i < json.businesses.length; i++) {
			var resturant = {
				title: json.businesses[i].name,
				href: json.businesses[i].image_url,
				phone: json.businesses[i].phone,
				lat: json.businesses[i].coordinates.latitude,
				long: json.businesses[i].coordinates.longitude,
				alias: json.businesses[i].alias,
				categories: json.businesses[i].categories,
				liked: false,
			}
			resturants.push(resturant);
			//resturants[index] = resturant
			//addData(resturant, i)
		}
		//gallery.clear();
		//gallery.add(resturants)
		console.log("len of gallery:", )
		//gallery.slide(51, 0);
		var currentIndex = 0;
		var maxIndex = 0;
		console.log(resturants);
		gallery = blueimp.Gallery(
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
						hidePageScrollbars:false,
						stretchImages: true,
						index: sessionStorage.currIndex,
						onslide: function (index, slide) {
							sessionStorage.currIndex = index;
							var liked = resturants[index].liked;
							// console.log("liked:", liked)
							toggleHeart(liked);
							openMap(userLocation, resturants[sessionStorage.currIndex].lat, resturants[sessionStorage.currIndex].long);
							if ((currentIndex + 1) == index) {
								sessionStorage.currIndex = index;
								currentIndex = index;
								galleryInd = index;
								console.log('next: ' + index);
								if (resturants[index].liked == true) {
									$(".fa-heart").addClass("fa");
								}
								else {
									$(".fa-heart").removeClass("fa");
								}
								if (maxIndex < index) {
									maxIndex++;
									goNext(index, function(result) {
										console.log(result);
										gallery.add(result);
									});
								}
								console.log(index);
								console.log(userLocation + "&destination=" + resturants[sessionStorage.currIndex].lat + "," + resturants[sessionStorage.currIndex].long +"&travelmode=driving");
								$("#director").attr("href", userLocation + "&destination=" + resturants[sessionStorage.currIndex].lat + "," + resturants[sessionStorage.currIndex].long +"&travelmode=driving");
							} else if ((currentIndex - 1) == index) {
								sessionStorage.currIndex = index;
								currentIndex = index;
								galleryInd = index;
								console.log('prev: ' + index);
								if (resturants[index].liked == true) {
									// $("#heartButton").addClass("fa");
									$(".fa-heart").addClass("fa");
								}
								else {
									// $("#heartButton").removeClass("fa");
									$(".fa-heart").removeClass("fa");
								}
								console.log(index);
								console.log(userLocation + "&destination=" + resturants[sessionStorage.currIndex].lat + "," + resturants[sessionStorage.currIndex].long +"&travelmode=driving");
								$("#director").attr("href", userLocation + "&destination=" + resturants[sessionStorage.currIndex].lat + "," + resturants[sessionStorage.currIndex].long +"&travelmode=driving");
							}
						},
				}
		);
	});
}

function changeLocation(where, callback) {
	$.get("/getlocation/:location", {location:where} ,function(data) {
		console.log(data);
		callback(data.yelp.body);
	});
}

function hello() {
	console.log("hello")
}

function addData(resturant, i) {
	var body = document.getElementById("data-container")
	//console.log(body)
	var container = document.createElement('div')
	container.className = "data"
	container.setAttribute('data-index', i)
	var img = document.createElement('img')
	img.src = resturant.href
	img.className = "data-img"
	img.onDblClick = hello;

	var info = document.createElement('div')
	info.id = "data-info"
	var info_save = document.createElement('div')
	info_save.id = "data-info-save"
	var info_fields = document.createElement('div')
	info_fields.id = "data-info-fields"

	var save = document.createElement('button')
	save.id = "save"
	save.setAttribute( "onClick", "javascript: save();" );
	var heart = document.createElement('i')
	heart.id = "heartButton"
	heart.className = "far fa-heart heart"

	save.append(heart)
	info_save.append(save)

	var name = document.createElement('h3')
	name.innerHTML = resturant.title
	//name.className = ""
	var phone = document.createElement('h3')
	phone.innerHTML = resturant.phone

	info_fields.append(name)
	info_fields.append(phone)

	info.append(info_save)
	info.append(info_fields)

	container.append(img)
	container.append(info)
	$("#data-container").append(container)
}
