const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');
const clientes = require('./modules/costumers/routes');
const users = require('./modules/users/routes');
const authentication = require('./modules/auth/routes');
const error = require('../src/network/errors');

// Configuración de Swagger 
const { swaggerUi, swaggerDocs } = require('./swagger/swaggerConfig');

const app = express();

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Settings
app.set('port', config.app.port);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Routes 
const products = require('./modules/products/routes');
const tracking = require('./modules/tracking/routes');
app.use('/api/productos', products);
app.use('/api/costumers', clientes);
app.use('/api/users', users);
app.use('/api/tracking', tracking);
app.use('/api/authentication', authentication);
app.use(error);

module.exports = app;