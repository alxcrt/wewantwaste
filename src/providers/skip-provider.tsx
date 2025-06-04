import React, { createContext, useCallback, useState } from "react";
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
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "tinder">("grid");

  const selectSkip = useCallback((skip: Skip | null) => {
    setSelectedSkip(skip);
  }, []);

  const setSkips = useCallback((skips: Skip[]) => {
    _setSkips(skips.sort((a, b) => b.size - a.size));
  }, []);

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
