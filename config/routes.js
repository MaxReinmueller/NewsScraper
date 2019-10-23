module.exports = function(router) {
    // render the home page
    router.get("/", function(req, res) {
        res.render("home");
    });
    // render the saved page
    router.get("/saved", function(req, res) {
        res.render("saved");
    });
}