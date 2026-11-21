export type ModelType =
  | "Chat"
  | "Reasoning"
  | "Code"
  | "Multimodal"
  | "Embedding"
  | "Audio";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo: string;
  website: string;
  country: string;
  modelCount?: number;
}

export interface ProviderRoute {
  providerId: string;
  providerName: string;
  inputPricePerMillion: number;
  outputPricePerMillion: number;
  latencyMs: number;
  tokensPerSecond: number;
  uptimePercent: number;
  status: "healthy" | "degraded" | "down";
  contextLimit: number;
}

export interface ModelBenchmarks {
  mmlu?: number; // %
  gpqa?: number; // %
  math?: number; // %
  humanEval?: number; // %
  lmsysArenaElo?: number; // ELO points
}

export interface ModelCapabilities {
  toolCalling: boolean;
  structuredOutputs: boolean;
  vision: boolean;
  audio: boolean;
  reasoningTokens: boolean;
  streaming: boolean;
  openWeights: boolean;
}

export interface Model {
  id: string;
  slug: string;
  name: string;
  organization: Organization;
  description: string;
  modelType: ModelType;
  modalities: {
    input: string[];
    output: string[];
  };
  contextWindow: number;
  maxOutputTokens: number;
  pricing: {
    inputPerMillion: number;
    outputPerMillion: number;
    cachedInputPerMillion?: number;
    currency: "USD";
  };
  capabilities: ModelCapabilities;
  benchmarks: ModelBenchmarks;
  latency: {
    ttftMs: number;
    tokensPerSecond: number;
  };
  providers: ProviderRoute[];
  releaseDate: string;
  architecture: {
    parameters?: string;
    license: string;
  };
  featured: boolean;
  tags: string[];
}

export interface Provider {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  website: string;
  apiBaseUrl: string;
  hostedModelCount: number;
  avgLatencyMs: number;
  avgThroughputTps: number;
  uptimePercent: number;
  status: "operational" | "maintenance";
  regions: string[];
  features: string[];
}

export interface BenchmarkLeaderboardEntry {
  rank: number;
  modelId: string;
  modelName: string;
  slug: string;
  organization: string;
  arenaElo: number;
  mmlu: number;
  gpqa: number;
  math: number;
  humanEval: number;
  inputCost: number;
  outputCost: number;
  license: string;
}

export type SortOption =
  | "popular"
  | "price-asc"
  | "price-desc"
  | "context-desc"
  | "arena-desc"
  | "release-desc"
  | "speed-desc";

export interface FilterState {
  search: string;
  organizations: string[];
  providers: string[];
  modalities: string[];
  capabilities: string[];
  modelTypes: string[];
  openWeightsOnly: boolean;
  maxPrice: number;
  minContext: number;
  sortBy: SortOption;
  viewMode: "grid" | "table";
}
