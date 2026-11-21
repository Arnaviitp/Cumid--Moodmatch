"use client";

import Link from "next/link";
import { Model } from "@/types";
import { useCompare } from "@/context/CompareContext";
import { Sparkles, Zap, Eye, Check, Plus, ExternalLink, Cpu, BarChart2 } from "lucide-react";

interface ModelCardProps {
  model: Model;
}

export function ModelCard({ model }: ModelCardProps) {
  const { toggleModel, isModelSelected } = useCompare();
  const selected = isModelSelected(model.id);

  const formatContext = (ctx: number) => {
    if (ctx >= 1000000) return `${(ctx / 1000000).toFixed(1)}M`;
    return `${Math.round(ctx / 1000)}k`;
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-200 ${
        selected
          ? "border-sky-500/80 bg-sky-50 dark:bg-sky-950/20 shadow-lg shadow-sky-500/10 ring-1 ring-sky-500/40"
          : "border-slate-200 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-900/90 hover:shadow-xl hover:shadow-slate-950/20 dark:hover:shadow-slate-950/60"
      }`}
    >
      <div>
        {/* Top Header: Organization & Type */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">
              {model.organization.name}
            </span>
            {model.capabilities.openWeights && (
              <span className="rounded-md bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                Open Weights
              </span>
            )}
          </div>
          <span className="rounded-md bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50">
            {model.modelType}
          </span>
        </div>

        {/* Title & Description */}
        <Link href={`/models/${model.slug}`} className="block group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
            {model.name}
            {model.featured && (
              <Sparkles className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
            )}
          </h3>
        </Link>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {model.description}
        </p>

        {/* Badges / Capabilities */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {model.capabilities.vision && (
            <span className="inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-800/60 px-1.5 py-0.5 text-[10px] font-medium text-sky-700 dark:text-sky-400 border border-slate-200 dark:border-slate-700/40">
              <Eye className="h-2.5 w-2.5" /> Vision
            </span>
          )}
          {model.capabilities.reasoningTokens && (
            <span className="inline-flex items-center gap-1 rounded bg-purple-500/10 px-1.5 py-0.5 text-[10px] font-medium text-purple-700 dark:text-purple-300 border border-purple-500/20">
              <Zap className="h-2.5 w-2.5" /> Reasoning
            </span>
          )}
          {model.capabilities.toolCalling && (
            <span className="inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-800/60 px-1.5 py-0.5 text-[10px] font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/40">
              Tools
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-800/60 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/40">
            <Cpu className="h-2.5 w-2.5" /> {model.architecture.parameters || "Undisclosed"}
          </span>
        </div>

        {/* Telemetry Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 p-2.5 border border-slate-200 dark:border-slate-800/60">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
              Context
            </div>
            <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
              {formatContext(model.contextWindow)} tokens
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
              Pricing / 1M
            </div>
            <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
              ${model.pricing.inputPerMillion.toFixed(2)} / ${model.pricing.outputPerMillion.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium flex items-center gap-1">
              <BarChart2 className="h-2.5 w-2.5" /> Arena ELO
            </div>
            <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-300">
              {model.benchmarks.lmsysArenaElo || "N/A"}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
              Throughput
            </div>
            <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
              ~{model.latency.tokensPerSecond} tps
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between gap-2">
        <button
          onClick={() => toggleModel(model)}
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
            selected
              ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
              : "border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 hover:text-black dark:hover:text-white"
          }`}
        >
          {selected ? (
            <>
              <Check className="h-3 w-3" />
              <span>In Compare</span>
            </>
          ) : (
            <>
              <Plus className="h-3 w-3" />
              <span>Compare</span>
            </>
          )}
        </button>

        <Link
          href={`/models/${model.slug}`}
          className="flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
        >
          <span>Details</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
