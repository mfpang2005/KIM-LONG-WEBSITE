"use client";

import { motion } from "framer-motion";
import { ArrowRight, Trophy, Star } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  lang?: "en" | "zh";
}

export function HeroSection({ lang = "en" }: HeroSectionProps) {
  const isChinese = lang === "zh";

  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-foreground px-4 py-2 rounded-full border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-bold text-foreground">
                {isChinese ? "源自 1982 年 • 柔佛士乃老字号" : "Since 1982 • Senai, Johor"}
              </span>
            </div>

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

          {/* Right Content - Grand Logo Reveal */}
          <div className="relative flex items-center justify-center min-h-[550px] lg:min-h-[620px] select-none">
            {/* 3D Cosmic golden rings system */}
            <div className="absolute w-[500px] h-[500px] flex items-center justify-center pointer-events-none [perspective:1000px]">
              {/* Ring 1 - Deep outer ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateX: 60, rotateY: -15, rotateZ: 0 }}
                animate={{ opacity: 1, scale: 1, rotateZ: 360 }}
                transition={{
                  opacity: { duration: 1.5, delay: 0.2 },
                  scale: { duration: 1.5, delay: 0.2 },
                  rotateZ: { duration: 25, repeat: Infinity, ease: "linear" }
                }}
                className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-amber-500/20"
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
                className="absolute w-[380px] h-[380px] rounded-full border-2 border-double border-amber-400/10"
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
                className="absolute w-[320px] h-[320px] rounded-full border border-amber-300/30"
              />
            </div>

            {/* Animation Container */}
            <div className="relative flex flex-col items-center justify-center z-10">
              {/* Grand Emblem / Logo window */}
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
                {/* Classical / Ornate Chinese Window Border - Extremely clean and flat */}
                <div className="relative p-2.5 bg-card border-2 border-amber-500/30 rounded-[2.4rem]">
                  
                  {/* Subtle inner gold frame */}
                  <div className="absolute inset-1 rounded-[2.1rem] border border-amber-500/10 pointer-events-none" />

                  {/* Corner ornate decorative dots (flat and clean) */}
                  <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-amber-500 rounded-full" />

                  {/* Actual Logo Image container with golden sheen */}
                  <div className="relative w-[230px] h-[230px] md:w-[260px] md:h-[260px] rounded-[1.8rem] overflow-hidden border border-border">
                    <Image
                      src="/images/logo.jpg"
                      alt="Kim Long Catering Logo"
                      fill
                      className="object-cover rounded-[1.8rem] transition-transform duration-700 hover:scale-105"
                      priority
                    />

                    {/* Luxurious metallic sweep effect */}
                    <motion.div
                      initial={{ x: "-150%", opacity: 0 }}
                      animate={{ x: "250%", opacity: [0, 1, 0] }}
                      transition={{
                        duration: 2,
                        delay: 3,
                        repeat: Infinity,
                        repeatDelay: 5,
                      }}
                      className="absolute inset-0 w-[40%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                    />
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
                className="mt-12 text-center relative"
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
                    className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[0.18em] bg-gradient-to-r from-amber-100 via-amber-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] uppercase"
                  >
                    {isChinese ? "金龙自助餐" : "KIM LONG"}
                  </motion.h2>
                </div>

                {/* Subtitle with highly spacious spacing */}
                <div className="overflow-hidden mt-2">
                  <motion.p
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.9,
                      delay: 1.6,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className="text-sm md:text-base font-light tracking-[0.55em] text-amber-200/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] ml-[0.55em] uppercase"
                  >
                    CATERING
                  </motion.p>
                </div>

                {/* Traditional Chinese Filigree Line - symmetric gold separator */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 1,
                    delay: 1.9,
                    ease: "easeOut",
                  }}
                  className="my-5 flex items-center justify-center gap-3 w-[220px] mx-auto"
                >
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-400/50" />
                  <div className="w-1.5 h-1.5 bg-amber-400 rotate-45 border border-amber-300 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-400/50 to-transparent" />
                </motion.div>

                {/* Brand slogan / timeline with glowing finish */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 2.2 }}
                  className="text-xs md:text-sm font-bold tracking-[0.25em] text-foreground/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)] text-balance max-w-sm mx-auto"
                >
                  {isChinese ? "岁月沉淀经典 • 共赴重要时刻" : "ESTABLISHED 1982"}
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
                  className="absolute w-[3px] h-[3px] bg-amber-400 rounded-full"
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
