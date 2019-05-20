const databaseService = require('./database-service');

module.exports = {
    getAllBooks: getAllBooks,
    addBook: addBook,
    deleteBook: deleteBook,
    getBookByGenre: getBookByGenre,
    getBookByAuthor: getBookByAuthor,
    addBookCopy: addBookCopy,
    obtainLastID: obtainLastID,
    deleteInventoryItem: deleteInventoryItem
};

function getBookByAuthor(NAME, callback) {
    const connection = databaseService.getConnection();

    const queryGenre = `SELECT * FROM Authors
                        JOIN AuthorBookMappingTable ON Authors.AuthorID = AuthorBookMappingTable.AuthorID
                        JOIN Books ON AuthorBookMappingTable.BookID = Books.ID
                        WHERE Author.Name = ?`;
    const parameters = [NAME];

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


function addBook(NAME, PUBLISH_DATE, LANGUAGE, COPYNUM, callback) {
    const connection = databaseService.getConnection();

    const query = 'INSERT INTO libraryOfWorms.Books (NAME, PUBLISH_DATE, LANGUAGE) VALUES (?, ?, ?)';
    const parameters = [NAME, PUBLISH_DATE, LANGUAGE];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback(results);
        console.log(`\n${NAME} added successfully!`);

        obtainLastID(() => addBookCopy(results.insertId, COPYNUM))
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


function addBookCopy(bookID, copyNum) {
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
