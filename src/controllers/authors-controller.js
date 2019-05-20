const bookService = require('../services/book-service.js');
const authorService = require('../services/author-service.js')


module.exports = {
    register: setupThisController
};


function setupThisController(app) {


    app.get('/authors', function(req, res) {

        authorService.getAllAuthors(function(allAuthors) {
            let model = {
                author: allAuthors
            };

            res.render('authors', model);
        });
    });


    app.post('/authors/add-author', function(req, res) {

        let authorName = req.body.name;
        let authorDOB = req.body.DOB;
        let authorDOD = req.body.DOD;
        let authorNationality = req.body.nationality;

        authorService.addAuthor(authorName, authorDOB, authorDOD, authorNationality, function() {
            // Redirect the user to the URL: /books
            // bookService.addAuthor()
            res.redirect('/authors');
        })
    });


    app.get('/authors/remove-author', function(req, res) {
        
        let authorIDToDelete = req.query.authorID;
        res.redirect('/authors');
        authorService.deleteAuthor(authorIDToDelete, function() {
            // Redirect the user to the URL: /books
            
        });
    });
}
