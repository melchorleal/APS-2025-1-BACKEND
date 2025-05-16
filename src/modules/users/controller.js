const Table = 'users';
const auth = require('../auth/controller')();


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

async function Add(body){
    const user = {
        id: body.id,
        nombre: body.nombre,
        activo: body.activo,
    }
    const answer = await db.Add(Table, user);
    var insertId = 0;
    if (body.id == 0) {
        insertId = answer.insertId;
    }else{
        insertId = body.id;
    }

    var answer2 = '';
    if(body.user || body.password){
        answer2 = await auth.Add({
            id: insertId,
            user: body.user,
            password: body.password,
        })
    return answer2;
    }
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