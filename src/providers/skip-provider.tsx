import React, { createContext, useCallback, useState } from "react";
import type { Skip } from "../lib/utils";

type SkipContextType = {
  selectedSkip: Skip | null;
  selectSkip: (skip: Skip | null) => void;
};

const SkipContext = createContext<SkipContextType | undefined>(undefined);

const SkipProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  const selectSkip = useCallback((skip: Skip | null) => {
    setSelectedSkip(skip);
  }, []);

  return (
    <SkipContext.Provider
      value={{
        selectedSkip,
        selectSkip,
      }}
    >
      {children}
    </SkipContext.Provider>
  );
};

export { SkipProvider, SkipContext };
