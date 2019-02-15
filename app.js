
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var main = require('./routes/main');
var restaurants = require('./routes/restaurants');
var fs = require('fs');
//var add = require('./routes/add');
// Example route
// var user = require('./routes/user');
const Zomato = require('zomato.js');
const z = new Zomato('309bf0bce94239a8585b1b209da93a3d');

z
  .search({
    lat: 32.870298,
    lon: -117.215917
  })
  .then(function(data) {
    //console.log(data);
    var infoList = JSON.stringify(data);
    fs.writeFile('restaurants.json', infoList, (err) => {
    	if (err) throw err;
    	console.log('Data saved successfully');
    })

  })
  .catch(function(err) {
    console.error(err);
  });


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', main.view);
app.get('/restaurants', restaurants.restaurantsInfo);
//app.get('/add', add.addFriend);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  /*function(req, res) {
  	res.writeHead(200, {
  "access-control-allow-credentials": "true",
  "access-control-allow-headers": "X-Zomato-API-Key",
  "access-control-allow-methods": "GET, POST, DELETE, PUT, PATCH, OPTIONS",
  "access-control-allow-origin": "*",
  "cache-control": "max-age=0, no-cache, no-store",
  "content-encoding": "gzip",
  "content-length": "4439",
  "content-security-policy": "frame-ancestors https://*.nearbuystag.in https://*.nearbuy.com 'self'; default-src *; font-src * data:; img-src * data:; media-src * blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.jwpcdn.com *.cloudflare.com *.twitter.com *.recruiterbox.com *.zdev.net *.zdev.net:8080 *.zomato.com *.tinymce.com *.gstatic.com *.googleapis.com *.google.com *.google.co.in *.facebook.com sdk.accountkit.com *.doubleclick.net *.googlesyndication.com *.nr-data.net *.newrelic.com *.google-analytics.com *.akamaihd.net *.zmtcdn.com *.googletagmanager.com *.facebook.net *.googleadservices.com *.cdninstagram.com *.googlesyndication.com *.inspectlet.com *.spreedly.com *.instagram.com *.twimg.com *.mouseflow.com *.usersnap.com d3mvnvhjmkxpjz.cloudfront.net *.serving-sys.com *.sushissl.com *.pubnub.com tsgw.tataelxsi.co.in *.branch.io app.link cdn.poll-maker.com *.ampproject.org *.smartlook.com *.hotjar.com dashboard.hypertrack.io zba.se *.googletagmanager.com *.eff.org cdn.plot.ly *.zedo.com *.bing.com *.criteo.net *.criteo.com mddigital.in; style-src * 'unsafe-inline';",
  "content-type": "application/json",
  "date": "Thu, 14 Feb 2019 07:57:24 GMT",
  "expires": "Thu, 14 Feb 2019 07:57:24 GMT",
  "pragma": "no-cache",
  "server": "Apache",
  "strict-transport-security": "max-age=31536000",
  "vary": "Accept-Encoding",
  "x-content-type-options": "nosniff",
  "x-firefox-spdy": "h2",
  "x-xss-protection": "1; mode=block; report=https://www.zomato.com/cspreport.php"
});
  }*/
});
