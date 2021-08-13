const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).json({
      status: 'error',
      message: 'malformated ID',
    });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    });
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token',
    });
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired',
    });
  }

  logger.error(err.message);

  next(err);
};

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
};
