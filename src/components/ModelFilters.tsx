"use client";

import { FilterState } from "@/types";
import { Search, RotateCcw, Sliders, Check, Mic, Eye, Zap, Wrench, Shield } from "lucide-react";
import { ORGANIZATIONS } from "@/data/mockData";

interface ModelFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalModels: number;
  filteredCount: number;
}

export function ModelFilters({
  filters,
  onChange,
  totalModels,
  filteredCount,
}: ModelFiltersProps) {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const toggleOrg = (slug: string) => {
    const exists = filters.organizations.includes(slug);
    const updated = exists
      ? filters.organizations.filter((s) => s !== slug)
      : [...filters.organizations, slug];
    updateFilter("organizations", updated);
  };

  const toggleType = (type: string) => {
    const exists = filters.modelTypes.includes(type);
    const updated = exists
      ? filters.modelTypes.filter((t) => t !== type)
      : [...filters.modelTypes, type];
    updateFilter("modelTypes", updated);
  };

  const toggleCap = (cap: string) => {
    const exists = filters.capabilities.includes(cap);
    const updated = exists
      ? filters.capabilities.filter((c) => c !== cap)
      : [...filters.capabilities, cap];
    updateFilter("capabilities", updated);
  };

  const resetFilters = () => {
    onChange({
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
      viewMode: filters.viewMode,
    });
  };

  const isFiltered =
    filters.search !== "" ||
    filters.organizations.length > 0 ||
    filters.modelTypes.length > 0 ||
    filters.capabilities.length > 0 ||
    filters.openWeightsOnly ||
    filters.maxPrice < 20 ||
    filters.minContext > 0;

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 p-5 text-xs text-slate-700 dark:text-slate-300 shadow-sm backdrop-blur-sm">
      {/* Header & Reset */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="h-4 w-4 text-sky-500" />
          <span className="font-bold text-slate-900 dark:text-white text-sm">Filters</span>
          <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] text-slate-600 dark:text-slate-400 font-mono">
            {filteredCount}/{totalModels}
          </span>
        </div>
        {isFiltered && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        )}
      </div>

      {/* Search Input */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search name, tags, description..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 py-2 pl-9 pr-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Model Type */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          Model Category
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {["Chat", "Reasoning", "Code", "Multimodal"].map((type) => {
            const active = filters.modelTypes.includes(type);
            return (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-left transition-all ${
                  active
                    ? "border-sky-500/80 bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 font-medium"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <span>{type}</span>
                {active && <Check className="h-3 w-3 text-sky-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Organizations / AI Labs */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          AI Labs & Companies
        </label>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {ORGANIZATIONS.map((org) => {
            const active = filters.organizations.includes(org.slug);
            return (
              <button
                key={org.id}
                onClick={() => toggleOrg(org.slug)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-all ${
                  active
                    ? "bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 font-medium border border-sky-300 dark:border-sky-500/30"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <span>{org.name}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                  {org.modelCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Capabilities */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          Capabilities & Modalities
        </label>
        <div className="space-y-1.5">
          {[
            { id: "vision", label: "Multimodal Vision", icon: Eye },
            { id: "audio", label: "Audio Processing", icon: Mic },
            { id: "toolCalling", label: "Tool / Function Calling", icon: Wrench },
            { id: "reasoningTokens", label: "Reasoning Tokens (RL)", icon: Zap },
            { id: "openWeights", label: "Open Weights", icon: Shield },
          ].map((cap) => {
            const active = filters.capabilities.includes(cap.id);
            const Icon = cap.icon;
            return (
              <label
                key={cap.id}
                onClick={() => toggleCap(cap.id)}
                className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white py-0.5"
              >
                <div
                  className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                    active
                      ? "border-sky-500 bg-sky-500 text-white"
                      : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                  }`}
                >
                  {active && <Check className="h-3 w-3" />}
                </div>
                <Icon className="h-3 w-3 text-slate-400 dark:text-slate-400" />
                <span>{cap.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Pricing slider */}
      <div>
        <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          <span>Max Input Price</span>
          <span className="text-sky-600 dark:text-sky-400 font-mono">${filters.maxPrice}/1M</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="20"
          step="0.5"
          value={filters.maxPrice}
          onChange={(e) => updateFilter("maxPrice", parseFloat(e.target.value))}
          className="w-full accent-sky-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">
          <span>$0.10</span>
          <span>$20.00</span>
        </div>
      </div>

      {/* Context Window */}
      <div>
        <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          <span>Min Context Window</span>
          <span className="text-sky-600 dark:text-sky-400 font-mono">
            {filters.minContext >= 1000000
              ? `${(filters.minContext / 1000000).toFixed(1)}M`
              : `${Math.round(filters.minContext / 1000)}k`}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="2000000"
          step="64000"
          value={filters.minContext}
          onChange={(e) => updateFilter("minContext", parseInt(e.target.value, 10))}
          className="w-full accent-sky-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">
          <span>Any</span>
          <span>2M Tokens</span>
        </div>
      </div>
    </div>
  );
}
