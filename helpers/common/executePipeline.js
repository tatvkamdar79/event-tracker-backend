const {
  UNAUTHORIZED_MESSAGE,
  UNAUTHENTICATED,
  APP_ERROR,
  BAD_REQUEST,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  UNAUTHENTICATED_MESSAGE,
} = require("../../constants/statusConstants");

module.exports.executePipeline = async (req, res, pipeline) => {
  for (let i = 0; i < pipeline.length; i++) {
    let steps = pipeline[i];
    try {
      if (!Array.isArray(steps)) steps = [steps];
      const promises = [];
      for (const step of steps) promises.push(step(req, res));
      const res = await Promise.all(promises);
      if (res.some((r) => r === false)) return false;
    } catch (error) {
      if (error.name === APP_ERROR) {
        const statusCode = error.statusCode || 500;
        switch (statusCode) {
          case BAD_REQUEST:
            return res.sendErrorResponse(error.message, error);
          case UNAUTHENTICATED:
            return res.sendErrorResponse(UNAUTHENTICATED_MESSAGE);
          case UNAUTHORIZED:
            return res.sendErrorResponse(UNAUTHORIZED_MESSAGE);
          case INTERNAL_SERVER_ERROR:
            return res.sendCustomResponse(INTERNAL_SERVER_ERROR, "Something went wrong", error);
        }
      }
      return res.sendCustomResponse(INTERNAL_SERVER_ERROR, "Something went wrong", error);
    }
  }
  return res.sendSuccessResponse(req.toSendMessage, req.toSendData);
};
