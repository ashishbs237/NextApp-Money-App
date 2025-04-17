import mongoose from "mongoose";

const EMILabelSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    note: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.EMILabel ||
  mongoose.model("EMILabel", EMILabelSchema);
