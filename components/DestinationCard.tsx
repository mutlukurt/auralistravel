"use client";

import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, MapPin, ShoppingBag, Star, UsersRound } from "lucide-react";
import Image from "next/image";
import type { Destination } from "@/lib/data";

interface DestinationCardProps {
  destination: Destination;
  matchLabel?: string;
  onAddToCart?: (destination: Destination) => void;
}

export function DestinationCard({ destination, matchLabel, onAddToCart }: DestinationCardProps) {
  return (
    <motion.article
      className="group overflow-hidden rounded-[1.5rem] border border-auralis-border bg-white p-3 shadow-sm transition hover:shadow-soft"
      whileHover={{ y: -8 }}
    >
      <div className="relative aspect-[1.38] overflow-hidden rounded-[1.2rem]">
        <Image
          src={destination.image}
          alt={destination.alt}
          fill
          sizes="(max-width: 768px) 92vw, (max-width: 1024px) 45vw, 360px"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-extrabold text-auralis-dark shadow-sm backdrop-blur">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" aria-hidden />
          {destination.rating}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-heading text-xl font-extrabold text-auralis-dark">
              {destination.name}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-auralis-muted">
              <MapPin className="h-4 w-4 shrink-0 text-auralis-orange" aria-hidden />
              <span>{destination.place}</span>
            </p>
          </div>
          <div className="shrink-0 rounded-xl border border-auralis-orange/25 bg-auralis-peach px-4 py-2 text-sm font-extrabold text-auralis-orange">
            {destination.price}
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-auralis-muted">{destination.summary}</p>
        <div className="mt-4 grid gap-2 rounded-2xl bg-auralis-soft p-4 text-sm font-semibold text-auralis-dark">
          <span className="flex items-center gap-2">
            <UsersRound className="h-4 w-4 text-auralis-orange" aria-hidden />
            {destination.bestFor}
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-auralis-orange" aria-hidden />
            {destination.duration} · Best {destination.season}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {destination.includes.map((item) => (
            <span
              className="inline-flex items-center gap-1 rounded-full border border-auralis-border bg-white px-3 py-1.5 text-xs font-bold text-auralis-muted"
              key={item}
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-auralis-orange" aria-hidden />
              {item}
            </span>
          ))}
        </div>
        {matchLabel ? (
          <div className="mt-4 rounded-2xl border border-auralis-orange/20 bg-auralis-peach px-4 py-3 text-xs font-extrabold text-auralis-orange">
            {matchLabel}
          </div>
        ) : null}
        {onAddToCart ? (
          <button
            className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-auralis-orange px-5 py-3 text-sm font-extrabold text-white shadow-glow transition hover:-translate-y-0.5"
            type="button"
            onClick={() => onAddToCart(destination)}
          >
            <ShoppingBag className="h-4 w-4" aria-hidden />
            Add to Cart
          </button>
        ) : null}
      </div>
    </motion.article>
  );
}
