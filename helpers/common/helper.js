const { APP_ERROR } = require("../../constants/statusConstants");

class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = APP_ERROR;
    this.statusCode = statusCode;
  }
}
module.exports.AppError = AppError;
