"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Sparkles,
  Building2,
  Trophy,
  ArrowRight,
  Calculator,
} from "lucide-react";
import { MODELS, PROVIDERS, BENCHMARK_LEADERBOARD } from "@/data/mockData";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PaletteItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Model" | "Provider" | "Benchmark" | "Tool";
  path: string;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [isOpen]);

  // Search indexing
  const items: PaletteItem[] = useMemo(() => {
    const q = query.toLowerCase().trim();

    const modelItems: PaletteItem[] = MODELS.filter(
      (m) =>
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.organization.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q))
    ).map((m) => ({
      id: `model-${m.id}`,
      title: m.name,
      subtitle: `${m.organization.name} • ${m.contextWindow.toLocaleString()} ctx • $${m.pricing.inputPerMillion}/1M in`,
      category: "Model" as const,
      path: `/models/${m.slug}`,
    }));

    const providerItems: PaletteItem[] = PROVIDERS.filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    ).map((p) => ({
      id: `provider-${p.id}`,
      title: p.name,
      subtitle: `${p.avgThroughputTps} tps • ${p.uptimePercent}% SLA • ${p.hostedModelCount} models`,
      category: "Provider" as const,
      path: "/providers",
    }));

    const benchmarkItems: PaletteItem[] = BENCHMARK_LEADERBOARD.filter(
      (b) =>
        !q ||
        b.modelName.toLowerCase().includes(q) ||
        b.organization.toLowerCase().includes(q)
    ).slice(0, 3).map((b) => ({
      id: `benchmark-${b.modelId}`,
      title: `${b.modelName} (Arena ELO: ${b.arenaElo})`,
      subtitle: `Rank #${b.rank} • MMLU ${b.mmlu}% • Code ${b.humanEval}%`,
      category: "Benchmark" as const,
      path: "/benchmarks",
    }));

    const staticItems: PaletteItem[] = [
      {
        id: "tool-calc",
        title: "Inference Cost Calculator",
        subtitle: "Project DAU, prompt/output tokens & caching economics",
        category: "Tool" as const,
        path: "/calculator",
      },
      {
        id: "tool-compare",
        title: "Side-by-Side Model Comparison Matrix",
        subtitle: "Compare up to 4 models across specs & pricing",
        category: "Tool" as const,
        path: "/compare",
      },
    ].filter((item: PaletteItem) => !q || item.title.toLowerCase().includes(q));

    return [...modelItems.slice(0, 5), ...providerItems.slice(0, 3), ...benchmarkItems, ...staticItems];
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose();
        return;
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, items.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + items.length) % Math.max(1, items.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (items[selectedIndex]) {
          router.push(items[selectedIndex].path);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, items, selectedIndex, router, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Global search command palette"
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 px-4 py-3.5">
          <Search className="h-5 w-5 text-sky-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AI models, labs, inference providers, benchmarks..."
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none font-sans"
            aria-label="Search query"
          />
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
            aria-label="Close command palette"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {items.map((item, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={item.id}
                onClick={() => {
                  router.push(item.path);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm transition-all group ${
                  isSelected
                    ? "bg-sky-50 dark:bg-sky-500/20 border border-sky-300 dark:border-sky-500/40 text-slate-900 dark:text-white"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${
                      item.category === "Model"
                        ? "bg-sky-500/10 text-sky-500 dark:text-sky-400 border border-sky-500/20"
                        : item.category === "Provider"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : item.category === "Benchmark"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                        : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                    }`}
                  >
                    {item.category === "Model" && <Sparkles className="h-4 w-4" />}
                    {item.category === "Provider" && <Building2 className="h-4 w-4" />}
                    {item.category === "Benchmark" && <Trophy className="h-4 w-4" />}
                    {item.category === "Tool" && <Calculator className="h-4 w-4" />}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold truncate text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-300">
                        {item.title}
                      </span>
                      <span className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 text-[10px] text-slate-600 dark:text-slate-400 font-mono">
                        {item.category}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {item.subtitle}
                    </div>
                  </div>
                </div>

                <ArrowRight
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    isSelected ? "text-sky-500 dark:text-sky-400" : "text-slate-400 dark:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-400"
                  }`}
                />
              </button>
            );
          })}

          {items.length === 0 && (
            <div className="py-12 text-center text-sm text-slate-500 space-y-2">
              <p>No results found for &quot;{query}&quot;</p>
              <div className="text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1 flex-wrap">
                <span>Try searching:</span>
                {["Claude", "DeepSeek", "GPT-4o", "Groq", "Arena"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="underline hover:text-sky-500 font-semibold px-1"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="border-t border-slate-200 dark:border-slate-800 px-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="rounded bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">↑</kbd>{" "}
              <kbd className="rounded bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="rounded bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">↵</kbd> to select
            </span>
          </div>
          <div>
            <kbd className="rounded bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">ESC</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
}
