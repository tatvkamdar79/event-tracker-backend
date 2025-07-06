const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },

    bio: {
      firstName: { type: String, required: true },
      middleName: { type: String, required: false, default: null },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },

      addressLine1: { type: String, required: true },
      addressLine2: { type: String, required: false, default: null },
      addressLine3: { type: String, required: false, default: null },

      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },

      profileImageUrl: { type: String, required: false, default: null },
    },
    tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true },
  },
  { timestamps: true, minimize: false },
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
