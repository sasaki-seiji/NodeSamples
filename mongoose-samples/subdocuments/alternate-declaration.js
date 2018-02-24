var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var parentSchema = new Schema({
  children: [{name: 'String'}]
});

var Parent = mongoose.model('Parent', parentSchema);
var parent = new Parent({ children: [{ name: 'Matt' }, { name: 'Sarah' }]});

parent.save(function (err, parent) {
	console.log(parent);
	db.close();
});

