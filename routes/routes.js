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

var config = {
	"routes": [
		["Home", "/"],		
		["Sign up", "/signup"],
		["Login", "/login"]
		
	]
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
		if(req.session.isLoggedIn && req.session.isAdmin){
			res.render('index', {
				data: [firstQ, secondQ, thirdQ, users.length],
				config: {
					"routes": [
						["Home", "/"],
						["Profile", "/profile"],
						["Admin ", "/admin"],
						["Logout", "/logout"]
					]
				}
			});
		}
		else if(req.session.isLoggedIn ){
			res.render('index', {
				data: [firstQ, secondQ, thirdQ, users.length],
				config: {
  				"routes": [
							["Home", "/"],
							["Profile", "/details"],
						  ["Logout", "/logout"]
  				]
				}
			});
		}
		else{
			res.render('index', {
				data: [firstQ, secondQ, thirdQ, users.length],
				config: {
  				"routes": [
							["Home", "/"],
							["Sign up", "/signup"],
						  ["Login", "/login"]
  				]
				}
		});
	}
})
}
						
						

exports.login = function (req, res) {
	res.render('login', {
		config: config
	});
}
exports.tryLogin = function (req, res) {
	var usersArray = User.find({ username: req.body.username }, function(err, users) {
		if(err) return console.error(err);
		bcrypt.compare(req.body.password, users[0].password, function(err, result) {
			req.session.username = req.body.username;
			req.session.isAdmin = users[0].isAdmin;
			req.session.isLoggedIn = true;
			console.log(req.session);
			res.redirect('/');
		});
	});
}

exports.logout = function (req, res){
	req.session.destroy();
	console.log(req.session);
	res.redirect('/');
}

exports.signup = function(req, res) {
	res.render('sign-up', {
		usernameExists: false, config: config
	});
}
exports.createUser = function(req, res) {
	var newUsername = true;
	User.find(function(err, users) {
		for(var x = 0; x < users.length && newUsername; x++) {
			if(users[x].username === req.body.username) {
				newUsername = false;
			}
		}
	});
	
	if(newUsername) {
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
	else {
		res.render('sign-up', { usernameExists: true })
	}
}

exports.admin = function(req, res) {
	if(req.session.isAdmin){
		User.find(function (err, users) {
			if (err) return console.error(err);
			res.render('admin', {
				title: 'Users List',
				people: users,
				config: config
			});
		});
	}
}
exports.deleteUser = function(req, res) {
	// if signed-in user is admin
		// Delete user with the specified username
		res.redirect('/admin');
	// else
		res.redirect('/');
}
exports.makeUserAdmin = function(req,res) {
	// if signed-in user is admin
		// Fetch specified user
		// Change isAdmin to true
		res.redirect('/admin');
	// else
		res.redirect('/');
}

exports.viewDetails = function(req, res) {
	if(req.session.isLoggedIn){
	User.find({ username: req.session.username }, function(err, users) {
		if(err) return console.error(err);
		var firstBlurb, secondBlurb, thridBlurb;
		
		if(users[0].question1) {
			firstBlurb = 'Would rather be illiterate';
		}
		else {
			firstBlurb = 'Would rather take everything literally';
		}
		if(users[0].question2) {
			secondBlurb = 'Would rather only be able to laugh at blonde jokes'
		}
		else {
			secondBlurb = 'Would rather be unable to understand sarcasm'
		}
		if(users[0].question3) {
			thirdBlurb = "Would rather sleep in a room that's slightly too warm"
		}
		else {
			thirdBlurb = "Would rather sleep in a room that's slightly too cold"
		}
		
		res.render('user-details', {
			config: {
  				"routes": [
							["Home", "/"],
							["Profile", "/details"],
						  ["Logout", "/logout"]
  				]
				},
			user: {
				age: users[0].age,
				answer1Blurb: firstBlurb,
				answer2Blurb: secondBlurb,
				answer3Blurb: thirdBlurb
			}
		});
	});
	}
	else{
		res.redirect('/');
	}
}
exports.editDetails = function(req, res) {
	var user = User.find({ username: req.session.username }, function(err, users) {
		if(err) return console.error(err);
		res.render('edit-details', {
			config: config,
			user: users[0]
		});
	});
}
exports.submitChanges = function(req, res) {
	User.find({ username: req.session.username }, function(err, users) {
		var user = users[0];
		user.age = req.body.age;
		user.question1 = req.body.question1 == 1;
		user.question2 = req.body.question2 == 1;
		user.question3 = req.body.question3== 1;
		
		user.save(function(err, user) {
			if (err) return console.error(err);
			else console.log('Updated ' + req.session.username);
		});
		res.redirect('/');
	});
}