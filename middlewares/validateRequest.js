const unauthenticatedRoutes = require("../constants/unauthenticatedRoutes");
const authHelper = require("../helpers/auth/authHelper");

const validateRequest = async (req, res, next) => {
  // Setting default values
  req.isSuperAdmin = false;
  req.tenantId = null;
  req.userId = null;

  const { authorization, "x-tenant-id": tenantId } = req.headers;

  if (unauthenticatedRoutes.has(req.originalUrl)) {
    if (!tenantId) return res.sendUnauthenticatedErrorResponse();
    req.tenantId = tenantId;
    return next();
  }

  if (!authorization) return res.sendUnauthenticatedErrorResponse("No authorization header provided");

  const authType = authorization.split(" ")[0];

  switch (authType.toLowerCase()) {
    case "basic":
      const isUserTatv = authHelper.isUserSuperAdmin(authorization);
      if (!isUserTatv) return res.sendUnauthenticatedErrorResponse("You are not Tatv");

      req.isSuperAdmin = true;
      req.tenantId = process.env.ROOT_TENANT_ID;
      req.userId = process.env.ROOT_USER_ID;
      break;

    case "bearer":
      if (!req.headers["x-tenant-id"]) return res.sendUnauthenticatedErrorResponse();

      const token = authorization.split(" ")[1];
      const decodedData = authHelper.decodeToken(token);
      if (!decodedData) return res.sendUnauthenticatedErrorResponse("Invalid Token Provided");

      req.tenantId = req.headers["x-tenant-id"];
      req.userId = decodedData._id;
      break;

    default:
      return res.sendUnauthenticatedErrorResponse("Authorization type not supported");
  }

  next();
};

module.exports = validateRequest;
