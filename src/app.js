const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const clientes = require('./modules/costumers/routes');
const users = require('./modules/users/routes');
const authentication = require('./modules/auth/routes');
const error = require('../src/network/errors');
const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Settings
app.set('port', config.app.port);

//Routes

app.use('/api/costumers', clientes);
app.use('/api/users', users);
app.use('/api/authentication', authentication);
app.use(error);
module.exports = app;