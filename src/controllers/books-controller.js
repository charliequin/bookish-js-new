const bookService = require('../services/book-service');


module.exports = {
    register: setupThisController
};


function setupThisController(app) {


    app.get('/books', function(req, res) {

        bookService.getAllBooks(function(allBooks) {
            let model = {
                books: allBooks
            };

            res.render('books', model);
        });

    });


    app.post('/about/add-technology', function(req, res) {

        let technologyName = req.body.name;
        let technologyLogoUrl = req.body.logoUrl;

        technologyService.addTechnology(technologyName, technologyLogoUrl, function() {
            // Redirect the user to the URL: /about
            res.redirect('/about');
        })
       
    });


    app.get('/about/delete-technology', function(req, res) {
        
        let technologyIdToDelete = req.query.technologyId;

        technologyService.deleteTechnology(technologyIdToDelete, function() {
            // Redirect the user to the URL: /about
            res.redirect('/about');
        });

    });


}