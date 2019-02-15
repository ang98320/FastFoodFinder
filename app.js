
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var favicon = require('serve-favicon')
var morgan = require('morgan')
var methodOverride = require('method-override')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var serveStatic = require('serve-static')

var main = require('./routes/main');
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

app.use(morgan('dev'))
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'))
/app.use(cookieParser('123'))
//app.use(app.router);
app.use(session({
  secret: '123',
  resave: true,
  saveUninitialized: true
}));
//app.use(serveStatic('public/ftp', {'main': ['main.html', 'main.htm']}))


// Add routes here
app.get('/', main.view);
//app.route('/main');
//app.get('/add', add.addFriend);
// Example route
// app.get('/users', user.list);

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/*
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/
