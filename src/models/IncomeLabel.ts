import mongoose from "mongoose";

const IncomeLabelSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    note: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.IncomeLabel ||
  mongoose.model("IncomeLabel", IncomeLabelSchema);
