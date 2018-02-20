var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
		// we're connected!
		console.log('connected!');

	// define a schema
	var animalSchema = new Schema({ name: String, type: String });

	// assign a function to the "methods" object of our animalSchema
	animalSchema.methods.findSimilarTypes = function(cb) {
		return this.model('Animal').find({ type: this.type }, cb);
	};

	var Animal = mongoose.model('Animal', animalSchema);

	var dog = new Animal({ type: 'dog' });
	dog.save(function(err, dog) {
		if (err) return console.error(err);
		
		dog.findSimilarTypes(function(err, dogs) {
			if (err) return console.error(err);
	
			console.log(dogs); // woof
			db.close();
		});
	});
});

