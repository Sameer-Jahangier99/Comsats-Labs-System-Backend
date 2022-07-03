const mongoose = require("mongoose");

const LabSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    softwares: {
      type: Array,
      default: [],
      required: true,
    },
    qrId: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lab = mongoose.model("Lab", LabSchema);

module.exports = Lab;
