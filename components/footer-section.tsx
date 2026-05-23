"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Truck, Clock, ShieldCheck, Sparkles, Compass, ExternalLink, Facebook, Instagram } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import Link from "next/link";
import Image from "next/image";

const linksData = {
  en: [
    { name: "About Us", href: "#about" },
    { name: "Our Clients", href: "#clients" },
    { name: "Gallery", href: "#gallery" },
    { name: "Services", href: "#services" },
    { name: "Calculator", href: "#calculator" },
    { name: "FAQ", href: "#faq" },
  ],
  zh: [
    { name: "关于我们", href: "#about" },
    { name: "合作客户", href: "#clients" },
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
  const [mapLoaded, setMapLoaded] = useState(false);

  // 极致缩小的 Google Map 嵌入参数与跳转链接
  const mapEmbedSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.196306354898!2d103.6338575!3d1.6033783999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da76bbf11dfc5b%3A0x9b84a16198f3e89b!2sKim%20Long%20Catering%20Sdn%20Bhd%20%E9%87%91%E9%BE%99%E8%87%AA%E7%94%B1%E9%A4%90%E6%9C%8D%E5%8A%A1!5e0!3m2!1szh-CN!2smy!4v1716388800000!5m2!1szh-CN!2smy";
  const mapUrl =
    "https://www.google.com/maps/place/Kim+Long+Catering+Sdn+Bhd+%E9%87%91%E9%BE%99%E8%87%AA%E7%94%B1%E9%A4%90%E6%9C%8D%E5%8A%A1/data=!4m2!3m1!1s0x0:0x9b84a16198f3e89b?sa=X&ved=1t:2428&ictx=111";

  return (
    <footer id="contact" className="bg-foreground text-background">
      {/* CTA Banner */}
      <div className="bg-primary py-12 md:py-16 relative overflow-hidden border-b border-white/5">
        {/* 精美流光背景背景微光装饰 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-bl-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* 左侧：原本的文字与两个按钮设计，文字排版左对齐 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 text-center lg:text-left space-y-6"
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary-foreground leading-tight tracking-tight text-balance">
                  {isChinese
                    ? "准备好筹办您的盛宴了吗？“岁月沉淀经典，金龙与您共赴人生每一个重要时刻。”"
                    : "Ready to host your event? \"Time honors classic taste. Kim Long accompanies you through every momentous milestone of life.\""}
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    id="btn-footer-whatsapp"
                    href="https://wa.me/60197288226"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-7 py-3.5 rounded-full font-bold text-base hover:bg-foreground/90 transition-all duration-300 hover:shadow-lg active:scale-98 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    {isChinese ? "立即 WhatsApp 询价" : "WhatsApp Us Now"}
                  </a>
                  <a
                    id="btn-footer-call"
                    href="tel:+60197288226"
                    className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground px-7 py-3.5 rounded-full font-bold text-base hover:bg-primary-foreground/10 transition-all duration-300 active:scale-98 cursor-pointer"
                  >
                    <Phone className="w-5 h-5" />
                    {isChinese ? "直接拨打电话" : "Call Us"}
                  </a>
                </div>
              </motion.div>

              {/* 右侧：圆角纯净彩色地图，支持悬停优雅放大 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-6 flex justify-center lg:justify-end lg:translate-x-24"
              >
                {/* 纯净地图容器，取消圆角以呈直角几何，带 Hover 优雅缩放动效 */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative w-full max-w-[500px] h-[260px] md:h-[320px] overflow-hidden border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.12)] cursor-pointer"
                >
                  {/* Skeleton 骨架 screen */}
                  <AnimatePresence>
                    {!mapLoaded && (
                      <motion.div
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-900 animate-pulse"
                      >
                        <Compass className="w-8 h-8 text-amber-600 animate-spin-slow mb-2" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          {isChinese ? "载入地图..." : "Loading Map..."}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 地图 iframe 嵌入 */}
                  <iframe
                    title="Kim Long Footer Location Map"
                    src={mapEmbedSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setMapLoaded(true)}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="py-16 border-t border-background/5">
        <div className="container mx-auto px-6">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1 space-y-6">
              <Link href="/" className="flex items-center gap-3.5 group">
                <div className="relative w-[48px] h-[48px] rounded-xl overflow-hidden border border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.1)] transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/logo.jpg"
                    alt="Kim Long Catering Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col text-left justify-center select-none">
                  <span className="font-black text-base md:text-lg text-white tracking-[0.1em] uppercase leading-none bg-gradient-to-r from-white via-amber-400 to-amber-500 bg-clip-text text-transparent transition-all duration-300 group-hover:via-amber-300">
                    KIM LONG
                  </span>
                  <span className="text-[8px] md:text-[9px] font-black tracking-[0.38em] text-primary uppercase mt-1.5 leading-none mr-[-0.38em]">
                    CATERING
                  </span>
                </div>
              </Link>
              {/* 企业注册与合规披露信息，小巧精致，排在一起 */}
              <div className="space-y-0.5 text-[11px] text-background/50 font-medium tracking-wide leading-relaxed">
                <p className="font-extrabold text-background/80 tracking-wider">KIM LONG CATERING SDN BHD</p>
                <p>REG: 202301025752 (1519675-T)</p>
                <p>SST: J31-2409-32000022</p>
                <p>TIN: C58115357100</p>
                <p>MISC CODE: 10799 & 56210</p>
              </div>

              <p className="text-background/70 text-sm leading-relaxed pt-3 border-t border-white/5">
                {isChinese
                  ? "“岁月沉淀经典，金龙与您共赴人生每一个重要时刻。” 始于 1982 年的舌尖非遗传承，为马来西亚柔佛提供最正宗的手工中餐味道与高档宴席承办。"
                  : "\"Time honors classic taste. Kim Long accompanies you through every momentous milestone of life.\" Serving Johor with authentic taste since 1982."}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-base tracking-wider text-white mb-6 uppercase">
                {isChinese ? "快速导航" : "Quick Links"}
              </h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
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

              {/* 徽章与社交图标并排容器（响应式空间适配） */}
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row xl:items-center justify-between gap-3 mt-10">
                {/* 极度缩小、精简并排成一行的迷你背书徽章（高奢金字发亮） */}
                <div className="grid grid-cols-3 gap-1 flex-grow max-w-[210px] lg:max-w-none xl:max-w-[210px]">
                  {/* 徽章 1 */}
                  <div className="group flex flex-col items-center text-center p-1 py-1.5 rounded-lg bg-amber-500/[0.03] border border-amber-500/15 shadow-[0_0_8px_rgba(245,158,11,0.04)] hover:bg-amber-500/[0.08] hover:border-amber-500/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.12)] transition-all duration-300">
                    <span className="text-[9.5px] font-black text-amber-400 tracking-wide block leading-tight whitespace-nowrap drop-shadow-[0_0_5px_rgba(245,158,11,0.85)]">
                      {isChinese ? "卓越配送" : "Logistics"}
                    </span>
                    <span className="text-[7.5px] text-amber-300/80 font-bold block mt-0.5 leading-none whitespace-nowrap drop-shadow-[0_0_3px_rgba(245,158,11,0.4)]">
                      {isChinese ? "5000人/日" : "5000+ Daily"}
                    </span>
                  </div>

                  {/* 徽章 2 */}
                  <div className="group flex flex-col items-center text-center p-1 py-1.5 rounded-lg bg-amber-500/[0.03] border border-amber-500/15 shadow-[0_0_8px_rgba(245,158,11,0.04)] hover:bg-amber-500/[0.08] hover:border-amber-500/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.12)] transition-all duration-300">
                    <span className="text-[9.5px] font-black text-amber-400 tracking-wide block leading-tight whitespace-nowrap drop-shadow-[0_0_5px_rgba(245,158,11,0.85)]">
                      {isChinese ? "200万食安" : "RM2M Insured"}
                    </span>
                    <span className="text-[7.5px] text-amber-300/80 font-bold block mt-0.5 leading-none whitespace-nowrap drop-shadow-[0_0_3px_rgba(245,158,11,0.4)]">
                      {isChinese ? "责任险保障" : "Liability Ins"}
                    </span>
                  </div>

                  {/* 徽章 3 */}
                  <div className="group flex flex-col items-center text-center p-1 py-1.5 rounded-lg bg-amber-500/[0.03] border border-amber-500/15 shadow-[0_0_8px_rgba(245,158,11,0.04)] hover:bg-amber-500/[0.08] hover:border-amber-500/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.12)] transition-all duration-300">
                    <span className="text-[9.5px] font-black text-amber-400 tracking-wide block leading-tight whitespace-nowrap drop-shadow-[0_0_5px_rgba(245,158,11,0.85)]">
                      {isChinese ? "40载老字号" : "40Y Heritage"}
                    </span>
                    <span className="text-[7.5px] text-amber-300/80 font-bold block mt-0.5 leading-none whitespace-nowrap drop-shadow-[0_0_3px_rgba(245,158,11,0.4)]">
                      {isChinese ? "始于 1982" : "Since 1982"}
                    </span>
                  </div>
                </div>

                {/* 社交媒体与 Google 链接图标 */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/JimLongCatering/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-8.5 h-8.5 rounded-full flex items-center justify-center bg-white/[0.03] border border-white/5 text-background/70 hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-400 transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                    <Facebook className="w-4.5 h-4.5" />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/kimlongcatering"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-8.5 h-8.5 rounded-full flex items-center justify-center bg-white/[0.03] border border-white/5 text-background/70 hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-400 transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                    <Instagram className="w-4.5 h-4.5" />
                  </a>

                  {/* Google */}
                  <a
                    href="https://g.page/r/CZvo85hhoYSbEAE/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Google"
                    className="w-8.5 h-8.5 rounded-full flex items-center justify-center bg-white/[0.03] border border-white/5 text-background/70 hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-400 transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4.5 h-4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2a10 10 0 0 1 7.65 3.57L16.2 8.8A5.94 5.94 0 0 0 12 8a6 6 0 1 0 5.83 7.42h-5.83v-3.08H21.9a10 10 0 0 1 .1 1.66A10 10 0 1 1 12 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="lg:pl-6 xl:pl-10">
              <h3 className="font-bold text-base tracking-wider text-white mb-6 uppercase">
                {isChinese ? "核心业务" : "Our Services"}
              </h3>
              <ul className="space-y-3 text-sm font-semibold flex flex-col">
                <li>
                  <a href="#services" className="text-background/70 hover:text-white transition-colors">
                    {isChinese ? "宴会自助餐承办" : "Event Buffet Catering"}
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-background/70 hover:text-white transition-colors">
                    {isChinese ? "高级企业会议便当" : "Premium Corporate Bento"}
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-background/70 hover:text-white transition-colors">
                    {isChinese ? "工厂膳食日常配给" : "Factory Daily Meal Supply"}
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-background/70 hover:text-white transition-colors">
                    {isChinese ? "大型帐篷租赁服务" : "Canopy Rental Services"}
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-background/70 hover:text-white transition-colors">
                    {isChinese ? "活动背景板布置" : "Event Backdrop Services"}
                  </a>
                </li>
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
                  <div className="text-background/70 flex flex-col gap-1.5">
                    <a
                      href="https://wa.me/60197288226"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-400 transition-colors duration-200 flex items-center gap-1 group/phone cursor-pointer"
                    >
                      <span>019-728 8226</span>
                      <span className="text-[9px] text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded opacity-0 group-hover/phone:opacity-100 transition-opacity duration-200 ml-1.5">WhatsApp</span>
                    </a>
                    <a
                      href="https://wa.me/60127288226"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-400 transition-colors duration-200 flex items-center gap-1 group/phone cursor-pointer"
                    >
                      <span>012-728 8226</span>
                      <span className="text-[9px] text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded opacity-0 group-hover/phone:opacity-100 transition-opacity duration-200 ml-1.5">WhatsApp</span>
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <a
                    href="mailto:info.kimlongsenai@gmail.com"
                    className="text-background/70 hover:text-amber-400 transition-colors duration-200 cursor-pointer"
                  >
                    info.kimlongsenai@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background/70 hover:text-amber-400 transition-colors duration-200 leading-normal cursor-pointer"
                  >
                    120, Jalan Senai Utama 5/17, Taman Senai Utama, 81400 Senai, Johor
                  </a>
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
