// declaring needed modules
var mongo = require('mongodb').MongoClient;
var dbURI = 'mongodb://localhost:27017/googleimages';
var collection = 'entries';

// creating our db access module
module.exports = {
    printLastSearch: function(response){
        mongo.connect(dbURI, function(err, db) {
            if (err) throw err
            // we wanna find the last searches
            db.collection(collection).find({},{_id: 0}).sort( { date: 1 } ).limit(20).toArray(function(err, docs){
              if(err) throw err;
              if(docs.length == 0) response.send(JSON.stringify({error: 'No searches were processed recently'}))
              else {
                response.json(docs);
              }
            })
        })   
    },
    
    saveSearchEntry: function(entry){
      // connexion to mongo
      mongo.connect(dbURI, function(err, db) {
        if (err) throw err
        // inserting the search entry
        db.collection(collection).insert(entry, function(err, doc){
            if(err) throw err;
            db.close();
        })
      })  
    }
}

