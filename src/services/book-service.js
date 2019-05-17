const databaseService = require('./database-service');
const readLineSync = require('readline-sync');

function getUserInput() {

    let success = false;
    let x = 1;
    let y = 2;

    while (!success) {
        let bookName = readLineSync.question('\nBook name: ');
        let bookPublishDate = readLineSync.question('Publish date (YYYY/MM/DD): ');
        let bookLanguage = readLineSync.question('Language: ');
        let bookCopyNum = readLineSync.question('Number of copies: ');

        
        addBook(bookName, bookPublishDate, bookLanguage, bookCopyNum, () => {});
        return;
        
    }
};

while (true) {
    getUserInput();
}




module.exports = {
    getAllBooks: getAllBooks,
    addBook: addBook,
    deleteBook: deleteBook,
    getBookByGenre: getBookByGenre,
    getBookByAuthor: getBookByAuthor,
    addBookCopy: addBookCopy,
    obtainLastID: obtainLastID
};

// addBook('The Grapes of Wrath', '1939-03-01', 'English', 3, () => {});

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


function addBookCopy(BookID, COPYNUM) {
    const connection = databaseService.getConnection();

    const query = 'INSERT INTO libraryOfWorms.Inventory (BookID) VALUES (?)';
    const parameters = [BookID]

    for (let i = 0; i < COPYNUM; i++) {
        connection.query(query, parameters);
    }
    console.log(`${COPYNUM} copies of ${BookID} added successfully.`);
    return;
}


function deleteBook(ID, callback) {
    const connection = databaseService.getConnection();

    const query = 'DELETE FROM libraryOfWorms.Books WHERE id = ?';
    const parameters = [ID];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback();
    });
}
