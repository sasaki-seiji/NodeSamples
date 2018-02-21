var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/myapp');
var MyModel = mongoose.model('Test', new Schema({ name: String }));

var test = new MyModel({name: 'test'});

// Works
test.save(function(err, test) {
	MyModel.findOne(function(error, result) { 
		console.log('findOne returns: ', result);
		mongoose.connection.close();
	});
});
