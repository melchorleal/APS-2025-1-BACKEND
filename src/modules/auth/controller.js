const Table = 'auth';
const bycrypt = require('bcrypt');
const auth = require('../../authentication');

module.exports = function (dbI) {
    let db = dbI;
    if (!db) {
        db = require('../../DB/mysql');
    }

    async function Login(user, password) {
        try {
            console.log(`Intentando login para usuario: ${user}`);
            
            // Consulta el usuario en la base de datos
            const data = await db.query(Table, {user: user});
            
            // Verifica si se encontró el usuario
            if (!data || Object.keys(data).length === 0) {
                console.log(`Usuario ${user} no encontrado en la base de datos`);
                throw new Error('Usuario no encontrado');
            }
            
            console.log(`Usuario ${user} encontrado, verificando contraseña`);
            
            // Compara la contraseña proporcionada con la almacenada
            const result = await bycrypt.compare(password, data.password);
            
            if (result === true) {
                console.log(`Contraseña correcta para ${user}, generando token`);
                return auth.AsingToken({...data});
            } else {
                console.log(`Contraseña incorrecta para ${user}`);
                throw new Error('Contraseña incorrecta');
            }
        } catch (error) {
            console.error(`Error en proceso de login: ${error.message}`);
            throw new Error('Informacion incorrecta');
        }
    }

    async function Add(data) {
        const authData = {
            id: data.id,
        }

        if (data.user) {
            authData.user = data.user;
        }

        if (data.password) {
            authData.password = await bycrypt.hash(data.password.toString(), 5);
        }

        return db.Add(Table, authData);
    }

    return {    
        Add,
        Login,  
    }
}