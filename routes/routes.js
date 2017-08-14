var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) { // There wasn't anything in here in the demo files

});

var personSchema = mongoose.Schema({ // Put the schema for our data in here
	
});

var Person = mongoose.model('People_Collection', personSchema);

exports.route = function (req, res) { // Route template
  
};

exports.index = function (req, res) {
  Person.find(function (err, person) {
    if (err) return console.error(err);
    res.render('index');
  });
};