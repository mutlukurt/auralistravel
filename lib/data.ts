import {
  BadgeCheck,
  CalendarDays,
  Compass,
  CreditCard,
  Earth,
  Headphones,
  HeartHandshake,
  Hotel,
  Images,
  Languages,
  Luggage,
  MapPin,
  Mountain,
  Palmtree,
  Route,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  Utensils,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  highlighted?: boolean;
}

export interface Destination {
  name: string;
  place: string;
  price: string;
  rating: string;
  image: string;
  alt: string;
  summary: string;
  bestFor: string;
  duration: string;
  season: string;
  includes: string[];
  searchTerms: string[];
}

export interface Experience {
  title: string;
  location: string;
  duration: string;
  price: string;
  image: string;
  alt: string;
  tags: string[];
  description: string;
  guide: string;
  highlights: string[];
}

export interface PlanningStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface JournalArticle {
  title: string;
  category: string;
  readTime: string;
  image: string;
  alt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GuideProfile {
  name: string;
  region: string;
  specialty: string;
  languages: string;
  description: string;
  icon: LucideIcon;
}

export interface FooterGroup {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export const features: Feature[] = [
  {
    title: "Curated Choices",
    description:
      "Compare beaches, city escapes, retreats, and nature routes matched to your travel style.",
    icon: Images,
  },
  {
    title: "Local Tour Guides",
    description:
      "Meet trusted guides who add context, comfort, and local rhythm to every destination.",
    icon: UsersRound,
    highlighted: true,
  },
  {
    title: "Flexible Booking",
    description:
      "Hold dates, confirm stays, and update travelers through a calm flow with clear next steps.",
    icon: CreditCard,
  },
  {
    title: "Protected Trips",
    description:
      "Every itinerary includes supplier checks, support windows, and clear cancellation notes.",
    icon: ShieldCheck,
  },
];

export const destinations: Destination[] = [
  {
    name: "Maruva Beach",
    place: "Bali, Indonesia",
    price: "$220",
    rating: "4.8",
    image: "/images/destination-maruva.webp",
    alt: "Turquoise water and palm-lined white sand at Maruva Beach",
    summary:
      "A calm beach base for slow mornings, surf lessons, temple visits, and sunset dinners without losing resort comfort.",
    bestFor: "Couples and first-time island travelers",
    duration: "4-6 days",
    season: "Apr-Oct",
    includes: ["Beach stay", "Airport transfer", "Local guide"],
    searchTerms: ["bali", "ubud", "seminyak", "nusa dua", "indonesia", "beach"],
  },
  {
    name: "Nusa Pearl",
    place: "Lombok, Indonesia",
    price: "$260",
    rating: "4.9",
    image: "/images/destination-nusa-pearl.webp",
    alt: "Quiet crescent beach with teal water at Nusa Pearl",
    summary:
      "A quieter island rhythm with reef swims, cliff viewpoints, village lunches, and boutique stays near clear water.",
    bestFor: "Nature lovers and slower itineraries",
    duration: "5-7 days",
    season: "May-Sep",
    includes: ["Reef day", "Boutique stay", "Route support"],
    searchTerms: ["lombok", "indonesia", "bali", "quiet island", "reef"],
  },
  {
    name: "Azure Cove",
    place: "Algarve, Portugal",
    price: "$310",
    rating: "4.8",
    image: "/images/destination-azure-cove.webp",
    alt: "Limestone cliffs and turquoise ocean at Azure Cove",
    summary:
      "A polished coastal escape with limestone coves, seafood taverns, kayak routes, and scenic village-to-village drives.",
    bestFor: "Food, coast, and road-trip travelers",
    duration: "3-5 days",
    season: "Mar-Jun",
    includes: ["Cove route", "Dining map", "Car plan"],
    searchTerms: ["algarve", "portugal", "coast", "road trip"],
  },
  {
    name: "Luma Island",
    place: "Palawan, Philippines",
    price: "$240",
    rating: "4.7",
    image: "/images/destination-luma-island.webp",
    alt: "Emerald islands and clear lagoon at Luma Island",
    summary:
      "A lagoon-focused route with island hopping, clear-water kayaking, soft adventure, and restful nights near the bay.",
    bestFor: "Adventure-light groups",
    duration: "5-8 days",
    season: "Nov-May",
    includes: ["Boat route", "Lagoon permits", "Guide briefing"],
    searchTerms: ["palawan", "philippines", "lagoon", "island hopping"],
  },
  {
    name: "Solara Bay",
    place: "Antalya, Turkiye",
    price: "$280",
    rating: "4.9",
    image: "/images/destination-solara-bay.webp",
    alt: "Mediterranean bay with pine cliffs at Solara Bay",
    summary:
      "A Mediterranean blend of pine-backed beaches, ancient ruins, boat coves, and relaxed evenings in old-town lanes.",
    bestFor: "Culture plus beach travelers",
    duration: "4-7 days",
    season: "Apr-Jun",
    includes: ["Old-town walk", "Boat day", "Hotel curation"],
    searchTerms: ["antalya", "istanbul", "ankara", "turkiye", "turkey", "mediterranean", "culture"],
  },
  {
    name: "Cala Vento",
    place: "Sardinia, Italy",
    price: "$350",
    rating: "5.0",
    image: "/images/destination-cala-vento.webp",
    alt: "Crystal clear cove and granite rocks at Cala Vento",
    summary:
      "A premium cove-hopping route with granite beaches, countryside lunches, scenic drives, and elegant small hotels.",
    bestFor: "Premium beach escapes",
    duration: "5-7 days",
    season: "May-Sep",
    includes: ["Cove list", "Dining holds", "Transfer plan"],
    searchTerms: ["sardinia", "italy", "premium beach", "cove"],
  },
];

export const footerGroups: FooterGroup[] = [
  {
    title: "About",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Features", href: "#tours" },
      { label: "Journal", href: "#journal" },
      { label: "Careers", href: "#footer" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Team", href: "#about" },
      { label: "Partner With Us", href: "#footer" },
      { label: "FAQ", href: "#faq" },
      { label: "Blog", href: "#journal" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Account", href: "#footer" },
      { label: "Support Center", href: "#faq" },
      { label: "Feedback", href: "#footer" },
      { label: "Contact Us", href: "#cta" },
      { label: "Accessibility", href: "#footer" },
    ],
  },
];

export const heroFields = [
  {
    label: "Location",
    value: "Where are you going?",
    icon: MapPin,
  },
  {
    label: "Travel Date",
    value: "Select your dates",
    icon: CalendarDays,
  },
];

export const destinationFilters = [
  {
    label: "Location",
    value: "Where are you going?",
    icon: MapPin,
  },
  {
    label: "Person",
    value: "How many travelers?",
    icon: UsersRound,
  },
  {
    label: "Check In",
    value: "Choose date",
    icon: CalendarDays,
  },
  {
    label: "Check Out",
    value: "Choose date",
    icon: CalendarDays,
  },
];

export const aboutStats = [
  { value: "2000+", label: "Happy Travelers" },
  { value: "120+", label: "Destinations" },
  { value: "12+", label: "Years Experience" },
];

export const heroStats = [
  { value: "120+", label: "Destinations", icon: Palmtree },
  { value: "100%", label: "Curated Trips", icon: BadgeCheck },
];

export const partners = ["Nomadica", "VistaRail", "BlueHarbor", "TerraStay", "AeroLine"];

export const assurances = [
  { label: "24/7 trip support", icon: Headphones },
  { label: "Vetted local partners", icon: HeartHandshake },
  { label: "Flexible trip changes", icon: TicketCheck },
];

export const experiences: Experience[] = [
  {
    title: "Coastal Sailing & Slow Food",
    location: "Aegean Coast",
    duration: "5 days",
    price: "$690",
    image: "/images/experience-sailing-food.png",
    alt: "Mediterranean sailing harbor with a local food table at golden hour",
    tags: ["Sailing", "Cuisine", "Small group"],
    description:
      "A slow coastal route built around protected swim stops, family-run tables, harbor evenings, and a skipper who keeps the pace easy.",
    guide: "Best with a private local skipper and a food host for market stops.",
    highlights: ["Sunset harbor dinner", "Two protected swim coves", "Village market tasting"],
  },
  {
    title: "Old City Lantern Food Walk",
    location: "Marrakech Medina",
    duration: "3 nights",
    price: "$520",
    image: "/images/experience-old-city-food.png",
    alt: "Lantern-lit historic old city street with cafe tables at blue hour",
    tags: ["Culture", "Guided", "Evening"],
    description:
      "A guided night route through atmospheric lanes, small kitchens, spice stalls, and quiet courtyards selected for comfort and context.",
    guide: "A licensed cultural guide leads the walk and adjusts the route for dietary needs.",
    highlights: ["Lantern-lit medina walk", "Three tasting stops", "Rooftop tea close"],
  },
  {
    title: "Lagoon Villa Reset",
    location: "Palawan Islands",
    duration: "6 days",
    price: "$940",
    image: "/images/hero-tropical-villa.webp",
    alt: "Overwater villas above turquoise sea",
    tags: ["Wellness", "Beach", "Private"],
    description:
      "A restful island stay with villa time, gentle lagoon activities, spa windows, and private transfers between each touchpoint.",
    guide: "A concierge guide handles boat timing, wellness bookings, and weather-aware route changes.",
    highlights: ["Private lagoon transfer", "Spa and reef morning", "Flexible rest day"],
  },
];

export const planningSteps: PlanningStep[] = [
  {
    title: "Share Your Travel Style",
    description: "Choose your pace, budget, comfort level, and the kind of memories you want to bring home.",
    icon: Compass,
  },
  {
    title: "Review A Curated Route",
    description: "Get a balanced itinerary with stays, local guides, transfers, and open time clearly mapped.",
    icon: Route,
  },
  {
    title: "Book With Confidence",
    description: "Confirm once everything feels right, then keep every trip detail in one tidy place.",
    icon: Luggage,
  },
];

export const guideProfiles: GuideProfile[] = [
  {
    name: "Leyla Arman",
    region: "Mediterranean Coast",
    specialty: "Coastal routes and boutique stays",
    languages: "English, Turkish, Italian",
    description:
      "Ideal for travelers who want hidden coves, calm meal pacing, and polished hotel-to-harbor logistics without losing local texture.",
    icon: Palmtree,
  },
  {
    name: "Samir Benali",
    region: "Old cities and food walks",
    specialty: "Markets, heritage streets, evening routes",
    languages: "English, Arabic, French",
    description:
      "Best for cultural travelers who want context, trusted tasting stops, respectful routing, and a guide who can read the group energy.",
    icon: Utensils,
  },
  {
    name: "Mira Kohler",
    region: "Alpine retreats",
    specialty: "Wellness, light hiking, scenic transfers",
    languages: "English, German, French",
    description:
      "A strong fit for slow travel, soft adventure, wellness windows, and mountain itineraries that need weather-aware adjustments.",
    icon: Mountain,
  },
];

export const journalArticles: JournalArticle[] = [
  {
    title: "How To Design A Seven-Day Island Escape Without Rushing",
    category: "Guide",
    readTime: "6 min read",
    image: "/images/destination-luma-island.webp",
    alt: "Emerald islands and clear lagoon at Luma Island",
  },
  {
    title: "A Quiet Alpine Retreat For Slow Mornings And Clear Air",
    category: "Wellness",
    readTime: "4 min read",
    image: "/images/journal-alpine-retreat.png",
    alt: "Mountain lodge terrace with tea and morning mist over an alpine valley",
  },
  {
    title: "What To Ask Before Booking A Local Guide",
    category: "Planning",
    readTime: "5 min read",
    image: "/images/about-venice.webp",
    alt: "Canal city with gondola and warm European architecture",
  },
];

export const faqs: FAQItem[] = [
  {
    question: "Can Auralis build a custom itinerary?",
    answer:
      "Yes. Start with a destination, travel dates, or a mood, and the route can be adjusted around your pace, budget, and preferred stays.",
  },
  {
    question: "Are the guides and stays vetted?",
    answer:
      "Every featured stay, guide, and experience is reviewed for service quality, location fit, communication, and recent traveler feedback.",
  },
  {
    question: "Can I change my dates after booking?",
    answer:
      "Most trips include flexible date options. The exact change window is shown before checkout so you can confirm with clarity.",
  },
  {
    question: "Do you support groups and families?",
    answer:
      "Yes. Auralis can surface family rooms, private transfers, multi-room stays, and slower routes for mixed-age groups.",
  },
];

export const tripTypes = ["Beach", "Culture", "Nature", "Wellness"];

export const itineraryHighlights = [
  { label: "Boutique stays", value: "38", icon: Hotel },
  { label: "Local routes", value: "84", icon: Earth },
  { label: "Private guides", value: "52", icon: UsersRound },
];

export const guideHighlights = [
  { label: "Languages covered", value: "18", icon: Languages },
  { label: "Average guide rating", value: "4.9", icon: BadgeCheck },
  { label: "Response window", value: "24h", icon: Headphones },
];

export const sectionSparkle = Sparkles;
