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

  animalSchema.query.byName = function(name) {
    return this.find({ name: new RegExp(name, 'i') });
  };
  
	var Animal = mongoose.model('Animal', animalSchema);

	var dog = new Animal({ name: 'FiDo', type: 'dog' });
	dog.save(function(err, dog) {
		if (err) return console.error(err);
		
		Animal.find().byName('fido').exec(function(err, animals) {
			if (err) return console.error(err);
	
			console.log(animals);
			db.close();
		});
	});
});

