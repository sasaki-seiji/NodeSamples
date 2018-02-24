var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var yourSchema = new Schema( 
	{
		name: { first: 'string', last: 'string' },
		occupation: 'string' 
	}
);

var Person = mongoose.model('Person', yourSchema);

var person = new Person( { name: {first: 'Space', last: 'Ghost'}, 
			occupation: 'talk show host' });
person.save(function(err, person) {
	if (err) handleError(err);
	console.log('save Person: ', person);
	
	// find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
	Person.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
		if (err) return handleError(err);
		// Prints "Space Ghost is a talk show host".
		console.log('%s %s is a %s.', person.name.first, person.name.last,
		  person.occupation);
		db.close();
	});
});


