var mongoose = require('mongoose');
var schema = new mongoose.Schema({ name: 'string', size: 'string' });

var connection = mongoose.createConnection('mongodb://localhost:27017/test');
var Tank = connection.model('Tank', schema);

Tank.create({ size: 'small' }, function (err, small) {
  if (err) return handleError(err);
  // saved!
	console.log('small: ', small);
	connection.close();
})
