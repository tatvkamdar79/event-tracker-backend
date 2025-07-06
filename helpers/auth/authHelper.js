const jwt = require("jsonwebtoken");

module.exports.isUserSuperAdmin = (authString) => {
  const base64String = authString.split(" ")[1];
  const base64DecodedString = Buffer.from(base64String, "base64").toString();
  const [username, password] = base64DecodedString.split(":");
  if (username !== process.env.SUPER_ADMIN_USERNAME || password !== process.env.SUPER_ADMIN_PASSWORD)
    throw new Error("You are not Tatv");
  return true;
};

module.exports.generateToken = (payload = {}, expiresIn = "7d") => {
  delete payload.iat;
  delete payload.exp;
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return token;
  } catch (error) {
    console.error("Error generating JWT:", error);
    return null;
  }
};

module.exports.decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};
