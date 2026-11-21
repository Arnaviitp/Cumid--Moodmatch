import Link from "next/link";
import { Sparkles, Terminal, Activity, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/70 mt-20 text-slate-500 dark:text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">OneAtlas Intelligence</span>
            </div>
            <p className="text-slate-600 dark:text-slate-500 leading-relaxed">
              Open discovery, live pricing telemetry, and benchmark intelligence platform for modern AI foundation models.
            </p>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-[11px] pt-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Inference Router Operational (avg 180ms)</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 mb-3 uppercase tracking-wider text-[11px]">
              Platform
            </h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Model Catalog</Link></li>
              <li><Link href="/compare" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Model Comparison Matrix</Link></li>
              <li><Link href="/benchmarks" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Benchmark Leaderboard</Link></li>
              <li><Link href="/calculator" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Token Cost Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 mb-3 uppercase tracking-wider text-[11px]">
              Ecosystem
            </h4>
            <ul className="space-y-2">
              <li><Link href="/providers" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Labs & Provider Directory</Link></li>
              <li><a href="https://openrouter.ai" target="_blank" rel="noreferrer" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">OpenRouter Specs</a></li>
              <li><a href="https://routerplus.com" target="_blank" rel="noreferrer" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">RouterPlus Specs</a></li>
              <li><a href="https://www.litellm.ai" target="_blank" rel="noreferrer" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">LiteLLM Proxy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 mb-3 uppercase tracking-wider text-[11px]">
              Developer Hub
            </h4>
            <p className="text-slate-600 dark:text-slate-500 mb-3">
              Standardized OpenAI-compatible proxy interface with automated fallback & cost routing.
            </p>
            <div className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-2 font-mono text-[10px] text-sky-600 dark:text-sky-400 shadow-sm">
              <code>GET /api/models</code>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500">
            © {new Date().getFullYear()} OneAtlas Inc. Role 1 – Frontend Production MVP.
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-sky-500 dark:text-sky-400" />
              <span>Next.js 14 App Router + Tailwind</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
