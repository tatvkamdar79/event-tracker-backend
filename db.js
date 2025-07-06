const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
