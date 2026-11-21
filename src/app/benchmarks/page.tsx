"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchBenchmarks } from "@/lib/api";
import { BenchmarkLeaderboardEntry } from "@/types";
import { useCompare } from "@/context/CompareContext";
import { MODELS } from "@/data/mockData";
import {
  Trophy,
  Medal,
  Award,
  Code,
  Calculator,
  Brain,
  Microscope,
  ExternalLink,
  Plus,
  Check,
  Info,
} from "lucide-react";

export default function BenchmarksPage() {
  const [entries, setEntries] = useState<BenchmarkLeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"arena" | "code" | "math" | "mmlu" | "gpqa">("arena");

  const { toggleModel, isModelSelected } = useCompare();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchBenchmarks();
      setEntries(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const benchmarkDescriptions = {
    arena: {
      name: "LMSYS Chatbot Arena ELO",
      desc: "Crowdsourced blind human evaluation measuring conversational quality, helpfulness, and natural nuance across 1M+ pairwise battles.",
      scale: "ELO Points (Higher is better, Baseline ~1200)",
      accent: "text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-50 dark:bg-amber-500/10",
    },
    code: {
      name: "HumanEval (Python Code Gen)",
      desc: "Evaluates zero-shot functional correctness (pass@1) on 164 challenging programming and algorithmic tasks.",
      scale: "Accuracy percentage (0% - 100%)",
      accent: "text-sky-600 dark:text-sky-400 border-sky-500/20 bg-sky-50 dark:bg-sky-500/10",
    },
    math: {
      name: "MATH 500 (Competition Mathematics)",
      desc: "Challenging multi-step competition-level STEM problems across algebra, calculus, number theory, and discrete geometry.",
      scale: "Accuracy percentage (0% - 100%)",
      accent: "text-purple-600 dark:text-purple-400 border-purple-500/20 bg-purple-50 dark:bg-purple-500/10",
    },
    mmlu: {
      name: "MMLU (Multitask Language Understanding)",
      desc: "Comprehensive benchmark evaluating knowledge across 57 academic subjects from humanities to graduate engineering.",
      scale: "Accuracy percentage (0% - 100%)",
      accent: "text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10",
    },
    gpqa: {
      name: "GPQA (Google-Proof Graduate Q&A)",
      desc: "PhD-level biology, physics, and chemistry questions vetted by discipline experts to be unsolvable by simple search.",
      scale: "Accuracy percentage (0% - 100%)",
      accent: "text-rose-600 dark:text-rose-400 border-rose-500/20 bg-rose-50 dark:bg-rose-500/10",
    },
  };

  const sortedEntries = [...entries].sort((a, b) => {
    if (activeTab === "arena") return b.arenaElo - a.arenaElo;
    if (activeTab === "code") return b.humanEval - a.humanEval;
    if (activeTab === "math") return b.math - a.math;
    if (activeTab === "mmlu") return b.mmlu - a.mmlu;
    if (activeTab === "gpqa") return b.gpqa - a.gpqa;
    return 0;
  });

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Trophy className="h-4 w-4 text-amber-500" />;
    if (rank === 2) return <Medal className="h-4 w-4 text-slate-400" />;
    if (rank === 3) return <Award className="h-4 w-4 text-amber-700" />;
    return <span className="font-mono text-slate-400 dark:text-slate-500 font-bold">#{rank}</span>;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-r from-amber-50 dark:from-amber-950/30 via-white dark:via-slate-900/60 to-slate-50 dark:to-slate-950 p-6 sm:p-10 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
            <Trophy className="h-3.5 w-3.5" />
            <span>Verifiable Benchmarks</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Model Benchmark Leaderboard
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Consolidated evaluations across LMSYS Chatbot Arena ELO ratings, HumanEval coding benchmarks, MATH 500 competitive STEM reasoning, and MMLU general intelligence.
          </p>
        </div>
      </div>

      {/* Domain Category Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("arena")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "arena"
              ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
              : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
          }`}
        >
          <Trophy className="h-3.5 w-3.5" />
          <span>Chatbot Arena ELO</span>
        </button>

        <button
          onClick={() => setActiveTab("code")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "code"
              ? "bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20"
              : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
          }`}
        >
          <Code className="h-3.5 w-3.5" />
          <span>Coding (HumanEval)</span>
        </button>

        <button
          onClick={() => setActiveTab("math")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "math"
              ? "bg-purple-500 text-white font-bold shadow-md shadow-purple-500/20"
              : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
          }`}
        >
          <Calculator className="h-3.5 w-3.5" />
          <span>STEM & Math (MATH 500)</span>
        </button>

        <button
          onClick={() => setActiveTab("mmlu")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "mmlu"
              ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
              : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
          }`}
        >
          <Brain className="h-3.5 w-3.5" />
          <span>General Knowledge (MMLU)</span>
        </button>

        <button
          onClick={() => setActiveTab("gpqa")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "gpqa"
              ? "bg-rose-500 text-white font-bold shadow-md shadow-rose-500/20"
              : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
          }`}
        >
          <Microscope className="h-3.5 w-3.5" />
          <span>Graduate Science (GPQA)</span>
        </button>
      </div>

      {/* Active Metric Description Card */}
      <div className={`rounded-2xl border p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm ${benchmarkDescriptions[activeTab].accent}`}>
        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <span>{benchmarkDescriptions[activeTab].name}</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {benchmarkDescriptions[activeTab].desc}
          </p>
        </div>
        <div className="shrink-0 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-right font-mono text-xs">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-sans">Evaluation Metric</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">{benchmarkDescriptions[activeTab].scale}</span>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-4 w-16 text-center">Rank</th>
              <th className="py-4 px-4">Model & Organization</th>
              <th className="py-4 px-3 text-right">Arena ELO</th>
              <th className="py-4 px-3 text-right">HumanEval</th>
              <th className="py-4 px-3 text-right">MATH 500</th>
              <th className="py-4 px-3 text-right">MMLU</th>
              <th className="py-4 px-3 text-right">GPQA</th>
              <th className="py-4 px-3 text-right">Blended $/1M</th>
              <th className="py-4 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
            {sortedEntries.map((entry, index) => {
              const fullModel = MODELS.find((m) => m.slug === entry.slug);
              const isSelected = fullModel ? isModelSelected(fullModel.id) : false;

              return (
                <tr
                  key={entry.modelId}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${
                    index < 3 ? "bg-amber-500/[0.04] dark:bg-amber-500/[0.02]" : ""
                  }`}
                >
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center">
                      {getRankBadge(index + 1)}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <Link
                      href={`/models/${entry.slug}`}
                      className="font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      {entry.modelName}
                    </Link>
                    <div className="text-[11px] text-slate-500">
                      {entry.organization} • {entry.license}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono font-extrabold text-amber-600 dark:text-amber-300 text-sm">
                    {entry.arenaElo}
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono font-medium text-slate-700 dark:text-slate-200">
                    <span className={activeTab === "code" ? "text-sky-600 dark:text-sky-400 font-bold" : ""}>
                      {entry.humanEval}%
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono font-medium text-slate-700 dark:text-slate-200">
                    <span className={activeTab === "math" ? "text-purple-600 dark:text-purple-400 font-bold" : ""}>
                      {entry.math}%
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono font-medium text-slate-700 dark:text-slate-200">
                    <span className={activeTab === "mmlu" ? "text-emerald-600 dark:text-emerald-400 font-bold" : ""}>
                      {entry.mmlu}%
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono font-medium text-slate-700 dark:text-slate-200">
                    <span className={activeTab === "gpqa" ? "text-rose-600 dark:text-rose-400 font-bold" : ""}>
                      {entry.gpqa}%
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono text-slate-600 dark:text-slate-300">
                    ${entry.inputCost.toFixed(2)} / ${entry.outputCost.toFixed(2)}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {fullModel && (
                        <button
                          onClick={() => toggleModel(fullModel)}
                          className={`p-1.5 rounded-lg text-xs transition-colors ${
                            isSelected
                              ? "bg-sky-500 text-white"
                              : "border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500"
                          }`}
                          title="Toggle Compare"
                        >
                          {isSelected ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                        </button>
                      )}
                      <Link
                        href={`/models/${entry.slug}`}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 hover:text-black dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700"
                        title="View specifications"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Benchmark Methodology Note */}
      <div className="flex items-start gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800/60">
        <Info className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
        <span>
          Benchmark scores represent peer-reviewed evaluations collected from official research papers and the LMSYS Chatbot Arena repository. Distinct evaluation benchmarks measure orthogonal cognitive dimensions and should not be directly aggregated.
        </span>
      </div>
    </div>
  );
}
