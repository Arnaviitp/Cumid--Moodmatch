"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MODELS } from "@/data/mockData";
import {
  Calculator,
  TrendingDown,
  Users,
  Info,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function CalculatorPage() {
  const [dau, setDau] = useState<number>(1000);
  const [requestsPerUser, setRequestsPerUser] = useState<number>(5);
  const [promptTokens, setPromptTokens] = useState<number>(800);
  const [completionTokens, setCompletionTokens] = useState<number>(400);
  const [cacheHitPercent, setCacheHitPercent] = useState<number>(20);

  // Computed traffic
  const dailyRequests = dau * requestsPerUser;
  const monthlyRequests = dailyRequests * 30;

  const dailyPromptTokens = (dailyRequests * promptTokens) / 1000000; // in Millions
  const dailyCompletionTokens = (dailyRequests * completionTokens) / 1000000;

  const totalMonthlyPromptTokens = (monthlyRequests * promptTokens) / 1000000; // in Millions
  const totalMonthlyCompletionTokens = (monthlyRequests * completionTokens) / 1000000; // in Millions

  // Calculate costs per model
  const modelEstimates = MODELS.map((model) => {
    const cachedTokens = totalMonthlyPromptTokens * (cacheHitPercent / 100);
    const nonCachedTokens = totalMonthlyPromptTokens - cachedTokens;

    const cachedRate =
      model.pricing.cachedInputPerMillion ?? model.pricing.inputPerMillion;

    const monthlyPromptCost =
      nonCachedTokens * model.pricing.inputPerMillion +
      cachedTokens * cachedRate;

    const baselinePromptCostWithoutCache =
      totalMonthlyPromptTokens * model.pricing.inputPerMillion;

    const monthlyCompletionCost =
      totalMonthlyCompletionTokens * model.pricing.outputPerMillion;

    const monthlyTotal = monthlyPromptCost + monthlyCompletionCost;
    const dailyTotal = monthlyTotal / 30;
    const annualTotal = monthlyTotal * 12;

    const monthlySavingsFromCache = baselinePromptCostWithoutCache - monthlyPromptCost;

    return {
      model,
      dailyTotal,
      monthlyTotal,
      annualTotal,
      monthlyPromptCost,
      monthlyCompletionCost,
      monthlySavingsFromCache,
    };
  }).sort((a, b) => a.monthlyTotal - b.monthlyTotal);

  const cheapest = modelEstimates[0];
  const mostExpensive = modelEstimates[modelEstimates.length - 1];
  const maxSavings = mostExpensive.monthlyTotal - cheapest.monthlyTotal;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-50 dark:from-emerald-950/30 via-white dark:via-slate-900/60 to-slate-50 dark:to-slate-950 p-6 sm:p-10 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <Calculator className="h-3.5 w-3.5" />
            <span>Interactive Token Economics</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Inference Cost & Budget Calculator
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Project real cloud inference expenditures across model families based on user concurrency, prompt lengths, completion targets, and prompt caching efficiencies.
          </p>
        </div>
      </div>

      {/* Main Sliders Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-sky-500" />
            Traffic & Token Parameters
          </h2>

          {/* DAU */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">Daily Active Users (DAU):</span>
              <span className="font-mono text-sky-600 dark:text-sky-400">{dau.toLocaleString()} users</span>
            </div>
            <input
              type="range"
              min="100"
              max="20000"
              step="100"
              value={dau}
              onChange={(e) => setDau(parseInt(e.target.value, 10))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>

          {/* Requests per user */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">Requests / User / Day:</span>
              <span className="font-mono text-sky-600 dark:text-sky-400">{requestsPerUser} calls</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={requestsPerUser}
              onChange={(e) => setRequestsPerUser(parseInt(e.target.value, 10))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>

          {/* Prompt tokens */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">Prompt Tokens / Request:</span>
              <span className="font-mono text-sky-600 dark:text-sky-400">{promptTokens.toLocaleString()} tokens</span>
            </div>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={promptTokens}
              onChange={(e) => setPromptTokens(parseInt(e.target.value, 10))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>

          {/* Completion tokens */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">Completion Tokens / Request:</span>
              <span className="font-mono text-sky-600 dark:text-sky-400">{completionTokens.toLocaleString()} tokens</span>
            </div>
            <input
              type="range"
              min="50"
              max="4000"
              step="50"
              value={completionTokens}
              onChange={(e) => setCompletionTokens(parseInt(e.target.value, 10))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>

          {/* Cache Hit % */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">Prompt Cache Hit Ratio:</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">{cacheHitPercent}% cached</span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="5"
              value={cacheHitPercent}
              onChange={(e) => setCacheHitPercent(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Workload Breakdown */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1.5 font-mono">
            <div className="text-[11px] font-sans uppercase font-bold text-slate-400 dark:text-slate-500 mb-1">
              Derived Scale
            </div>
            <div className="flex justify-between">
              <span>Daily Requests:</span>
              <span className="text-slate-800 dark:text-slate-200">{dailyRequests.toLocaleString()} reqs</span>
            </div>
            <div className="flex justify-between">
              <span>Monthly Volume:</span>
              <span className="text-slate-800 dark:text-slate-200 font-bold">{monthlyRequests.toLocaleString()} reqs</span>
            </div>
            <div className="flex justify-between">
              <span>Monthly Prompts:</span>
              <span className="text-slate-800 dark:text-slate-200">{totalMonthlyPromptTokens.toFixed(2)}M tokens</span>
            </div>
            <div className="flex justify-between">
              <span>Monthly Output:</span>
              <span className="text-slate-800 dark:text-slate-200">{totalMonthlyCompletionTokens.toFixed(2)}M tokens</span>
            </div>
          </div>
        </div>

        {/* Results & Comparison List */}
        <div className="lg:col-span-2 space-y-5">
          {/* Executive Insight Banner */}
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/20 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center justify-center sm:justify-start gap-1.5">
                <TrendingDown className="h-4 w-4" /> Optimization Opportunity
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                You can save up to <strong className="text-emerald-600 dark:text-emerald-400">${maxSavings.toFixed(2)}/mo</strong> by choosing <strong>{cheapest.model.name}</strong> over {mostExpensive.model.name}.
              </p>
            </div>
            <div className="shrink-0 font-mono text-center sm:text-right">
              <div className="text-xs text-slate-500 dark:text-slate-400">Lowest Monthly Spend</div>
              <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">${cheapest.monthlyTotal.toFixed(2)}</div>
            </div>
          </div>

          {/* Model Breakdown List */}
          <div className="space-y-3">
            {modelEstimates.map((est, idx) => {
              const isBest = idx === 0;
              return (
                <div
                  key={est.model.id}
                  className={`rounded-2xl border p-4 sm:p-5 transition-all flex flex-col gap-4 ${
                    isBest
                      ? "border-emerald-500/80 bg-emerald-50/70 dark:bg-emerald-950/20 shadow-md shadow-emerald-500/10"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-slate-500">
                          {est.model.organization.name}
                        </span>
                        {isBest && (
                          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                            Lowest Cost
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/models/${est.model.slug}`}
                        className="text-base font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 flex items-center gap-1.5"
                      >
                        {est.model.name}
                      </Link>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                        ${est.monthlyTotal.toFixed(2)}
                        <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/mo</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        Daily: ${est.dailyTotal.toFixed(2)} • Annual: ${est.annualTotal.toFixed(0)}
                      </div>
                    </div>
                  </div>

                  {/* Sub-breakdown metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono">
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-950/60 p-2 border border-slate-200 dark:border-slate-800/80">
                      <span className="text-slate-500 block font-sans text-[10px]">Input Token Cost</span>
                      <span className="text-slate-800 dark:text-slate-200 font-bold">${est.monthlyPromptCost.toFixed(2)}</span>
                    </div>

                    <div className="rounded-lg bg-slate-50 dark:bg-slate-950/60 p-2 border border-slate-200 dark:border-slate-800/80">
                      <span className="text-slate-500 block font-sans text-[10px]">Output Token Cost</span>
                      <span className="text-slate-800 dark:text-slate-200 font-bold">${est.monthlyCompletionCost.toFixed(2)}</span>
                    </div>

                    <div className="col-span-2 sm:col-span-1 rounded-lg bg-slate-50 dark:bg-slate-950/60 p-2 border border-slate-200 dark:border-slate-800/80">
                      <span className="text-slate-500 block font-sans text-[10px]">Cache Savings</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        {est.monthlySavingsFromCache > 0 ? `-$${est.monthlySavingsFromCache.toFixed(2)}` : "$0.00"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-start gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800/60">
            <Info className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              Disclaimer: Projections represent mathematical simulations based on declared $/1M token price tiers and user assumptions. They do not constitute official provider billing or quotes.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
