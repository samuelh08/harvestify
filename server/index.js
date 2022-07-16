const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');

const logger = require('./config/logger');
const api = require('./api/v1');
const docs = require('./api/v1/docs');

// Init app
const app = express();

// Documentation
app.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));

// Setup CORS
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
  })
);

// Setup middleware
app.use((req, res, next) => {
  req.id = uuidv4();
  next();
});
app.use(logger.requests);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Setup router and routes
app.use('/api', api);
app.use('/api/v1', api);

app.use('/uploads', express.static('uploads'));

// Routes
app.get('/', (req, res, next) => {
  res.json({
    message: 'Harvestify API',
  });
});

// No route found handler
app.use((req, res, next) => {
  next({
    message: 'Route not found',
    statusCode: 404,
    level: 'warn',
  });
});

// Error handler
app.use((err, req, res, next) => {
  const { message = '', level = 'error' } = err;
  let { statusCode = 500 } = err;
  const log = `${logger.header(req)} ${statusCode} ${message}`;

  // Validation errors
  if (err?.name === 'ValidationError' || err?.name === 'MulterError') {
    statusCode = 400;
  }

  logger[level](log);

  res.status(statusCode);
  res.json({
    error: true,
    statusCode,
    message,
  });
});

module.exports = app;
