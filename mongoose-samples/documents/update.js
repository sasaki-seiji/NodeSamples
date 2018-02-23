var mongoose = require('mongoose');
var schema = new mongoose.Schema({ name: 'string', size: 'string' });

var connection = mongoose.createConnection('mongodb://localhost:27017/test');
var Tank = connection.model('Tank', schema);

Tank.create({ size: 'small', name: 'no#3' }, function (err, small) {
  if (err) return handleError(err);
	console.log('before: ', small);
	
	var id = small._id;
	
	Tank.update({ _id: id }, { $set: { size: 'large' }}, 
		function (err, updated) {
		  if (err) return handleError(err);
		  console.log('updated: ', updated);
		  connection.close();
		}
	);
});

