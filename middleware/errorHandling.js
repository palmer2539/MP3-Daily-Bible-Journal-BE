const notFound = (req, res, next) => {
  const error = new Error(`URL was not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 400 : res.statuscode;
  res.status(statusCode);
  res.json({
    message: err.message
  });
};

// module.exports = { notFound, errorHandler};