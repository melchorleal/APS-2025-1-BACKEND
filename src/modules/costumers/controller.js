const db = require('../../DB/mysql');

const Table = 'costumers';

function GetAll(){
    return db.GetAll(Table);
}

module.exports = {
    GetAll,

}