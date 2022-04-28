const mongoose = require('mongoose');

const logger = require('./config/logger');

exports.connect = (
  { protocol = 'mongodb', url, username = '', password = '' },
  options = {}
) => {
  let dburl = '';

  // Require auth
  if (username && password) {
    dburl = `${protocol}://${username}:${password}@${url}`;
  } else {
    dburl = `${protocol}://${url}`;
  }

  mongoose.connect(dburl, {
    ...options,
  });

  mongoose.connection.on('open', () => {
    logger.info('Databse connected');
  });

  mongoose.connection.on('close', () => {
    logger.info('Databse disconnected');
  });

  mongoose.connection.on('error', (err) => {
    logger.error(`Databse connection error: ${err}`);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Databse connection disconnected through app termination');
      process.exit(0);
    });
  });
};

exports.disconnect = () => {
  mongoose.connection.close(() => {
    logger.info('Databse disconnected');
  });
};
