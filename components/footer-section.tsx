"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Truck, Clock, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const linksData = {
  en: [
    { name: "About Us", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Services", href: "#services" },
    { name: "Calculator", href: "#calculator" },
    { name: "FAQ", href: "#faq" },
  ],
  zh: [
    { name: "关于我们", href: "#about" },
    { name: "菜品画廊", href: "#gallery" },
    { name: "业务服务", href: "#services" },
    { name: "预算估算", href: "#calculator" },
    { name: "常见问题", href: "#faq" },
  ],
};

interface FooterSectionProps {
  lang?: "en" | "zh";
}

export function FooterSection({ lang = "en" }: FooterSectionProps) {
  const isChinese = lang === "zh";
  const links = linksData[lang];

  return (
    <footer id="contact" className="bg-foreground text-background">
      {/* CTA Banner */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-6 text-balance tracking-tight">
              {isChinese
                ? "准备好筹办您的盛宴了吗？金龙自助餐与您相伴每一个珍贵时刻。"
                : "Ready to host your event? We are with you during the moments you cherish."}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                id="btn-footer-whatsapp"
                href="https://wa.me/60197288226"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-bold text-lg hover:bg-foreground/90 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                {isChinese ? "立即 WhatsApp 询价" : "WhatsApp Us Now"}
              </a>
              <a
                id="btn-footer-call"
                href="tel:+60197288226"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-foreground/10 transition-colors cursor-pointer"
              >
                <Phone className="w-5 h-5" />
                {isChinese ? "直接拨打电话" : "Call Us"}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="py-16 border-t border-background/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1 space-y-6">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/images/logo.jpg"
                  alt="Kim Long Catering Logo"
                  width={44}
                  height={44}
                  className="rounded-lg"
                />
                <span className="font-black text-xl tracking-tight text-white">Kim Long</span>
              </Link>
              <p className="text-background/70 text-sm leading-relaxed">
                {isChinese
                  ? "始于 1982 年的舌尖非遗传承。为马来西亚柔佛提供最正宗的手工中餐老字号味道与高档宴席承办。"
                  : "A taste heritage from 1982. Serving Johor with authentic Chinese cuisine and premium catering services."}
              </p>
              <div className="flex items-center gap-2 text-background/70 text-xs">
                <Truck className="w-4 h-4 text-primary" />
                <span>{isChinese ? "每日配送超 5000人份" : "5000+ pax daily"}</span>
                <span className="mx-1">•</span>
                <span>{isChinese ? "日运超 65 趟次" : "65 trips/day"}</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-base tracking-wider text-white mb-6 uppercase">
                {isChinese ? "快速导航" : "Quick Links"}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-background/70 hover:text-white transition-colors text-sm font-semibold"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-base tracking-wider text-white mb-6 uppercase">
                {isChinese ? "核心业务" : "Our Services"}
              </h3>
              <ul className="space-y-3 text-sm font-semibold text-background/70">
                <li>{isChinese ? "宴会自助餐承办" : "Event Buffet Catering"}</li>
                <li>{isChinese ? "高级企业会议便当" : "Premium Corporate Bento"}</li>
                <li>{isChinese ? "工厂膳食日常配给" : "Factory Daily Meal Supply"}</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-base tracking-wider text-white mb-6 uppercase">
                {isChinese ? "联络我们" : "Contact Us"}
              </h3>
              <ul className="space-y-4 text-sm font-semibold">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-background/70">
                    <p>019-728 8226</p>
                    <p>012-728 8226</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-background/70">info.kimlongsenai@gmail.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-background/70 leading-normal">
                    120, Jalan Senai Utama 5/17, Taman Senai Utama, 81400 Senai, Johor
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-background/70 leading-normal">
                    {isChinese
                      ? "恒温车队：配备1吨至3吨冷/热保温冷链箱式运输卡车"
                      : "Fleet: 1-ton and multi-purpose insulated cold/warm trucks"}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-xs">
              © {new Date().getFullYear()} {isChinese ? "金龙自助餐 (Kim Long Catering)" : "Kim Long Catering"}. All rights reserved.
            </p>
            <p className="text-background/50 text-xs font-semibold">
              {isChinese ? "士乃老字号 • 始于 1982" : "Made with ❤️ in Senai, Johor"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
