// Require in dependencies
var cheerio = require('cheerio');
var axios = require('axios');

// scrape function
var scrape = function (cb) {

    // Ajax call
    axios.get("https://www.nytimes.com").then(function (res) {

        var $ = cheerio.load(res.data);

        var articles = [];

        // Look through specific parts of the document and get the data
        $(".theme-summary").each(function (i, element) {
            var head = $(this).children(".story-heading").text().trim();
            var sum = $(this).children(".summary").text().trim();

            // store the data in an object
            var dataToAdd = {
                headline: head,
                summary: sum
            };
            // push the data to the empty array
            articles.push(dataToAdd);
        });
        // set the articles arry as the call back
        cb(articles);
    });
}

module.exports = scrape;