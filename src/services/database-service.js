const mysql = require('mysql');


module.exports = {
    getConnection: getConnectionAndCreateIfNeeded
};


const serverName = 'localhost';
const userName = 'root';
const password = '';
const databaseSchema = 'bookish';


let connection;

function getConnectionAndCreateIfNeeded() {
    if (connection === undefined) {
        setupConnection();
    }

    return connection;
}

function setupConnection() {
    connection = mysql.createConnection({
        host: serverName,
        user: userName,
        password: password,
        database: databaseSchema
    });

    connection.connect();
}
