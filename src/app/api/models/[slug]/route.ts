import { NextResponse } from "next/server";
import { MODELS } from "@/data/mockData";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const model = MODELS.find((m) => m.slug === slug || m.id === slug);

  if (!model) {
    return NextResponse.json({ error: "Model not found" }, { status: 404 });
  }

  return NextResponse.json(model);
}
