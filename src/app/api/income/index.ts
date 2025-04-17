import connectDB from '@/lib/connectDB';
import IncomeSourceSchema from '@/models/IncomeLabel';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    const sources = await IncomeSourceSchema.find();
    return res.status(200).json(sources);
  }

  if (req.method === 'POST') {
    const { source, note } = req.body;
    const created = await IncomeSourceSchema.create({ source, note });
    return res.status(201).json(created);
  }

  res.status(405).end();
}
