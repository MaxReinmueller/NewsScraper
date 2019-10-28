$(document).ready(function () {

    console.log("public index.js");
    var articleContainer = $('.article-container');
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);
    $(document).on("click", ".renderArticlesBtn", renderArticles);

    initPage();

    // get the articles from the api and pass them to the render function
    function initPage() {
        console.log("initPage");
        articleContainer.empty();
        $.get("/api/headlines")
            .then(function (data) {
                if (data && data.length) {
                    renderArticles(data);
                } else {
                    renderEmpty();
                }
            })
    }



    function createPanel(article) {
        console.log("panel", article)
        var panel =
            $(["<div class='card'>",
                    "<div class='card-body'>",
                        "<h5 class='card-title'>",
                            article.title,
                        "</h5>",
                        "<a class='card-text'>",
                            "<p class='card-text'>",
                                article.link,
                            "</p>",
                        "</a>",
                        "<a href='/saved' class='btn btn-primary'>Go to Saved</a>",
                    "</div>",
                "</div>"
            ].join(""));

        return panel;
    }

        // Render the articles on the page
    function renderArticles(articles) {
        console.log("render", articles);
        var articlePanels = [];
        for (i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        articleContainer.append(articlePanels);
    }

    // empty
    function renderEmpty() {
        var emptyAlert =
            $(["<div class='alert alert-warning text-center'>",
                "<h4> Uh Oh. looks like we don't have any articles</h4>",
                "</div>",
                "<div class='panel panel-default'>",
                "<div class='panel-heading text-center'>",
                "<h3>What would you like to do?</h3>",
                "</div>",
                "<div class='panel-body text-center'>",
                "<h4><a class='scrape-new>Try Scraping New Articles</a><h4>",
                "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
                "</div>",
                "</div>"
            ].join(""));
        articleContainer.append(emptyAlert);
    }

    function handleArticleSave() {
        var articleToSave = $(this).parents(".panel").data();
        articleToSave.saved = true;

        $.ajax({
                method: "PATCH",
                url: "/api/headlines",
                data: articleToSave
            })
            .then(function (data) {
                if (data.ok) {
                    initPage()
                }
            });
    }

    function handleArticleScrape() {
        $.get("/api/fetch")
            .then(function (data) {
                initPage(data);
                // bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
            })
            .catch(err =>
                console.log('err', err)
            )
    }

})