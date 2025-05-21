const db = require('../../DB/mysql');

function addProduct(data) {
    const { id, nombre, peso, altura, ancho, id_categoria } = data;

    if (!nombre || !peso || !altura || !ancho || !id || !id_categoria) {
        return Promise.reject("Faltan datos obligatorios");
    }

    return db.insert('productos', data);
}

module.exports = { addProduct };
