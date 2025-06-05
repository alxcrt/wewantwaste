import { Button } from "@/components/ui/button";
import { useSkip } from "@/hooks/useSkip";
import { cn, formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

export default function SelectSkipBanner() {
  const { selectedSkip, viewMode } = useSkip();

  if (!selectedSkip) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className={cn(
          "bottom-0 left-0 right-0 bg-neutral-50 z-50 border-2 border-gray-200 p-4 block",
          viewMode === "grid" ? "fixed" : "absolute"
        )}
        style={{
          display: selectedSkip ? "block" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-neutral-500 text-center mb-4 leading-tight">
            Imagery and information shown throughout this website may not
            reflect the exact shape or size specification, colours may vary,
            options and/or accessories may be featured at additional cost.
          </p>
          <div className="flex justify-between items-center flex-col md:flex-row gap-4 md:gap-0">
            <div className="flex flex-row justify-between items-center gap-4 w-full md:justify-start">
              <p>{selectedSkip.size} Yard Skip</p>
              <div className="flex flex-row gap-2 justify-end items-center">
                <p className="text-2xl font-bold text-primary">
                  {formatPrice(selectedSkip.price_before_vat ?? 0)}
                </p>
                <p className="text-sm text-neutral-500">
                  {selectedSkip.hire_period_days} days
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-2 w-full">
              <Button className="flex-1">Back</Button>
              <Button className="flex-1 bg-primary">Continue</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
