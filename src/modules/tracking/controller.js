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

    const transaction = (await executeQuery(` 
            SELECT 
            t.id as folio,
            t.estado,
            t.fecha,
            t.hora,
            po.nombre as pais_origen,
            pd.nombre as pais_destino,
            t.costo
        FROM 
            transacciones t
        INNER JOIN 
            paises po ON t.pais_origen = po.id
        INNER JOIN 
            paises pd ON t.pais_destino = pd.id
            WHERE t.id = '${folio}'`))[0];
    
    if (!transaction) {
        return answers.error(req, res, 'No se encontró la transacción', 404);
    }
    console.log(transaction)
    const response = {
        folio,
        estatus: transaction.estado,
        fecha: new Date(transaction.fecha).toDateString(),
        hora: transaction.hora,
        paisOrigen: transaction.pais_origen || 'Desconocido',
        paisDestino: transaction.pais_destino || 'Desconocido',
        costo: transaction.costo
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

    await executeQuery(`UPDATE transacciones SET estado = '${estado}' WHERE id = '${folio}'`);

    return answers.success(req, res, 'Estado actualizado', 200);
}

const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

async function getAllTransactions(req, res) {
    try {
        const query = `
            SELECT 
                t.id,
                t.fecha,
                t.estado,
                po.nombre AS pais_origen,
                pd.nombre AS pais_destino
            FROM transacciones t
            LEFT JOIN paises po ON t.pais_origen = po.id
            LEFT JOIN paises pd ON t.pais_destino = pd.id
            ORDER BY t.fecha DESC, t.hora DESC;
        `;

        const transactions = await executeQuery(query);

        if (!transactions || transactions.length === 0) {
            return answers.success(req, res, [], 200, 'No hay transacciones registradas');
        }

        const formattedTransactions = transactions.map(transaction => ({
            fecha: formatDate(transaction.fecha),
            folio: transaction.id,
            status: transaction.estado,
            paisOrigen: transaction.pais_origen || 'Desconocido',
            paisDestino: transaction.pais_destino || 'Desconocido'
        }));

        return answers.success(req, res, formattedTransactions, 200, 'Consulta exitosa');

    } catch (error) {
        console.log('[Error getting all transactions]', error);
        return answers.error(req, res, 'Error interno del servidor', 500);
    }
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
    changeTrackingState,
    getAllTransactions
};