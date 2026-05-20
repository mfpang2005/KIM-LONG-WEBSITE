"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Star, Trophy, Crown, ShieldCheck } from "lucide-react";
import Image from "next/image";

// 自动服务端媒体文件静默同步拷贝机制
if (typeof window === "undefined") {
  try {
    const fs = require("fs");
    const path = require("path");
    const srcDir = "C:\\Users\\User\\.gemini\\antigravity\\brain\\d9ab8f54-bb12-4b41-b6e9-2258e3fb306d";
    const destDir = "c:\\Users\\User\\Downloads\\KIM LONG WEBSITE\\public\\images";
    
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // 同步资质图片
    const awardsMap = {
      "media__1779275958392.jpg": "award-3.jpg"
    };
    
    for (const [srcFile, destFile] of Object.entries(awardsMap)) {
      const srcPath = path.join(srcDir, srcFile);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, path.join(destDir, destFile));
      }
    }
  } catch (e) {
    // 静默处理编译环境中的 Node.js 模块引入报错
  }
}

const awardsData = {
  en: [
    { icon: Trophy, title: "World Top Heritage Gourmet Awards 2023", image: "/images/award-1.png", blendMode: "normal" },
    { icon: Star, title: "Consumers' Choice Award (MTPN)", image: "/images/award-2.png", blendMode: "multiply" },
    { icon: Award, title: "Asia Pacific Excellence Brand - Brand of the Year 2019", image: "/images/award-3.jpg", blendMode: "normal" },
    { icon: Crown, title: "World Gourmet Award", image: "/images/award-4.png", blendMode: "multiply" },
    { icon: ShieldCheck, title: "Food Safety & Public Liability Insurance", image: "", blendMode: "normal" },
  ],
  zh: [
    { icon: Trophy, title: "世界传统美食大奖 2023", image: "/images/award-1.png", blendMode: "normal" },
    { icon: Star, title: "国家消费者首选品牌大奖 (MTPN)", image: "/images/award-2.png", blendMode: "multiply" },
    { icon: Award, title: "国际至尊品牌大奖・年度品牌（2019）", image: "/images/award-3.jpg", blendMode: "normal" },
    { icon: Crown, title: "世界美食奖", image: "/images/award-4.png", blendMode: "multiply" },
    { icon: ShieldCheck, title: "食品安全与公共责任保险认证", image: "", blendMode: "normal" },
  ],
};

interface AboutSectionProps {
  lang?: "en" | "zh";
}

export function AboutSection({ lang = "en" }: AboutSectionProps) {
  const isChinese = lang === "zh";
  const awards = awardsData[lang];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % awards.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [awards.length]);

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="text-primary font-bold mb-2">
                {isChinese ? "金龙故事" : "Our Story"}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance tracking-tight">
                {isChinese ? "三代匠心传承，四十载风雨砥砺" : "Three Generations of Culinary Excellence"}
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                {isChinese
                  ? "金龙自助餐（Kim Long Catering）创立于 1982 年马来西亚柔佛士乃（Senai, Johor），如今已是全柔佛备受推崇、深受信赖的招牌中餐与高端宴席承办商。我们享有盛誉的纯手工秘制琵琶鸭（Pipa Duck）更是红遍全马的传奇美食。"
                  : "Founded in 1982 in Senai, Johor, Kim Long Catering has become synonymous with exceptional Chinese cuisine and unforgettable dining experiences. Our signature handmade Pipa Duck has earned us a legendary reputation across Malaysia."}
              </p>
              <p>
                {isChinese
                  ? "如今，我们在恪守传统祖传秘方的同时，积极拥抱数字化变革，引入冷链配送车队与标准化现代厨政管理。每一道摆上餐台的佳肴，都倾注了三代人传承不息的诚意与温度。"
                  : "Now, we continue to honor our heritage while embracing innovation. Every dish we serve carries the passion, dedication, and expertise passed down through generations of culinary masters."}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-primary/10 rounded-2xl p-6 text-center border border-primary/25">
                <p className="text-4xl font-extrabold text-foreground tracking-tight">1982</p>
                <p className="text-muted-foreground text-xs mt-1">
                  {isChinese ? "老字号创立年份" : "Year Founded"}
                </p>
              </div>
              <div className="bg-primary/10 rounded-2xl p-6 text-center border border-primary/25">
                <p className="text-4xl font-extrabold text-foreground tracking-tight">5+</p>
                <p className="text-muted-foreground text-xs mt-1">
                  {isChinese ? "项行业荣誉与资质认证" : "Major Awards & Certifications"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right - Awards Marquee */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="text-primary font-bold mb-2">
                {isChinese ? "品牌声誉" : "Recognition"}
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
                {isChinese ? "获得荣誉与资质认证" : "Awards & Achievements"}
              </h3>
            </div>

            {/* 3D Page Flip Viewer (Background-free & Flipping continuous) */}
            <div className="relative h-[240px] md:h-[280px] w-full flex items-center justify-center overflow-hidden border-y border-border/60 py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, rotateX: 80, y: 60 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  exit={{ opacity: 0, rotateX: -80, y: -60 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute w-full flex flex-col md:flex-row items-center justify-center gap-8 select-none"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Left: Award Emblem / Image Slot */}
                  <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center flex-shrink-0">
                    {awards[activeIndex].image ? (
                      <div className={`relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden transition-all duration-300 ${
                        awards[activeIndex].blendMode === "normal" 
                          ? "bg-stone-950 border border-amber-500/30 p-2 shadow-[0_8px_24px_rgba(0,0,0,0.5)]" 
                          : ""
                      }`}>
                        <Image
                          src={awards[activeIndex].image}
                          alt={awards[activeIndex].title}
                          fill
                          className={`object-contain ${
                            awards[activeIndex].blendMode === "multiply" ? "mix-blend-multiply" : ""
                          }`}
                          priority
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-28 md:w-36 md:h-36 bg-primary/5 rounded-full flex items-center justify-center border border-amber-500/20 shadow-inner">
                        {(() => {
                          const IconComponent = awards[activeIndex].icon;
                          return <IconComponent className="w-14 h-14 md:w-16 md:h-16 text-primary" />;
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Right: Typography */}
                  <div className="text-center md:text-left space-y-3">
                    <h4 className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-foreground via-amber-600 to-amber-700 bg-clip-text text-transparent tracking-wide leading-tight max-w-lg">
                      {awards[activeIndex].title}
                    </h4>
                    <div className="flex justify-center md:justify-start gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-primary text-primary animate-pulse" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Ornate page flip indicators */}
              <div className="absolute left-2 flex flex-col gap-1.5 pointer-events-none">
                {awards.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? "bg-primary scale-125 shadow-[0_0_6px_rgba(245,158,11,0.6)]" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
