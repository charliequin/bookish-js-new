const databaseService = require('./database-service');


module.exports = {
    getAllAuthors: getAllAuthors,
    addAuthor: addAuthor,
    deleteAuthor: deleteAuthor
};


function getAllAuthors(callback) {
    const connection = databaseService.getConnection();

    const query = 'SELECT * FROM Authors';

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
}


function addAuthor(NAME, DOB, DOD, NATIONALITY, callback) {
    const connection = databaseService.getConnection();

    const query = 'INSERT INTO Authors (NAME, DOB, DOD, NATIONALITY) VALUES (?, ?, ?, ?)';
    const parameters = [NAME, DOB, DOD, NATIONALITY];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback();
    });
}


function deleteAuthor(ID, callback) {
    const connection = databaseService.getConnection();

    const query = 'DELETE FROM Authors WHERE id = ?';
    const parameters = [ID];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback();
    });
}

