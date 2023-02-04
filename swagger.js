const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Medieval API',
    description: 'Details fantasy and world settings',
  },
  host: 'cse341wintersword.onrender.com',
  schemes: ['https'],
};

const outputFile = './swaggerTown.json';
const endpointsFiles = ['./routes/town.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);