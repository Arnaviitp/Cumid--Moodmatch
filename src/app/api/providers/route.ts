import { NextResponse } from "next/server";
import { PROVIDERS } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(PROVIDERS);
}
