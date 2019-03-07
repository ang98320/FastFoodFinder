$(document).ready(function() {
	//getLocation();
	loadFromJSON(function(result) {
		console.log(result)
	});
	loadSaved();
	userLocation = sessionStorage.getItem("userLocation");
	console.log(savedJSONObject)
	$(".saved-row").click(function() {
		openModal();
		var savedIndex = parseInt($(this).attr("id").replace('row', ''));
		console.log($(this).attr("id"));
		console.log(savedIndex);
		$("#moreName").html(savedJSONObject.saved[savedIndex].title);
		$("#phoneNumber").html(thisSavedSession.saved[savedIndex].phone);
		$("#additionalImg").attr("src", savedJSONObject.saved[savedIndex].href);
		$("#handle").html(savedJSONObject.saved[savedIndex].title);
		$("#navigator").attr('href', userLocation + "&destination=" + savedJSONObject.saved[savedIndex].lat + "," + savedJSONObject.saved[savedIndex].long +"&travelmode=driving");
	});
	$(".fa-trash-alt").click(function(event) {
		removeSaved(this);
		event.stopPropagation();
	});
});

// INIT VARS

var imgArray = [];
var currLat;
var currLong;
var navState = 0;
var currIndex = 0;
var savedFood = [];

document.cookie = [];

var savedInfo = sessionStorage.getItem("savedFoods");
var savedJSONObject = JSON.parse(savedInfo);
//var modal = document.getElementById("moreInfoModal");
var modalOpener = document.getElementById("mainImg");
var modalCloser = document.getElementById("modalClose");

var thisSavedSession;
var userLocation;

function loadFromJSON() {
	var id = sessionStorage.id
	console.log("id:", id)
	$.post("/getItems", {id: id}, function(req, res) {
		console.log(req)
		console.log(res)
	});
}

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

/*function openModal() {
	document.getElementById("moreInfoModal").style.display = "block";
	console.log("openModal");
}
*/

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

function openModal() {
	console.log(thisSavedSession);
	document.getElementById("moreInfoModal").style.display = "block";
	var savedIndex = parseInt($(this).attr("class"));
	console.log($(this).attr("class"));
	console.log(savedIndex);
	$("#moreName").html(thisSavedSession.saved[savedIndex].restName);
	$("#phoneNumber").html(thisSavedSession.saved[savedIndex].phone);
	console.log("openModal");
}

function closeModal() {
	//var modal = document.getElementById("moreInfoModal").style.display = "none";
	document.getElementById("moreInfoModal").style.display = "none";
}


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

/*function openModal() {
	document.getElementById("moreInfoModal").style.display = "block";
	console.log("openModal");
}
*/

