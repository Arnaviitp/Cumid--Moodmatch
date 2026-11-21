"use client";

import Link from "next/link";
import { useCompare } from "@/context/CompareContext";
import { SlidersHorizontal, X, ArrowRight, Trash2 } from "lucide-react";

export function ComparisonDrawer() {
  const { selectedModels, removeModel, clearModels } = useCompare();

  if (selectedModels.length === 0) return null;

  return (
    <aside aria-label="Model Comparison Dock" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4 animate-bounce-subtle">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-sky-500/30 bg-white/95 dark:bg-slate-900/95 p-3 shadow-2xl backdrop-blur-md shadow-sky-950/20 dark:shadow-sky-950/50">
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          <div className="flex items-center gap-1.5 pl-1 pr-2 text-xs font-semibold text-sky-600 dark:text-sky-400">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Comparing</span>
            <span>({selectedModels.length}/4):</span>
          </div>

          <div className="flex items-center gap-1.5 flex-nowrap">
            {selectedModels.map((model) => (
              <span
                key={model.id}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-800 dark:text-slate-200"
              >
                <span className="truncate max-w-[100px]">{model.name}</span>
                <button
                  onClick={() => removeModel(model.id)}
                  className="text-slate-400 hover:text-rose-500 transition-colors"
                  title="Remove model"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearModels}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Clear all"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <Link
            href="/compare"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:from-sky-500 hover:to-cyan-400 transition-all"
          >
            <span>Compare Now</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
