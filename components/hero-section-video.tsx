"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Trophy, 
  Star, 
  Sparkles, 
  Flame, 
  Utensils, 
  ShieldCheck 
} from "lucide-react";

interface HeroSectionVideoProps {
  lang?: "en" | "zh";
  activeVideoId?: "banquet" | "cooking" | "plating" | "hygiene";
  onChangeVideo?: (id: "banquet" | "cooking" | "plating" | "hygiene") => void;
}

const videoTabs = [
  { id: "banquet", labelZh: "宴席现场", labelEn: "Banquet", icon: Sparkles },
  { id: "cooking", labelZh: "名厨烹饪", labelEn: "Cooking", icon: Flame },
  { id: "plating", labelZh: "精致摆盘", labelEn: "Plating", icon: Utensils },
  { id: "hygiene", labelZh: "安全冷链", labelEn: "Hygiene", icon: ShieldCheck },
] as const;

const videoSources = {
  banquet: {
    local: "/videos/banquet-bg.mp4",
    online: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c025f73ab7885d3120ae1b114113ae10&profile_id=165&oauth2_token_id=57447761"
  },
  cooking: {
    local: "/videos/cooking-bg.mp4",
    online: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27d23d8c76af0a3e81119561de610c14c5c24e7&profile_id=165&oauth2_token_id=57447761"
  },
  plating: {
    local: "/videos/plating-bg.mp4",
    online: "https://player.vimeo.com/external/485093774.sd.mp4?s=d00cf05d5e2a2254de85d8c6b7501a35cd21c810&profile_id=165&oauth2_token_id=57447761"
  },
  hygiene: {
    local: "/videos/hygiene-bg.mp4",
    online: "https://player.vimeo.com/external/538571059.sd.mp4?s=dfbd07a111246c0e5a8fbda6f7ef0cf43878b66f&profile_id=165&oauth2_token_id=57447761"
  }
} as const;

