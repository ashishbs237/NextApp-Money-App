import mongoose from 'mongoose';

const IncomeSourceSchema = new mongoose.Schema(
  {
    source: { type: String, required: true },
    note: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.IncomeSource ||
  mongoose.model('IncomeSource', IncomeSourceSchema);
