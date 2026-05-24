"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { heroStats } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/motion";
import { StatsCard } from "./StatsCard";

const heroImages = [
  {
    src: "/images/hero-balloon-desert.webp",
    alt: "Hot air balloons over a desert valley at sunrise",
    className: "col-span-5 row-span-5 rounded-[2rem]",
  },
  {
    src: "/images/hero-tropical-villa.webp",
    alt: "Overwater villas above turquoise sea",
    className: "col-span-5 col-start-6 row-span-5 row-start-2 rounded-[2rem]",
  },
  {
    src: "/images/hero-resort-bridge.webp",
    alt: "Wooden bridge through a tropical island resort",
    className: "col-span-5 row-span-4 row-start-6 rounded-[2rem]",
  },
  {
    src: "/images/hero-mountain-adventure.webp",
    alt: "Mountain hiker above snowy peaks",
    className: "col-span-4 col-start-7 row-span-4 row-start-7 rounded-[2rem]",
  },
];

export function ImageCollage() {
  return (
    <motion.div
      className="relative mx-auto grid h-[530px] w-full max-w-[620px] grid-cols-10 grid-rows-10 gap-4"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      {heroImages.map((image, index) => (
        <motion.div
          className={`group relative overflow-hidden shadow-soft ${image.className}`}
          key={image.src}
          variants={fadeUp}
          transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -8, scale: 1.015 }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 46vw, 280px"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </motion.div>
      ))}

      <motion.div
        className="absolute left-[33%] top-[23%] w-44"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <StatsCard {...heroStats[0]} />
      </motion.div>
      <motion.div
        className="absolute right-3 top-6 w-40"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <StatsCard {...heroStats[1]} />
      </motion.div>
    </motion.div>
  );
}
