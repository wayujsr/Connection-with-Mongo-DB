var express = require('express')
var app = express()
var cors = require('cors');
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
 
// Connection URL
var url = 'mongodb://localhost:27017/mydb';

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.get('/', function (req, res) {
  res.send('List of Homesofa Employees')
})


var emplist;
//path of local list from mongodb which used in react application
app.get('/list', function(req,res){
	 MongoClient.connect(url, function(err, db) {
		console.log("Connected correctly to server");
		findDocuments(db, function() {
          db.close();
		  res.json(emplist);
        });
	});
});

var findDocuments = function(db, callback) {
  // Get the emplist collection
  // collection name from where mongodb works
  var collection = db.collection('homesofaEmpList');
  // Find some emplist
	collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    emplist = docs;
    callback(docs);
  });
}

app.post("/list", function(req,res){
	var entry = req.body;
	emplist.push(entry);
	// Use connect method to connect to the Server
	MongoClient.connect(url, function(err, db) {
		console.log("Connected correctly to server");
		insertDocuments(db, entry, function(data){
			console.log("above db close");
			db.close();
			res.json(emplist);
		});
	});
})

var insertDocuments = function(db, entry, callback) {
  // Get the emplist collection
  var collection = db.collection('homesofaEmpList');
  // Insert some emplist
  collection.insert(
    entry
  , function(err, result) {
    console.log("Inserted 1 row in homesofaEmpList collection");
    console.log(entry);
	callback(result);
  });
}
 
app.listen(2040);
