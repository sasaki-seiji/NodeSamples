var mongoose = require('mongoose');
var schema = new mongoose.Schema({ name: 'string', size: 'string' });

var connection = mongoose.createConnection('mongodb://localhost:27017/test');
var Tank = connection.model('Tank', schema);

Tank.create({ size: 'small', name: 'no#1' }, function (err, small) {
  if (err) return handleError(err);

	Tank.find({ size: 'small' }).where('name').eq('no#1').exec(function (err, smalls) {
		if (err) return handleError(err);
		console.log('smalls: ', smalls);
		connection.close();
	});
})

