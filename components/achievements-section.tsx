"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Star, X } from "lucide-react";
import Image from "next/image";

const achievementsData = {
  en: [
    {
      title: "International Prestige Brand Award 2019",
      year: "2019",
      desc: "Jim Long Restaurant was highly honored to receive the prestigious International Prestige Brand Award (Brand of the Year) in 2019, cementing our reputation as a trusted Chinese catering brand.",
      image: "/images/achievement-1.jpg"
    },
    {
      title: "Famous Gourmet Award 2024 (Charcoal Roasted Pipa Duck)",
      year: "2024",
      desc: "Our legendary heritage Charcoal Roasted Pipa Duck won the global Famous Gourmet Award 2024, personally recognized by culinary master chefs for its authentic three-generation flavor.",
      image: "/images/achievement-2.jpg"
    },
    {
      title: "National Consumers' Choice Award (MTPN)",
      year: "2020",
      desc: "Awarded the highly recognized Consumers' Choice Award by the National Consumer Action Council (MTPN), representing outstanding public trust in our quality, safety, and service.",
      image: "/images/achievement-3.jpg"
    },
    {
      title: "Asia Pacific Excellence Brand Recognition 2019",
      year: "2019",
      desc: "Inducted into the Asia Pacific Book of The Top Recognition 2019, celebrating our industry leadership, cold-chain standardization, and large-scale banquet setups.",
      image: "/images/achievement-4.jpg"
    }
  ],
  zh: [
    {
      title: "国际至尊品牌大奖・年度品牌（2019）",
      year: "2019",
      desc: "金龙饭店荣获 2019 国际至尊品牌大奖（年度品牌大奖），代表新马餐饮界的顶尖品质信誉与三代老字号的金字招牌。",
      image: "/images/achievement-1.jpg"
    },
    {
      title: "世界非遗美食大奖・食神驾到（2024）",
      year: "2024",
      desc: "招牌炭烧琵琶鸭荣获 2024 世界非遗传统美食大奖。由国际名厨亲自莅临颁发，纯手工传世技艺，深受马新顾客推崇。",
      image: "/images/achievement-2.jpg"
    },
    {
      title: "国家消费者首选品牌大奖 (MTPN)",
      year: "2020",
      desc: "荣获国家消费人行动议会（MTPN）颁发的消费者首选大奖，彰显广大顾客对我们食品安全、优质服务和极佳口碑的高度认可。",
      image: "/images/achievement-3.jpg"
    },
    {
      title: "亚太杰出品牌至高荣誉认证（2019）",
      year: "2019",
      desc: "入选亚太杰出品牌至高荣誉纪录册，全方位展现了我们在大型高规格外烩、冷链配送以及宴会出品上的区域领军实力。",
      image: "/images/achievement-4.jpg"
    }
  ]
};

interface AchievementsSectionProps {
  lang?: "en" | "zh";
}

export function AchievementsSection({ lang = "en" }: AchievementsSectionProps) {
  const isChinese = lang === "zh";
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const list = achievementsData[lang];

  return (
    <section id="achievements" className="py-24 bg-stone-900/10 border-y border-stone-200/10">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-500 tracking-wider uppercase">
            <Crown className="w-3.5 h-3.5" />
            {isChinese ? "真实荣誉与颁奖现场" : "Ceremony & True Achievements"}
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">
            {isChinese ? "载誉前行，见证金龙非凡时刻" : "A Legacy of Trust, Awarded & Celebrated"}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            {isChinese 
              ? "每一张现场颁奖大照，都承载着金龙餐饮几十年来对卫生管理、卓越风味与食客信任的庄严承诺。" 
              : "Every ceremony photo represents Kim Long Catering's decade-long commitment to premium flavors, absolute hygiene safety, and outstanding customer trust."}
          </p>
        </div>

        {/* Dynamic High-Res Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {list.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col bg-background border border-border/40 hover:border-amber-500/30 rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Box */}
              <div 
                onClick={() => setActivePhoto(idx)}
                className="relative aspect-[4/3] bg-stone-950 overflow-hidden cursor-zoom-in group-hover:opacity-95 transition-opacity"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
                  priority
                />
                
                {/* Gold Year Badge */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-amber-500/20 text-[10px] font-bold text-amber-500 tracking-wider">
                  {item.year}
                </div>
              </div>

              {/* Text Area */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-foreground text-base tracking-wide leading-snug group-hover:text-amber-500 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-4">
                    {item.desc}
                  </p>
                </div>
                
                {/* Click action indicator */}
                <button 
                  onClick={() => setActivePhoto(idx)}
                  className="text-left text-[11px] font-semibold text-primary/80 group-hover:text-primary transition-colors flex items-center gap-1 mt-2 cursor-pointer"
                >
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500 animate-pulse" />
                  {isChinese ? "点击全屏放大查看" : "Click to view full photo"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Luxury Lightbox Modal Zoom popup */}
      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-4xl w-full bg-stone-950 border border-amber-500/20 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo Box */}
              <div className="relative w-full aspect-[4/3] max-h-[80vh]">
                <Image
                  src={list[activePhoto].image}
                  alt={list[activePhoto].title}
                  fill
                  className="object-contain"
                  priority
                />

                {/* Elegant textual footer info inside modal */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 md:p-8 text-white pt-24">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-xs font-bold text-amber-400 mb-2">
                    {list[activePhoto].year} {isChinese ? "年度大奖" : "Annual Award"}
                  </span>
                  <h4 className="text-xl md:text-3xl font-black text-amber-500 tracking-wide">
                    {list[activePhoto].title}
                  </h4>
                  <p className="text-stone-300 text-xs md:text-sm mt-3 leading-relaxed max-w-3xl">
                    {list[activePhoto].desc}
                  </p>
                </div>

                {/* Closing Button */}
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 hover:bg-black text-white hover:text-amber-500 border border-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
