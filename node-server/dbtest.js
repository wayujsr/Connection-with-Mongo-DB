var MongoClient = require('mongodb').MongoClient;
 
// Connection URL
var url = 'mongodb://localhost:27017/mydb';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  
	console.log("Connected correctly to server");
	insertDocuments(db, function(data){
		console.log(data);
		db.close();
	});
});

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('courses');
  // Insert some documents
  collection.insert(
    {a : 1}
  , function(err, result) {
    console.log("Inserted 3 documents into the document collection");
    callback(result);
  });
}