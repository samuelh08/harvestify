const express = require('express');
const logger = require('./config/logger');

// Init app
const app = express();

// Routes
app.get('/', (req, res, next) => {
  res.send('Hello World');
});

// No route found handler
app.use((req, res, next) => {
  const message = 'Route nor found';
  const statusCode = 404;

  logger.warn(message);

  res.status(statusCode);
  res.json({
    message,
  });
});

// Error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  logger.error(message);

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
