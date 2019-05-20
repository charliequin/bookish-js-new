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
            // Redirect the user to the URL: /books
            res.redirect('/books');
        })
    });


    app.get('/books/remove-book', function(req, res) {
        
        let bookIDToDelete = req.query.bookID;
        res.redirect('/books');
        bookService.deleteInventoryItem(bookIDToDelete, function() {
            // Redirect the user to the URL: /books
            
        });
    });

}