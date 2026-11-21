import { Model, Provider, BenchmarkLeaderboardEntry } from "@/types";
import { MODELS, PROVIDERS, BENCHMARK_LEADERBOARD } from "@/data/mockData";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export interface FetchModelsParams {
  search?: string;
  organization?: string;
  modelType?: string;
  openWeights?: boolean;
  maxPrice?: number;
  minContext?: number;
  capability?: string;
  sortBy?: string;
}

export async function fetchModels(params?: FetchModelsParams): Promise<Model[]> {
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);
  if (params?.organization) query.set("org", params.organization);
  if (params?.modelType) query.set("type", params.modelType);
  if (params?.openWeights !== undefined) query.set("openWeights", params.openWeights.toString());
  if (params?.maxPrice !== undefined) query.set("maxPrice", params.maxPrice.toString());
  if (params?.minContext !== undefined) query.set("minContext", params.minContext.toString());
  if (params?.capability) query.set("capability", params.capability);
  if (params?.sortBy) query.set("sortBy", params.sortBy);

  const queryString = query.toString();
  const endpoint = `${API_BASE}/api/models${queryString ? `?${queryString}` : ""}`;

  try {
    const res = await fetch(endpoint, { cache: "no-store" });
    if (res.ok) {
      const data: Model[] = await res.json();
      return data;
    }
  } catch (error) {
    console.warn("fetchModels: API route unavailable, falling back to mock dataset.", error);
  }

  // Client-side fallback filter matching the query params
  let fallback = [...MODELS];
  if (params?.search) {
    const q = params.search.toLowerCase();
    fallback = fallback.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.organization.name.toLowerCase().includes(q)
    );
  }
  if (params?.organization) {
    fallback = fallback.filter((m) => m.organization.slug === params.organization);
  }
  if (params?.modelType) {
    fallback = fallback.filter((m) => m.modelType === params.modelType);
  }
  if (params?.openWeights) {
    fallback = fallback.filter((m) => m.capabilities.openWeights);
  }
  return fallback;
}

export async function fetchModelBySlug(slug: string): Promise<Model | null> {
  const endpoint = `${API_BASE}/api/models/${encodeURIComponent(slug)}`;

  try {
    const res = await fetch(endpoint, { cache: "no-store" });
    if (res.status === 404) {
      return null;
    }
    if (res.ok) {
      const data: Model = await res.json();
      return data;
    }
  } catch (error) {
    console.warn(`fetchModelBySlug (${slug}): Network error, searching local dataset.`, error);
  }

  // Fallback search in local models
  return MODELS.find((m) => m.slug === slug || m.id === slug) || null;
}

export async function fetchProviders(): Promise<Provider[]> {
  const endpoint = `${API_BASE}/api/providers`;
  try {
    const res = await fetch(endpoint, { cache: "no-store" });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.warn("fetchProviders: Network error, falling back to local providers.", error);
  }
  return PROVIDERS;
}

export async function fetchBenchmarks(): Promise<BenchmarkLeaderboardEntry[]> {
  const endpoint = `${API_BASE}/api/benchmarks`;
  try {
    const res = await fetch(endpoint, { cache: "no-store" });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.warn("fetchBenchmarks: Network error, falling back to local benchmarks.", error);
  }
  return BENCHMARK_LEADERBOARD;
}
