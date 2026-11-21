"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, XCircle, X } from "lucide-react";

export type ToastType = "success" | "info" | "warning" | "error";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        removeToast(id);
      }, 3500);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast viewport */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 rounded-xl border p-3.5 shadow-2xl backdrop-blur-md transition-all animate-slide-in ${
              toast.type === "success"
                ? "border-emerald-500/40 bg-slate-900/95 text-emerald-300 shadow-emerald-950/40"
                : toast.type === "warning"
                ? "border-amber-500/40 bg-slate-900/95 text-amber-300 shadow-amber-950/40"
                : toast.type === "error"
                ? "border-rose-500/40 bg-slate-900/95 text-rose-300 shadow-rose-950/40"
                : "border-sky-500/40 bg-slate-900/95 text-sky-300 shadow-sky-950/40"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === "success" && (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              )}
              {toast.type === "warning" && (
                <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
              )}
              {toast.type === "error" && (
                <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
              )}
              {toast.type === "info" && (
                <Info className="h-4 w-4 text-sky-400 shrink-0" />
              )}
              <span className="text-xs font-medium text-slate-200">
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
