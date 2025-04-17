import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import EMILabel from "@/models/EMILabel";

// GET /api/settings/income-source
export async function GET() {
    await dbConnect();

    try {
        const labels = await EMILabel.find().sort({ label: 1 }); // sort alphabetically
        return NextResponse.json({ data: labels }, { status: 200 });
    } catch (err: unknown) {
        const errorMessage =
            err instanceof Error ? err.message : "Unknown error occurred";
        return NextResponse.json(
            { error: "Failed to fetch EMI labels", details: errorMessage },
            { status: 500 }
        );
    }
}

// POST /api/settings/income-source
export async function POST(request: Request) {
    await dbConnect();

    try {
        const body = await request.json();
        const { label, note } = body;

        if (!label) {
            return NextResponse.json(
                { error: "Label is required" },
                { status: 400 }
            );
        }

        const newLabel = await EMILabel.create({ label, note });

        return NextResponse.json(
            { data: { ...newLabel, message: "EMI label created" } },
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
