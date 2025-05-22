const db = require('../../DB/mysql');

async function addProduct(data) {
    const {nombre, peso, altura, ancho, id_categoria,pais_origen,pais_destino,id_medio_transporte} = data;
 

    if (!nombre || !peso || !altura || !ancho || !id_categoria|| !pais_origen || !pais_destino) {
        return Promise.reject("Faltan datos obligatorios");
    }
  
     try {
        // 1. Insertar producto y obtener su ID
        const productResult = await db.insert('productos', {
            nombre: data.nombre,
            peso: data.peso,
            altura: data.altura,
            ancho: data.ancho,
            id_categoria: data.id_categoria
        });

        // 2. Insertar transacción relacionada
        const transactionResult = await db.insert('transacciones', {
            pais_origen: data.pais_origen,
            pais_destino: data.pais_destino,
            id: productResult.insertId,
            id_medio_transporte: data.id_medio_transporte
        });

        return {
            success: true,
            productId: productResult.insertId,
            transactionId: transactionResult.insertId
        };

    } catch (error) {
        console.error('Error en addProduct:', error);
        throw error;
    }
}

module.exports = { addProduct };
