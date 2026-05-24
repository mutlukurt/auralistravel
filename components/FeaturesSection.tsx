"use client";

import { motion } from "framer-motion";
import { features } from "@/lib/data";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { FeatureCard } from "./FeatureCard";
import { SectionHeading } from "./SectionHeading";

export function FeaturesSection() {
  return (
    <section id="features" className="container-pad grid gap-10 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:py-24">
      <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
        <SectionHeading
          eyebrow="What We Give"
          title="Best Travel Features For You"
          description="Travel planning should feel inspiring and simple. Auralis brings thoughtful discovery, trusted people, and easy booking into one calm place."
        />
      </motion.div>
      <motion.div
        className="grid gap-5 sm:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        {features.map((feature) => (
          <motion.div key={feature.title} variants={fadeUp}>
            <FeatureCard feature={feature} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
