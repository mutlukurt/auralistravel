"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { fadeUp, viewport } from "@/lib/motion";

interface AnimatedWrapperProps extends PropsWithChildren {
  className?: string;
  delay?: number;
}

export function AnimatedWrapper({
  children,
  className,
  delay = 0,
}: AnimatedWrapperProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeUp}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
