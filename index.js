var express = require('express'),
		expressSession = require('express-session'),
		path = require('path'),
		pug = require('pug'),
		bodyParser = require('body-parser'),		
		bcrypt = require('bcrypt-nodejs'),
		route = require('./routes/routes.js');
        

var app = express();
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

app.use(expressSession({
  name: 'lastVisit',
  secret: new Date().toLocaleDateString(),
  saveUninitialized: true,
  resave: true,
  expires: true
}));

app.get('/', route.index); // Single Interceptors go in here
app.get('/signup', route.signup);

app.listen(3000);