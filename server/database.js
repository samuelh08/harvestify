const mongoose = require('mongoose');

const logger = require('./config/logger');

exports.connect = (
  // eslint-disable-next-line
  { protocol = 'mongodb', url, username = '', password = '' },
  // eslint-disable-next-line
  options = {}
) => {
  let dburl = '';

  // Require auth
  if (username && password) {
    dburl = `${protocol}://${username}:${password}@${url}`;
  } else {
    dburl = `${protocol}://${url}`;
  }

  const mongourl = process.env.MONGO_ATLAS || dburl;

  mongoose.connect(mongourl, {
    ...options,
  });

  mongoose.connection.on('open', () => {
    logger.info('Database connected');
  });

  mongoose.connection.on('close', () => {
    logger.info('Database disconnected');
  });

  mongoose.connection.on('error', (err) => {
    logger.error(`Database connection error: ${err}`);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Database connection disconnected through app termination');
      process.exit(0);
    });
  });
};

exports.disconnect = () => {
  mongoose.connection.close(() => {
    logger.info('Database disconnected');
  });
};
