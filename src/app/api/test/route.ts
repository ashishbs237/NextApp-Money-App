// src/app/api/test/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';

export async function GET() {
    await connectDB(); // ✅ This should log "✅ Connected to MongoDB"

    return NextResponse.json({ status: 'connected' });
}
