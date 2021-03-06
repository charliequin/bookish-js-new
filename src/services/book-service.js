const databaseService = require('./database-service');

module.exports = {
    getAllBooks: getAllBooks,
    addBook: addBook,
    deleteBook: deleteBook,
    getBookByGenre: getBookByGenre,
    getBookByAuthor: getBookByAuthor,
    addBookCopies: addBookCopies,
    obtainLastID: obtainLastID,
    deleteInventoryItem: deleteInventoryItem
};


function getBookByAuthor(name, callback) {
    const connection = databaseService.getConnection();

    const queryGenre = `SELECT * FROM Authors
                        JOIN AuthorBookMappingTable ON Authors.AuthorID = AuthorBookMappingTable.AuthorID
                        JOIN Books ON AuthorBookMappingTable.BookID = Books.ID
                        WHERE Author.Name = ?`;
    const parameters = [name];

    connection.query(queryGenre, parameters, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
}


function getBookByGenre(ID, callback) {
    const connection = databaseService.getConnection();

    const queryGenre = `SELECT * FROM GenreMappingTable 
                        JOIN Books ON GenreMappingTable.BookID = Books.ID
                        WHERE Genre = ?`;
    const parameters = [ID];

    connection.query(queryGenre, parameters, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
}


function getAllBooks(callback) {
    const connection = databaseService.getConnection();

    const query = 'SELECT * FROM Books';

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
}


function addBook(name, publishDate, language, copyNum, callback) {
    const connection = databaseService.getConnection();

    const query = 'INSERT INTO libraryOfWorms.Books (NAME, PUBLISH_DATE, LANGUAGE) VALUES (?, ?, ?)';
    const parameters = [name, publishDate, language];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback(results);
        console.log(`\n${name} added successfully!`);

        obtainLastID(() => addBookCopies(results.insertId, copyNum))
    });
};


function obtainLastID(callback) {
    const connection = databaseService.getConnection();
    const query = 'SELECT LAST_INSERT_ID();';
    
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
}


function addBookCopies(bookID, copyNum) {
    const connection = databaseService.getConnection();

    const query = 'INSERT INTO libraryOfWorms.Inventory (BookID) VALUES (?)';
    const parameters = [bookID]

    for (let i = 0; i < copyNum; i++) {
        connection.query(query, parameters);
    }
    console.log(`${copyNum} copies of ${bookID} added successfully.`);
    return;
}


function deleteBook(bookID, callback) {
    const connection = databaseService.getConnection();

    const query = 'DELETE FROM libraryOfWorms.Books WHERE id = ?';
    const parameters = [bookID];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback();
        console.log(`${bookID} successfully deleted from libraryOfWorms.Books.`)
    });
}

function deleteInventoryItem(bookID, callback) {
    const connection = databaseService.getConnection();

    const query = 'DELETE FROM libraryOfWorms.Inventory WHERE BookID  = ?'
    const parameters = [bookID];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback(results);

        deleteBook(bookID, callback);
        console.log(`${bookID} successfully deleted from libraryOfWorms.Inventory.`)
    });
}
