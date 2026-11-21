import { NextResponse } from "next/server";
import { MODELS } from "@/data/mockData";
import { Model } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase();
  const org = searchParams.get("org")?.toLowerCase();
  const type = searchParams.get("type")?.toLowerCase();
  const openWeights = searchParams.get("openWeights");
  const maxPrice = searchParams.get("maxPrice");
  const minContext = searchParams.get("minContext");
  const capability = searchParams.get("capability")?.toLowerCase();
  const sortBy = searchParams.get("sortBy");

  let filtered: Model[] = [...MODELS];

  if (search) {
    filtered = filtered.filter(
      (m) =>
        m.name.toLowerCase().includes(search) ||
        m.description.toLowerCase().includes(search) ||
        m.organization.name.toLowerCase().includes(search) ||
        m.tags.some((t) => t.toLowerCase().includes(search))
    );
  }

  if (org) {
    filtered = filtered.filter((m) => m.organization.slug.toLowerCase() === org);
  }

  if (type) {
    filtered = filtered.filter((m) => m.modelType.toLowerCase() === type);
  }

  if (openWeights === "true") {
    filtered = filtered.filter((m) => m.capabilities.openWeights);
  }

  if (maxPrice && !isNaN(parseFloat(maxPrice))) {
    const priceLimit = parseFloat(maxPrice);
    filtered = filtered.filter((m) => m.pricing.inputPerMillion <= priceLimit);
  }

  if (minContext && !isNaN(parseInt(minContext, 10))) {
    const contextLimit = parseInt(minContext, 10);
    filtered = filtered.filter((m) => m.contextWindow >= contextLimit);
  }

  if (capability) {
    if (capability === "vision") {
      filtered = filtered.filter((m) => m.capabilities.vision);
    } else if (capability === "audio") {
      filtered = filtered.filter((m) => m.capabilities.audio);
    } else if (capability === "tools" || capability === "toolcalling") {
      filtered = filtered.filter((m) => m.capabilities.toolCalling);
    } else if (capability === "reasoning" || capability === "reasoningtokens") {
      filtered = filtered.filter((m) => m.capabilities.reasoningTokens);
    }
  }

  if (sortBy) {
    filtered.sort((a, b) => {
      if (sortBy === "price-asc") return a.pricing.inputPerMillion - b.pricing.inputPerMillion;
      if (sortBy === "price-desc") return b.pricing.inputPerMillion - a.pricing.inputPerMillion;
      if (sortBy === "context-desc") return b.contextWindow - a.contextWindow;
      if (sortBy === "arena-desc") return (b.benchmarks.lmsysArenaElo || 0) - (a.benchmarks.lmsysArenaElo || 0);
      if (sortBy === "speed-desc") return b.latency.tokensPerSecond - a.latency.tokensPerSecond;
      if (sortBy === "release-desc") return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }

  return NextResponse.json(filtered);
}
