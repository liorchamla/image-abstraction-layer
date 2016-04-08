/**
 * FreeCodeCamp URL Shortener Challenge
 * Receive an URL and give a short URL to call it. If the short URL is called, redirects to the real URL
 * @author Lior Chamla
 */
require('dotenv').config();
var http = require('http');
var path = require('path');
var express = require('express');
var mongo = require('mongodb').MongoClient;
var url = require('url');
var googleImages = require('google-images');
var dbURI = 'mongodb://localhost:27017/googleimages';
var router = express();
var server = http.createServer(router);
var collection = 'entries';

// static files (html, css ...)
router.use(express.static(path.resolve(__dirname, 'client')));

// route for latest searches
router.get('/latest', function(req, res){
  // setting json headers
  res.set({ 'Content-Type': 'application/json' });
  mongo.connect(dbURI, function(err, db) {
    if (err) throw err
    // we wanna find the last searches
    db.collection(collection).find({},{_id: 0}).sort( { date: 1 } ).limit(20).toArray(function(err, docs){
      if(err) throw err;
      if(docs.length == 0) res.send(JSON.stringify({error: 'No searches were processed recently'}))
      else {
        res.json(docs);
      }
    })
  })
});

// route for a search
router.get('/search/*', function(req, res){
  // setting json headers
  res.set({ 'Content-Type': 'application/json' });
  
  // watching for params
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  
  // creating the search entry
  var searchEntry = {
    term: req.params[0],
    date: new Date()
  }
  
  if(query.offset != undefined){
    searchEntry.offset = query.offset;
  }
  
  saveSearchEntry(searchEntry);
  processSearch(searchEntry, res);
  
});

function saveSearchEntry(entry){
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

function processSearch(entry, response){
  var client = googleImages(process.env.GOOGLE_CSE_ID, process.env.GOOGLE_API_KEY);
  
  client.search(entry.term, {page: entry.offset})
      .then(function (images) {
        response.json(images);
      });
}

// listening to port and processing
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Images Abstraction Layer listening at", addr.address + ":" + addr.port);
});
