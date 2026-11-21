"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { fetchModelBySlug } from "@/lib/api";
import { Model } from "@/types";
import { useCompare } from "@/context/CompareContext";
import {
  Sparkles,
  ArrowLeft,
  SlidersHorizontal,
  Check,
  Plus,
  ShieldCheck,
  Zap,
  Cpu,
  BarChart2,
  Copy,
  ExternalLink,
  Code,
  DollarSign,
  Activity,
  Layers,
} from "lucide-react";

export default function ModelDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [model, setModel] = useState<Model | null>(null);
  const [loading, setLoading] = useState(true);
  const [codeTab, setCodeTab] = useState<"ts" | "py" | "curl">("ts");
  const [copied, setCopied] = useState(false);

  // Model-level mini cost estimator
  const [promptTokens, setPromptTokens] = useState<number>(1000);
  const [completionTokens, setCompletionTokens] = useState<number>(500);
  const [requestCount, setRequestCount] = useState<number>(10000);

  const { toggleModel, isModelSelected } = useCompare();

  useEffect(() => {
    async function loadModel() {
      if (!slug) return;
      setLoading(true);
      const data = await fetchModelBySlug(slug);
      setModel(data);
      setLoading(false);
    }
    loadModel();
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 space-y-6 animate-pulse">
        <div className="h-6 w-32 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-12 w-64 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 rounded-xl bg-slate-100 dark:bg-slate-800/60" />
          ))}
        </div>
      </div>
    );
  }

  if (!model) {
    return notFound();
  }

  const selected = isModelSelected(model.id);

  // Cost calculation
  const totalPromptTokens = (promptTokens * requestCount) / 1000000;
  const totalCompletionTokens = (completionTokens * requestCount) / 1000000;
  const estimatedCost =
    totalPromptTokens * model.pricing.inputPerMillion +
    totalCompletionTokens * model.pricing.outputPerMillion;

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeSnippets = {
    ts: `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://oneatlas.dev/api/v1",
  apiKey: process.env.ONEATLAS_API_KEY,
});

const response = await client.chat.completions.create({
  model: "${model.id}",
  messages: [
    { role: "system", content: "You are an expert AI assistant." },
    { role: "user", content: "Explain quantum error correction in two sentences." }
  ],
  temperature: 0.7,
});

console.log(response.choices[0].message.content);`,

    py: `from openai import OpenAI
import os

client = OpenAI(
    base_url="https://oneatlas.dev/api/v1",
    api_key=os.environ.get("ONEATLAS_API_KEY")
)

response = client.chat.completions.create(
    model="${model.id}",
    messages=[
        {"role": "system", "content": "You are an expert AI assistant."},
        {"role": "user", "content": "Explain quantum error correction in two sentences."}
    ],
    temperature=0.7
)

print(response.choices[0].message.content)`,

    curl: `curl https://oneatlas.dev/api/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $ONEATLAS_API_KEY" \\
  -d '{
    "model": "${model.id}",
    "messages": [
      {"role": "user", "content": "Explain quantum error correction."}
    ]
  }'`,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Models</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleModel(model)}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
              selected
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                : "border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600"
            }`}
          >
            {selected ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Selected for Compare</span>
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" />
                <span>Add to Comparison</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/90 dark:to-slate-950 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                {model.organization.name}
              </span>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                {model.modelType}
              </span>
              <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                License: {model.architecture.license}
              </span>
              {model.capabilities.openWeights && (
                <span className="rounded-md bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Open Weights
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              {model.name}
              {model.featured && (
                <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-xs text-amber-600 dark:text-amber-300 font-semibold flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Flagship
                </span>
              )}
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {model.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {model.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-800 pt-4 sm:pt-0 sm:pl-8 gap-4">
            <div className="text-left sm:text-right">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                Release Date
              </div>
              <div className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {model.releaseDate}
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                Parameters
              </div>
              <div className="text-sm font-mono font-bold text-sky-600 dark:text-sky-400 mt-0.5">
                {model.architecture.parameters || "Undisclosed"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Context Window */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Context Window</span>
            <Layers className="h-4 w-4 text-sky-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            {model.contextWindow.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500">
            Max output: {model.maxOutputTokens.toLocaleString()} tokens
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-sky-500 h-1.5 rounded-full"
              style={{ width: `${Math.min(100, (model.contextWindow / 2000000) * 100)}%` }}
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Blended Pricing</span>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            ${model.pricing.inputPerMillion.toFixed(2)}
            <span className="text-xs font-normal text-slate-500"> / 1M in</span>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">
            ${model.pricing.outputPerMillion.toFixed(2)} / 1M out
          </div>
          {model.pricing.cachedInputPerMillion && (
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400/80 font-mono">
              Cached: ${model.pricing.cachedInputPerMillion.toFixed(2)}/1M
            </div>
          )}
        </div>

        {/* Benchmarks */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Chatbot Arena</span>
            <BarChart2 className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-300">
            {model.benchmarks.lmsysArenaElo || "N/A"}
          </div>
          <div className="text-xs text-slate-500">
            MMLU: {model.benchmarks.mmlu}% • HumanEval: {model.benchmarks.humanEval}%
          </div>
          <div className="text-[11px] text-amber-600 dark:text-amber-400/80 font-mono">
            MATH 500: {model.benchmarks.math}%
          </div>
        </div>

        {/* Latency & Speed */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Throughput</span>
            <Activity className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-purple-600 dark:text-purple-300">
            ~{model.latency.tokensPerSecond} tps
          </div>
          <div className="text-xs text-slate-500">
            Avg TTFT: {model.latency.ttftMs}ms
          </div>
          <div className="text-[11px] text-purple-600 dark:text-purple-400/80 font-mono">
            Fastest Route: Groq / Together
          </div>
        </div>
      </div>

      {/* Available Providers Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-sky-500" />
              Available Provider Routes & Health
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Compare hosting providers, throughput, latency SLAs, and per-token pricing for {model.name}.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Provider</th>
                <th className="py-3.5 px-3 text-right">Input / 1M</th>
                <th className="py-3.5 px-3 text-right">Output / 1M</th>
                <th className="py-3.5 px-3 text-right">Latency</th>
                <th className="py-3.5 px-3 text-right">Throughput</th>
                <th className="py-3.5 px-3 text-right">Context Limit</th>
                <th className="py-3.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {model.providers.map((p) => (
                <tr key={p.providerId} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-sans font-bold text-slate-800 dark:text-slate-200">
                    {p.providerName}
                  </td>
                  <td className="py-3 px-3 text-right text-sky-600 dark:text-sky-400 font-semibold">
                    ${p.inputPricePerMillion.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right text-sky-600 dark:text-sky-300 font-semibold">
                    ${p.outputPricePerMillion.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">
                    {p.latencyMs}ms
                  </td>
                  <td className="py-3 px-3 text-right text-emerald-600 dark:text-emerald-400 font-semibold">
                    {p.tokensPerSecond} tps
                  </td>
                  <td className="py-3 px-3 text-right text-slate-500 dark:text-slate-400">
                    {(p.contextLimit / 1000).toFixed(0)}k
                  </td>
                  <td className="py-3 px-4 text-center font-sans">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {p.uptimePercent}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive Token Cost Estimator for this Model */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-500" />
            Live Token Cost Estimator
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Simulate operational costs for {model.name} based on your anticipated prompt length, completion length, and request scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">Prompt Tokens / Request:</span>
              <span className="font-mono text-sky-600 dark:text-sky-400">{promptTokens.toLocaleString()} tokens</span>
            </div>
            <input
              type="range"
              min="100"
              max="20000"
              step="100"
              value={promptTokens}
              onChange={(e) => setPromptTokens(parseInt(e.target.value, 10))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">Output Tokens / Request:</span>
              <span className="font-mono text-sky-600 dark:text-sky-400">{completionTokens.toLocaleString()} tokens</span>
            </div>
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={completionTokens}
              onChange={(e) => setCompletionTokens(parseInt(e.target.value, 10))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">Total Requests / Month:</span>
              <span className="font-mono text-sky-600 dark:text-sky-400">{requestCount.toLocaleString()} calls</span>
            </div>
            <input
              type="range"
              min="1000"
              max="500000"
              step="5000"
              value={requestCount}
              onChange={(e) => setRequestCount(parseInt(e.target.value, 10))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Output Calculation Banner */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
              Estimated Monthly Cost
            </div>
            <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
              ${estimatedCost.toFixed(2)}{" "}
              <span className="text-xs font-normal text-slate-500">USD / mo</span>
            </div>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 text-left sm:text-right space-y-1 font-mono">
            <div>Input: {totalPromptTokens.toFixed(2)}M tokens (${(totalPromptTokens * model.pricing.inputPerMillion).toFixed(2)})</div>
            <div>Output: {totalCompletionTokens.toFixed(2)}M tokens (${(totalCompletionTokens * model.pricing.outputPerMillion).toFixed(2)})</div>
          </div>
        </div>
      </section>

      {/* Developer API Quickstart */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Code className="h-5 w-5 text-sky-500" />
              API Quickstart & SDK Integration
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Drop-in OpenAI SDK compatible code snippets for {model.name}.
            </p>
          </div>

          <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-1">
            <button
              onClick={() => setCodeTab("ts")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                codeTab === "ts" ? "bg-sky-500 text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
              }`}
            >
              TypeScript
            </button>
            <button
              onClick={() => setCodeTab("py")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                codeTab === "py" ? "bg-sky-500 text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Python
            </button>
            <button
              onClick={() => setCodeTab("curl")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                codeTab === "curl" ? "bg-sky-500 text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
              }`}
            >
              cURL
            </button>
          </div>
        </div>

        <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-300 overflow-x-auto shadow-inner">
          <button
            onClick={() => copyCode(codeSnippets[codeTab])}
            className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-sans font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-all shadow-sm"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy Code</span>
              </>
            )}
          </button>
          <pre className="pr-20 leading-relaxed text-slate-300">{codeSnippets[codeTab]}</pre>
        </div>
      </section>
    </div>
  );
}
