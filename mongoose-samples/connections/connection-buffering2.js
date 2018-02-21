var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MyModel = mongoose.model('Test', new Schema({ name: String }));

// Works
MyModel.findOne(function(error, result) { 
	console.log('findOne returns: ', result);
	mongoose.connection.close();
});

setTimeout(function(){
	mongoose.connect('mongodb://localhost/myapp');
}, 6000);
