$(document).ready(function() {
  console.log("at login");
});

function login() {
  $.get("/main", function(data) {
    //var yelp = JSON.parse('<%- JSON.stringify(yelp) %>');
    //console.log(data);
    console.log("going to main");
  });
}
