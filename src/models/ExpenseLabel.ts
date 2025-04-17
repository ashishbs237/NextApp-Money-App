import mongoose from "mongoose";

const ExpenseLabelSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    note: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.ExpenseLabel ||
  mongoose.model("ExpenseLabel", ExpenseLabelSchema);
