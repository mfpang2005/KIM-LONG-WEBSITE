"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSectionVideo } from "@/components/hero-section-video";
import { AboutSection } from "@/components/about-section";
import { AchievementsSection } from "@/components/achievements-section";
import { GallerySection } from "@/components/gallery-section";
import { ServicesSection } from "@/components/services-section";
import { QuoteCalculator } from "@/components/quote-calculator";
import { ClientsSection } from "@/components/clients-section";
import { FAQSection } from "@/components/faq-section";
import { FooterSection } from "@/components/footer-section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { motion } from "framer-motion";

export default function Home() {
  const [lang, setLang] = useState<"en" | "zh">("zh"); // Set default language to Chinese for high localization conversion
  const [activeVideoId, setActiveVideoId] = useState<"banquet" | "cooking" | "plating" | "hygiene">("banquet");
  const isChinese = lang === "zh";

  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground transition-colors duration-500">
      {/* Dynamic Header & Switcher */}
      <Navbar lang={lang} setLang={setLang} />
      
      {/* Core Brand Sections */}
      <HeroSectionVideo 
        lang={lang} 
        activeVideoId={activeVideoId}
        onChangeVideo={setActiveVideoId}
      />
      
      <AboutSection lang={lang} />
      <AchievementsSection lang={lang} />
      
      {/* Client Feedback and trust indicators */}
      <ClientsSection lang={lang} />

      {/* Phase 1 Upgrade: Visual Showcase Food Gallery */}
      <GallerySection lang={lang} />
      
      {/* Services and Pricing Calculator Sections */}
      <ServicesSection lang={lang} />
      
      {/* Phase 2 Upgrade: Interactive Quote Builder */}
      <QuoteCalculator lang={lang} />
      
      {/* Phase 1 Upgrade: Accessible Accordion FAQs */}
      <FAQSection lang={lang} />
      
      {/* Dynamic footer contact card */}
      <FooterSection lang={lang} />
      
      {/* Floating contact anchor */}
      <WhatsAppButton />
    </main>
  );
}
