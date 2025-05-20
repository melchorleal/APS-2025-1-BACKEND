const db = require('../../DB/mysql')


async function orderTrackingController(req,res){

    const { folio } = req.params;
    const allTransactions = await db.GetAll("transacciones");
    const transaction = allTransactions.find((  t )=> t.referencia == folio);
    
    const response = {
        folio,
        estatus: transaction.estado,
        fecha: new Date(transaction.fecha).toDateString(),
        hora: transaction.hora,
    }

    res.status(200).json(response);

}



module.exports = {
    orderTrackingController: orderTrackingController,
};