const mongoose = require("mongoose");
const { ACTIVE, INACTIVE, DISABLED } = require("../constants/statusConstants");
const Schema = mongoose.Schema;

const VenueSchema = new Schema(
  {
    _id: false,
    status: { type: String, enum: [ACTIVE, INACTIVE, DISABLED], default: INACTIVE },
    name: { type: String, required: true },
    address: { type: String, default: null },
    capacity: { type: Number, default: null },
  },
  { timestamps: true, minimize: false },
);

const TenantSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    logoUrl: { type: String, default: null },
    address: { type: String, default: null },
    venues: [{ type: VenueSchema }],
    status: { type: String, enum: [ACTIVE, INACTIVE, DISABLED], default: INACTIVE },
  },
  { timestamps: true, minimize: false },
);

const Tenant = mongoose.model("Tenant", TenantSchema);

module.exports = Tenant;
