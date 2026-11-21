"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCompare } from "@/context/CompareContext";
import { useToast } from "@/context/ToastContext";
import { MODELS } from "@/data/mockData";
import { Model } from "@/types";
import {
  SlidersHorizontal,
  Check,
  X,
  Sparkles,
  DollarSign,
  Share2,
  TrendingDown,
  ExternalLink,
  Info,
} from "lucide-react";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const { selectedModels, addModel, removeModel, clearModels, setModelsBySlugs } = useCompare();
  const { showToast } = useToast();

  // Multi-model cost simulation state
  const [promptTokens, setPromptTokens] = useState<number>(1000);
  const [completionTokens, setCompletionTokens] = useState<number>(500);
  const [requestVolume, setRequestVolume] = useState<number>(50000);

  // Sync URL query params if user lands directly with ?models=...
  useEffect(() => {
    const urlModels = searchParams?.get("models");
    if (urlModels) {
      const slugs = urlModels.split(",").map((s) => s.trim());
      setModelsBySlugs(slugs);
    }
  }, [searchParams, setModelsBySlugs]);

  // Keep URL updated when selectedModels change
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (selectedModels.length > 0) {
      const slugs = selectedModels.map((m) => m.slug).join(",");
      window.history.replaceState(null, "", `/compare?models=${slugs}`);
    } else {
      window.history.replaceState(null, "", "/compare");
    }
  }, [selectedModels]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      showToast("Comparison link copied to clipboard!", "success");
    }
  };

  // Available models not yet selected
  const availableModels = MODELS.filter(
    (m) => !selectedModels.some((sm) => sm.id === m.id)
  );

  const formatContext = (ctx: number) => {
    if (ctx >= 1000000) return `${(ctx / 1000000).toFixed(1)}M`;
    return `${Math.round(ctx / 1000)}k`;
  };

  // Cost calculation for a model
  const calculateCost = (model: Model) => {
    const inputMillion = (promptTokens * requestVolume) / 1000000;
    const outputMillion = (completionTokens * requestVolume) / 1000000;
    return (
      inputMillion * model.pricing.inputPerMillion +
      outputMillion * model.pricing.outputPerMillion
    );
  };

  const costs = selectedModels.map((m) => ({
    modelId: m.id,
    cost: calculateCost(m),
  }));

  const lowestCost = costs.length > 0 ? Math.min(...costs.map((c) => c.cost)) : 0;
  const highestCost = costs.length > 0 ? Math.max(...costs.map((c) => c.cost)) : 0;

  // Matrix diff calculations
  const maxContext = selectedModels.length > 0 ? Math.max(...selectedModels.map((m) => m.contextWindow)) : 0;
  const minInputPrice = selectedModels.length > 0 ? Math.min(...selectedModels.map((m) => m.pricing.inputPerMillion)) : 0;
  const maxArenaElo = selectedModels.length > 0 ? Math.max(...selectedModels.map((m) => m.benchmarks.lmsysArenaElo || 0)) : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600 dark:text-sky-400 mb-2">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Side-by-Side Evaluator</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Model Comparison Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Evaluate architectures, context scales, per-token pricing, and benchmark scores across up to 4 models.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {selectedModels.length > 0 && (
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 transition-colors shadow-sm"
            >
              <Share2 className="h-3.5 w-3.5 text-sky-500" />
              <span>Share URL</span>
            </button>
          )}

          {availableModels.length > 0 && selectedModels.length < 4 && (
            <select
              onChange={(e) => {
                const model = MODELS.find((m) => m.id === e.target.value);
                if (model) addModel(model);
                e.target.value = "";
              }}
              defaultValue=""
              className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:border-sky-500 focus:outline-none shadow-sm"
            >
              <option value="" disabled>
                + Add Model to Compare...
              </option>
              {availableModels.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.organization.name})
                </option>
              ))}
            </select>
          )}

          {selectedModels.length > 0 && (
            <button
              onClick={clearModels}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {selectedModels.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-12 text-center space-y-4 shadow-sm">
          <SlidersHorizontal className="h-10 w-10 text-slate-400 dark:text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Models Selected</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Choose models from the catalog or add one from the dropdown above to begin side-by-side comparison.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => {
                addModel(MODELS[0]);
                addModel(MODELS[2]);
              }}
              className="rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-500 transition-colors shadow-sm"
            >
              Compare Claude 3.5 Sonnet vs DeepSeek R1
            </button>
            <Link
              href="/"
              className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Single Model Helper Banner */}
          {selectedModels.length === 1 && (
            <div className="rounded-2xl border border-sky-500/30 bg-sky-50/70 dark:bg-sky-950/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <Info className="h-5 w-5 text-sky-600 dark:text-sky-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Comparing 1 model. Add another model to enable side-by-side metric deltas and cost calculations.
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Quick-add one of these popular benchmarks counterparts:
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {availableModels.slice(0, 3).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => addModel(m)}
                    className="rounded-lg border border-sky-500/30 bg-white dark:bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-600 dark:hover:text-white transition-all shadow-xs"
                  >
                    + {m.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main Matrix Table */}
          <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80">
                  <th className="py-4 px-5 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold w-48 min-w-[180px]">
                    Attribute
                  </th>
                  {selectedModels.map((model) => (
                    <th
                      key={model.id}
                      className="py-4 px-5 text-slate-900 dark:text-slate-100 font-bold min-w-[220px]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] text-sky-600 dark:text-sky-400 uppercase font-semibold block">
                            {model.organization.name}
                          </span>
                          <Link
                            href={`/models/${model.slug}`}
                            className="text-sm font-extrabold hover:text-sky-600 dark:hover:text-sky-300 transition-colors flex items-center gap-1"
                          >
                            {model.name}
                            <ExternalLink className="h-3 w-3 text-slate-400" />
                          </Link>
                        </div>
                        <button
                          onClick={() => removeModel(model.id)}
                          className="rounded p-1 text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Remove model"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
                {/* Model Type */}
                <tr className="hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/50 dark:bg-slate-950/50">
                    Category
                  </td>
                  {selectedModels.map((m) => (
                    <td key={m.id} className="py-3 px-5 text-slate-800 dark:text-slate-200">
                      <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-medium border border-slate-200 dark:border-slate-700/60">
                        {m.modelType}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Parameters */}
                <tr className="hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/50 dark:bg-slate-950/50">
                    Parameters
                  </td>
                  {selectedModels.map((m) => (
                    <td key={m.id} className="py-3 px-5 font-mono text-slate-700 dark:text-slate-300">
                      {m.architecture.parameters || "Undisclosed"}
                    </td>
                  ))}
                </tr>

                {/* License & Weights */}
                <tr className="hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/50 dark:bg-slate-950/50">
                    License / Weights
                  </td>
                  {selectedModels.map((m) => (
                    <td key={m.id} className="py-3 px-5">
                      {m.capabilities.openWeights ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                          <Check className="h-3.5 w-3.5" /> Open ({m.architecture.license})
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">
                          Proprietary API
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Context Window */}
                <tr className="hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/50 dark:bg-slate-950/50">
                    Context Window
                  </td>
                  {selectedModels.map((m) => {
                    const isMax = m.contextWindow === maxContext;
                    return (
                      <td key={m.id} className="py-3 px-5">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono font-bold text-sm ${isMax ? "text-amber-500 dark:text-amber-300" : "text-slate-900 dark:text-white"}`}>
                            {formatContext(m.contextWindow)} tokens
                          </span>
                          {isMax && (
                            <span className="rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] px-1 font-bold">
                              Leader
                            </span>
                          )}
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1 mt-1.5 overflow-hidden">
                          <div
                            className={`h-1 rounded-full ${isMax ? "bg-amber-500" : "bg-sky-500"}`}
                            style={{
                              width: `${Math.min(100, (m.contextWindow / 2000000) * 100)}%`,
                            }}
                          />
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* Input Price */}
                <tr className="hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/50 dark:bg-slate-950/50">
                    Input Cost / 1M
                  </td>
                  {selectedModels.map((m) => {
                    const isCheapest = m.pricing.inputPerMillion === minInputPrice;
                    return (
                      <td key={m.id} className="py-3 px-5 font-mono font-bold text-sm">
                        <span className={isCheapest ? "text-emerald-600 dark:text-emerald-400 font-extrabold" : "text-sky-600 dark:text-sky-400"}>
                          ${m.pricing.inputPerMillion.toFixed(2)}
                        </span>
                        {isCheapest && (
                          <span className="ml-1.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] px-1">
                            Best
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Output Price */}
                <tr className="hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/50 dark:bg-slate-950/50">
                    Output Cost / 1M
                  </td>
                  {selectedModels.map((m) => (
                    <td key={m.id} className="py-3 px-5 font-mono font-bold text-sky-600 dark:text-sky-300 text-sm">
                      ${m.pricing.outputPerMillion.toFixed(2)}
                    </td>
                  ))}
                </tr>

                {/* Arena ELO */}
                <tr className="hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/50 dark:bg-slate-950/50">
                    LMSYS Arena ELO
                  </td>
                  {selectedModels.map((m) => {
                    const isTopElo = m.benchmarks.lmsysArenaElo === maxArenaElo;
                    return (
                      <td key={m.id} className="py-3 px-5 font-mono text-sm">
                        <span className={isTopElo ? "text-amber-500 dark:text-amber-300 font-extrabold" : "text-slate-700 dark:text-slate-300 font-semibold"}>
                          {m.benchmarks.lmsysArenaElo || "—"}
                        </span>
                        {isTopElo && (
                          <span className="ml-1.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-300 text-[10px] px-1.5 py-0.5 font-bold border border-amber-500/30">
                            #1
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* MMLU */}
                <tr className="hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/50 dark:bg-slate-950/50">
                    MMLU Score
                  </td>
                  {selectedModels.map((m) => (
                    <td key={m.id} className="py-3 px-5 font-mono text-slate-800 dark:text-slate-200">
                      {m.benchmarks.mmlu ? `${m.benchmarks.mmlu}%` : "—"}
                    </td>
                  ))}
                </tr>

                {/* HumanEval Coding */}
                <tr className="hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/50 dark:bg-slate-950/50">
                    HumanEval (Code)
                  </td>
                  {selectedModels.map((m) => (
                    <td key={m.id} className="py-3 px-5 font-mono text-slate-800 dark:text-slate-200">
                      {m.benchmarks.humanEval ? `${m.benchmarks.humanEval}%` : "—"}
                    </td>
                  ))}
                </tr>

                {/* Throughput */}
                <tr className="hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/50 dark:bg-slate-950/50">
                    Throughput
                  </td>
                  {selectedModels.map((m) => (
                    <td key={m.id} className="py-3 px-5 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      ~{m.latency.tokensPerSecond} tps
                    </td>
                  ))}
                </tr>

                {/* Multimodal Vision */}
                <tr className="hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/50 dark:bg-slate-950/50">
                    Vision Input
                  </td>
                  {selectedModels.map((m) => (
                    <td key={m.id} className="py-3 px-5">
                      {m.capabilities.vision ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                          <Check className="h-4 w-4" /> Yes
                        </span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Function / Tool Calling */}
                <tr className="hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/50 dark:bg-slate-950/50">
                    Tool Calling
                  </td>
                  {selectedModels.map((m) => (
                    <td key={m.id} className="py-3 px-5">
                      {m.capabilities.toolCalling ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                          <Check className="h-4 w-4" /> Native
                        </span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Reasoning Tokens */}
                <tr className="hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/50 dark:bg-slate-950/50">
                    Reasoning Tokens (RL)
                  </td>
                  {selectedModels.map((m) => (
                    <td key={m.id} className="py-3 px-5">
                      {m.capabilities.reasoningTokens ? (
                        <span className="text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-1">
                          <Sparkles className="h-3.5 w-3.5" /> Chain-of-Thought
                        </span>
                      ) : (
                        <span className="text-slate-400">Standard</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Interactive Multi-Model Cost Simulator */}
          <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-emerald-500" />
                  Head-to-Head Token Cost Simulator
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Simulate and contrast real monthly cloud API bills across your selected models under identical workloads.
                </p>
              </div>

              {highestCost > lowestCost && (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 px-3 py-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                  <TrendingDown className="h-4 w-4" />
                  <span>Max Monthly Savings: ${(highestCost - lowestCost).toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Workload Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold">Prompt Tokens / Call:</span>
                  <span className="font-mono text-sky-600 dark:text-sky-400">{promptTokens.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="15000"
                  step="200"
                  value={promptTokens}
                  onChange={(e) => setPromptTokens(parseInt(e.target.value, 10))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold">Completion Tokens / Call:</span>
                  <span className="font-mono text-sky-600 dark:text-sky-400">{completionTokens.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="4000"
                  step="100"
                  value={completionTokens}
                  onChange={(e) => setCompletionTokens(parseInt(e.target.value, 10))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold">Monthly API Requests:</span>
                  <span className="font-mono text-sky-600 dark:text-sky-400">{requestVolume.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={requestVolume}
                  onChange={(e) => setRequestVolume(parseInt(e.target.value, 10))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Cost Cards per Model */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {selectedModels.map((model) => {
                const cost = calculateCost(model);
                const isWinner = cost === lowestCost;

                return (
                  <div
                    key={model.id}
                    className={`rounded-2xl border p-5 space-y-3 transition-all ${
                      isWinner
                        ? "border-emerald-500/80 bg-emerald-50 dark:bg-emerald-950/20 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/40"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">
                        {model.organization.name}
                      </span>
                      {isWinner && (
                        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                          Lowest Cost
                        </span>
                      )}
                    </div>

                    <div className="font-bold text-slate-900 dark:text-white text-sm truncate">
                      {model.name}
                    </div>

                    <div>
                      <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
                        ${cost.toFixed(2)}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">estimated / month</div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-500 space-y-0.5">
                      <div>${model.pricing.inputPerMillion}/1M in</div>
                      <div>${model.pricing.outputPerMillion}/1M out</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800/60">
              <Info className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>Simulated calculations are for cost estimation and architecture planning. Actual cloud charges will depend on your caching efficiency and provider billing rounding rules.</span>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
