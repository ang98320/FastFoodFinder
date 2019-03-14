var resturants = [];
var gallery;

$(document).ready(function() {
	initializePage();
	console.log("ready");
	if (sessionStorage.id == null) {
		sessionStorage.id = "test_user"
	}
	console.log("user id is:", sessionStorage.id)
	currLat = sessionStorage.hasLat;
	currLong = sessionStorage.hasLong;
	googleDirections = googleDirections + currLat + "," + currLong + "&";
	userLocation = googleDirections;
	console.log("userlocation:", userLocation);
	sessionStorage.userLocation = userLocation
	currIndex == -1;
	getProfileImage();
	$("#userImg").attr('href', sessionStorage.fb_img);
	fetchData(function(result) {
		var json = JSON.parse(result);
		console.log(json.businesses[0]);
		for (i = 0; i < json.businesses.length; i++) {
			var resturant = {
				title: json.businesses[i].name,
				href: json.businesses[i].image_url,
				phone: json.businesses[i].phone,
				lat: json.businesses[i].coordinates.latitude,
				long: json.businesses[i].coordinates.longitude,
				alias: json.businesses[i].alias,
				categories: json.businesses[i].categories,
				closed: json.businesses[i].is_closed,
				location: json.businesses[i].location,
				info: json.businesses[i].url,
				transactions: json.businesses[i].transactions,
				liked: false,
			}
			resturants.push(resturant);
			// TODO insert elements here
			//addData(resturant, i)
		}

		checkIfLiked(function(result) {
			console.log(result)
			for (var i = 0; i < resturants.length; i++) {
				addData(resturants[i], i)
			}
			console.log("init gallery")
			window.mySwipe = Swipe(document.getElementById('slider'), {
				continuous: false,
				/*startSlide: sessionStorage.currIdx,*/
				callback: function(index, elem) {
					console.log("going to :", index)
					//sessionStorage.currIdx = index
					currIdx = index;
				},
			});
			var currentIndex = 0;
			var maxIndex = 0;
			console.log(resturants);
		});

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

$.get("/main0", function(data) {
  //var yelp = JSON.parse('<%- JSON.stringify(yelp) %>');
	//console.log(data);
	console.log("loaded")
});

/*
$.get("/getnext", function(data) {
  //var yelp = JSON.parse('<%- JSON.stringify(yelp) %>');
	console.log("/getnext called");
	console.log(data);
});
*/

function checkIfLiked(callback) {
	var id = sessionStorage.id
	$.post("/getItems", {id: id}, function(req, res) {
		console.log("req", req)
		console.log("req", res)
		var set = new Set()
		for (var i = 0; i < resturants.length; i++) {
			set.add(resturants[i].href)
		}
		for (var i = 0; i < req.length; i++) {
			if (set.has(req[i].href)) {
				console.log("match found, need to like: ", req[i].href)
				resturants.find(x => x.href === req[i].href).liked = true;
			}
		}
		callback("done");
	});
}

function go() {
	console.log("go")
	var idx = window.mySwipe.getPos()
	console.log(resturants[idx].lat)
	console.log(resturants[idx].long)
	//var url = "http://www.google.com/maps/place/" + resturants[idx].lat + "," + resturants[idx].long
	//window.open(url, '_blank', 'location=yes');
	console.log(userLocation)
	url = userLocation + "&destination=" + resturants[idx].lat + "," + resturants[idx].long +"&travelmode=driving"
	//$("#navigator"+idx).attr("href", userLocation + "&destination=" + resturants[idx].lat + "," + resturants[idx].long +"&travelmode=driving");
	var win = window.open(url)
	win.focus();
}

function openNav() {
	if (navState == 0) {
		console.log("openNav");
		document.getElementById("pullOutMenu").style.width = "65%";
		//document.getElementById("pushField").style.marginLeft = "65%";
		//document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
		navState++;
	}
	else {
		console.log("closeNav");
		document.getElementById("pullOutMenu").style.width = "0";
		document.getElementById("pushField").style.marginLeft = "0";
		//document.body.style.backgroundColor = "white";
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

//https://www.w3schools.com/html/html5_geolocation.asp geolocation info

function askLocation() {
  var location = prompt("Please enter a search term:");
	console.log(location)
	changeLocation(location, function(result) {
		//window.mySwipe = ""
		window.mySwipe.kill()
		resturants = []
		document.getElementById("data-container").innerHTML = "";
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
				closed: json.businesses[i].is_closed,
				liked: false,
			}
			resturants.push(resturant);
			//resturants[index] = resturant
			addData(resturant, i)
		}

		//window.mySwipe.restart()
		/*
		window.mySwipe = Swipe(document.getElementById('slider'), {
			continuous: false,
		}); */

		window.mySwipe = Swipe(document.getElementById('slider'), {
			continuous: false,
			startSlide: 0,
			callback: function(index, elem) {
				console.log("going to :", index)
				currIdx = index;
				//sessionStorage.currIdx = index
			},
		});
	});
}

function changeLocation(where, callback) {
	$.get("/getlocation/:location", {location:where} ,function(data) {
		console.log(data);
		callback(data.yelp.body);
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
	var latitude = sessionStorage.hasLat
	var longitude = sessionStorage.hasLong
	if (latitude == null) {
		latitude = 32.906694699999996
	}
	if (longitude == null) {
		longitude = -117.168471
	}
	console.log(sessionStorage.hasLat)
	console.log(sessionStorage.hasLong)
	$.get("/getnext/:lat/:long", {lat:latitude, long:longitude} ,function(data) {
		console.log(data);
		callback(data.yelp.body);
		// $("#navigator".attr("href",))
	});
}

function hello() {
	console.log("hello")
}

function saveItem(resturant) {
	console.log(resturant)
	var id = sessionStorage.id
	$.post("/saveItem", {id: id, resturant: resturant}, function callback(err, data) {
		console.log("success saveItem")
	});
}

function removeFromDB(resturant) {
	var href = resturant.href
	var id = sessionStorage.id
	console.log(id, href)
	$.post("/removeItem", {id: id, href: href}, function(req, res) {
		console.log("req", req)
		console.log("res", res)
	});
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
	//img.onDblClick = hello;

	var info = document.createElement('div')
	info.id = "data-info"
	var info_go = document.createElement('div')
	info_go.id = "data-info-go"
	var info_save = document.createElement('div')
	info_save.id = "data-info-save"
	var info_fields = document.createElement('div')
	info_fields.id = "data-info-fields"


	var go = document.createElement('a')
	var go_button = document.createElement('button')
	var span_go = document.createElement('span')
	span_go.innerHTML = "Go";
	go_button.className = "gobutton";
	go.id = "navigator"+i;
	go.setAttribute("onclick", "go()");

	go_button.append(span_go)
	go.append(go_button)
	info_go.append(go)

	var save = document.createElement('button')
	save.id = "save"
	save.elementId = i
	//save.setAttribute( "onClick", "javascript: save(" + i + ");" );
	save.onclick = function () {
		//console.log(resturant)
		if (resturant.liked == false) {
			resturant.liked = true;
			console.log("need to save")
			heart.className = "far fa-heart heart fa"
			saveItem(resturant)
		} else {
			resturant.liked = false;
			console.log("removing from db");
			heart.className = "far fa-heart heart";
			removeFromDB(resturant);
		}
	}
	var heart = document.createElement('i');
	heart.id = "heartButton";
	if (resturant.liked == false) {
		console.log("not liked");
		heart.className = "far fa-heart heart";
	} else {
		console.log("already liked");
		heart.className = "far fa-heart heart fa";
	}

	save.append(heart)
	info_save.append(save)

	var name = document.createElement('h3');
	name.innerHTML = resturant.title;
	//name.className = ""
	var phone = document.createElement('h3');
	phone.innerHTML += ('<i class="fas fa-mobile-alt"></i>');
	phone.innerHTML = resturant.phone;

	var phoneCallOut = document.createElement('a');
	phoneCallOut.href = "tel:" + resturant.phone;
	phone.innerHTML += phone;

	console.log(phoneCallOut)

	var closed = document.createElement('h3');
	if (closed == true) {
		closed.innerHTML = "Closed Now";
		closed.style.color = "red";
	} else {
		closed.innerHTML = "Open Now";
		closed.style.color = "green";
	}

	var loc = document.createElement('h3');
	loc.innerHTML +=  resturant.location.address1 + ", " + resturant.location.city;

	var transact = document.createElement('h3');
	transact.innerHTML = "No delivery currently available from this location.";
	if (resturant.transactions.indexOf("delivery") != -1) {
		transact.innerHTML = "Delivery is available from this location!";
	}


	info_fields.append(name);
	info_fields.append(closed);
	info_fields.append(phoneCallOut);
	info_fields.append(loc);
	info_fields.append(transact);
	// $("#phoneNumber").prepend('<i class="fas fa-mobile-alt"></i>');

	info.append(info_fields)
	info.append(info_go)
	info.append(info_save)
	//info.append(info_fields)

	container.append(img)
	container.append(info)
	$("#data-container").append(container)
}

function goNext(index, callback) {
	//console.log("index: ", index);
	//currIndex++;
	//console.log("currIndex: ", currIndex);
	$("#heartButton").removeClass("fa");
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
