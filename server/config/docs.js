const swaggerDefinition = {
  swagger: '2.0',
  info: {
    title: 'Harvestify API',
    version: '1.0.0',
    description: 'Harvestify API Documentation',
  },
  basePaths: '/api/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
};

module.exports = {
  swaggerDefinition,
};
