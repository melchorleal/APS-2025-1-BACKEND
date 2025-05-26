const db = require('../../DB/mysql');

async function addProduct(data) {
    const {
        // Datos del producto
        nombre, 
        peso, 
        altura, 
        ancho, 
        id_categoria,
        pais_origen,
        pais_destino,
        id_medio_transporte,
        // Nuevos campos
        fecha,
        hora,
        costo,
        // Datos del cliente
        nombre_cliente,
        telefono,
        correo
    } = data;
       
    // Validar datos obligatorios del producto
    if (!nombre || !peso || !altura || !ancho || !id_categoria || !pais_origen || !pais_destino) {
        return Promise.reject("Faltan datos obligatorios del producto");
    }
    
    // Validar datos obligatorios del cliente
    if (!nombre_cliente || !telefono || !correo) {
        return Promise.reject("Faltan datos obligatorios del cliente");
    }
    
    // Validar nuevos campos obligatorios
    if (!fecha || !hora || !costo) {
        return Promise.reject("Faltan datos obligatorios: fecha, hora o costo");
    }
        
    try {
        // 1. Insertar cliente y obtener su ID
        const clientResult = await db.insert('clientes', {
            nombre: nombre_cliente,
            telefono: telefono,
            correo: correo
        });
        
        const clientId = clientResult.insertId;
        
        // 2. Insertar producto y obtener su ID
        const productResult = await db.insert('productos', {
            nombre: data.nombre,
            peso: data.peso,
            altura: data.altura,
            ancho: data.ancho,
            id_categoria: data.id_categoria
        });

        // 3. Insertar transacción relacionada con todos los campos
        const transactionResult = await db.insert('transacciones', {
            pais_origen: data.pais_origen,
            pais_destino: data.pais_destino,
            id_medio_transporte: data.id_medio_transporte,
            fecha: data.fecha,
            hora: data.hora,
            costo: data.costo,
            id_cliente: clientId,
            estado: 'Pedido Registrado', // Estado inicial
        });

        return {
            success: true,
            clientId: clientId,
            productId: productResult.insertId,
            transactionId: transactionResult.insertId,
        };

    } catch (error) {
        console.error('Error en addProduct:', error);
        throw error;
    }
}

module.exports = { addProduct };