"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Model } from "@/types";
import { MODELS } from "@/data/mockData";
import { useToast } from "@/context/ToastContext";

interface CompareContextType {
  selectedModels: Model[];
  addModel: (model: Model) => void;
  removeModel: (modelId: string) => void;
  toggleModel: (model: Model) => void;
  clearModels: () => void;
  isModelSelected: (modelId: string) => boolean;
  setModelsBySlugs: (slugs: string[]) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selectedModels, setSelectedModels] = useState<Model[]>([]);
  const { showToast } = useToast();

  // Initialize from default models for instant demo value
  useEffect(() => {
    // Check if URL has ?models=slug1,slug2
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlModels = params.get("models");
      if (urlModels) {
        const slugs = urlModels.split(",").map((s) => s.trim());
        const matched = slugs
          .map((s) => MODELS.find((m) => m.slug === s || m.id === s))
          .filter(Boolean) as Model[];
        if (matched.length > 0) {
          setSelectedModels(matched.slice(0, 4));
          return;
        }
      }
    }

    const defaultSelection = [
      MODELS.find((m) => m.slug === "claude-3-5-sonnet") || MODELS[0],
      MODELS.find((m) => m.slug === "deepseek-r1") || MODELS[2],
    ].filter(Boolean) as Model[];
    setSelectedModels(defaultSelection);
  }, []);

  const addModel = (model: Model) => {
    if (selectedModels.length >= 4) {
      showToast("Comparison limit reached (max 4 models).", "warning");
      return;
    }
    if (!selectedModels.some((m) => m.id === model.id)) {
      setSelectedModels((prev) => [...prev, model]);
      showToast(`Added ${model.name} to comparison.`, "success");
    }
  };

  const removeModel = (modelId: string) => {
    const model = selectedModels.find((m) => m.id === modelId);
    setSelectedModels((prev) => prev.filter((m) => m.id !== modelId));
    if (model) {
      showToast(`Removed ${model.name} from comparison.`, "info");
    }
  };

  const toggleModel = (model: Model) => {
    if (selectedModels.some((m) => m.id === model.id)) {
      removeModel(model.id);
    } else {
      addModel(model);
    }
  };

  const clearModels = () => {
    setSelectedModels([]);
    showToast("Cleared comparison list.", "info");
  };

  const isModelSelected = (modelId: string) => {
    return selectedModels.some((m) => m.id === modelId);
  };

  const setModelsBySlugs = (slugs: string[]) => {
    const matched = slugs
      .map((s) => MODELS.find((m) => m.slug === s || m.id === s))
      .filter(Boolean) as Model[];
    setSelectedModels(matched.slice(0, 4));
  };

  return (
    <CompareContext.Provider
      value={{
        selectedModels,
        addModel,
        removeModel,
        toggleModel,
        clearModels,
        isModelSelected,
        setModelsBySlugs,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
