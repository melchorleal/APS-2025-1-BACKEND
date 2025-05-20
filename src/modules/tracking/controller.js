const db = require('../../DB/mysql.js')
const answers = require('../../network/answers.js');

async function orderTrackingController(req,res){

    const { folio } = req.params;
    const allTransactions = await db.GetAll("transacciones");
    const transaction = allTransactions.find((  t )=> t.referencia == folio);
    
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



module.exports = {
    orderTrackingController: orderTrackingController,
};