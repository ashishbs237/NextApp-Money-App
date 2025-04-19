import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    amount: { type: Number, required: true },
    yearlyIncrement: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.IncomeSchema ||
  mongoose.model("IncomeSchema", IncomeSchema);