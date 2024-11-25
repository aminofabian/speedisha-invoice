import HeroSection from "@/components/custom-components/hero-section";
import FeaturesSection from "@/components/custom-components/features-section";
import TemplatesSection from "@/components/custom-components/templates-section";
import WorkflowSection from "@/components/custom-components/workflow-section";
import FeaturesGrid from "@/components/custom-components/features-grid";
import FAQSection from "@/components/custom-components/faq-section";
import ContactSection from "@/components/custom-components/contact-section";
import FooterSection from '@/components/custom-components/footer-section';
import AnimatedBackground from "@/components/custom-components/animated-background";

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10">
        <HeroSection />
        <FeaturesGrid />
        <WorkflowSection />
        <TemplatesSection />
        <FeaturesSection />
        <FAQSection />
        <ContactSection />
        <FooterSection />
      </div>
    </main>
  );
}