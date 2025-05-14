const express = require('express');
const config = require('./config');
const clientes = require('./modules/costumers/routes');

//Settings

const app = express();
app.set('port', config.app.port);

//Routes

app.use('/api/costumers', clientes);
module.exports = app;