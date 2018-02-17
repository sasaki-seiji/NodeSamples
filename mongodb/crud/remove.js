
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);

  const col = db.collection('removes');
  // Insert a single document
  col.insertMany([{a:1}, {a:2}, {a:2}], function(err, r) {
    assert.equal(null, err);
    assert.equal(3, r.insertedCount);
    
    // debug
    console.log('initial insert: ', r.ops);

    // Remove a single document
    col.deleteOne({a:1}, function(err, r) {
      assert.equal(null, err);
      assert.equal(1, r.deletedCount);

		  // debug
		  console.log('deleteOne: ', r.result);

      // Update multiple documents
      col.deleteMany({a:2}, function(err, r) {
        assert.equal(null, err);
        assert.equal(2, r.deletedCount);

				// debug
				console.log('deleteMany: ', r.result);

        client.close();
      });
    });
  });
});

