const jwt = require('jsonwebtoken');
require('dontev').config();

module.exports.generateToken = email => {
  const payload = {
    email: email
  }

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secret, options);
}