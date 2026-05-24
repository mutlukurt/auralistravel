import { AboutSection } from "@/components/AboutSection";
import { CTASection } from "@/components/CTASection";
import { DestinationsSection } from "@/components/DestinationsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { FAQSection } from "@/components/FAQSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { GuidesSection } from "@/components/GuidesSection";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { JournalSection } from "@/components/JournalSection";
import { PlanningSection } from "@/components/PlanningSection";
import { TestimonialSection } from "@/components/TestimonialSection";

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
