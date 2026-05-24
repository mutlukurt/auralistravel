"use client";

import { motion } from "framer-motion";
import type { Feature } from "@/lib/data";

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <motion.article
      className={`group rounded-[1.75rem] border bg-white p-7 transition ${
        feature.highlighted
          ? "border-auralis-orange/20 shadow-soft"
          : "border-auralis-border shadow-sm"
      }`}
      whileHover={{ y: -8 }}
    >
      <motion.span
        className="mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-auralis-peach text-auralis-orange"
        whileHover={{ y: -3 }}
      >
        <feature.icon className="h-7 w-7" aria-hidden />
      </motion.span>
      <h3 className="font-heading text-xl font-extrabold text-auralis-dark">{feature.title}</h3>
      <p className="mt-3 text-sm leading-7 text-auralis-muted">{feature.description}</p>
    </motion.article>
  );
}
