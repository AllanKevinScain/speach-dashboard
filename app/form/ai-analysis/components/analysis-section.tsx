"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface AnalysisSectionProps {
  title: string;
  content: string;
  delay: number;
}

export function AnalysisSection({ title, content, delay }: AnalysisSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
        <p className="text-muted-foreground whitespace-pre-line">{content}</p>
      </Card>
    </motion.div>
  );
}