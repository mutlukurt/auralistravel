"use client";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Minus,
  Plus,
  Search,
  UsersRound,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { LucideIcon } from "lucide-react";

export interface SearchField {
  label: string;
  value: string;
  icon?: LucideIcon;
}

interface SearchBarProps {
  fields: SearchField[];
  compact?: boolean;
}

type PickerType = "location" | "person" | "date";

interface LocationOption {
  name: string;
  country: string;
  region: string;
  note: string;
}

const locationOptions: LocationOption[] = [
  { name: "Bali", country: "Indonesia", region: "Island escapes", note: "Ubud, Seminyak, Nusa Dua" },
  { name: "Ubud", country: "Bali, Indonesia", region: "Wellness and culture", note: "Rice terraces, retreats, temples" },
  { name: "Seminyak", country: "Bali, Indonesia", region: "Beach and dining", note: "Sunsets, villas, restaurants" },
  { name: "Nusa Dua", country: "Bali, Indonesia", region: "Resort coast", note: "Calm beaches and premium stays" },
  { name: "Istanbul", country: "Turkiye", region: "City discovery", note: "Bosphorus, old city, design hotels" },
  { name: "Ankara", country: "Turkiye", region: "Culture route", note: "Museums, modern dining, central stays" },
  { name: "Antalya", country: "Turkiye", region: "Mediterranean coast", note: "Old town, coves, boat days" },
  { name: "Cappadocia", country: "Turkiye", region: "Scenic retreat", note: "Balloons, valleys, cave hotels" },
  { name: "Lombok", country: "Indonesia", region: "Quiet island", note: "Reefs, beaches, slower rhythm" },
  { name: "Algarve", country: "Portugal", region: "Coastal road trip", note: "Coves, cliffs, seafood taverns" },
  { name: "Sardinia", country: "Italy", region: "Premium beach", note: "Granite coves and countryside lunches" },
  { name: "Palawan", country: "Philippines", region: "Lagoon adventure", note: "Island hopping and clear-water bays" },
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function getPickerType(label: string): PickerType {
  if (label === "Person") return "person";
  if (label.includes("Date") || label.includes("Check In") || label.includes("Check Out")) return "date";
  return "location";
}

function formatLocation(option: LocationOption) {
  return `${option.name}, ${option.country}`;
}

function toDateValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  return date.toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" });
}

function getCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: Array<Date | null> = Array.from({ length: startOffset }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push(new Date(year, month, day));
  }

  while (days.length % 7 !== 0) {
    days.push(null);
  }

  return days;
}

