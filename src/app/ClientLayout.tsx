"use client";

import React, { useState, useEffect } from "react";
import { ToastProvider } from "@/context/ToastContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CompareProvider } from "@/context/CompareContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ComparisonDrawer } from "@/components/ComparisonDrawer";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global keyboard shortcut for Command Palette (⌘K on Mac, Ctrl+K on Windows/Linux)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ToastProvider>
      <ThemeProvider>
        <CompareProvider>
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-sky-500/30 selection:text-sky-800 dark:selection:text-sky-200 transition-colors duration-150">
            <Header onOpenSearch={() => setIsSearchOpen(true)} />
            <main className="flex-1">{children}</main>
            <ComparisonDrawer />
            <Footer />
            <CommandPalette
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
            />
          </div>
        </CompareProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}
