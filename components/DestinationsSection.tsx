"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarDays, CreditCard, MapPin, ShoppingBag, UsersRound, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { destinationFilters, destinations } from "@/lib/data";
import type { Destination } from "@/lib/data";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { DestinationCard } from "./DestinationCard";
import { SearchBar } from "./SearchBar";
import { SectionHeading } from "./SectionHeading";

interface TravelSearch {
  Location?: string;
  Person?: string;
  "Travel Date"?: string;
  "Check In"?: string;
  "Check Out"?: string;
  travelers?: number;
}

interface CartItem {
  destination: Destination;
  search: TravelSearch;
  nights: number;
  rooms: number;
  total: number;
}

function parsePrice(price: string) {
  return Number(price.replace(/[^0-9]/g, "")) || 0;
}

function getNights(search: TravelSearch, destination: Destination) {
  const checkIn = search["Check In"] || search["Travel Date"];
  const checkOut = search["Check Out"];

  if (checkIn && checkOut) {
    const start = new Date(`${checkIn}T12:00:00`);
    const end = new Date(`${checkOut}T12:00:00`);
    const diff = Math.round((end.getTime() - start.getTime()) / 86_400_000);
    return Math.max(diff, 1);
  }

  const match = destination.duration.match(/\d+/);
  return match ? Number(match[0]) : 4;
}

