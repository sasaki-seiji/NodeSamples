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

	Person.
		find({
		  occupation: /host/,
		  'name.last': 'Ghost',
		  age: { $gt: 17, $lt: 66 },
		  likes: { $in: ['vaporizing', 'talking'] }
		}).
		limit(10).
		sort({ occupation: -1 }).
		select({ name: 1, occupation: 1 }).
		exec(callback);
});

function callback(err, result) {
	if (err) handleError(err);
	console.log('result: ', result);
	db.close();
}

