"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Trophy, Star, Play, Pause, Flame, Sparkles, Utensils, ShieldCheck, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  lang?: "en" | "zh";
}

export function HeroSection({ lang = "en" }: HeroSectionProps) {
  const isChinese = lang === "zh";
  const [activeMedia, setActiveMedia] = useState<"logo" | "banquet" | "cooking" | "plating" | "hygiene">("banquet");
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const mediaTabs = [
    { id: "logo", labelZh: "金龙徽标", labelEn: "Logo", icon: ImageIcon },
    { 
      id: "banquet", 
      labelZh: "宴席现场", 
      labelEn: "Banquet", 
      icon: Sparkles, 
      src: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c025f73ab7885d3120ae1b114113ae10&profile_id=165&oauth2_token_id=57447761" 
    },
    { 
      id: "cooking", 
      labelZh: "名厨烹饪", 
      labelEn: "Cooking", 
      icon: Flame, 
      src: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27d23d8c76af0a3e81119561de610c14c5c24e7&profile_id=165&oauth2_token_id=57447761" 
    },
    { 
      id: "plating", 
      labelZh: "精致摆盘", 
      labelEn: "Plating", 
      icon: Utensils, 
      src: "https://player.vimeo.com/external/485093774.sd.mp4?s=d00cf05d5e2a2254de85d8c6b7501a35cd21c810&profile_id=165&oauth2_token_id=57447761" 
    },
    { 
      id: "hygiene", 
      labelZh: "安全冷链", 
      labelEn: "Hygiene", 
      icon: ShieldCheck, 
      src: "https://player.vimeo.com/external/538571059.sd.mp4?s=dfbd07a111246c0e5a8fbda6f7ef0cf43878b66f&profile_id=165&oauth2_token_id=57447761" 
    },
  ] as const;

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, activeMedia]);

  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden bg-background">
      {/* Luxurious Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at center, #000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        
        {/* Animated glowing ambient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-amber-500/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] -right-[15%] w-[60%] h-[60%] rounded-full bg-orange-500/15 blur-[130px] mix-blend-multiply dark:mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-[10%] left-[30%] w-[40%] h-[40%] rounded-full bg-yellow-500/15 blur-[100px] mix-blend-multiply dark:mix-blend-screen"
        />

        {/* Noise texture overlay for premium matte finish */}
        <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />
      </div>

      <div className="container relative mx-auto px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 bg-amber-500/10 text-primary-foreground px-5 py-2.5 rounded-full border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)] backdrop-blur-sm select-none cursor-default"
            >
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className="text-base md:text-lg font-black tracking-wider text-amber-700 dark:text-amber-400">
                {isChinese ? "源自 1982 年 • 柔佛士乃老字号" : "Since 1982 • Senai, Johor"}
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight tracking-tight text-balance">
              {isChinese ? (
                <>
                  四十载匠心传承 <br />
                  <span className="text-primary font-black">始于 1982 年</span>
                </>
              ) : (
                <>
                  A Taste Heritage <br />
                  <span className="text-primary font-black">from 1982</span>
                </>
              )}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              {isChinese
                ? "岁月沉淀经典，金龙与您共赴人生每一个重要时刻。"
                : "Time honors classic taste. Kim Long accompanies you through every momentous milestone of life."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                id="btn-hero-order"
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all hover:gap-4 shadow-lg hover:shadow-primary/25 cursor-pointer"
              >
                {isChinese ? "自助估价/咨询" : "Order Now"}
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                id="btn-hero-learn"
                href="#about"
                className="inline-flex items-center justify-center gap-2 border-2 border-foreground/10 text-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-foreground/5 transition-colors cursor-pointer"
              >
                {isChinese ? "探索品牌历史" : "Learn More"}
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-8 border-t border-border">
              <div>
                <p className="text-3xl font-extrabold text-foreground tracking-tight">40+</p>
                <p className="text-muted-foreground text-xs mt-1">
                  {isChinese ? "载非凡历史" : "Years of Heritage"}
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-foreground tracking-tight">5000+</p>
                <p className="text-muted-foreground text-xs mt-1">
                  {isChinese ? "人份每日配给" : "Pax Daily Supplied"}
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-foreground tracking-tight">65</p>
                <p className="text-muted-foreground text-xs mt-1">
                  {isChinese ? "趟物流配送/天" : "Truck Trips/Day"}
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-amber-500 tracking-tight">RM2M</p>
                <p className="text-muted-foreground text-xs mt-1 font-medium">
                  {isChinese ? "RM2,000,000 食品保险" : "RM2,000,000 Food Insurance"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Grand Logo & Video Reveal */}
          <div className="relative flex items-center justify-center min-h-[580px] lg:min-h-[660px] select-none">
            {/* 3D Cosmic golden rings system */}
            <div className="absolute w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] flex items-center justify-center pointer-events-none [perspective:1000px]">
              {/* Ring 1 - Deep outer ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateX: 60, rotateY: -15, rotateZ: 0 }}
                animate={{ opacity: 1, scale: 1, rotateZ: 360 }}
                transition={{
                  opacity: { duration: 1.5, delay: 0.2 },
                  scale: { duration: 1.5, delay: 0.2 },
                  rotateZ: { duration: 25, repeat: Infinity, ease: "linear" }
                }}
                className="absolute w-[280px] h-[280px] sm:w-[440px] sm:h-[440px] md:w-[620px] md:h-[620px] rounded-full border border-dashed border-amber-500/20"
              />

              {/* Ring 2 - Bright middle ring with accent notches */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateX: 65, rotateY: 15, rotateZ: 0 }}
                animate={{ opacity: 1, scale: 1, rotateZ: -360 }}
                transition={{
                  opacity: { duration: 1.5, delay: 0.4 },
                  scale: { duration: 1.5, delay: 0.4 },
                  rotateZ: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
                className="absolute w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] md:w-[540px] md:h-[540px] rounded-full border-2 border-double border-amber-400/10"
              />

              {/* Ring 3 - Inner solid thin ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateX: 55, rotateY: 0, rotateZ: 0 }}
                animate={{ opacity: 0.8, scale: 1, rotateZ: 180 }}
                transition={{
                  opacity: { duration: 1.5, delay: 0.6 },
                  scale: { duration: 1.5, delay: 0.6 },
                  rotateZ: { duration: 15, repeat: Infinity, ease: "linear" }
                }}
                className="absolute w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] md:w-[460px] md:h-[460px] rounded-full border border-amber-300/30"
              />
            </div>

            {/* Animation Container */}
            <div className="relative flex flex-col items-center justify-center z-10 w-full">
              {/* Grand Emblem / Logo / Video window */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{
                  duration: 1.5,
                  delay: 0.6,
                  type: "spring",
                  stiffness: 70,
                  damping: 15,
                }}
                className="relative"
              >
                {/* Classical / Ornate Chinese Window Border */}
                <div className="relative p-2.5 bg-card border-2 border-amber-500/30 rounded-[2.4rem] shadow-2xl">
                  
                  {/* Subtle inner gold frame */}
                  <div className="absolute inset-1 rounded-[2.1rem] border border-amber-500/10 pointer-events-none" />

                  {/* Corner ornate decorative dots */}
                  <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-amber-500 rounded-full" />

                  {/* Actual Media Container */}
                  <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[450px] md:h-[450px] rounded-[1.8rem] overflow-hidden border border-border bg-stone-950">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key="video-media"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="relative w-full h-full"
                      >
                        <video
                          ref={videoRef}
                          src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c025f73ab7885d3120ae1b114113ae10&profile_id=165&oauth2_token_id=57447761"
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover rounded-[1.8rem]"
                        />
                        {/* Play/Pause glassmorphic controller overlay */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsPlaying(!isPlaying);
                          }}
                          className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 hover:bg-black text-white hover:text-amber-500 border border-white/10 transition-colors backdrop-blur-sm shadow-md cursor-pointer z-20"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                        </button>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>



              {/* Sophisticated Typographical Logo Brand Block */}
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 1.2,
                  type: "spring",
                  stiffness: 80,
                }}
                className="mt-8 text-center relative w-full"
              >
                {/* Core Brand Title with 3D Gold Gradient Effect */}
                <div className="overflow-hidden py-1">
                  <motion.h2
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.9,
                      delay: 1.3,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[0.18em] bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-700 bg-clip-text text-transparent uppercase"
                  >
                    {isChinese ? "金龙自助餐" : "KIM LONG"}
                  </motion.h2>
                </div>

                {/* Subtitle with highly spacious spacing */}
                <div className="overflow-hidden mt-1">
                  <motion.p
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.9,
                      delay: 1.6,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className="text-sm md:text-base font-bold tracking-[0.55em] text-amber-600 ml-[0.55em] uppercase"
                  >
                    CATERING
                  </motion.p>
                </div>

                {/* Traditional Chinese Filigree Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 1,
                    delay: 1.9,
                    ease: "easeOut",
                  }}
                  className="my-4 flex items-center justify-center gap-3 w-[220px] mx-auto"
                >
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-500/50" />
                  <div className="w-1.5 h-1.5 bg-amber-500 rotate-45 border border-amber-400" />
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-500/50 to-transparent" />
                </motion.div>

                {/* Brand slogan / timeline with glowing finish */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 2.2 }}
                  className="text-sm md:text-base font-extrabold tracking-[0.2em] text-foreground/95 text-balance max-w-md md:max-w-lg mx-auto"
                >
                  {isChinese ? "在您珍惜的日子里，我们与您同在" : "ESTABLISHED 1982"}
                </motion.p>
              </motion.div>

              {/* Floating ambient fairy sparks */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.75, 0],
                    scale: [0, 1, 0],
                    y: [0, -40, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    delay: 2.5 + i * 0.3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute w-[3px] h-[3px] bg-amber-400 rounded-full pointer-events-none"
                  style={{
                    top: `${35 + Math.sin((i * 36 * Math.PI) / 180) * 38}%`,
                    left: `${50 + Math.cos((i * 36 * Math.PI) / 180) * 38}%`,
                    boxShadow: "0 0 8px 3px rgba(251,191,36,0.6)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

