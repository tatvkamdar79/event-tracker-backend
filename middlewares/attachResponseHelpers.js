const {
  SUCCESS,
  FAILED,
  OK,
  BAD_REQUEST,
  DATABASE_ERROR,
  UNAUTHENTICATED,
  UNAUTHORIZED,
  UNAUTHORIZED_MESSAGE,
  UNAUTHENTICATED_MESSAGE,
} = require("../constants/statusConstants");

const attachResponseHelpers = (req, res, next) => {
  res.sendSuccessResponse = (message = "Request was successful", data = null) => {
    return res.status(OK).json({
      status: SUCCESS,
      message,
      data,
    });
  };

  res.sendErrorResponse = (message = "Request Failed", data = null) => {
    return res.status(BAD_REQUEST).json({
      status: FAILED,
      message,
      data,
      error: data,
    });
  };

  res.sendDatabaseErrorResponse = (message = "Database Error", data = null) => {
    return res.status(DATABASE_ERROR).json({
      status: FAILED,
      message,
      data,
      error: data,
    });
  };

  res.sendUnauthenticatedErrorResponse = (message = UNAUTHENTICATED_MESSAGE, data = null) => {
    return res.status(UNAUTHENTICATED).json({
      status: FAILED,
      message,
      data,
    });
  };

  res.sendUnauthorizedErrorResponse = (message = UNAUTHORIZED_MESSAGE, data = null) => {
    return res.status(UNAUTHORIZED).json({
      status: FAILED,
      message,
      data,
    });
  };

  res.sendCustomResponse = (statusCode = OK, message = "", data = null) => {
    const status = statusCode >= 400 ? FAILED : SUCCESS;
    if (message === "") message = `Request was ${status === FAILED ? "un" : ""}successful`;

    return res.status(statusCode).json({
      status,
      message,
      data,
    });
  };

  next();
};

module.exports = attachResponseHelpers;
