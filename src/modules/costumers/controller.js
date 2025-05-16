const Table = 'info';


module.exports = function (dbI) {

    let db = dbI;
    if (!db) {
        db = require('../../DB/mysql');
    }
    function GetAll(){
    return db.GetAll(Table);
}

function GetOne(id){
    return db.GetOne(Table, id);
}

function Add(body){
    return db.Add(Table, body);
}

function Delete(body){
    return db.Delete(Table, body);
}
return {    
    GetAll,
    GetOne,
    Delete,
    Add,  
    }
}