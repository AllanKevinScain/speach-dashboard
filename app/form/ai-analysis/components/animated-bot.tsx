"use client";

import { Bot } from "lucide-react";
import { motion } from "framer-motion";

export function AnimatedBot() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"
    >
      <Bot className="w-8 h-8 text-primary" />
    </motion.div>
  );
}