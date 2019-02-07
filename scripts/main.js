$(document).ready(function() {
})

// INIT VARS 

var imgArray = [];


function openNav() {
	document.getElementById("pullOutMenu").style.width = "20%";
	document.getElementById("pushField").style.marginLeft = "20%";
	document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
	document.getElementById("pullOutMenu").style.width = "0";
	document.getElementById("pushField").style.marginLeft = "0";
	document.body.style.backgroundColor = "white";
}