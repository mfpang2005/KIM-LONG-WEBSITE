"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
} from "lucide-react";

// NOTE: 两段宣传视频的本地路径，通过 onEnded 事件实现无缝轮流播放
const HERO_VIDEOS = [
  "/videos/banquet-bg.mp4",
  "/videos/banquet-bg-2.mp4",
] as const;

interface HeroSectionVideoProps {
  lang?: "en" | "zh";
  /** 保留旧接口兼容性，但内部不再使用 tab 切换逻辑 */
  activeVideoId?: string;
  onChangeVideo?: (id: string) => void;
}

export function HeroSectionVideo({ 
  lang = "en", 
}: HeroSectionVideoProps) {
  const isChinese = lang === "zh";
  const [mounted, setMounted] = useState(false);

  // NOTE: 追踪当前播放的视频索引（0 或 1），用于控制交叉淡入淡出
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * 当当前视频播放结束时，切换到另一个视频并开始播放
   * 通过 CSS opacity 过渡实现柔和的交叉淡入淡出效果
   */
  const handleVideoEnded = useCallback(() => {
    setCurrentVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
  }, []);

  // 协调两个视频的真正播放状态，绕过浏览器的 Autoplay 拦截
  useEffect(() => {
    if (!mounted) return;

    const playCurrentVideo = () => {
      const activeRef = currentVideoIndex === 0 ? videoRefA.current : videoRefB.current;
      const inactiveRef = currentVideoIndex === 0 ? videoRefB.current : videoRefA.current;

      // 暂停不活跃的视频
      if (inactiveRef) {
        try {
          inactiveRef.pause();
        } catch (e) {
          // 静默捕获
        }
      }

      // 播放当前活动视频
      if (activeRef) {
        try {
          activeRef.muted = true; // 极其重要：在 JS 里显式重置 muted，防止 React 水合丢失导致浏览器拦截自动播放
          activeRef.playsInline = true;
          
          const playPromise = activeRef.play();
          if (playPromise !== undefined) {
            playPromise.catch((err) => {
              console.warn("自动播放被浏览器拦截或视频文件太大尚未缓冲就绪:", err);
            });
          }
        } catch (error) {
          console.warn("视频播放出错:", error);
        }
      }
    };

    // 初始化或视频切换时立即尝试播放
    playCurrentVideo();

    // 交互唤醒机制：一旦用户在页面上有点击、滚动、触摸操作，强制触发再次播放
    const handleUserInteraction = () => {
      playCurrentVideo();
      // 触发一次后立即移除监听器，避免性能开销
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);
    window.addEventListener("scroll", handleUserInteraction);

    return () => {
      cleanupListeners();
    };
  }, [mounted, currentVideoIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-950 text-white pt-20">
      {/* 双视频交叉淡入淡出层：两个 <video> 始终存在于 DOM 中，仅通过 opacity 切换可见性 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* 视频 A - 直接绑定 src 属性以解决 React 动态子 source 标签在特定浏览器下不触发加载与播放的巨坑 */}
        <video
          ref={videoRefA}
          src={HERO_VIDEOS[0]}
          autoPlay
          muted
          playsInline
          onEnded={currentVideoIndex === 0 ? handleVideoEnded : undefined}
          poster="/images/setup-eco-elegant.jpg"
          className="absolute inset-0 w-full h-full object-cover md:scale-[1.8] scale-100 origin-center pointer-events-none"
          style={{
            opacity: currentVideoIndex === 0 ? 0.9 : 0,
            transition: "opacity 1.2s ease-in-out",
          }}
        />

        {/* 视频 B - 直接绑定 src 属性以解决 React 动态子 source 标签在特定浏览器下不触发加载与播放的巨坑 */}
        <video
          ref={videoRefB}
          src={HERO_VIDEOS[1]}
          autoPlay
          muted
          playsInline
          onEnded={currentVideoIndex === 1 ? handleVideoEnded : undefined}
          poster="/images/setup-eco-elegant.jpg"
          className="absolute inset-0 w-full h-full object-cover scale-100 origin-center pointer-events-none"
          style={{
            opacity: currentVideoIndex === 1 ? 0.9 : 0,
            transition: "opacity 1.2s ease-in-out",
          }}
        />

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



      {/* 5. 核心内容层 - 整体下移并向右偏移，营造商务大气的居中偏左视觉重心 */}
      <div className="relative w-full max-w-[1860px] mx-auto px-6 md:px-10 lg:px-16 xl:px-8 z-20 flex flex-col lg:flex-row justify-between items-center lg:items-stretch gap-12 pt-10 md:pt-12 pb-4">
        
        {/* 左侧翼：品牌商务文字（向右偏移，提升视觉层次） */}
        <div className="flex flex-col items-start text-left space-y-7 lg:space-y-9 w-full lg:max-w-[620px] pl-2 md:pl-6 lg:pl-10">
          
          {/* 金色尊贵徽章 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 bg-amber-500/10 text-amber-400 px-5 py-2.5 rounded-full border border-amber-500/25 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.12)] select-none cursor-default"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase">
              {isChinese ? "源自 1982 年 • 柔佛士乃老字号" : "Since 1982 • Senai, Johor"}
            </span>
          </motion.div>

          {/* 奢华尊尊标题设计 */}
          <div className="space-y-4 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] text-white tracking-wide"
            >
              {isChinese ? (
                <>
                  四十载匠心传承 <br />
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent drop-shadow-sm font-extrabold">
                    始于 1982 年
                  </span>
                </>
              ) : (
                <>
                  A Taste Heritage <br />
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent drop-shadow-sm font-extrabold">
                    from 1982
                  </span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg text-stone-300/90 max-w-xl font-normal leading-[1.8] tracking-wide border-l-2 border-amber-500/30 pl-4"
            >
              {isChinese ? (
                <>
                  岁月沉淀经典，金龙为您提供顶级的新山自由餐与新山伙食。 <br />
                  作为专业伙食承包商，我们的服务覆盖 JB, Skudai 及 Kulai，与您共赴人生重要时刻。
                </>
              ) : (
                "Time honors classic taste. Providing premium JB catering and Johor catering services across Skudai and Kulai. We accompany you through every momentous milestone."
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
            className="text-lg md:text-xl font-semibold tracking-[0.3em] uppercase bg-gradient-to-r from-amber-200/90 via-amber-400 to-yellow-400 bg-clip-text text-transparent"
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
              className="inline-flex items-center justify-center gap-2 bg-amber-500 text-black px-8 py-3 rounded-full font-bold text-sm tracking-wider hover:bg-amber-400 transition-all hover:gap-3 shadow-md hover:shadow-amber-500/20 cursor-pointer w-full text-center select-none"
            >
              {isChinese ? "自助估价/咨询" : "Order Now"}
              <ArrowRight className="w-4.5 h-4.5 text-black" />
            </a>
            <a
              id="btn-hero-video-learn"
              href="#about"
              className="inline-flex items-center justify-center bg-white/8 hover:bg-white/15 text-white border border-white/15 px-8 py-3 rounded-full font-bold text-sm tracking-wider transition-colors cursor-pointer w-full text-center backdrop-blur-sm shadow-sm select-none"
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
