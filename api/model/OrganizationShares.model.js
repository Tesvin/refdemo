// OrganizationShares model
import { mongoose, Schema, model } from "mongoose";

const organizationSharesSchema = new mongoose.Schema(
  {
    totalSharesInOrganization: {
      type: Number,
      default: 9000,
    },
    remainingSharesInOrganization: {
      type: Number,
      default: 9000,
    },
    totalSharesBoughtByUsers: {
        type: Number,
        default: 0,
      },
  },
  { timestamps: true }
);

const OrganizationShares = mongoose.model("OrganizationShares", organizationSharesSchema);

export default OrganizationShares;
