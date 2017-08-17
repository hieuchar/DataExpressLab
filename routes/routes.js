var mongoose = require('mongoose'),
		bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) { // There wasn't anything in here in the demo files

});

var userSchema = mongoose.Schema({ // Put the schema for our data in here
	username: String,
	password: String,
	age: Number,
	question1: Boolean,
	question2: Boolean,
	question3: Boolean,
	isAdmin: Boolean
});

var User = mongoose.model('User_Collection', userSchema);

exports.route = function (req, res) { // Route template
  
};

exports.index = function (req, res) {    
	User.find(function(err, users){
		 if (err) return console.error(err);
		 
		 var firstQ = 0;
		 var secondQ = 0;
		 var thirdQ = 0;		 
		users.forEach(function(user){
			firstQ += user.question1 ? 1 : 0;
			secondQ += user.question2 ? 1 : 0;
			thirdQ += user.question3 ? 1 : 0;
		});
     res.render('index', {      
			data: [firstQ, secondQ, thirdQ, users.length]
		});
	});	
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
exports.logout = function (req, res){
	req.session.destroy();
  res.send("Logout successful!");
}
exports.signup = function(req, res) {
	res.render('sign-up');
}
exports.createUser = function(req, res) {
	bcrypt.hash(req.body.password, null, null, function(err, hash) {
		var user = new User({
			username: req.body.username,
			age: req.body.age,
			password: hash,
			question1: req.body.question1 == 1,
			question2: req.body.question2 == 1,
			question3: req.body.question3 == 1,
			isAdmin: req.body.userType == 1
		});
		user.save(function (err, person) {
			if (err) return console.error(err);
			console.log(req.body.username + ' added');
		});
		res.redirect('/');
	});
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
	// This should basically be the same as create user, except you're modifying and existing object
}