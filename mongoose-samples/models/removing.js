var mongoose = require('mongoose');
var schema = new mongoose.Schema({ name: 'string', size: 'string' });

var connection = mongoose.createConnection('mongodb://localhost:27017/test');
var Tank = connection.model('Tank', schema);

Tank.remove({ size: 'small' }, function (err) {
	if (err) return handleError(err);
	console.log('removed all small tanks');
	connection.close();
});

