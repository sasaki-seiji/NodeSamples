
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

  const col = db.collection('findAndModify');
  // Insert a single document
  col.insert([{a:1}, {a:2}, {a:2}], function(err, r) {
    assert.equal(null, err);
    assert.equal(3, r.result.n);

		// debug
		console.log('initial insert: ', r.ops);
		
    // Remove a document from MongoDB and return it
    col.findOneAndDelete({a:1}, {
// 2018.02.17 modify
        //sort: [[a,1]]
        sort: {a:1}
      }
      , function(err, r) {
        assert.equal(null, err);
        assert.ok(r.value.b == null);

				// debug
				console.log('findOneAndDelete: ', r.value);
		
        client.close();
    });
  });
});

