// we need the npm module to search through images
var googleImages = require('google-images');

// creating a module to perform searches
module.exports = {
    processSearch: function(entry, response){
        var client = googleImages(process.env.GOOGLE_CSE_ID, process.env.GOOGLE_API_KEY);
        
        client.search(entry.term, {page: entry.offset})
          .then(function (images) {
            response.json(images);
        });
    }    
}

