const db = require('../../DB/mysql.js')
const answers = require('../../network/answers.js');
const mysql = require('mysql');
const config = require('../../config');
const DbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

const connection = mysql.createConnection(DbConfig);
connection.connect(err=>{
    if(err){
        console.log('[Error connecting to the database:]', err);
    }
});


const POSSIBLE_STATES = [  // cuidado con los "."
    'Pedido registrado.',
    'Paquete ha sido enviado.',
    'Aduana completada.',
    'Paquete entregado.',
]

async function orderTrackingController(req,res){

    const { folio } = req.params;

    if(!folio){
        return answers.error(req, res, 'Folio no válido', 400);
    }

    const transaction = (await executeQuery(`SELECT * FROM transacciones WHERE referencia = '${folio}'`))[0];
    
    if (!transaction) {
        return answers.error(req, res, 'No se encontró la transacción', 404);
    }

    const response = {
        folio,
        estatus: transaction.estado,
        fecha: new Date(transaction.fecha).toDateString(),
        hora: transaction.hora,
    }

    return answers.success(req, res, response, 200, 'Consulta exitosa', 200);

}


async function changeTrackingState(req, res){
    const { folio } = req.params;
    let { estado } = req.body;


    if(!folio){
        return answers.error(req, res, 'Folio no válido', 400);
    }

    if(!estado){
        return answers.error(req, res, 'Estado no válido', 400);
    }

    // agregar '.' si no lo tiene, para coincidir con los que se tiene
    estado = estado.trim().includes('.') ? estado : estado+'.';

    if(!POSSIBLE_STATES.includes(estado)){
        return answers.error(req, res, 'Estado no válido', 400);
    }

    await executeQuery(`UPDATE transacciones SET estado = '${estado}' WHERE referencia = '${folio}'`);

    return answers.success(req, res, 'Estado actualizado', 200);
}



const executeQuery = (query) =>{
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if(err){
                console.log('[Error executing query]', err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

module.exports = {
    orderTrackingController,
    changeTrackingState
};