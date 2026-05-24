import type { LucideIcon } from "lucide-react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  icon?: LucideIcon;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  icon: Icon,
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-xl"}>
      <div
        className={`mb-4 flex items-center gap-2 text-sm font-semibold text-auralis-orange ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
        <span>{eyebrow}</span>
        <span className="h-px w-9 bg-auralis-orange" aria-hidden />
      </div>
      <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-normal text-auralis-dark sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-auralis-muted">{description}</p>
      ) : null}
    </div>
  );
}
