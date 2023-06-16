const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
   
    network: {
      type: String,
      required: true,
      enum: ["ethereum", "avalanche", "polygon"],
    },
    active:{
      type:Boolean,
      default:true
    },
    chianId:{
      type:Number,
      required:true
    }
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Organization
 */
const network = mongoose.model("blockchain", userSchema);

module.exports = network;
