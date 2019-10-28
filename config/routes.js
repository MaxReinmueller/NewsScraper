// require in the scraper script
var scrape = require('../scripts/scrape');
var cheerio = require('cheerio');
var axios = require('axios');

// bring in the controllers
var headlinesController = require('../controllers/headlines');
var notesController = require('../controllers/notes');

module.exports = function(router) {
    // render the home page
    router.get("/", function(req, res) {
        res.render("home");
    });
    // render the saved page
    router.get("/saved", function(req, res) {
        res.render("saved");
    });


    router.get("/api/fetch", function(req, res) {
        headlinesController.fetch(function(err, docs) {
            if (err) {
                console.log('BIG ERROGROWRO')
                throw err;
            }
            else if (!docs || docs.insertedCount === 0 ) {
                res.json({
                    message: "No New articles today, Check back tomorrow!"
                });
            } else {
                res.json({
                    message: "Added " + docs.insertedCount + " new articles!"
                });
            }
        });
    });
    router.get("/api/headlines", function(req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        } else {
            headlinesController.get(query, function(data){
                res.json(data);
            });
        }
    });
    router.delete("/api/headlines/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function(err, data) {
            res.json(data)
        });
    });
    router.patch(".api.headlines", function(req, res) {
        headlinesController.update(req.body, function(err, data) {
            res.json(data);
        });
    });
    router.get("api/notes/:headline_id?", function(req, res){
        var query = {}
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        } else {
            notesController.get(query, function(err, data) {
                res.json(data);
            });
        }
    });
    router.delete("api/notes/:id", function(res, res) {
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function(err, data) {
            res.json(data);
        });
    });
    router.post("/api/notes", function(req, res) {
        notesController.save(req.body, function(data){
            res.json(data);
        });
    });
}