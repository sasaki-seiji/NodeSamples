
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

  const col = db.collection('bulkops');
  // Create ordered bulk, for unordered initializeUnorderedBulkOp()
  var bulk = col.initializeOrderedBulkOp();
  // Insert 10 documents
  for(var i = 0; i < 10; i++) {
    bulk.insert({a: i});
  }

  // Next perform some upserts
  for(var i = 0; i < 10; i++) {
    bulk.find({b:i}).upsert().updateOne({b:1});
  }

  // Finally perform a remove operation
  bulk.find({b:1}).deleteOne();

  // Execute the bulk with a journal write concern
  bulk.execute(function(err, result) {
    assert.equal(null, err);
    client.close();
  });
});
