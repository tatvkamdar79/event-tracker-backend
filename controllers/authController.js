const executePipeline = require("../helpers/common/executePipeline");
const authService = require("../services/authService");

module.exports.login = async (req, res, next) => {
  const pipeline = [
    authService.getAndAttachUser,
    // TODO
    // authService.refreshLoginToken,
  ];
  return executePipeline(req, res, pipeline);
};
