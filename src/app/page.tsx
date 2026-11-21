"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Model, FilterState } from "@/types";
import { fetchModels } from "@/lib/api";
import { ModelCard } from "@/components/ModelCard";
import { ModelTable } from "@/components/ModelTable";
import { ModelFilters } from "@/components/ModelFilters";
import {
  Sparkles,
  LayoutGrid,
  List,
  Zap,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Search,
  Info,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize filters from searchParams if present
  const [filters, setFilters] = useState<FilterState>(() => {
    return {
      search: searchParams?.get("q") || "",
      organizations: searchParams?.get("org") ? searchParams.get("org")!.split(",") : [],
      providers: searchParams?.get("provider") ? searchParams.get("provider")!.split(",") : [],
      modalities: [],
      capabilities: searchParams?.get("cap") ? searchParams.get("cap")!.split(",") : [],
      modelTypes: searchParams?.get("type") ? searchParams.get("type")!.split(",") : [],
      openWeightsOnly: searchParams?.get("openWeights") === "true",
      maxPrice: searchParams?.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : 20,
      minContext: searchParams?.get("minContext") ? parseInt(searchParams.get("minContext")!, 10) : 0,
      sortBy: (searchParams?.get("sort") as FilterState["sortBy"]) || "popular",
      viewMode: (searchParams?.get("view") as "grid" | "table") || "grid",
    };
  });

  const [selectedQuickTag, setSelectedQuickTag] = useState<string>("all");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchModels();
      setModels(data);
      setLoading(false);
    }
    loadData();
  }, []);

  // Synchronize state when URL searchParams change (e.g. browser Back/Forward or navigation from /providers)
  useEffect(() => {
    if (!searchParams) return;
    const org = searchParams.get("org") ? searchParams.get("org")!.split(",") : [];
    const q = searchParams.get("q") || "";
    const type = searchParams.get("type") ? searchParams.get("type")!.split(",") : [];
    const cap = searchParams.get("cap") ? searchParams.get("cap")!.split(",") : [];
    const openWeights = searchParams.get("openWeights") === "true";
    const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : 20;
    const minContext = searchParams.get("minContext") ? parseInt(searchParams.get("minContext")!, 10) : 0;
    const sort = (searchParams.get("sort") as FilterState["sortBy"]) || "popular";
    const view = (searchParams.get("view") as "grid" | "table") || "grid";

    setFilters((prev) => {
      if (
        prev.search === q &&
        prev.openWeightsOnly === openWeights &&
        prev.maxPrice === maxPrice &&
        prev.minContext === minContext &&
        prev.sortBy === sort &&
        prev.viewMode === view &&
        prev.organizations.join(",") === org.join(",") &&
        prev.modelTypes.join(",") === type.join(",") &&
        prev.capabilities.join(",") === cap.join(",")
      ) {
        return prev;
      }
      return {
        ...prev,
        search: q,
        organizations: org,
        modelTypes: type,
        capabilities: cap,
        openWeightsOnly: openWeights,
        maxPrice,
        minContext,
        sortBy: sort,
        viewMode: view,
      };
    });
  }, [searchParams]);

  // Synchronize state changes to URL query string
  const syncToUrl = useCallback((newFilters: FilterState) => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();

    if (newFilters.search) params.set("q", newFilters.search);
    if (newFilters.organizations.length > 0) params.set("org", newFilters.organizations.join(","));
    if (newFilters.modelTypes.length > 0) params.set("type", newFilters.modelTypes.join(","));
    if (newFilters.capabilities.length > 0) params.set("cap", newFilters.capabilities.join(","));
    if (newFilters.openWeightsOnly) params.set("openWeights", "true");
    if (newFilters.maxPrice < 20) params.set("maxPrice", newFilters.maxPrice.toString());
    if (newFilters.minContext > 0) params.set("minContext", newFilters.minContext.toString());
    if (newFilters.sortBy !== "popular") params.set("sort", newFilters.sortBy);
    if (newFilters.viewMode !== "grid") params.set("view", newFilters.viewMode);

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  }, []);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    syncToUrl(newFilters);
  };

  // Quick preset pills handler
  const handleQuickTag = (tag: string) => {
    setSelectedQuickTag(tag);
    let updated: FilterState;

    if (tag === "all") {
      updated = {
        ...filters,
        modelTypes: [],
        capabilities: [],
        openWeightsOnly: false,
        maxPrice: 20,
      };
    } else if (tag === "reasoning") {
      updated = {
        ...filters,
        modelTypes: ["Reasoning"],
        capabilities: [],
        openWeightsOnly: false,
      };
    } else if (tag === "coding") {
      updated = {
        ...filters,
        modelTypes: ["Code"],
        capabilities: [],
        openWeightsOnly: false,
      };
    } else if (tag === "open-weights") {
      updated = {
        ...filters,
        modelTypes: [],
        capabilities: ["openWeights"],
        openWeightsOnly: true,
      };
    } else if (tag === "multimodal") {
      updated = {
        ...filters,
        modelTypes: [],
        capabilities: ["vision"],
        openWeightsOnly: false,
      };
    } else if (tag === "budget") {
      updated = {
        ...filters,
        modelTypes: [],
        capabilities: [],
        openWeightsOnly: false,
        maxPrice: 1.0,
      };
    } else {
      updated = filters;
    }

    setFilters(updated);
    syncToUrl(updated);
  };

  // Filter & sort logic
  const filteredModels = useMemo(() => {
    return models
      .filter((model) => {
        // Search
        if (filters.search) {
          const q = filters.search.toLowerCase();
          const matchName = model.name.toLowerCase().includes(q);
          const matchOrg = model.organization.name.toLowerCase().includes(q);
          const matchDesc = model.description.toLowerCase().includes(q);
          const matchTag = model.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchOrg && !matchDesc && !matchTag) return false;
        }

        // Organizations
        if (
          filters.organizations.length > 0 &&
          !filters.organizations.includes(model.organization.slug)
        ) {
          return false;
        }

        // Model Types
        if (
          filters.modelTypes.length > 0 &&
          !filters.modelTypes.includes(model.modelType)
        ) {
          return false;
        }

        // Capabilities
        if (filters.capabilities.length > 0) {
          for (const cap of filters.capabilities) {
            if (cap === "vision" && !model.capabilities.vision) return false;
            if (cap === "audio" && !model.capabilities.audio) return false;
            if (cap === "toolCalling" && !model.capabilities.toolCalling) return false;
            if (cap === "reasoningTokens" && !model.capabilities.reasoningTokens) return false;
            if (cap === "openWeights" && !model.capabilities.openWeights) return false;
          }
        }

        // Price
        if (model.pricing.inputPerMillion > filters.maxPrice) return false;

        // Context
        if (model.contextWindow < filters.minContext) return false;

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-asc") {
          return a.pricing.inputPerMillion - b.pricing.inputPerMillion;
        }
        if (filters.sortBy === "price-desc") {
          return b.pricing.inputPerMillion - a.pricing.inputPerMillion;
        }
        if (filters.sortBy === "context-desc") {
          return b.contextWindow - a.contextWindow;
        }
        if (filters.sortBy === "arena-desc") {
          return (b.benchmarks.lmsysArenaElo || 0) - (a.benchmarks.lmsysArenaElo || 0);
        }
        if (filters.sortBy === "speed-desc") {
          return b.latency.tokensPerSecond - a.latency.tokensPerSecond;
        }
        if (filters.sortBy === "release-desc") {
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        }
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [models, filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Telemetry Section */}
      <section className="relative overflow-hidden rounded-3xl border border-sky-500/20 bg-gradient-to-b from-sky-950/40 via-slate-900/40 to-slate-950 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>OneAtlas Intelligence Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Discover, Compare & Route Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400">Foundation Models</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            Live latency telemetry, verifiable benchmarks, token cost comparisons, and multi-provider availability across OpenAI, Anthropic, DeepSeek, Meta, and Google DeepMind.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <div className="text-[11px] font-medium text-slate-500 uppercase flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-sky-400" /> Models Tracked
              </div>
              <div className="text-xl font-bold font-mono text-white mt-0.5">
                {models.length} SOTA
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <div className="text-[11px] font-medium text-slate-500 uppercase flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-400" /> Max Context
              </div>
              <div className="text-xl font-bold font-mono text-amber-300 mt-0.5">
                2,000,000
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <div className="text-[11px] font-medium text-slate-500 uppercase flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Active Providers
              </div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
                6 Hosts
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <div className="text-[11px] font-medium text-slate-500 uppercase flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-purple-400" /> Arena Leader
              </div>
              <div className="text-xl font-bold font-mono text-purple-300 mt-0.5">
                1361 ELO
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Category Tags */}
      <section className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: "all", label: "All Models" },
          { id: "reasoning", label: "Reasoning & STEM" },
          { id: "coding", label: "Code Specialists" },
          { id: "open-weights", label: "Open Weights" },
          { id: "multimodal", label: "Vision & Audio" },
          { id: "budget", label: "Under $1.00 / 1M" },
        ].map((pill) => (
          <button
            key={pill.id}
            onClick={() => handleQuickTag(pill.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedQuickTag === pill.id
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            {pill.label}
          </button>
        ))}
      </section>

      {/* Main Catalog Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1">
          <ModelFilters
            filters={filters}
            onChange={handleFiltersChange}
            totalModels={models.length}
            filteredCount={filteredModels.length}
          />
        </aside>

        {/* Models Container */}
        <div className="lg:col-span-3 space-y-5">
          {/* Controls Bar: Sort & View Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <span>Showing</span>
              <strong className="text-slate-900 dark:text-white font-mono">{filteredModels.length}</strong>
              <span>models</span>
              {typeof window !== "undefined" && window.location.search && (
                <span className="rounded bg-sky-500/10 px-1.5 py-0.5 text-[10px] text-sky-600 dark:text-sky-400 font-mono">
                  Filtered URL Active
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Sort:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    handleFiltersChange({
                      ...filters,
                      sortBy: e.target.value as FilterState["sortBy"],
                    })
                  }
                  className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:border-sky-500 focus:outline-none"
                >
                  <option value="popular">Popular / Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="context-desc">Context: Largest First</option>
                  <option value="arena-desc">Arena ELO: Highest First</option>
                  <option value="speed-desc">Speed: Fastest (TPS)</option>
                  <option value="release-desc">Release: Newest First</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-0.5">
                <button
                  onClick={() =>
                    handleFiltersChange({ ...filters, viewMode: "grid" })
                  }
                  className={`p-1.5 rounded-md transition-colors ${
                    filters.viewMode === "grid"
                      ? "bg-sky-500 text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() =>
                    handleFiltersChange({ ...filters, viewMode: "table" })
                  }
                  className={`p-1.5 rounded-md transition-colors ${
                    filters.viewMode === "table"
                      ? "bg-sky-500 text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                  title="Table View"
                >
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Render List / Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-64 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/40 animate-pulse p-6"
                />
              ))}
            </div>
          ) : filteredModels.length > 0 ? (
            filters.viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredModels.map((model) => (
                  <ModelCard key={model.id} model={model} />
                ))}
              </div>
            ) : (
              <ModelTable models={filteredModels} />
            )
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-12 text-center space-y-3 shadow-sm">
              <Search className="h-8 w-8 text-slate-400 dark:text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-200">
                No matching models found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try adjusting your search criteria, price range, or reset your filters.
              </p>
              <button
                onClick={() =>
                  handleFiltersChange({
                    search: "",
                    organizations: [],
                    providers: [],
                    modalities: [],
                    capabilities: [],
                    modelTypes: [],
                    openWeightsOnly: false,
                    maxPrice: 20,
                    minContext: 0,
                    sortBy: "popular",
                    viewMode: "grid",
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-500"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Data Note Disclaimer */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-4 border-t border-slate-200 dark:border-slate-800/60">
            <Info className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>
              Specifications, token pricing, and throughput numbers reflect published benchmark data from provider documentation. Sample inference metrics for evaluation purposes.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
