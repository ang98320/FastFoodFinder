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

var thisSavedSession;

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

function loadSaved() {
	var savedInfo = sessionStorage.getItem("savedFoods");
	var savedJSONObject = JSON.parse(savedInfo);
	console.log(savedInfo);
	console.log(savedJSONObject);

	thisSavedSession = savedJSONObject;
	console.log(generateTable(savedJSONObject.saved.length));

	$("#saved-body").append(generateTable(savedJSONObject.saved.length));

	var JSONIndex = 0;

	for (i =0; i < savedJSONObject.saved.length; i++) {
		var appendJSON = ".col" + JSONIndex;
		$(appendJSON).append('<a onclick="openModal()" id="pic' + JSONIndex + '"> <img src="' + savedJSONObject.saved[JSONIndex].img + '"> </a>');
		JSONIndex++;
	}}

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

/*
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

>>>>>>> d234d3fb595e11a58be9ba2b0669c1907a3b9e31


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

function loadSaved() {
	var savedInfo = sessionStorage.getItem("savedFoods");
	var savedJSONObject = JSON.parse(savedInfo);
	console.log(savedInfo);
	console.log(savedJSONObject);

	thisSavedSession = savedJSONObject;
	console.log(generateTable(savedJSONObject.saved.length));

	$("#saved-body").append(generateTable(savedJSONObject.saved.length));

	var JSONIndex = 0;

	for (i =0; i < savedJSONObject.saved.length; i++) {
		var appendJSON = ".col" + JSONIndex;
		$(appendJSON).append('<a onclick="openModal()" id="pic' + JSONIndex + '"> <img src="' + savedJSONObject.saved[JSONIndex].img + '"> </a>');
		JSONIndex++;
	}}

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
