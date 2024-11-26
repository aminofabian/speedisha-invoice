'use client';

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
    <main className="relative min-h-screen bg-background">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <HeroSection />
        </section>

        {/* Features Grid */}
        <section className="py-24 sm:py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <FeaturesGrid />
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-24 sm:py-32 px-4 bg-secondary/5">
          <div className="max-w-7xl mx-auto">
            <WorkflowSection />
          </div>
        </section>

        {/* Templates Section */}
        <section className="py-24 sm:py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <TemplatesSection />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 sm:py-32 px-4 bg-secondary/5">
          <div className="max-w-7xl mx-auto">
            <FeaturesSection />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 sm:py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <FAQSection />
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 sm:py-32 px-4 bg-secondary/5">
          <div className="max-w-7xl mx-auto">
            <ContactSection />
          </div>
        </section>

        {/* Footer */}
        <FooterSection />
      </div>
    </main>
  );
}