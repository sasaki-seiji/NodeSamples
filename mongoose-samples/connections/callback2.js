var mongoose = require('mongoose');
var uri = 'mongodb://localhost/myapp';

const options = {

  //WARNING: The `useMongoClient` option is no longer necessary in mongoose 5.x, please remove it.
  //useMongoClient: true,

  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

mongoose.connect(uri, options).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
		// we're connected!
		console.log('connected!');
  },
  err => { /** handle initial connection error */ 
		throw err;
  }
);

