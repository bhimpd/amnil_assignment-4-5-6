const express = require('express');
const port = 5001;
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const userRoutes = require('./RoutesPostgres/userRoute'); 
const productRoutes = require('./RoutesPostgres/productRoute'); 

app.use('/apiusers', userRoutes); 
app.use('/apiproducts', productRoutes); 


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'This is Node express API for Ecommerce',
      version: '1.0.0',
      description: 'This is an API for an ecommerce web application',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  apis: ['./RoutesPostgres/*.js'],
};


const specs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});