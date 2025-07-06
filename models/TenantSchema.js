const mongoose = require("mongoose");
const { ACTIVE, INACTIVE, DISABLED } = require("../constants/statusConstants");
const ImageSchema = require("./ImageSchema");
const Schema = mongoose.Schema;

const AmenitiesSchema = new Schema(
  {
    _id: false,
    name: { type: String, required: true },
    description: { type: String, default: null },
    images: { type: [ImageSchema], default: [] },
  },
  { minimize: false, timestamps: true },
);

const VenueSchema = new Schema(
  {
    _id: false,
    status: { type: String, enum: [ACTIVE, INACTIVE, DISABLED], default: INACTIVE },
    name: { type: String, required: true },
    address: { type: String, default: null },
    capacity: { type: Number, default: null },
    description: { type: String, default: null },
    amenities: { type: [AmenitiesSchema], default: [] },
    images: { type: [ImageSchema], default: [] },
    contactInfo: {
      phone: { type: String, default: null },
      email: { type: String, default: null },
      website: { type: String, default: null },
    },
  },
  { minimize: false, timestamps: true },
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