function formatDate(value?: string) {
  if (!value) return "Flexible date";
  return new Date(`${value}T12:00:00`).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function matchesDestination(destination: Destination, location?: string) {
  if (!location) return true;
  const normalized = location.toLowerCase();
  const tokens = normalized
    .split(/[\s,]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 2);
  const haystack = [
    destination.name,
    destination.place,
    destination.summary,
    destination.bestFor,
    ...destination.includes,
    ...destination.searchTerms,
  ]
    .join(" ")
    .toLowerCase();

  return tokens.some((token) => haystack.includes(token));
}

export function DestinationsSection() {
  const [search, setSearch] = useState<TravelSearch>({});
  const [cartItem, setCartItem] = useState<CartItem | null>(null);

  useEffect(() => {
    const handleSearch = (event: Event) => {
      const detail = (event as CustomEvent<TravelSearch>).detail;
      setSearch(detail);
      document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    window.addEventListener("auralis-search", handleSearch);
    return () => window.removeEventListener("auralis-search", handleSearch);
  }, []);

  const matchedDestinations = useMemo(
    () => destinations.filter((destination) => matchesDestination(destination, search.Location)),
    [search.Location],
  );
  const visibleDestinations = matchedDestinations.length ? matchedDestinations : destinations;
  const travelers = search.travelers ?? Number(search.Person?.match(/\d+/)?.[0] ?? 2);
  const rooms = travelers > 2 ? 2 : 1;

  const addToCart = (destination: Destination) => {
    const nights = getNights(search, destination);
    setCartItem({
      destination,
      search,
      nights,
      rooms,
      total: parsePrice(destination.price) * nights * rooms,
    });
  };

  return (
    <section id="destinations" className="container-pad py-16 lg:py-24">
      <motion.div
        className="rounded-[2.5rem] bg-auralis-peach/55 px-5 py-12 sm:px-8 lg:px-12 lg:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <SectionHeading
            eyebrow="Top Destination"
            title="Let's Explore Your Dream Destination"
            description="Choose a place, pick your dates, and let curated travel ideas shape the beginning of a memorable escape."
            align="center"
          />
        </motion.div>
        <motion.div className="mx-auto mt-9 max-w-6xl" variants={fadeUp}>
          <SearchBar fields={destinationFilters} compact />
        </motion.div>
      </motion.div>

      {search.Location ? (
        <div className="mt-8 flex flex-col gap-3 rounded-[1.5rem] border border-auralis-orange/15 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-auralis-orange">
              Matched results
            </p>
            <h3 className="mt-1 font-heading text-xl font-extrabold text-auralis-dark">
              {matchedDestinations.length
                ? `${matchedDestinations.length} curated stay${matchedDestinations.length > 1 ? "s" : ""} for ${search.Location}`
                : `No exact stay for ${search.Location} yet`}
            </h3>
            <p className="mt-2 text-sm font-medium text-auralis-muted">
              {search.Person || `${travelers} travelers`} · {formatDate(search["Check In"] || search["Travel Date"])}
              {search["Check Out"] ? ` to ${formatDate(search["Check Out"])}` : " · flexible checkout"}
            </p>
          </div>
          {!matchedDestinations.length ? (
            <p className="max-w-md text-sm leading-7 text-auralis-muted">
              Showing the closest curated routes while our specialists prepare an exact match for
              your selected city.
            </p>
          ) : null}
        </div>
      ) : null}

      <motion.div
        className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        {visibleDestinations.map((destination) => (
          <motion.div key={destination.name} variants={fadeUp}>
            <DestinationCard
              destination={destination}
              matchLabel={
                search.Location
                  ? `${search.Location} · ${travelers} traveler${travelers > 1 ? "s" : ""} · ${getNights(search, destination)} nights`
                  : undefined
              }
              onAddToCart={addToCart}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10 flex justify-center">
        <motion.a
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-auralis-orange px-8 py-4 text-sm font-extrabold text-white shadow-glow"
          href="#footer"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
        >
          View More
          <ArrowRight className="h-4 w-4" aria-hidden />
        </motion.a>
      </div>
      <CheckoutModal item={cartItem} onClose={() => setCartItem(null)} />
    </section>
  );
}

function CheckoutModal({ item, onClose }: { item: CartItem | null; onClose: () => void }) {
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (item) setPaid(false);
  }, [item]);

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center bg-auralis-dark/35 px-4 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
        >
          <motion.div
            className="relative grid max-h-[92vh] w-full max-w-5xl overflow-auto rounded-[2rem] bg-white shadow-soft lg:grid-cols-[0.9fr_1.1fr]"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
          >
            <button
              className="focus-ring absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-auralis-dark shadow-sm"
              type="button"
              aria-label="Close checkout"
              onClick={onClose}
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            <div className="bg-auralis-peach p-7 sm:p-9">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-auralis-orange text-white shadow-glow">
                <ShoppingBag className="h-6 w-6" aria-hidden />
              </span>
              <h2 id="checkout-title" className="mt-6 font-heading text-3xl font-extrabold text-auralis-dark">
                Trip Cart
              </h2>
              <p className="mt-3 text-sm leading-7 text-auralis-muted">
                Review the selected destination, rooms, dates, travelers, and estimated frontend
                checkout total before continuing.
              </p>

              <div className="mt-7 rounded-[1.5rem] bg-white p-5 shadow-sm">
                <h3 className="font-heading text-xl font-extrabold text-auralis-dark">
                  {item.destination.name}
                </h3>
                <p className="mt-1 flex items-center gap-2 text-sm font-bold text-auralis-muted">
                  <MapPin className="h-4 w-4 text-auralis-orange" aria-hidden />
                  {item.destination.place}
                </p>
                <div className="mt-5 grid gap-3 text-sm font-semibold text-auralis-dark">
                  <span className="flex items-center gap-2">
                    <UsersRound className="h-4 w-4 text-auralis-orange" aria-hidden />
                    {item.search.Person || `${item.search.travelers ?? 2} travelers`} · {item.rooms} room
                    {item.rooms > 1 ? "s" : ""}
                  </span>
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-auralis-orange" aria-hidden />
                    {formatDate(item.search["Check In"] || item.search["Travel Date"])} · {item.nights} nights
                  </span>
                </div>
                <div className="mt-5 border-t border-auralis-border pt-5">
                  <div className="flex justify-between text-sm font-semibold text-auralis-muted">
                    <span>{item.destination.price} x {item.nights} nights x {item.rooms} room{item.rooms > 1 ? "s" : ""}</span>
                    <span>${item.total}</span>
                  </div>
                  <div className="mt-3 flex justify-between font-heading text-2xl font-extrabold text-auralis-dark">
                    <span>Total</span>
                    <span>${item.total}</span>
                  </div>
                </div>
              </div>
            </div>

            <form
              className="p-7 sm:p-9"
              onSubmit={(event) => {
                event.preventDefault();
                setPaid(true);
              }}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-auralis-peach text-auralis-orange">
                  <CreditCard className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-heading text-2xl font-extrabold text-auralis-dark">
                    Payment Details
                  </h3>
                  <p className="text-sm font-medium text-auralis-muted">Frontend-only checkout preview</p>
                </div>
              </div>

              <div className="mt-7 grid gap-4">
                <label className="grid gap-2 text-sm font-bold text-auralis-dark">
                  Full name
                  <input className="rounded-2xl border border-auralis-border px-4 py-3 outline-none focus:border-auralis-orange" placeholder="Mara Ellison" required />
                </label>
                <label className="grid gap-2 text-sm font-bold text-auralis-dark">
                  Email
                  <input className="rounded-2xl border border-auralis-border px-4 py-3 outline-none focus:border-auralis-orange" type="email" placeholder="you@example.com" required />
                </label>
                <label className="grid gap-2 text-sm font-bold text-auralis-dark">
                  Card number
                  <input className="rounded-2xl border border-auralis-border px-4 py-3 outline-none focus:border-auralis-orange" inputMode="numeric" placeholder="4242 4242 4242 4242" required />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-bold text-auralis-dark">
                    Expiry
                    <input className="rounded-2xl border border-auralis-border px-4 py-3 outline-none focus:border-auralis-orange" placeholder="08/28" required />
                  </label>
                  <label className="grid gap-2 text-sm font-bold text-auralis-dark">
                    CVC
                    <input className="rounded-2xl border border-auralis-border px-4 py-3 outline-none focus:border-auralis-orange" inputMode="numeric" placeholder="123" required />
                  </label>
                </div>
              </div>

              <button
                className="focus-ring mt-6 w-full rounded-2xl bg-auralis-orange px-6 py-4 text-sm font-extrabold text-white shadow-glow transition hover:-translate-y-0.5"
                type="submit"
              >
                Pay ${item.total}
              </button>

              {paid ? (
                <p className="mt-4 rounded-2xl bg-auralis-peach px-4 py-3 text-sm font-bold text-auralis-dark">
                  Payment screen completed. This is a frontend-only confirmation; no payment was processed.
                </p>
              ) : null}
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
