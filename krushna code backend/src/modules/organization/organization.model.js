const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("../../plugins");
const { roles } = require("../../config/roles");
const counterIncrementor = require("../../utils/counterIncrementer");

const userSchema = mongoose.Schema(
  {
    orgName: {
      type: String,
      trim: true,
      required:true
    },
    chainId: {
      type: String,
      required: true,
    },
    subDomain: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Organization
 */
const Organization = mongoose.model("organization", userSchema);

module.exports = Organization;