function closeModal() {
	//var modal = document.getElementById("moreInfoModal").style.display = "none";
	document.getElementById("moreInfoModal").style.display = "none";
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

function remove() {
	console.log("remove")
}

function loadSaved() {
	thisSavedSession = savedJSONObject;
	console.log(generateTable(savedJSONObject.saved.length));

	$("#saved-body").append(generateTable(savedJSONObject.saved.length));

	var JSONIndex = 0;

	for (i = 0; i < savedJSONObject.saved.length; i++) {
		console.log("Run " + i + " times");
		var appendJSON = "col" + i;
		//$(appendJSON).append('<a onclick="openModal()" id="pic' + JSONIndex + '"> <img src="' + savedJSONObject.saved[JSONIndex].img + '"> </a>');
		var rowDiv = document.createElement('div');
		rowDiv.className = "saved-row";
		rowDiv.id = "row" + i;
		rowDiv.setAttribute("onclick", "openModal()");

		var colLeft = document.createElement('div');
		colLeft.className = "saved-col-left";

		var colRight = document.createElement('div');
		colRight.className = "saved-col-right";
		colRight.id = appendJSON;

		var img = document.createElement('img');
		img.className = "saved-row-img";
		img.src = savedJSONObject.saved[i].href;

		var l1 = document.createElement('h3');
		l1.className = "saved-row-label";
		l1.innerHTML = savedJSONObject.saved[i].title;
		var l2 = document.createElement('h4');
		l2.className = "saved-row-label";
		l2.innerHTML = "Added: Today";

		var trash = document.createElement('a');
		trash.onclick = removeSaved;
		trash.className = "trashcan";
		var trashIcon = document.createElement('i');
		trashIcon.className = "far fa-trash-alt"

		//trash.append(trashIcon)

		colLeft.append(img);

		colRight.append(l1);
		colRight.append(l2);
		colRight.append(trash);
		// colRight.append('<a onclick="remove()" class="trashcan"> <i class="far fa-trash-alt"></i> </a>');

		rowDiv.append(colLeft);
		rowDiv.append(colRight);
		//rowDiv.append(trash);

		//$(".saved-col-right").append(trash)

		//$(appendJSON).prepend(rowDiv)
		$("#saved-container").prepend(rowDiv);

		JSONIndex++;
	}
	$(".saved-col-right").append('<a onclick="event.stopPropagation(); removeSaved(this);" \
	class="trashcan" z-index="9999"> <i class="far fa-trash-alt"></i> </a>');
}


function generateTable(numObjects) {
	var tableCode = "<table id='saved-food' style='width: 100%; margin: 0px 0px;'>";
	var currAddIndex = 0;
	// var numRows = Math.floor(numObjects / 3) + 1;
	// var intCast = parseInt(numObjects);
	// console.log(intCast);
	// var numRows = intCast + 2;
	// console.log(numRows);
	for (i = 0; i < numObjects; i++){
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

function openModal() {
	document.getElementById("moreInfoModal").style.display = "block";
	console.log("openModal");
}

function closeModal() {
	//var modal = document.getElementById("moreInfoModal").style.display = "none";
	document.getElementById("moreInfoModal").style.display = "none";
}

function removeSaved(elem) {
	//console.log(savedJSONObject);
	//console.log("removeSave: ", elem)
	//get index, get json object, stringify, remove this string from sessionStorage
	var removeJSONString = $(elem).parent().parent().attr('id').replace("col", "");
	// console.log("Delete clicked!");
	// console.log(removeJSONString);
	savedJSONObject.saved.splice(removeJSONString, 1);
	console.log(savedJSONObject);
	$("#saved-container").empty();
	// loadSaved();
	// $("#saved-body").append(generateTable(savedJSONObject.saved.length));
	// closeModal();
	for (i = 0; i < savedJSONObject.saved.length; i++) {
		console.log("Run" + i + "times");
		var appendJSON = "col" + i;
		//$(appendJSON).append('<a onclick="openModal()" id="pic' + JSONIndex + '"> <img src="' + savedJSONObject.saved[JSONIndex].img + '"> </a>');
		var rowDiv = document.createElement('div');
		rowDiv.className = "saved-row";
		rowDiv.id = "row" + i;
		rowDiv.setAttribute("onclick", "openModal()");

		var colLeft = document.createElement('div');
		colLeft.className = "saved-col-left";

		var colRight = document.createElement('div');
		colRight.className = "saved-col-right";
		colRight.id = appendJSON;

		var img = document.createElement('img');
		img.className = "saved-row-img";
		img.src = savedJSONObject.saved[i].href;

		var l1 = document.createElement('h3');
		l1.className = "saved-row-label";
		l1.innerHTML = savedJSONObject.saved[i].title;
		var l2 = document.createElement('h4');
		l2.className = "saved-row-label";
		l2.innerHTML = "Added: Today";

		colLeft.append(img);

		colRight.append(l1);
		colRight.append(l2);
		// colRight.append('<a onclick="remove()" class="trashcan"> <i class="far fa-trash-alt"></i> </a>');

		rowDiv.append(colLeft);
		rowDiv.append(colRight);

		//$(appendJSON).prepend(rowDiv)
		$("#saved-container").prepend(rowDiv);

		// JSONIndex++;
	}
	$(".saved-col-right").append('<a onclick="removeSaved(this)" class="trashcan"> <i class="far fa-trash-alt"></i> </a>');
	var savedJSONString = JSON.stringify(savedJSONObject);
	sessionStorage.setItem('savedFoods', savedJSONString);
	closeModal();
}
