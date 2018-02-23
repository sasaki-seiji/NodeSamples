var mongoose = require('mongoose');
var schema = new mongoose.Schema({ name: 'string', size: 'string' });

var connection = mongoose.createConnection('mongodb://localhost:27017/test');
var Tank = connection.model('Tank', schema);

Tank.create({ size: 'small', name: 'no#4' }, function (err, small) {
  if (err) return handleError(err);
	console.log('before: ', small);
	
	var id = small._id;

	Tank.findByIdAndUpdate(id, { $set: { size: 'large' }}, { new: true }, 
		function (err, tank) {
			if (err) return handleError(err);
		  console.log('after: ', tank);
		  connection.close();
		}
	);
});

