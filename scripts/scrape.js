// Require in dependencies
var cheerio = require('cheerio');
var axios = require('axios');


var scrape = function(cb) {

    axios.get("https://torbayfishing.com/rigs.htm").then(function(res){

    var $ = cheerio.load(res.data);
    
    var articles = [];

    $(".")
    });
}