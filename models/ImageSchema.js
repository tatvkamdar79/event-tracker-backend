module.exports = new Schema(
  {
    _id: false,
    url: { type: String, required: true },
    description: { type: String, default: null },
  },
  { minimize: false },
);
