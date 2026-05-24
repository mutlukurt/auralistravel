import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  value: string;
  label: string;
  icon?: LucideIcon;
  className?: string;
}

export function StatsCard({ value, label, icon: Icon, className }: StatsCardProps) {
  return (
    <div
      className={`rounded-3xl border border-white/80 bg-white/92 p-5 text-center shadow-soft backdrop-blur ${className ?? ""}`}
    >
      {Icon ? (
        <span className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-2xl bg-auralis-peach text-auralis-orange">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
      ) : null}
      <div className="font-heading text-xl font-extrabold text-auralis-dark">{value}</div>
      <div className="mt-1 text-xs font-semibold text-auralis-muted">{label}</div>
    </div>
  );
}
