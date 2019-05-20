const bookService = require('../services/book-service.js');
const authorService = require('../services/author-service.js');


module.exports = {
    register: setupThisController
};


function setupThisController(app) {

    app.get('/control', function(req, res) {
        res.render('control');
    })


    app.post('/control/add-book', function(req, res) {

        let bookName = req.body.name;
        let bookPublishDate = req.body.publishDate;
        let bookLanguage = req.body.language;
        let bookCopies = req.body.copies;

        bookService.addBook(bookName, bookPublishDate, bookLanguage, bookCopies, function() {
            res.redirect('/books');
        })
    });


    app.post('/control/add-author', function(req, res) {

        let authorName = req.body.name;
        let authorDOB = req.body.DOB;
        let authorDOD = req.body.DOD;
        let authorNationality = req.body.nationality;

        authorService.addAuthor(authorName, authorDOB, authorDOD, authorNationality, function() {
            res.redirect('/authors');
        })
    });

}