"use client";

import { motion } from "framer-motion";
import { useSkip } from "../hooks/useSkip";

export default function Toggle() {
  const { viewMode, setViewMode } = useSkip();
  const isOn = viewMode === "tinder";

  const toggleSwitch = () => setViewMode(isOn ? "grid" : "tinder");

  return (
    <div className="flex items-center justify-center py-4 gap-3">
      <span className="text-sm font-medium">Boring View 📊</span>
      <button
        className="toggle-container"
        style={{
          ...container,
          backgroundColor: isOn ? "#facc15" : "#e2e8f0",
          justifyContent: isOn ? "flex-end" : "flex-start",
        }}
        onClick={toggleSwitch}
        aria-label={`Switch to ${isOn ? "boring" : "spicy"} view`}
      >
        <motion.div
          className="toggle-handle"
          style={handle}
          layout
          transition={{
            type: "spring",
            duration: 0.2,
            bounce: 0.2,
          }}
        />
      </button>
      <span className="text-sm font-medium">Spicy View 🔥</span>
    </div>
  );
}

const container = {
  width: 60,
  height: 30,
  borderRadius: 15,
  cursor: "pointer",
  display: "flex",
  padding: 3,
  border: "1px solid #cbd5e1",
};

const handle = {
  width: 24,
  height: 24,
  backgroundColor: "#ffffff",
  borderRadius: "50%",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
};
