import { mongoose, Schema, model } from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    balance: { 
        type: Number,
        default: 0 
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("wallet", walletSchema);

export default User;
