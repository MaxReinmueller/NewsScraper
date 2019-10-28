// require scripts
var scrape = require('../scripts/scrape');
var makeDate = require('../scripts/date');

// require mongoose models
var Headline = require('../models/Headlines');

module.exports = {
  // Create
  fetch: function (cb) {
    scrape(function (data) {
      console.log('fetch', data)
      var articles = data;
      for (i = 0; i < articles.length; i++) {
        articles[i].date = makeDate();
        articles[i].saved = false;
      }

      // inserting headline in to collection
      Headline.collection.insertMany(articles, {
        ordered: false
      }, function (err, docs) {
        cb(err, docs);
      });
    });
  },
  // Delete articles
  delete: function(query, cb) {
    Headline.remove(query, cb);
  },
  // Read articles
  get: function(query, cb) {
    Headline.find(query)
    .sort({
      _id: -1
    })
    .exec(function(err, doc){
      cb(doc);
    });
  },
// Update
  update: function(query, cb) {
    Headline.update({_id: query._id}, {
      $set: query
    }, {}, cb);
  }
}