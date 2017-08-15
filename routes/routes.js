var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');


var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) { // There wasn't anything in here in the demo files

});

var userSchema = mongoose.Schema({ // Put the schema for our data in here
	username: String,
	question1: Boolean,
	question2: Boolean,
	question3: Boolean
});

var User = mongoose.model('User_Collection', userSchema);

exports.route = function (req, res) { // Route template
  
};

exports.index = function (req, res) {    
  console.log(req.sessionID);
	res.render('index');
};

exports.login = function (req, res) {
	res.render('login')
}
exports.tryLogin = function (req, res) {
	var sucess = false;
	
	// validate cridentials
	
	if(sucess) {
		res.redirect('/');
	}
	else {
		res.render('login')
	}
}

exports.signup = function(req, res) {
	res.render('sign-up');
}
exports.createUser = function(req, res) {
	var user = new User({
		username: req.body.username,
		question1: req.body.question1 == 1,
		question2: req.body.question2 == 1,
		question3: req.body.question3 == 1
	});
	user.save(function (err, person) {
    if (err) return console.error(err);
    console.log(req.body.username + ' added');
  });
  res.redirect('/'); // Redirect to view details instead?
}

exports.viewDetails = function(req, res) {
	// Get user data from session
	res.render('user-details')
}
exports.editDetails = function(req, res) {
	// Get user data from session
	res.render('edit-details')
}
exports.submitChanges = function(req, res) {
	// Create the changes in the database
}