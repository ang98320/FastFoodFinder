function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
  console.log('Facebook login status changed.');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
        console.log('Successfully logged in with Facebook');
        window.location.href = "/main";
        FB.api('/me?fields=name,first_name,picture.width(200)', changeUser);
  }
}

//Add this callback at bottom of facebook.js and add the required functionality in it
function changeUser(response) {
  //Add code to change name and image
  $(".facebookLogin").hide();
  //document.getElementById("name").innerHTML = response.name;
  document.getElementById("userImg").src = response.picture.data.url;
}
