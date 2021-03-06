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

  const col = db.collection('find');
  // Insert a single document
  col.insertMany([{a:1}, {a:1}, {a:1}], function(err, r) {
    assert.equal(null, err);
    assert.equal(3, r.insertedCount);
    
    // debug
    console.log('initial insert: ', r.ops);

    // Get first documents from cursor using each
    col.find({a:1}).limit(2).each(function(err, doc) {
      if(doc) {
        // Got a document

				// debug
				console.log('got: ', doc);

      } else {
        client.close();
        return false;
      }
    });
  });
});

