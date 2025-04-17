import mongoose from "mongoose";

const InvestmentLabelSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    note: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.InvestmenLabel ||
  mongoose.model("InvestmenLabel", InvestmentLabelSchema);
