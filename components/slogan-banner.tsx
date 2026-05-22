"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

interface SloganBannerProps {
  lang?: "en" | "zh";
}

/**
 * SloganBanner 组件 - 首页豪华品牌精神宣言横幅
 * @param lang 当前语言，支持 "en" | "zh"
 */
export function SloganBanner({ lang = "zh" }: SloganBannerProps) {
  const isChinese = lang === "zh";

  return (
    <section className="relative w-full py-16 md:py-20 overflow-hidden bg-stone-950 border-y border-amber-500/20">
      {/* NOTE: 奢华底层流光背景，营造高级感 */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]" />
        {/* 金色粒子微弱飘动效果 */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{
              opacity: [0, 0.4, 0],
              y: [-10, -80],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 bg-amber-400 rounded-full"
            style={{
              top: `${60 + (i % 3) * 10}%`,
              left: `${15 + i * 14}%`,
              boxShadow: "0 0 10px 2px rgba(251,191,36,0.3)",
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center space-y-6 md:space-y-8"
        >
          {/* 精致的小装饰图标 */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex p-3 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
          >
            <Heart className="w-5 h-5 fill-amber-500/25 animate-pulse" />
          </motion.div>

          {/* Slogan 主副标题精细排版 */}
          <div className="space-y-4 max-w-4xl px-4">
            {isChinese ? (
              <>
                {/* 中文主标题：极富感染力的大字，金色渐变发光 */}
                <motion.h2 
                  initial={{ filter: "blur(8px)", opacity: 0 }}
                  whileInView={{ filter: "blur(0px)", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[0.25em] leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-[0_2px_10px_rgba(245,158,11,0.15)] mr-[-0.25em]"
                >
                  在您珍惜的日子里，我们与您同在
                </motion.h2>
                
                {/* 英文副标题：高端拉开字间距 */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.7 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="text-xs sm:text-sm md:text-base font-bold tracking-[0.4em] text-stone-400 uppercase mt-4 mr-[-0.4em]"
                >
                  On the days you cherish, we are always with you
                </motion.p>
              </>
            ) : (
              <>
                {/* 英文主标题：极富感染力的大字，金色渐变发光 */}
                <motion.h2
                  initial={{ filter: "blur(8px)", opacity: 0 }}
                  whileInView={{ filter: "blur(0px)", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-[0.18em] leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-[0_2px_10px_rgba(245,158,11,0.15)] uppercase"
                >
                  On the days you cherish, we are always with you
                </motion.h2>

                {/* 中文副标题：高端拉开字间距 */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.8 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="text-base sm:text-lg md:text-xl font-extrabold tracking-[0.3em] text-stone-300 mt-4 mr-[-0.3em]"
                >
                  在您珍惜的日子里，我们与您同在
                </motion.p>
              </>
            )}
          </div>

          {/* 古典精致金线装饰 */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="flex items-center justify-center gap-4 w-[280px] sm:w-[360px]"
          >
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-500/40" />
            <Sparkles className="w-4.5 h-4.5 text-amber-400 animate-pulse flex-shrink-0" />
            <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-500/40 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
