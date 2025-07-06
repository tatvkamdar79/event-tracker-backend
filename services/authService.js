const { mongoArguments } = require("../helpers/common/mongoHelper");
const userHelper = require("../helpers/user/userHelper");

module.exports.getAndAttachUser = async (req, res) => {
  if (req.user) return true;
  const user = await userHelper.getUserByUsername(
    req.tenant._id,
    req.body.username,
    mongoArguments({
      throwError: false,
      returnValueInPlaceOfError: {},
    }),
  );
  if (user.password !== req.body.password) return res.sendUnauthenticatedErrorResponse("Invalid password");
  const { userWithoutPassword, ...password } = user.toObject();
  req.user = userWithoutPassword;
  req.toSendData = userWithoutPassword;
  req.toSendMessage = `Welcome ${user.bio.firstName} ${user.bio.lastName ?? ""}`;
  return true;
};

module.exports.refreshLoginToken;
