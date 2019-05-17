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


    app.post('/books/add-book', function(req, res) {

        let bookName = req.body.name;
        let bookPublishDate = req.body.publishDate;
        let bookLanguage = req.body.language;
        let bookCopies = req.body.copies;

        bookService.addBook(bookName, bookPublishDate, bookLanguage, bookCopies, function() {
            // Redirect the user to the URL: /about
            res.redirect('/books');
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