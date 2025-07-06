const mongoose = require("mongoose");
const { APP_ERROR } = require("../../constants/statusConstants");
const MONGO_ARGUMENTS = Symbol.for("mongoArguments");

module.exports.mongoId = (id) => {
  if (!id) throw new Error("ObjectId cannot be null or undefined");
  if (id instanceof mongoose.Types.ObjectId) return id;
  if (mongoose.Types.ObjectId.isValid(id)) return new mongoose.Types.ObjectId(id);
  else throw new Error(`Invalid ObjectId: ${id}`);
};

module.exports.makeMongoCall = (fn) => {
  return async (...args) => {
    const options = args[args.length - 1];
    if (options && typeof options === "object" && options[MONGO_ARGUMENTS]) args = args.slice(0, -1);

    try {
      return await fn(...args);
    } catch (error) {
      // DB Error
      if (error.name != APP_ERROR) throw error;

      // Custom Error
      if (options.throwError) throw error;
      if (options.returnValueInPlaceOfError === "error") return error;
      return options.returnValueInPlaceOfError;
    }
  };
};

module.exports.mongoArguments = (
  args = {
    throwError: true,
    returnValueInPlaceOfError: "error",
  },
) => {
  return {
    [MONGO_ARGUMENTS]: true,
    ...args,
  };
};
