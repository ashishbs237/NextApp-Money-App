import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import IncomeLabel from "@/models/IncomeLabel";

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

    const updated = await IncomeLabel.findByIdAndUpdate(
      id,
      { label: label, note },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Income label not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Income label updated", data: updated },
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

    const deleted = await IncomeLabel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Income label not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: { ...deleted, message: "Income label deleted" },
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
