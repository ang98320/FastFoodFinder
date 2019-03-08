
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
var cors = require('cors');

var restaurants = require('./response.json');

var main = require('./routes/main0');
var main0 = require('./routes/main');
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

app.options('*', cors())

app.get('/', login.view);

app.get('/getnext/:lat/:long', function (req, res) {
  //console.log(req.query.lat)
  //console.log(req.query.long)
  client.search({
    latitude: req.query.lat,
    longitude: req.query.long,
    categories: 'restaurants',
    limit: 50,
    offset: 26,
    radius: 6000,
    // sort_by: distance,
  }).then(response => {
    res.json({ yelp: response});
  }).catch(e => {
    console.log(e);
  });
});

app.get('/getlocation/:location', function (req, res) {
  //console.log(req.query.lat)
  //console.log(req.query.long)
  client.search({
    location: req.query.location,
    categories: 'restaurants',
    limit: 50,
    offset: 0,
    radius: 6000,
    // sort_by: distance,
  }).then(response => {
    res.json({ yelp: response});
  }).catch(e => {
    console.log(e);
  });
});

//app.get('/main', main.view);
app.get('/main', function(req, res) {
  res.render("main0.handlebars");
});


app.get('/main0', main0.view);
//app.get('/calls', cors(), calls.info);
app.get('/calls', calls.info);
app.get('/saved', saved.view);
app.get("/path/to/page_A", function(req,res) {
  res.render("main.handlebars");
})
app.get("/path/to/page_B", main0.view)

app.post('/saveItem', function(req, res) {
  var id = req.body.id;
  var resturant = req.body.resturant
  //console.log(id, resturant.href)
  fs.readFile('data.json', 'utf8', function (err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data); //now it an object
    var insert = true;
    var lenData = obj.table.length
    for (var i = 0; i < lenData; i++) {
      var dataID = obj.table[i].id
      var dataHref = obj.table[i].resturant.href
      if (dataID == id && dataHref == resturant.href) {
        insert = false;
      }
      //console.log(dataID, dataHref)
    }
    if (insert) {
      console.log("inserting")
      obj.table.push({id: id, resturant: resturant}); //add some data
      var json = JSON.stringify(obj, null, 4); //convert it back to json
      fs.writeFile('data.json', json, 'utf8', function (err, data) {
        console.log("Successfully written to json")
      });
    } else {
      console.log("already exists in db")
    }
}});
});

app.post('/getItems', function(req, res) {
  var id = req.body.id
  console.log(id)
  var obj;
  var resturants = []
  fs.readFile("data.json", 'utf8', function(err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    //console.log(obj.table[2].resturant)
    for (var i = 0; i < obj.table.length; i++) {
      var resturant = obj.table[i].resturant
      if (obj.table[i].id == id) resturants.push(resturant)
    }
    //console.log(resturants)
    res.json(resturants)
  });
});

app.post('/removeItem', function(req, res) {
  var id = req.body.id
  var href = req.body.href
  console.log(id)
  var obj
  var resturants = []
  fs.readFile("data.json", 'utf8', function(err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    //console.log(obj.table[2].resturant)
    //console.log("old len:", obj.table.length)
    for (var i = 0; i < obj.table.length; i++) {
      var resturant = obj.table[i].resturant
      if (obj.table[i].id == id && obj.table[i].resturant.href == href) {
        console.log("match found")
        //console.log(obj.table[i])
        obj.table.splice(i, 1)
      }
    }
    //console.log("new len:", obj.table.length)
    fs.writeFileSync('data.json', JSON.stringify(obj, null, 2));
    res.json("removed successfully")
  });
})

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