export function HeroSectionVideo({ 
  lang = "en", 
  activeVideoId = "banquet",
  onChangeVideo
}: HeroSectionVideoProps) {
  const isChinese = lang === "zh";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-950 text-white pt-20">
      {/* 局部的视频背景（仅在当前 section 内 absolute 撑满，不作全局固定，随页面滚动自然向上移出视口） */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          key={activeVideoId}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/setup-eco-elegant.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-90 md:scale-[1.8] scale-100 origin-center pointer-events-none transition-transform duration-700"
        >
          <source src={videoSources[activeVideoId].local} type="video/mp4" />
          <source src={videoSources[activeVideoId].online} type="video/mp4" />
          您的浏览器不支持 HTML5 视频。
        </video>
        {/* 金黑色高透奢华局部遮罩：保证视频局部铺满的同时保障前台文字完美易读性 */}
        <div className="absolute inset-0 bg-stone-950/35 z-10 pointer-events-none" />
      </div>

      {/* 1. 动态发光粒子效果（氛围感） */}
      <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
        {mounted && [...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: "100%" }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.2, 0.5],
              y: ["100%", "-20%"],
              x: ["0%", `${(i % 3 - 1) * 30}%`],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-[4px] h-[4px] bg-amber-400 rounded-full"
            style={{
              bottom: "0%",
              left: `${10 + i * 6}%`,
              boxShadow: "0 0 12px 4px rgba(251,191,36,0.4)",
            }}
          />
        ))}
      </div>



      {/* 5. 核心内容层 - 左右双翼翼展式布局，最大宽度拓展为1860px并缩减内边距使左右双翼贴边（指标极佳地向右靠拢），大屏下使整个主体结构向上适度提拉，达成纵向视觉平衡 */}
      <div className="relative w-full max-w-[1860px] mx-auto px-6 md:px-10 lg:px-12 xl:px-4 lg:-mt-16 xl:-mt-28 z-20 flex flex-col lg:flex-row justify-between items-center lg:items-stretch gap-12 pt-8 pb-4">
        
        {/* 左侧翼：品牌高奢文字（完美贴在最左侧的黑色区域） */}
        <div className="flex flex-col items-start text-left space-y-8 lg:space-y-10 w-full lg:max-w-[600px]">
          
          {/* 金色尊贵徽章 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 bg-amber-500/10 text-amber-400 px-6 py-3 rounded-full border border-amber-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.15)] select-none cursor-default"
          >
            <Sparkles className="w-4.5 h-4.5 text-amber-400 animate-pulse" />
            <span className="text-sm md:text-base font-black tracking-widest uppercase">
              {isChinese ? "源自 1982 年 • 柔佛士乃老字号" : "Since 1982 • Senai, Johor"}
            </span>
          </motion.div>

          {/* 奢华尊尊标题设计 */}
          <div className="space-y-4 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-white tracking-tight"
            >
              {isChinese ? (
                <>
                  四十载匠心传承 <br />
                  <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-sm font-black">
                    始于 1982 年
                  </span>
                </>
              ) : (
                <>
                  A Taste Heritage <br />
                  <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-sm font-black">
                    from 1982
                  </span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-stone-300 max-w-2xl font-light leading-relaxed"
            >
              {isChinese ? (
                <>
                  岁月沉淀经典，金龙自助餐与您 <br />
                  共赴人生每一个重要时刻。
                </>
              ) : (
                "Time honors classic taste. Kim Long Catering accompanies you through every momentous milestone of life."
              )}
            </motion.p>
          </div>

          {/* 优雅的单向发光徽章渐变金线 - 左端菱形，向右延展 */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-3.5 w-[280px]"
          >
            <div className="w-2 h-2 bg-amber-400 rotate-45 border border-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-500/80 via-amber-500/30 to-transparent" />
          </motion.div>

          {/* 品牌核心情感口号 (Brand Slogan) */}
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-xl md:text-2xl font-extrabold tracking-[0.2em] bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent"
          >
            {isChinese ? "在您珍惜的日子里，我们与您同在" : "ON THE DAYS YOU CHERISH, WE ARE WITH YOU"}
          </motion.h3>

          {/* 操作按钮组 - 从右侧移至左侧，并放大2号，分上下垂直叠放呈现高奢秩序感 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col gap-3 w-full max-w-[260px] lg:max-w-[220px] mt-4 md:mt-6"
          >
            <a
              id="btn-hero-video-order"
              href="#calculator"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 text-black px-8 py-3.5 rounded-full font-black text-sm md:text-base hover:bg-amber-400 transition-all hover:gap-3 shadow-md hover:shadow-amber-500/20 cursor-pointer w-full text-center select-none"
            >
              {isChinese ? "自助估价/咨询" : "Order Now"}
              <ArrowRight className="w-4.5 h-4.5 text-black" />
            </a>
            <a
              id="btn-hero-video-learn"
              href="#about"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-full font-black text-sm md:text-base transition-colors cursor-pointer w-full text-center backdrop-blur-sm shadow-sm select-none"
            >
              {isChinese ? "品牌历史" : "Our Story"}
            </a>
          </motion.div>

        </div>

        {/* 右侧翼：核心指标统计（无黑屏底板，纯净竖立模式，底部按钮和金线已平移至左翼） */}
        <div className="flex flex-col justify-start items-start lg:items-end w-full lg:max-w-[320px] lg:mt-0 mt-8 text-left lg:text-right z-20 lg:pt-8">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-start lg:items-end gap-5 w-full"
          >
            {/* 核心指标统计 - 纯净竖立模式 */}
            <div className="flex flex-col items-start lg:items-end gap-5 lg:gap-6 w-full">
              
              {/* 指标 1 */}
              <div className="flex flex-col items-start lg:items-end group">
                <span className="text-4xl sm:text-5xl font-black text-amber-400 tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-transform duration-300 origin-left lg:origin-right">
                  40+
                </span>
                <span className="text-stone-200 text-xs sm:text-sm mt-1 font-bold tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  {isChinese ? "载非凡历史" : "Years Heritage"}
                </span>
              </div>

              {/* 指标 2 (新增) */}
              <div className="flex flex-col items-start lg:items-end group">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-transform duration-300 origin-left lg:origin-right">
                  913K+
                </span>
                <span className="text-stone-200 text-xs sm:text-sm mt-1 font-bold tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  {isChinese ? "总数服务客人" : "Total Guests Served"}
                </span>
              </div>

              {/* 指标 3 */}
              <div className="flex flex-col items-start lg:items-end group">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-transform duration-300 origin-left lg:origin-right">
                  5k+
                </span>
                <span className="text-stone-200 text-xs sm:text-sm mt-1 font-bold tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  {isChinese ? "日配给人数" : "Pax Daily"}
                </span>
              </div>

              {/* 指标 4 */}
              <div className="flex flex-col items-start lg:items-end group">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-transform duration-300 origin-left lg:origin-right">
                  65
                </span>
                <span className="text-stone-200 text-xs sm:text-sm mt-1 font-bold tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  {isChinese ? "趟配送车次/天" : "Truck Trips/Day"}
                </span>
              </div>

              {/* 指标 5 */}
              <div className="flex flex-col items-start lg:items-end group">
                <span className="text-3xl sm:text-[40px] font-black text-amber-500 tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-transform duration-300 origin-left lg:origin-right whitespace-nowrap">
                  2MILLION
                </span>
                <span className="text-stone-200 text-xs sm:text-sm mt-1 font-bold tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  {isChinese ? "食品责任险" : "Food Insurance"}
                </span>
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
