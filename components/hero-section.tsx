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
                ? "金龙自助餐（Golden Dragon Buffet）不仅是极致感官的美食盛宴，更是您与挚爱亲友生命中每一个重要且珍贵时刻的温情见证。"
                : "Golden Dragon Buffet is not merely a dining experience; it is also a testament to the significant moments in your life."}
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
            <div className="flex gap-8 pt-8 border-t border-border">
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
            </div>
          </motion.div>

          {/* Right Content - Grand Logo Reveal */}
          <div className="relative flex items-center justify-center min-h-[500px]">
            {/* Radial light burst background */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-[600px] h-[600px] bg-gradient-radial from-primary/30 via-primary/10 to-transparent rounded-full blur-2xl" />
            </motion.div>

            {/* Rotating golden rings */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="absolute w-[400px] h-[400px]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-full border-2 border-primary/30 border-dashed"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="absolute w-[340px] h-[340px]"
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-full border border-primary/20"
              />
            </motion.div>

            {/* Animation Container */}
            <div className="relative flex flex-col items-center justify-center">
              {/* Logo Grand Entrance */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotateY: -180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.8,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                className="relative"
              >
                {/* Outer glow pulse */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0, 0.6, 0.3, 0.6, 0.3],
                    scale: [0.8, 1.1, 1.05, 1.1, 1.05],
                  }}
                  transition={{
                    duration: 3,
                    delay: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute -inset-8 bg-primary/40 rounded-3xl blur-2xl"
                />

                {/* Secondary glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{
                    duration: 2,
                    delay: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute -inset-4 bg-gradient-to-br from-primary/50 via-yellow-400/30 to-primary/50 rounded-2xl blur-xl"
                />

                {/* Logo with frame */}
                <motion.div
                  initial={{ boxShadow: "0 0 0 0 rgba(250, 204, 21, 0)" }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(250, 204, 21, 0)",
                      "0 0 60px 20px rgba(250, 204, 21, 0.4)",
                      "0 0 40px 10px rgba(250, 204, 21, 0.2)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    delay: 1.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src="/images/logo.jpg"
                    alt="Kim Long Catering Logo"
                    width={280}
                    height={280}
                    className="rounded-2xl"
                    priority
                  />

                  {/* Shine sweep effect */}
                  <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "200%", opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.5,
                      delay: 2.5,
                      repeat: Infinity,
                      repeatDelay: 4,
                    }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                  />
                </motion.div>

                {/* Corner decorations */}
                {[0, 90, 180, 270].map((rotation, i) => (
                  <motion.div
                    key={rotation}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 2 + i * 0.1 }}
                    className="absolute w-6 h-6"
                    style={{
                      top: rotation === 0 || rotation === 90 ? -12 : "auto",
                      bottom: rotation === 180 || rotation === 270 ? -12 : "auto",
                      left: rotation === 0 || rotation === 270 ? -12 : "auto",
                      right: rotation === 90 || rotation === 180 ? -12 : "auto",
                    }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                      className="w-full h-full"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Brand Text Reveal */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 2.5,
                  type: "spring",
                  stiffness: 100,
                }}
                className="mt-10 text-center"
              >
                {/* KIM LONG text */}
                <motion.div className="overflow-hidden">
                  <motion.h2
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 2.6,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    className="text-5xl md:text-6xl font-black text-foreground tracking-widest"
                  >
                    {isChinese ? "金龙自助餐" : "KIM LONG"}
                  </motion.h2>
                </motion.div>

                {/* CATERING text */}
                <motion.div className="overflow-hidden mt-2">
                  <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 2.9,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    className="text-xl md:text-2xl font-light text-primary tracking-[0.4em]"
                  >
                    CATERING
                  </motion.p>
                </motion.div>

                {/* Underline decoration */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 3.2,
                    ease: "easeOut",
                  }}
                  className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent origin-center"
                />

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 3.5 }}
                  className="mt-4 text-muted-foreground text-xs font-bold tracking-widest"
                >
                  {isChinese ? "始于 1982 • 诚信服务" : "SINCE 1982"}
                </motion.p>
              </motion.div>

              {/* Sparkle particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: 2.5 + i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="absolute w-1 h-1 bg-primary rounded-full"
                  style={{
                    top: `${20 + Math.sin((i * 45 * Math.PI) / 180) * 45}%`,
                    left: `${50 + Math.cos((i * 45 * Math.PI) / 180) * 45}%`,
                    boxShadow: "0 0 6px 2px rgba(250, 204, 21, 0.6)",
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
