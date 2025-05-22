const mysql = require('mysql');
const config = require('../config');
const DbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let connection;

function Connect(){
connection = mysql.createConnection(DbConfig);

connection.connect((err) => {
    if(err){
        console.log('[Error connecting to the database:]', err);
        setTimeout(Connect, 200);
    } else {
        console.log('Connected to the database');
    }
} );

connection.on('error', (err) => {
    console.log('[Database error]', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
        Connect();
    } else {
        throw err;
    }
} );
}

Connect();

function GetAll (Table){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${Table}`, (err, result) => {
                return err ? reject(err): resolve(result);
        })
    });

}

function GetOne (Table, id){
        return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${Table} WHERE id=${id}`, (err, result) => {
                return err ? reject(err): resolve(result);
        })
    });

}

function Add (Table, data){
        return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${Table} SET ? ON DUPLICATE KEY UPDATE ?`, [data,data], (err, result) => {
                return err ? reject(err): resolve(result);
        })
    });

}



function Delete (Table, data){
        return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${Table} WHERE id = ?`, data.id, (err, result) => {
                return err ? reject(err): resolve(result);
        })
    });

} 

function query (Table, consulta){
        return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${Table} WHERE ?`, consulta, (err, result) => {
                return err ? reject(err): resolve(result[0]);
        })
    });

} 

module.exports = {
    GetAll,
    GetOne,
    Delete,
    Add,
    query
}