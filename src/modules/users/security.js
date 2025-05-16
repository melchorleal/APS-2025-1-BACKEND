const { ConfirmToken } = require('../../authentication');

module.exports = function CheckAuth() {
    function middleware(req, res, next) {
        const method = req.method;
        const path = req.path;
        const userIdFromRequest = req.body.id || req.params.id;

        // Permitir crear usuario sin token (POST / con id == 0 o sin id)
        const isRegisterRequest = method === 'POST' && path === '/' && (!userIdFromRequest || parseInt(userIdFromRequest) === 0);

        if (isRegisterRequest) {
            return next();
        }

        try {
            // Validar token
            const decoded = ConfirmToken(req); // Guarda en req.user
            const userIdFromToken = decoded.id;

            // Verificar que el ID del token coincida con el ID de la solicitud
            if (userIdFromRequest && userIdFromToken !== parseInt(userIdFromRequest)) {
                throw new Error('No tienes permiso para modificar esta información.');
            }

            next();
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    return middleware;
};
