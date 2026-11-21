"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Caught in error boundary:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center space-y-4">
      <div className="h-12 w-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h2 className="text-xl font-bold text-white tracking-tight">
        Something went wrong
      </h2>
      <p className="text-xs text-slate-400 leading-relaxed">
        An unexpected error occurred while rendering this interface.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-500 transition-colors"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        <span>Try Again</span>
      </button>
    </div>
  );
}
