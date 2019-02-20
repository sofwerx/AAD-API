const {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  CONFLICT,
  NOT_FOUND,
  UNPROCESSABLE,
  GENERIC_ERROR
} = require('../helpers/error_helper');

const developmentStacktrace = (err, req) => {
  return process.env.NODE_ENV === 'development' ? err.stack : '';//
};

const unauthorized = (err, req, res, next) => {
  if (err.status !== UNAUTHORIZED) return next(err);

  return res.status(UNAUTHORIZED).send({
    message: err.message || 'Unauthorized',
    errors: [developmentStacktrace(err, req) || err]
  });
};

const forbidden = (err, req, res, next) => {
  if (err.status !== FORBIDDEN) return next(err);

  return res.status(FORBIDDEN).send({
    message: err.message || 'Forbidden',
    errors: [developmentStacktrace(err, req) || err]
  });
};

const conflict = (err, req, res, next) => {
  if (err.status !== CONFLICT) return next(err);

  return res.status(CONFLICT).send({
    message: err.message || 'Conflict',
    errors: [developmentStacktrace(err, req) || err]
  });
};

const badRequest = (err, req, res, next) => {
  if (err.status !== BAD_REQUEST) return next(err);

  return res.status(BAD_REQUEST).send({
    message: err.message || 'Bad Request',
    errors: [developmentStacktrace(err, req) || err]
  });
};

const unprocessable = (err, req, res, next) => {
  if (err.status !== UNPROCESSABLE) return next(err);

  return res.status(UNPROCESSABLE).send({
    message: err.message || 'Unprocessable entity',
    errors: [developmentStacktrace(err, req) || err]
  });
};

const notFound = (err, req, res, next) => {
  if (err.status !== NOT_FOUND) return next(err);
  return res.status(NOT_FOUND).send({
    message: err.message || 'The requested resource could not be found',
    errors: [developmentStacktrace(err, req) || err]
  });
};

// If there's still an error at this point, return a generic 500 error.
const genericError = (err, req, res, next) => {
  return res.status(GENERIC_ERROR).send({
    message: err.message || 'Internal server error'
  });
};

// If there's nothing left to do after all this (and there's no error),
// return a 404 error.
const catchall = (req, res, next) => {
  res.status(NOT_FOUND).send({
    message: 'The requested resource could not be found'
  });
};

const exportables = {
  unauthorized,
  forbidden,
  conflict,
  badRequest,
  unprocessable,
  notFound,
  genericError,
  catchall
};

// All exportables stored as an array (e.g., for including in Express app.use())
const all = Object.keys(exportables).map(key => exportables[key]);

module.exports = {
  ...exportables,
  all
};
