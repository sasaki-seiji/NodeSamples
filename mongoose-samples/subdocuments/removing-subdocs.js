var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var childSchema = new Schema({ name: 'string' });

var parentSchema = new Schema({
  // Array of subdocuments
  children: [childSchema],
  // Single nested subdocuments. Caveat: single nested subdocs only work
  // in mongoose >= 4.2.0
  child: childSchema
});
var Parent = mongoose.model('Parent', parentSchema);


var Parent = mongoose.model('Parent');
var parent = new Parent({children:[{name: 'child#1'},{name: 'child#2'}],
							child:{name: 'child#3'}});
var _id = parent.children[1]._id;

// Equivalent to `parent.children.pull(_id)`
parent.children.id(_id).remove();

// Equivalent to `parent.child = null`
parent.child.remove();

parent.save(function (err, parent) {
  if (err) return handleError(err);
  console.log('parent: ', parent);
  db.close();
});

