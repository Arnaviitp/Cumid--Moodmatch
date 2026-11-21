"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchProviders } from "@/lib/api";
import { Provider } from "@/types";
import { ORGANIZATIONS, MODELS } from "@/data/mockData";
import {
  Building2,
  Server,
  Zap,
  ShieldCheck,
  Globe,
  ExternalLink,
  Cpu,
  Activity,
  Layers,
} from "lucide-react";

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchProviders();
      setProviders(data);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 dark:from-slate-900 via-white dark:via-slate-950 to-slate-50 dark:to-slate-900 p-6 sm:p-10 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600 dark:text-sky-400">
            <Building2 className="h-3.5 w-3.5" />
            <span>Ecosystem Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Labs & Inference Providers
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Explore foundation model creators and high-performance inference hosting infrastructure with real-time throughput metrics, uptime SLAs, and region availability.
          </p>
        </div>
      </div>

      {/* Section 1: AI Research Labs & Companies */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Cpu className="h-5 w-5 text-sky-500" />
            AI Companies & Frontier Research Labs
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pioneering organizations building state-of-the-art foundation weights and proprietary frontier models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ORGANIZATIONS.map((org) => {
            const orgModels = MODELS.filter((m) => m.organization.slug === org.slug);
            return (
              <div
                key={org.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/80 transition-all flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                      {org.country}
                    </span>
                    <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-600 dark:text-slate-400">
                      {orgModels.length} Models
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                      {org.name}
                    </h3>
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 inline-flex items-center gap-1 mt-0.5 transition-colors"
                    >
                      <span>{org.website.replace("https://", "")}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  {/* Sample models */}
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500">
                      Featured Releases
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {orgModels.map((m) => (
                        <Link
                          key={m.id}
                          href={`/models/${m.slug}`}
                          className="rounded bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                          {m.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800/60">
                  <Link
                    href={`/?org=${org.slug}`}
                    className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 flex items-center gap-1"
                  >
                    <span>View all {org.name} models</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 2: Inference Hosting Providers */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Server className="h-5 w-5 text-emerald-500" />
            Inference Providers & GPU Cloud Runtimes
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            High-speed token delivery infrastructure, custom silicon (LPU), and enterprise serverless platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((p) => (
            <div
              key={p.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {p.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {p.uptimePercent}% SLA
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {p.description}
                </p>

                {/* Telemetry Stats */}
                <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 p-3 border border-slate-200 dark:border-slate-800/80">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">
                      Avg Throughput
                    </div>
                    <div className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {p.avgThroughputTps} tokens/s
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">
                      Avg TTFT Latency
                    </div>
                    <div className="text-sm font-bold font-mono text-sky-600 dark:text-sky-400 mt-0.5">
                      {p.avgLatencyMs} ms
                    </div>
                  </div>
                </div>

                {/* Features & Regions */}
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {p.features.map((feat) => (
                      <span
                        key={feat}
                        className="rounded-md bg-slate-100 dark:bg-slate-800/70 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                    <Globe className="h-3.5 w-3.5 text-slate-400" />
                    <span>Regions: {p.regions.join(", ")}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-xs">
                <a
                  href={p.website}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-slate-600 hover:text-black dark:text-slate-300 dark:hover:text-white flex items-center gap-1"
                >
                  <span>Provider Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <span className="font-mono text-slate-400 dark:text-slate-500 text-[11px]">
                  {p.hostedModelCount} models hosted
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
