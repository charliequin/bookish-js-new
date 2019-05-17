const mysql = require('mysql');


module.exports = {
    getConnection: getConnectionAndCreateIfNeeded
};


const serverName = 'apriltrainees.c9odsywzh0wu.us-east-2.rds.amazonaws.com';
const userName = 'charlieQuin';
const password = 'password';
const databaseSchema = 'libraryOfWorms';


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


console.log(`Connected to: ${serverName}`,
                `\nLogged in as: ${userName}`,
                `\nDB: ${databaseSchema}`);
