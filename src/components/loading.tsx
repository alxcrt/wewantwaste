import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="flex space-x-3">
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className="w-3 h-3 bg-neutral-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: index * 0.1,
            }}
          />
        ))}
      </div>
      <p className="mt-4 font-semibold text-sm text-center">
        Please wait while we load your content...
      </p>
    </div>
  );
}
