import { mongoose, Schema } from "mongoose";

const shareSchema = new mongoose.Schema(
  {
    totalShares: {
      type: Number,
      default: 0,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Share = mongoose.model("Share", shareSchema);

export default Share;




// const mongoose = require('mongoose');

// const shareSchema = new mongoose.Schema({
//   symbol: {
//     type: String,
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   // Reference to the Wallet model
//   wallet: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Wallet',
//     required: true,
//   },
// });

// const Share = mongoose.model('Share', shareSchema);

// module.exports = Share;
