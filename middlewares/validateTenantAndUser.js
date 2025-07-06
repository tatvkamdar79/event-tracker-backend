const { getTenantByTenantId } = require("../helpers/tenant/tenantHelper");
// TODO: Deleted Function
const { getUserById } = require("../helpers/user/userHelper"); // Assuming you have a userHelper

const validateTenantAndUser = async (req, res, next) => {
  try {
    const tenantPromise = getTenantByTenantId(req.tenantId);
    const userPromise = req.userId !== null ? getUserById(req.userId) : Promise.resolve(null);

    const [tenant, user] = await Promise.all([tenantPromise, userPromise]);

    if (!tenant) return res.sendUnauthenticatedErrorResponse("Invalid tenant ID provided");
    if (req.userId !== null && !user) return res.sendUnauthenticatedErrorResponse("Invalid user ID provided");

    req.tenant = tenant;
    req.user = user;

    next();
  } catch (error) {
    console.error("validateTenantAndUser error:", error);
    return res.sendDatabaseErrorResponse();
  }
};

module.exports = validateTenantAndUser;
