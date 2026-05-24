import Image from "next/image";
import { heroStats } from "@/lib/data";
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
    <div className="relative mx-auto grid h-[530px] w-full max-w-[620px] grid-cols-10 grid-rows-10 gap-4">
      {heroImages.map((image, index) => (
        <div
          className={`group relative overflow-hidden shadow-soft transition duration-500 hover:-translate-y-2 hover:scale-[1.015] ${image.className}`}
          key={image.src}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 46vw, 280px"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
      ))}

      <div className="auralis-float-slow absolute left-[33%] top-[23%] w-44">
        <StatsCard {...heroStats[0]} />
      </div>
      <div className="auralis-float-slower absolute right-3 top-6 w-40">
        <StatsCard {...heroStats[1]} />
      </div>
    </div>
  );
}
