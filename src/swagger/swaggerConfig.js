const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

// Opciones de configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '',
      version: '1.0.0',
      description: 'Documentación de API',
    },
    servers: [
      {
        url: '/',
        description: 'Servidor actual'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  // Ruta relativa al directorio raíz 
  apis: [path.join(__dirname, 'swaggerDocs.js')]
};

// Inicializar Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs
};