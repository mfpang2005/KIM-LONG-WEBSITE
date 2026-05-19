"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Star, Trophy, Crown } from "lucide-react";
import Image from "next/image";

const awardsData = {
  en: [
    { icon: Trophy, title: "Malaysia Top Heritage Award 2019", image: "/images/award-1.png" },
    { icon: Star, title: "Consumer's Choice Award 2020", image: "/images/award-2.png" },
    { icon: Award, title: "The Asia Pacific Book of The Top Recognition 2019", image: "/images/award-3.png" },
    { icon: Crown, title: "World Heritage Food Recognition", image: "/images/award-4.png" },
  ],
  zh: [
    { icon: Trophy, title: "马来西亚老字号传统经典品牌奖 2019", image: "/images/award-1.png" },
    { icon: Star, title: "国家消费者首选品牌大奖 2020", image: "/images/award-2.png" },
    { icon: Award, title: "亚太杰出品牌至高荣誉认证 2019", image: "/images/award-3.png" },
    { icon: Crown, title: "世界非遗美食文化传承奖", image: "/images/award-4.png" },
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

            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
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
            <div className="relative h-[180px] w-full flex items-center justify-center overflow-hidden border-y border-border/60 py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, rotateX: 80, y: 40 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  exit={{ opacity: 0, rotateX: -80, y: -40 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute w-full flex flex-col md:flex-row items-center justify-center gap-6 select-none"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Left: Award Emblem / Image Slot (Background-free) */}
                  <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
                    {awards[activeIndex].image ? (
                      <div className="relative w-20 h-20">
                        <Image
                          src={awards[activeIndex].image}
                          alt={awards[activeIndex].title}
                          fill
                          className="object-contain animate-pulse"
                          priority
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center border border-amber-500/20">
                        {(() => {
                          const IconComponent = awards[activeIndex].icon;
                          return <IconComponent className="w-10 h-10 text-primary" />;
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Right: Typography (Clean & Transparent) */}
                  <div className="text-center md:text-left space-y-2">
                    <h4 className="text-xl md:text-2xl font-black bg-gradient-to-r from-foreground via-amber-600 to-amber-700 bg-clip-text text-transparent tracking-wide leading-tight max-w-md">
                      {awards[activeIndex].title}
                    </h4>
                    <div className="flex justify-center md:justify-start gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary animate-pulse" />
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

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 rounded-2xl p-6 text-center border border-primary/25">
                <p className="text-4xl font-extrabold text-foreground tracking-tight">1982</p>
                <p className="text-muted-foreground text-xs mt-1">
                  {isChinese ? "老字号创立年份" : "Year Founded"}
                </p>
              </div>
              <div className="bg-primary/10 rounded-2xl p-6 text-center border border-primary/25">
                <p className="text-4xl font-extrabold text-foreground tracking-tight">4+</p>
                <p className="text-muted-foreground text-xs mt-1">
                  {isChinese ? "项重量级行业大奖" : "Major Industry Awards"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
