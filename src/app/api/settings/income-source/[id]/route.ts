import { NextResponse } from 'next/server';
import dbConnect from '@/lib/connectDB';
import IncomeSource from '@/models/IncomeSource';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    await dbConnect();

    try {
        const { id } = params;
        const body = await request.json();
        const { source, note } = body;

        if (!source) {
            return NextResponse.json({ error: 'Source is required' }, { status: 400 });
        }

        const updated = await IncomeSource.findByIdAndUpdate(
            id,
            { source, note },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ error: 'Income source not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Income source updated', data: updated }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 });
    }
}
