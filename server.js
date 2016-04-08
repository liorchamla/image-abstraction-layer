/**
 * FreeCodeCamp URL Shortener Challenge
 * Receive an URL and give a short URL to call it. If the short URL is called, redirects to the real URL
 * @author Lior Chamla
 */
require('dotenv').config();
var http = require('http');
var path = require('path');
var express = require('express');
var db = require('./app/db.js');
var url = require('url');
var router = express();
var server = http.createServer(router);
var google = require('./app/google.js');

// static files (html, css ...)
router.use(express.static(path.resolve(__dirname, 'client')));

// route for latest searches
router.get('/latest', function(req, res){
  // setting json headers
  res.set({ 'Content-Type': 'application/json' });
  db.printLastSearch(res);
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
  
  db.saveSearchEntry(searchEntry);
  google.processSearch(searchEntry, res);
  
});



// listening to port and processing
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Images Abstraction Layer listening at", addr.address + ":" + addr.port);
});
