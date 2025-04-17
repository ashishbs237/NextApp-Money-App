import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import InvestmentLabel from "@/models/InvestmentLabel";

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    await dbConnect();

    try {
        const { id } = params;
        const body = await request.json();
        const { label, note } = body;

        if (!label) {
            return NextResponse.json(
                { error: "Label is required" },
                { status: 400 }
            );
        }

        const updated = await InvestmentLabel.findByIdAndUpdate(
            id,
            { label, note },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json(
                { error: "Investment label not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Investment label updated", data: updated },
            { status: 200 }
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

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
) {
    await dbConnect();

    try {
        const { id } = params;

        const deleted = await InvestmentLabel.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { error: "Investment label not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            data: { ...deleted, message: "Investment label deleted" },
            status: 200,
        });
    } catch (err: unknown) {
        const errorMessage =
            err instanceof Error ? err.message : "Unknown error occurred";
        return NextResponse.json(
            { error: "Server error", details: errorMessage },
            { status: 500 }
        );
    }
}
