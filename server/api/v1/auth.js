const { sign } = require('jsonwebtoken');

const config = require('../../config');

const { secret, expires } = config.token;

const signToken = (payload, expiresIn = expires) =>
  // eslint-disable-next-line
  sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn,
  });

module.exports = {
  signToken,
};
