"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { aboutStats } from "@/lib/data";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";
import { StatsCard } from "./StatsCard";

export function AboutSection() {
  return (
    <section id="about" className="container-pad grid items-center gap-14 py-20 lg:grid-cols-2 lg:py-28">
      <motion.div
        className="relative mx-auto h-[430px] w-full max-w-[560px]"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        <motion.div className="absolute left-0 top-0 h-[330px] w-[58%] overflow-hidden rounded-[2.2rem] shadow-soft" variants={fadeUp}>
          <Image src="/images/about-venice.webp" alt="Canal city with gondola and warm European architecture" fill sizes="300px" className="object-cover" />
        </motion.div>
        <motion.div className="absolute right-8 top-8 h-44 w-52 overflow-hidden rounded-[2rem] shadow-soft" variants={fadeUp}>
          <Image src="/images/about-aerial-beach.webp" alt="Aerial view of turquoise beach and small boats" fill sizes="220px" className="object-cover" />
        </motion.div>
        <motion.div className="absolute bottom-0 left-[28%] h-56 w-[48%] overflow-hidden rounded-[2.1rem] shadow-soft" variants={fadeUp}>
          <Image src="/images/about-balloons.webp" alt="Hot air balloons floating above a rocky valley" fill sizes="280px" className="object-cover" />
        </motion.div>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
        <motion.div variants={fadeUp}>
          <SectionHeading
            eyebrow="About"
            title="We Recommend Beautiful Destinations Every Month"
            description="Our travel experts collect inspiring places, hidden beaches, iconic cities, and calm nature escapes so every trip feels personal."
          />
        </motion.div>
        <motion.div className="mt-9 grid gap-4 sm:grid-cols-3" variants={stagger}>
          {aboutStats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
