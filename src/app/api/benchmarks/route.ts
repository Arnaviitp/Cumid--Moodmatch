import { NextResponse } from "next/server";
import { BENCHMARK_LEADERBOARD } from "@/data/mockData";

export async function GET() {
  return NextResponse.json(BENCHMARK_LEADERBOARD);
}
