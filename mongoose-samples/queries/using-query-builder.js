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


	// Using query builder
	Person.
		find({ occupation: /host/ }).
		where('name.last').equals('Ghost').
		where('age').gt(17).lt(66).
		where('likes').in(['vaporizing', 'talking']).
		limit(10).
		sort('-occupation').
		select('name occupation').
		exec(callback);
});

function callback(err, result) {
	if (err) handleError(err);
	console.log('result: ', result);
	db.close();
}

