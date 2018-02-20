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

  // assign a function to the "statics" object of our animalSchema
  animalSchema.statics.findByName = function(name, cb) {
    return this.find({ name: new RegExp(name, 'i') }, cb);
  };

	var Animal = mongoose.model('Animal', animalSchema);

	var dog = new Animal({ name: 'FiDo', type: 'dog' });
	dog.save(function(err, dog) {
		if (err) return console.error(err);
		
		Animal.findByName('fido', function(err, animals) {
			if (err) return console.error(err);
	
			console.log(animals);
			db.close();
		});
	});
});

