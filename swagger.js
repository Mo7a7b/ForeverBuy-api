const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require("dotenv").config()
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'ForeverBuy API',
            version: '2.0.0',
            description: 'ForeverBuy API Documentation',
        },
        servers: [
            {
                url: process.env.APP_MAIN_LINK,
            },
        ],
    },
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    apis: ['./routes/*.js'], // Path to your API docs
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
module.exports = {
    swaggerUi,
    swaggerSpec
}