class ApiError extends Error {
  constructor(message, statuscode = 500) {
    super(message);
    this.statuscode = statuscode;
  }
}

module.exports = ApiError;
