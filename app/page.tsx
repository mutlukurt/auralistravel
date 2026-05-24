import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";

const AboutSection = dynamic(() =>
  import("@/components/AboutSection").then((module) => module.AboutSection),
);
const FeaturesSection = dynamic(() =>
  import("@/components/FeaturesSection").then((module) => module.FeaturesSection),
);
const GuidesSection = dynamic(() =>
  import("@/components/GuidesSection").then((module) => module.GuidesSection),
);
const ExperienceSection = dynamic(() =>
  import("@/components/ExperienceSection").then((module) => module.ExperienceSection),
);
const PlanningSection = dynamic(() =>
  import("@/components/PlanningSection").then((module) => module.PlanningSection),
);
const DestinationsSection = dynamic(() =>
  import("@/components/DestinationsSection").then((module) => module.DestinationsSection),
);
const TestimonialSection = dynamic(() =>
  import("@/components/TestimonialSection").then((module) => module.TestimonialSection),
);
const JournalSection = dynamic(() =>
  import("@/components/JournalSection").then((module) => module.JournalSection),
);
const FAQSection = dynamic(() =>
  import("@/components/FAQSection").then((module) => module.FAQSection),
);
const CTASection = dynamic(() =>
  import("@/components/CTASection").then((module) => module.CTASection),
);
const Footer = dynamic(() => import("@/components/Footer").then((module) => module.Footer));

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <GuidesSection />
        <ExperienceSection />
        <PlanningSection />
        <DestinationsSection />
        <TestimonialSection />
        <JournalSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
