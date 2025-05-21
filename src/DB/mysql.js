const mysql = require('mysql');
const config = require('../config');

function GetAll (Table){

}

function GetOne (Table, id){

}

function Update (Table, id){
    
}

function Delete (Table, id){
    
}   

const connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});

connection.connect(err => {
    if (err) {
        console.error('❌ Error al conectar con MySQL:', err);
        return;
    }
    console.log('✅ Conectado a MySQL');
});

function insert(table, data) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${table} SET ?`;
        connection.query(query, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}




module.exports = {
    GetAll,
    insert,
    GetOne,
    Update,
    Delete
}