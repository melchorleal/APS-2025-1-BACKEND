const express = require('express');
const config = require('./config');
const clientes = require('./modules/costumers/routes');


//Settings

const app = express();
app.set('port', config.app.port);

//Routes
app.use(express.json());

const products = require('./modules/products/routes');
app.use('/productos', products);


app.use('/api/costumers', clientes);

module.exports = app;