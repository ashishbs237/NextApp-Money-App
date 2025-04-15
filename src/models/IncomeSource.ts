import mongoose from 'mongoose';

const IncomeSourceSchema = new mongoose.Schema({
  source: { type: String, required: true },
  note: { type: String }
});

export default mongoose.models.IncomeSource ||
  mongoose.model('IncomeSourceSchema', IncomeSourceSchema);
