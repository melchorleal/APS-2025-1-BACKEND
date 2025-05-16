const jwt = require('jsonwebtoken');
config = require('../config');

const secret = config.jwt.secret

function AsingToken(data){
    return jwt.sign(data, secret);
}

function VerifyToken(token){
    return jwt.verify(token, secret);
}

function GetToken(authorization){
    if(!authorization){
        throw new Error('No Llego el token');
    }
    if(!authorization.startsWith('Bearer ')){
        throw new Error('Formato invalido');
    }
    return authorization.slice(7); // Quita 'Bearer ' y queda solo el token
}

function decodeToken(req){
    const authorization = req.headers.authorization || '';
    const token = GetToken(authorization);
    const decoded = VerifyToken(token);
    req.user = decoded;
    return decoded;
}

function ConfirmToken(req) {
    const decoded = decodeToken(req);
    return decoded;
}


// Middleware para validar token
function authMiddleware(req, res, next){
    try {
        decodeToken(req);
        next();
    } catch (error){
        res.status(401).json({ error: error.message });
    }
}

module.exports = {
    AsingToken,
    ConfirmToken,
    authMiddleware
}
