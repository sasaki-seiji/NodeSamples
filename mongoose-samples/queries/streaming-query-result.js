var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var yourSchema = new Schema( 
	{
		name: { first: 'string', last: 'string' },
		occupation: 'string',
		age: 'Number',
		likes: 'string'
	}
);

var Person = mongoose.model('Person', yourSchema);

var person = new Person( 
	{ 
		name: {first: 'Space', last: 'Ghost'}, 
		occupation: 'talk show host',
		age: 32,
		likes: 'talking'
	}
);
person.save(function(err, person) {
	if (err) handleError(err);
	console.log('saved Person:\n', person);


	var cursor = Person.find({ occupation: /host/ }).cursor();
	cursor.on('data', function(doc) {
		// Called once for every document
		console.log('data:\n', doc);
	});
	cursor.on('close', function() {
		// Called when done
		console.log('close:');
		db.close();
	});
});


