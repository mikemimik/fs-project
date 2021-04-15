exports.HttpError = class extends Error {
  constructor(status = 500, message = '') {
    super(message);
    this.status = status;
  }
};

exports.logger = function logger (req) {
  console.log(
    'path:', req.path,
    'method:', req.method,
    'params:', req.params,
    'body:', req.body,
  );
};

exports.handleServiceError = function (error) {
  const status = error.status || error.code || 500;
  const msg = error.msg || error.message
};