export function SearchBar({ fields, compact = false }: SearchBarProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const initialValues = useMemo(
    () =>
      fields.reduce<Record<string, string>>((values, field) => {
        values[field.label] = "";
        return values;
      }, {}),
    [fields],
  );
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState<"idle" | "error" | "ready">("idle");
  const [openField, setOpenField] = useState<string | null>(null);
  const [locationQuery, setLocationQuery] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [monthDate, setMonthDate] = useState(() => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });

  const updateValue = (label: string, value: string) => {
    setValues((current) => ({ ...current, [label]: value }));
    setStatus("idle");
  };

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent | MouseEvent | TouchEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpenField(null);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenField(null);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("touchstart", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("touchstart", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const filteredLocations = locationOptions.filter((option) => {
    const query = locationQuery.trim().toLowerCase();
    if (!query) return true;
    return [option.name, option.country, option.region, option.note]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const required = fields.filter((field) => field.label !== "Check Out");
    const missing = required.some((field) => !values[field.label]);
    setStatus(missing ? "error" : "ready");
    setOpenField(null);

    if (!missing) {
      window.dispatchEvent(
        new CustomEvent("auralis-search", {
          detail: {
            ...values,
            travelers,
          },
        }),
      );
    }
  };

  return (
    <div ref={wrapperRef}>
      <form
        className={`relative grid w-full gap-3 rounded-[1.6rem] border border-auralis-border bg-white p-3 shadow-soft ${
          compact ? "lg:grid-cols-[repeat(4,minmax(0,1fr))_auto]" : "sm:grid-cols-[1fr_1fr_auto]"
        }`}
        onSubmit={handleSubmit}
      >
        {fields.map((field) => {
          const type = getPickerType(field.label);
          const displayValue =
            type === "date"
              ? formatDate(values[field.label]) || field.value
              : values[field.label] || field.value;
          const isOpen = openField === field.label;
          const Icon =
            field.icon ?? (type === "person" ? UsersRound : type === "date" ? CalendarDays : MapPin);

          return (
            <div className={`relative ${isOpen ? "z-50" : "z-10"}`} key={field.label}>
              <button
                className={`focus-ring group flex min-h-16 w-full items-center gap-3 rounded-2xl px-3 text-left transition ${
                  isOpen ? "bg-auralis-peach/80" : "hover:bg-auralis-peach/70"
                }`}
                type="button"
                aria-label={field.label}
                aria-expanded={isOpen}
                onClick={() => {
                  setOpenField(isOpen ? null : field.label);
                  if (type === "location") setLocationQuery(values[field.label].split(",")[0] ?? "");
                }}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-auralis-peach text-auralis-orange transition group-hover:scale-105">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-auralis-dark">{field.label}</span>
                  <span
                    className={`block truncate text-xs font-semibold ${
                      values[field.label] ? "text-auralis-dark" : "text-auralis-muted"
                    }`}
                  >
                    {displayValue}
                  </span>
                </span>
              </button>

                {isOpen ? (
                  <>
                    <button
                      className="fixed inset-0 z-[90] cursor-default bg-transparent"
                      type="button"
                      aria-label="Close picker"
                      onClick={() => setOpenField(null)}
                    />
                    <div
                      className={`fixed inset-x-4 bottom-5 z-[100] max-h-[78vh] w-auto overflow-auto rounded-[1.35rem] border border-auralis-border bg-white p-3 shadow-soft sm:absolute sm:bottom-auto sm:left-0 sm:mt-3 sm:max-h-none sm:w-[min(88vw,24rem)] sm:overflow-hidden ${
                        compact && field.label === "Check Out" ? "lg:right-0 lg:left-auto" : ""
                      }`}
                    >
                      {type === "location" ? (
                        <LocationPicker
                          query={locationQuery}
                          options={filteredLocations}
                          onQueryChange={setLocationQuery}
                          onSelect={(option) => {
                            updateValue(field.label, formatLocation(option));
                            setOpenField(null);
                          }}
                        />
                      ) : null}

                      {type === "person" ? (
                        <PersonPicker
                          travelers={travelers}
                          onChange={(count) => {
                            setTravelers(count);
                            updateValue(field.label, `${count} traveler${count > 1 ? "s" : ""}`);
                          }}
                          onApply={() => setOpenField(null)}
                        />
                      ) : null}

                      {type === "date" ? (
                        <DatePicker
                          monthDate={monthDate}
                          selected={values[field.label]}
                          onMonthChange={setMonthDate}
                          onSelect={(date) => {
                            updateValue(field.label, toDateValue(date));
                            setOpenField(null);
                          }}
                        />
                      ) : null}
                    </div>
                  </>
                ) : null}
            </div>
          );
        })}
        <button
          className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-auralis-orange px-6 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5 hover:shadow-xl"
          type="submit"
        >
          Get Started
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </form>

      {status !== "idle" ? (
        <div
          className={`mt-3 rounded-2xl border px-4 py-3 text-sm font-semibold ${
            status === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-auralis-orange/20 bg-auralis-peach text-auralis-dark"
          }`}
          role="status"
        >
          {status === "error" ? (
            "Please add a destination and travel date so we can prepare the right route."
          ) : (
            <span className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-auralis-orange" aria-hidden />
              Your request is ready: {values.Location || "Selected destination"}
              {values.Person ? `, ${values.Person}` : ""} for{" "}
              {formatDate(values["Travel Date"] || values["Check In"]) || "your selected date"}.
              Matching stays and guides are shown below.
            </span>
          )}
        </div>
      ) : null}
    </div>
  );
}

function LocationPicker({
  query,
  options,
  onQueryChange,
  onSelect,
}: {
  query: string;
  options: LocationOption[];
  onQueryChange: (value: string) => void;
  onSelect: (option: LocationOption) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 rounded-2xl border border-auralis-border bg-auralis-soft px-4 py-3">
        <Search className="h-4 w-4 shrink-0 text-auralis-orange" aria-hidden />
        <input
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-auralis-dark outline-none placeholder:text-auralis-muted"
          placeholder="Search Bali, Istanbul, Ankara..."
          value={query}
          autoFocus
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </div>
      <div className="mt-3 max-h-72 overflow-auto pr-1">
        {options.length ? (
          options.slice(0, 7).map((option) => (
            <button
              className="focus-ring flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-auralis-peach"
              type="button"
              key={`${option.name}-${option.country}`}
              onClick={() => onSelect(option)}
            >
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-auralis-peach text-auralis-orange">
                <MapPin className="h-4 w-4" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block font-heading text-sm font-extrabold text-auralis-dark">
                  {option.name}, {option.country}
                </span>
                <span className="mt-1 block text-xs font-bold text-auralis-orange">{option.region}</span>
                <span className="mt-1 block text-xs font-medium text-auralis-muted">{option.note}</span>
              </span>
            </button>
          ))
        ) : (
          <div className="rounded-2xl bg-auralis-soft px-4 py-5 text-sm font-semibold text-auralis-muted">
            No exact match yet. Try Bali, Istanbul, Ankara, Antalya, or Palawan.
          </div>
        )}
      </div>
    </div>
  );
}

function PersonPicker({
  travelers,
  onChange,
  onApply,
}: {
  travelers: number;
  onChange: (value: number) => void;
  onApply: () => void;
}) {
  const rooms = travelers > 2 ? 2 : 1;

  return (
    <div>
      <div className="rounded-2xl bg-auralis-soft p-4">
        <p className="font-heading text-lg font-extrabold text-auralis-dark">Travelers</p>
        <p className="mt-1 text-sm font-medium text-auralis-muted">
          Choose the group size so we can match stays, guides, and transfer comfort.
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-2xl border border-auralis-border p-4">
        <div>
          <p className="text-sm font-extrabold text-auralis-dark">Guests</p>
          <p className="text-xs font-medium text-auralis-muted">Adults and older children</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-auralis-border text-auralis-dark disabled:opacity-40"
            type="button"
            disabled={travelers <= 1}
            onClick={() => onChange(Math.max(1, travelers - 1))}
            aria-label="Decrease travelers"
          >
            <Minus className="h-4 w-4" aria-hidden />
          </button>
          <span className="w-7 text-center font-heading text-xl font-extrabold text-auralis-dark">
            {travelers}
          </span>
          <button
            className="focus-ring grid h-10 w-10 place-items-center rounded-full bg-auralis-orange text-white"
            type="button"
            onClick={() => onChange(Math.min(12, travelers + 1))}
            aria-label="Increase travelers"
          >
            <Plus className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-auralis-peach px-4 py-3 text-sm font-bold text-auralis-dark">
          {rooms} room{rooms > 1 ? "s" : ""}
        </div>
        <div className="rounded-2xl bg-auralis-peach px-4 py-3 text-sm font-bold text-auralis-dark">
          Private route ready
        </div>
      </div>
      <button
        className="focus-ring mt-4 w-full rounded-2xl bg-auralis-orange px-5 py-3 text-sm font-extrabold text-white shadow-glow"
        type="button"
        onClick={onApply}
      >
        Apply travelers
      </button>
    </div>
  );
}

function DatePicker({
  monthDate,
  selected,
  onMonthChange,
  onSelect,
}: {
  monthDate: Date;
  selected: string;
  onMonthChange: (value: Date) => void;
  onSelect: (date: Date) => void;
}) {
  const calendarDays = getCalendarDays(monthDate);

  return (
    <div>
      <div className="flex items-center justify-between rounded-2xl bg-auralis-soft p-3">
        <button
          className="focus-ring grid h-9 w-9 place-items-center rounded-full bg-white text-auralis-dark shadow-sm"
          type="button"
          aria-label="Previous month"
          onClick={() => onMonthChange(new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1))}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </button>
        <div className="text-center">
          <p className="font-heading text-base font-extrabold text-auralis-dark">
            {monthNames[monthDate.getMonth()]} {monthDate.getFullYear()}
          </p>
          <p className="text-xs font-semibold text-auralis-muted">Select your travel date</p>
        </div>
        <button
          className="focus-ring grid h-9 w-9 place-items-center rounded-full bg-white text-auralis-dark shadow-sm"
          type="button"
          aria-label="Next month"
          onClick={() => onMonthChange(new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1))}
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {dayNames.map((day) => (
          <div className="py-2 text-xs font-extrabold text-auralis-muted" key={day}>
            {day}
          </div>
        ))}
        {calendarDays.map((date, index) => {
          const value = date ? toDateValue(date) : "";
          const isSelected = value === selected;
          const isWeekend = date ? date.getDay() === 0 || date.getDay() === 6 : false;

          return date ? (
            <button
              className={`focus-ring aspect-square rounded-2xl text-sm font-extrabold transition ${
                isSelected
                  ? "bg-auralis-orange text-white shadow-glow"
                  : isWeekend
                    ? "bg-auralis-peach text-auralis-orange hover:bg-auralis-orange hover:text-white"
                    : "text-auralis-dark hover:bg-auralis-peach"
              }`}
              type="button"
              key={value}
              onClick={() => onSelect(date)}
            >
              {date.getDate()}
            </button>
          ) : (
            <div className="aspect-square" key={`empty-${index}`} />
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-auralis-orange/15 bg-auralis-peach px-4 py-3 text-sm font-bold text-auralis-dark">
        <CalendarDays className="h-5 w-5 shrink-0 text-auralis-orange" aria-hidden />
        {selected ? `Selected ${formatDate(selected)}` : "Flexible dates can be adjusted after matching."}
      </div>
    </div>
  );
}
