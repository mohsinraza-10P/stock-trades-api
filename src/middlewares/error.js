const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  // Set locals, only providing error in development
  res.locals.message = message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  const response = { statusCode, message };
  res.status(statusCode).send(response);
};

module.exports = { errorHandler };
