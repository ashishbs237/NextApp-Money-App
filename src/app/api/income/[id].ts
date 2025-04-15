import connectDB from '@/lib/connectDB';
import IncomeSourceSchema from '@/models/IncomeSource';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { source, note } = req.body;
    const updated = await IncomeSourceSchema.findByIdAndUpdate(id, { source, note }, { new: true });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await IncomeSourceSchema.findByIdAndDelete(id);
    return res.status(204).end();
  }

  res.status(405).end();
}
