const databaseService = require('./database-service');


module.exports = {
    getAllMembers: getAllMembers,
    addMember: addMember,
    deleteMember: deleteMember
};


function getAllMembers(callback) {
    const connection = databaseService.getConnection();

    const query = 'SELECT * FROM Members';

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
}


function addMember(name, DOB, signUp, deceased, callback) {
    const connection = databaseService.getConnection();

    const query = 'INSERT INTO Members (NAME, DOB, SIGN_UP, DECEASED) VALUES (?, ?, ?, ?)';
    const parameters = [name, DOB, signUp, deceased];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback();
    });
}


function deleteMember(ID, callback) {
    const connection = databaseService.getConnection();

    const query = 'DELETE FROM Members WHERE id = ?';
    const parameters = [ID];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback();
    });
}

