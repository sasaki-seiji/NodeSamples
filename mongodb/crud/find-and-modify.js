
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

    // Modify and return the modified document
    col.findOneAndUpdate({a:1}, {$set: {b: 1}}, {
        returnOriginal: false
// 2018.02.17 modify        
//      , sort: [[a,1]]
      , sort: {a:1}
      , upsert: true
    }, function(err, r) {
      assert.equal(null, err);
      assert.equal(1, r.value.b);

		  // debug
		  console.log('findOneAndUpdate: ', r.value);

      // Remove and return a document
      col.findOneAndDelete({a:2}, function(err, r) {
        assert.equal(null, err);
        assert.ok(r.value.b == null);

				// debug
				console.log('findOneAndDelete: ', r.value);

        client.close();
      });
    });
  });
});
