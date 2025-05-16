exports.success = function (req, res, message = '', status = '') {
    res.status(status).send({
        error: false,
        status: status,
        body: message
    })
}

exports.error = function (req, res, message = 'Error, Algo salio mal', status = 200) {
    res.status(status).send({
        error: true,
        status: status,
        body: message
    })
}