
const Long = require('mongodb').Long;
const Decimal = require('mongodb').Decimal128;

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

  const longValue = Long(1787);
  const decimalValue = Decimal.fromString("27.8892836");

  // Insert multiple documents
  db.collection('numbers').insertMany([ { a : longValue }, { b : decimalValue } ], function(err, r) {
    assert.equal(null, err);
    assert.equal(2, r.insertedCount);
    
    // debug
    console.log('inserted: ', r.ops);
    
    client.close();
  });
});

