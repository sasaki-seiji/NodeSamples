var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


// Below code will print out 1-4 in order
var childSchema = new mongoose.Schema({ name: 'string' });

childSchema.pre('validate', function(next) {
  console.log('2: child-validate');
  next();
});

childSchema.pre('save', function(next) {
  console.log('3: child-save');
  next();
});

var parentSchema = new mongoose.Schema({
  child: childSchema,
    });

parentSchema.pre('validate', function(next) {
  console.log('1: parent-validate');
  next();
});

parentSchema.pre('save', function(next) {
  console.log('4: parent-save');
  next();
});


var Parent = mongoose.model('Parent', parentSchema);

var parent = new Parent({ child: { name: 'boy' } });
parent.save(function (err, parent) {
  console.log(parent);
  db.close();
});

