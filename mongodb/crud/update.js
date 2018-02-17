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

  const col = db.collection('updates');
  // Insert a single document
  col.insertMany([{a:1}, {a:2}, {a:2}], function(err, r) {
    assert.equal(null, err);
    assert.equal(3, r.insertedCount);
    
    // Update a single document
    col.updateOne({a:1}, {$set: {b: 1}}, function(err, r) {
      assert.equal(null, err);
      assert.equal(1, r.matchedCount);
      assert.equal(1, r.modifiedCount);

		  // debug
		  console.log('updateOne: ', r.result);

      // Update multiple documents
      col.updateMany({a:2}, {$set: {b: 1}}, function(err, r) {
        assert.equal(null, err);
        assert.equal(2, r.matchedCount);
        assert.equal(2, r.modifiedCount);

				// debug
				console.log('updateMany: ', r.result);

        // Upsert a single document
        col.updateOne({a:3}, {$set: {b: 1}}, {
          upsert: true
        }, function(err, r) {
          assert.equal(null, err);
          assert.equal(0, r.matchedCount);
          assert.equal(1, r.upsertedCount);
						
					// debug
					console.log('updateOne-upsert: ', r.result);

          client.close();
        });
      });
    });
  });
});

