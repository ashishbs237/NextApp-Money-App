import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import IncomeSource from "@/models/IncomeSource";

// GET /api/settings/income-source
export async function GET() {
  await dbConnect();

  try {
    const sources = await IncomeSource.find().sort({ source: 1 }); // sort alphabetically
    return NextResponse.json({ data: sources }, { status: 200 });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to fetch income source", details: errorMessage },
      { status: 500 }
    );
  }
}

// POST /api/settings/income-source
export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { source, note } = body;

    if (!source) {
      return NextResponse.json(
        { error: "Source is required" },
        { status: 400 }
      );
    }

    const newSource = await IncomeSource.create({ source, note });

    return NextResponse.json(
      { data: { ...newSource, message: "Income source created" } },
      { status: 201 }
    );
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Server error", details: errorMessage },
      { status: 500 }
    );
  }
}
