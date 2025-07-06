const User = require("../../models/UserSchema");
const { AppError } = require("../common/helper");
const { mongoId, makeMongoCall } = require("../common/mongoHelper");

module.exports.getUserByUsername = makeMongoCall(async (tenantId, username) => {
  const user = await User.findOne({
    tenantId: mongoId(tenantId),
    username,
  });
  if (!user) throw new AppError("Username not found");
  return user;
});
