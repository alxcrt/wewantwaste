import React, { createContext, useCallback, useState, useEffect } from "react";
import type { Skip } from "@/lib/utils";

type SkipContextType = {
  skips: Skip[];
  selectedSkip: Skip | null;
  selectSkip: (skip: Skip | null) => void;
  setSkips: (skips: Skip[]) => void;
  viewMode: "grid" | "tinder";
  setViewMode: (mode: "grid" | "tinder") => void;
};

const SkipContext = createContext<SkipContextType | undefined>(undefined);

const SkipProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [skips, _setSkips] = useState<Skip[]>([]);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(() => {
    const savedSkip = localStorage.getItem("selectedSkip");
    return savedSkip ? JSON.parse(savedSkip) : null;
  });
  const [viewMode, setViewMode] = useState<"grid" | "tinder">("tinder");

  const selectSkip = useCallback((skip: Skip | null) => {
    setSelectedSkip(skip);
    if (skip) {
      localStorage.setItem("selectedSkip", JSON.stringify(skip));
    } else {
      localStorage.removeItem("selectedSkip");
    }
  }, []);

  const setSkips = useCallback((skips: Skip[]) => {
    _setSkips(skips);
  }, []);

  // Update selectedSkip reference when skips change
  useEffect(() => {
    if (selectedSkip && skips.length > 0) {
      const updatedSkip = skips.find((skip) => skip.id === selectedSkip.id);
      if (updatedSkip) {
        selectSkip(updatedSkip);
      }
    }
  }, [skips, selectedSkip, selectSkip]);

  return (
    <SkipContext.Provider
      value={{
        skips,
        selectedSkip,
        selectSkip,
        setSkips,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </SkipContext.Provider>
  );
};

export { SkipProvider, SkipContext };
