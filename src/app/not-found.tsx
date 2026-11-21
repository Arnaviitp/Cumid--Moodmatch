import Link from "next/link";
import { Sparkles, ArrowLeft, Search, SlidersHorizontal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-8 sm:p-10 shadow-2xl backdrop-blur-md">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-500">
          <Search className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
            404 — Not Found
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Resource or Model Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The requested foundation model, inference provider, or benchmark dataset does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-sky-500 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Browse Catalog</span>
          </Link>
          <Link
            href="/compare"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 transition-all"
          >
            <SlidersHorizontal className="h-4 w-4 text-sky-500" />
            <span>Compare Models</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
