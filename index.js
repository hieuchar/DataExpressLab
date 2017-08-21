var express = require('express'),
		expressSession = require('express-session'),
		path = require('path'),
		pug = require('pug'),
		bodyParser = require('body-parser'),
		route = require('./routes/routes.js');
var mongoose = require('mongoose');

var app = express();
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

var urlencodedParser = bodyParser.urlencoded({
  extended: true
})

app.use(expressSession({
  saveUninitialized: true,
	secret: 'false',
  resave: true,
  expires: true
}));


app.get('/', route.index); // Single Interceptors go in here
app.get('/signup', route.signup);
app.post('/signup', urlencodedParser, route.createUser);
app.get('/details', route.viewDetails);
app.get('/login', route.login);
app.post('/login', urlencodedParser, route.tryLogin);
app.get('/logout', route.logout);
app.get('/admin', route.admin);
app.get('/delete/:username', route.delete);
app.get('/new-admin/:username', route.makeUserAdmin);

app.listen(3000);