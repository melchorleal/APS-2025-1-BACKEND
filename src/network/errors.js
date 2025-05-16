const answers = require('./answers');

function errors(error, req, res, next) {
    console.error('[ error]', error);
    const message = error.message || 'Internal Server Error';
    const status = error.status || 500;
    answers.error(req, res, message, status);
}

module.exports = errors;