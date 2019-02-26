const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
  if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token')
    || (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const secret = process.env.SECRET || 'secret';

const auth = {
  required: jwt({
    secret,
    userProperty: 'payload',
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  }).unless({ path: ['/users/login', '/users/register'] })
};

module.exports = auth;
