import { useContext } from "react";
import { SkipContext } from "../providers/skip-provider";

export function useSkip() {
  const context = useContext(SkipContext);
  if (!context) {
    throw new Error("useSkip must be used within a SkipProvider");
  }
  return context;
}
