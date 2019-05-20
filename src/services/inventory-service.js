const databaseService = require('./database-service');


module.exports = {
    getAllInventory: getAllInventory,
    addInventoryItem: addInventoryItem,
    deleteInventoryItem: deleteInventoryItem
};


function getAllInventory(callback) {
    const connection = databaseService.getConnection();

    const query = 'SELECT * FROM Inventory';

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

