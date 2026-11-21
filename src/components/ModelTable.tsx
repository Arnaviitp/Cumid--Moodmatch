"use client";

import Link from "next/link";
import { Model } from "@/types";
import { useCompare } from "@/context/CompareContext";
import { Check, Plus, ExternalLink, Sparkles } from "lucide-react";

interface ModelTableProps {
  models: Model[];
}

export function ModelTable({ models }: ModelTableProps) {
  const { toggleModel, isModelSelected } = useCompare();

  const formatContext = (ctx: number) => {
    if (ctx >= 1000000) return `${(ctx / 1000000).toFixed(1)}M`;
    return `${Math.round(ctx / 1000)}k`;
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 shadow-sm">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            <th className="py-3 px-4">Model & Lab</th>
            <th className="py-3 px-3">Type</th>
            <th className="py-3 px-3 text-right">Context</th>
            <th className="py-3 px-3 text-right">Input / 1M</th>
            <th className="py-3 px-3 text-right">Output / 1M</th>
            <th className="py-3 px-3 text-right">Arena ELO</th>
            <th className="py-3 px-3 text-right">Speed</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
          {models.map((model) => {
            const selected = isModelSelected(model.id);
            return (
              <tr
                key={model.id}
                className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${
                  selected ? "bg-sky-50 dark:bg-sky-950/20" : ""
                }`}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleModel(model)}
                      className={`h-4 w-4 rounded flex items-center justify-center border transition-colors ${
                        selected
                          ? "bg-sky-500 border-sky-400 text-white"
                          : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500"
                      }`}
                      title="Toggle comparison"
                    >
                      {selected && <Check className="h-3 w-3" />}
                    </button>
                    <div>
                      <Link
                        href={`/models/${model.slug}`}
                        className="font-bold text-slate-900 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 flex items-center gap-1.5"
                      >
                        {model.name}
                        {model.featured && (
                          <Sparkles className="h-3 w-3 text-amber-500 dark:text-amber-400" />
                        )}
                      </Link>
                      <div className="text-[11px] text-slate-500">
                        {model.organization.name} • {model.architecture.license}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-3">
                  <span className="rounded bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50">
                    {model.modelType}
                  </span>
                </td>

                <td className="py-3 px-3 text-right font-mono font-medium text-slate-700 dark:text-slate-300">
                  {formatContext(model.contextWindow)}
                </td>

                <td className="py-3 px-3 text-right font-mono text-sky-600 dark:text-sky-400 font-medium">
                  ${model.pricing.inputPerMillion.toFixed(2)}
                </td>

                <td className="py-3 px-3 text-right font-mono text-sky-500 dark:text-sky-300 font-medium">
                  ${model.pricing.outputPerMillion.toFixed(2)}
                </td>

                <td className="py-3 px-3 text-right font-mono text-amber-600 dark:text-amber-400 font-semibold">
                  {model.benchmarks.lmsysArenaElo || "—"}
                </td>

                <td className="py-3 px-3 text-right font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                  ~{model.latency.tokensPerSecond} tps
                </td>

                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => toggleModel(model)}
                      className={`rounded px-2 py-1 text-[11px] font-semibold transition-all ${
                        selected
                          ? "bg-sky-500 text-white"
                          : "border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      {selected ? "Selected" : "Compare"}
                    </button>
                    <Link
                      href={`/models/${model.slug}`}
                      className="text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 p-1"
                      title="View Profile"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
