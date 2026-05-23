"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import Link from "next/link";
import Image from "next/image";

const navLinks = {
  en: [
    { name: "About Us", href: "#about" },
    { name: "Our Clients", href: "#clients" },
    { name: "Gallery", href: "#gallery" },
    { name: "Services", href: "#services" },
    { name: "Calculator", href: "#calculator" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ],
  zh: [
    { name: "关于我们", href: "#about" },
    { name: "合作客户", href: "#clients" },
    { name: "菜品画廊", href: "#gallery" },
    { name: "业务服务", href: "#services" },
    { name: "预算估算", href: "#calculator" },
    { name: "常见问题", href: "#faq" },
    { name: "联系我们", href: "#contact" },
  ],
};

interface NavbarProps {
  lang?: "en" | "zh";
  setLang?: (l: "en" | "zh") => void;
}

export function Navbar({ lang = "en", setLang }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const links = navLinks[lang];

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setIsScrolled(window.scrollY > 50);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  const toggleLanguage = () => {
    if (setLang) {
      setLang(lang === "en" ? "zh" : "en");
    }
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -120 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/95 backdrop-blur-lg shadow-[0_4px_25px_rgba(0,0,0,0.05)]" 
          : "bg-gradient-to-b from-black/70 via-black/20 to-transparent shadow-none"
      }`}
    >
      <nav className="w-full max-w-[1860px] mx-auto px-6 md:px-10 lg:px-12 xl:px-4 py-5 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-[58px] h-[58px] md:w-[66px] md:h-[66px] rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.jpg"
                alt="Kim Long Catering Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col text-left justify-center select-none">
              <span className={`font-black text-xl md:text-[23px] tracking-[0.12em] uppercase leading-none bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${
                isScrolled || isMobileMenuOpen
                  ? "from-foreground via-amber-500 to-amber-600 group-hover:via-amber-400"
                  : "from-white via-amber-400 to-amber-500 group-hover:via-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              }`}>
                KIM LONG
              </span>
              <span className={`text-[10px] md:text-[11px] font-black tracking-[0.42em] uppercase mt-2 leading-none mr-[-0.42em] transition-colors duration-300 ${
                isScrolled || isMobileMenuOpen ? "text-primary" : "text-amber-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
              }`}>
                CATERING
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-all font-bold text-[15px] md:text-base tracking-wide hover:scale-105 active:scale-95 block ${
                  isScrolled || isMobileMenuOpen
                    ? "text-muted-foreground hover:text-primary"
                    : "text-stone-200 hover:text-amber-400 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.6)]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA & Language Switcher */}
          <div className="hidden md:flex items-center gap-4">
            <a
              id="btn-nav-whatsapp"
              href="https://wa.me/60197288226"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-black text-sm hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-md shadow-primary/10 hover:shadow-primary/20"
            >
              <WhatsAppIcon className="w-4.5 h-4.5" />
              {lang === "en" ? "WhatsApp" : "联系客服"}
            </a>

            {/* Language Toggle Button */}
            <button
              id="btn-lang-switcher"
              onClick={toggleLanguage}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-black border cursor-pointer transition-all active:scale-95 ${
                isScrolled || isMobileMenuOpen
                  ? "bg-secondary hover:bg-secondary/80 text-foreground border-border hover:border-amber-500/30"
                  : "bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-amber-400/50 backdrop-blur-sm"
              }`}
              title={lang === "en" ? "Switch to Chinese" : "切换为英文"}
            >
              <Globe className={`w-4 h-4 ${isScrolled || isMobileMenuOpen ? "text-primary" : "text-amber-400"}`} />
              <span>{lang === "en" ? "中文" : "EN"}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2.5 md:hidden">
            {/* Mobile Lang Button */}
            <button
              onClick={toggleLanguage}
              className={`p-2.5 rounded-full border flex items-center justify-center cursor-pointer active:scale-95 transition-colors duration-300 ${
                isScrolled || isMobileMenuOpen
                  ? "text-foreground bg-secondary border-border"
                  : "text-white bg-white/10 border-white/20 backdrop-blur-sm"
              }`}
              aria-label="Toggle Language"
            >
              <Globe className={`w-4.5 h-4.5 ${isScrolled || isMobileMenuOpen ? "text-primary" : "text-amber-400"}`} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2.5 rounded-full border flex items-center justify-center active:scale-95 transition-colors duration-300 ${
                isScrolled || isMobileMenuOpen
                  ? "text-foreground bg-secondary border-border"
                  : "text-white bg-white/10 border-white/20 backdrop-blur-sm"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-border/20 mt-3"
            >
              <div className="py-4 space-y-3">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-muted-foreground hover:text-foreground font-semibold text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                
                <div className="pt-2 border-t border-border/30 flex flex-col gap-3">
                  <a
                    href="https://wa.me/60197288226"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-full font-bold text-sm hover:bg-primary/90 transition-colors"
                  >
                    <WhatsAppIcon className="w-4.5 h-4.5" />
                    {lang === "en" ? "WhatsApp Us" : "立即联系客服"}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
