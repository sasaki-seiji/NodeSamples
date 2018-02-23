var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var schema = new mongoose.Schema({ name: 'string', size: 'string' });
var Tank = mongoose.model('Tank', schema);
var small = new Tank({ size: 'small' });
small.save(function (err, small) {
  if (err) return handleError(err);
  // saved!
	console.log('small: ', small);
	db.close();
})
