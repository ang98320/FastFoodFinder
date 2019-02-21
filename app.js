
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var serveStatic = require('serve-static');
var yelp = require('yelp-fusion');
var fs = require('fs');

var main = require('./routes/main');
var calls = require('./routes/calls');
var saved = require('./routes/saved');
var login = require('./routes/login');

var client = yelp.client('rUjg38Ih2eukxKrKMf5VBeaf28E9xLeKPPs0xEafwEngFlZZ0DXsocjREqcU0NLg2Lat4a32LBvDpPPIHPLrfvhHe2GstgCh9vM1lOEKmGLkc20hxGCITNhS6AVjXHYx');

client.search({
  latitude: "32.870190",
  longitude: "-117.216192",
  radius: "6000"
}).then(response => {
	//console.log(response);
	var jsonTemp = '{ "restaurants" : ['
	for (i = 0; i < response.jsonBody.businesses.length; i++) {
		if (i == response.jsonBody.businesses.length - 1) {
			jsonTemp = jsonTemp.concat("", '{ "restName": "' + response.jsonBody.businesses[i].name + '" , ');
		jsonTemp = jsonTemp.concat("", '"lat": "' + response.jsonBody.businesses[i].coordinates.latitude + '" , ');
		jsonTemp = jsonTemp.concat("", '"long": "' + response.jsonBody.businesses[i].coordinates.longitude + '" , ');
		jsonTemp = jsonTemp.concat("", '"phone": "' + response.jsonBody.businesses[i].phone + '" , ');
		jsonTemp = jsonTemp.concat("", '"alias": "' + response.jsonBody.businesses[i].alias + '" , ');
		//jsonTemp = jsonTemp.concat("", '"catagory": "' + response.jsonBody.businesses[i].categories[0].alias + '" , ');
		jsonTemp = jsonTemp.concat("", '"img": "' + response.jsonBody.businesses[i].image_url + '" } ');
		}
		else {
		jsonTemp = jsonTemp.concat("", '{ "restName": "' + response.jsonBody.businesses[i].name + '" , ');
		jsonTemp = jsonTemp.concat("", '"lat": "' + response.jsonBody.businesses[i].coordinates.latitude + '" , ');
		jsonTemp = jsonTemp.concat("", '"long": "' + response.jsonBody.businesses[i].coordinates.longitude + '" , ');
		jsonTemp = jsonTemp.concat("", '"phone": "' + response.jsonBody.businesses[i].phone + '" , ');
		jsonTemp = jsonTemp.concat("", '"alias": "' + response.jsonBody.businesses[i].alias + '" , ');
		//jsonTemp = jsonTemp.concat("", '"catagory": "' + response.jsonBody.businesses[i].categories[0].alias + '" , ');
		jsonTemp = jsonTemp.concat("", '"img": "' + response.jsonBody.businesses[i].image_url + '" }, ');
		}
	}
	jsonTemp = jsonTemp.concat("", ']}');
	/*fs.writeFile('response.json', jsonTemp, (err) => {
			if (err) throw err;
			console.log("write successful!");
		});*/
}).catch(e => {
  console.log(e);
});

//var add = require('./routes/add');
// Example route
// var user = require('./routes/user');

var app = express();

var router = express.Router();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
/*app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
/*
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}*/

app.use(morgan('dev'));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser('123'));
//app.use(app.router);
app.use(session({
  secret: '123',
  resave: true,
  saveUninitialized: true
}));
//app.use(serveStatic('public/ftp', {'main': ['main.html', 'main.htm']}))


// Add routes here
//app.get('/', login.view);

app.get('/', function (req, res) {
  console.log("called /");
  //res.render('main');
  //console.log("rendered main");
  client.search({
    latitude: "32.870190",
    longitude: "-117.216192",
    radius: "6000"
  }).then(response => {
    console.log("rendered main");
    console.log(response.jsonBody.businesses[0].name);
    //res.json({ yelp: "response.jsonBody.businesses[0].name"});
    //res.render('main', { yelp: "response.jsonBody.businesses[0].name"});
    res.json({ yelp: "response.jsonBody.businesses[0].name"});
    req.url = "/";
    router.handle(req, res);
    //res.render('main');
  }).catch(e => {
    console.log(e);
  });
});


app.get('/main', main.view);
app.get('/calls', calls.info);
app.get('/saved', saved.view);
//app.route('/main');
//app.get('/add', add.addFriend);
// Example route
// app.get('/users', user.list);

//const port = 3000;
app.listen(process.env.PORT || 3000);
//app.listen(port, () => console.log(`Example app listening on port ${port}!`))
//, () => console.log(`Example app listening on port ${PORT}!`))
/*
const port = 3000;
//app.listen(process.env.PORT || 3000)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
*/
//, () => console.log(`Example app listening on port ${PORT}!`))
/*
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/
