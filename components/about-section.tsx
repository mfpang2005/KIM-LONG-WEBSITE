"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Star, Trophy, Crown, ShieldCheck, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

/**
 * @file about-section.tsx
 * @description 金龙故事与品牌荣誉板块，支持3D卡片滚动和苏黎世保险原件Lightbox幻灯片预览
 */

// NOTE: 自动服务端媒体文件静默同步拷贝机制
if (typeof window === "undefined") {
  try {
    const fs = require("fs");
    const path = require("path");
    const destDir = "c:\\Users\\User\\Downloads\\KIM LONG WEBSITE\\public\\images";
    
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // 1. 同步原有的四张金色奖牌资质图片 (已将大奖1升级为高清大图)
    const oldSrcDir = "C:\\Users\\User\\.gemini\\antigravity\\brain\\ecae9dbb-99ba-4d55-ab5e-9ce60b9b2ed8";
    const oldAwardsMap = {
      "media__1779239558955.png": "award-2.png",
      "media__1779239559068.jpg": "award-3.jpg",
      "media__1779239624122.png": "award-4.png"
    };
    for (const [srcFile, destFile] of Object.entries(oldAwardsMap)) {
      const srcPath = path.join(oldSrcDir, srcFile);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, path.join(destDir, destFile));
      }
    }

    // 2. 同步最新的食品安全与公共责任保险单图片 (来自当前 Conversation)
    const newSrcDir = "C:\\Users\\User\\.gemini\\antigravity\\brain\\d9ab8f54-bb12-4b41-b6e9-2258e3fb306d";
    const newAwardsMap = {
      "media__1779276669903.jpg": "food-safety-1.jpg",
      "media__1779276669909.jpg": "food-safety-2.jpg",
      "media__1779276669911.jpg": "food-safety-3.jpg",
      "media__1779276669903.jpg": "food-safety-insurance.jpg",
      "media__1779276801319.jpg": "pipa-duck.jpg",
      "media__1779277404656.png": "award-1.png"
    };
    for (const [srcFile, destFile] of Object.entries(newAwardsMap)) {
      const srcPath = path.join(newSrcDir, srcFile);
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
    { icon: Award, title: "Malaysia Top Achievers 2019", image: "/images/award-3.jpg", blendMode: "normal" },
    { icon: Crown, title: "World Gourmet Award", image: "/images/award-4.png", blendMode: "multiply" },
    { icon: ShieldCheck, title: "Food Safety & Public Liability Insurance", image: "/images/food-safety-insurance.jpg", blendMode: "normal" },
  ],
  zh: [
    { icon: Trophy, title: "世界传统美食大奖 2023", image: "/images/award-1.png", blendMode: "normal" },
    { icon: Star, title: "国家消费者首选品牌大奖 (MTPN)", image: "/images/award-2.png", blendMode: "multiply" },
    { icon: Award, title: "马来西亚杰出企业大奖 2019", image: "/images/award-3.jpg", blendMode: "normal" },
    { icon: Crown, title: "世界美食奖", image: "/images/award-4.png", blendMode: "multiply" },
    { icon: ShieldCheck, title: "食品安全与公共责任保险认证", image: "/images/food-safety-insurance.jpg", blendMode: "normal" },
  ],
};


interface AboutSectionProps {
  lang?: "en" | "zh";
}

export function AboutSection({ lang = "en" }: AboutSectionProps) {
  const isChinese = lang === "zh";
  const awards = awardsData[lang];
  const [activeIndex, setActiveIndex] = useState(0);

  // NOTE: 声明高级 Lightbox 状态用于高清证书原件大图展示
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxTitle, setLightboxTitle] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // NOTE: 监听 ESC 键盘按键以关闭 Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // NOTE: 点击图片或提示时触发高清大图 Lightbox 预览
  const handleImageClick = () => {
    if (activeIndex === 4) {
      setLightboxImages([
        "/images/food-safety-1.jpg",
        "/images/food-safety-2.jpg",
        "/images/food-safety-3.jpg"
      ]);
      setLightboxTitle(
        isChinese 
          ? "苏黎世保险 (Zurich) - 食品安全与公共责任保险证书" 
          : "Zurich Insurance - Food Safety & Public Liability Insurance"
      );
    } else {
      setLightboxImages([awards[activeIndex].image!]);
      setLightboxTitle(awards[activeIndex].title);
    }
    setCurrentImageIndex(0);
    setIsLightboxOpen(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      // 开启大图预览时暂停自动旋转
      if (!isLightboxOpen) {
        setActiveIndex((prev) => (prev + 1) % awards.length);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [awards.length, isLightboxOpen]);

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
                      <div 
                        onClick={handleImageClick}
                        className={`group relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                          awards[activeIndex].blendMode === "normal" 
                            ? "bg-stone-950 border border-amber-500/30 p-2 shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:border-amber-400" 
                            : "hover:scale-105"
                        }`}
                      >
                        <Image
                          src={awards[activeIndex].image}
                          alt={awards[activeIndex].title}
                          fill
                          className={`object-contain transition-transform duration-300 group-hover:scale-105 ${
                            awards[activeIndex].blendMode === "multiply" ? "mix-blend-multiply" : ""
                          }`}
                          priority
                        />
                        {/* NOTE: 精美 Hover 遮罩层 */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1.5 backdrop-blur-[2px]">
                          <Eye className="w-6 h-6 md:w-8 md:h-8 text-amber-500 animate-pulse" />
                          <span className="text-[10px] md:text-xs text-white font-semibold tracking-wider">
                            {isChinese ? "点击查看原件" : "Click to View"}
                          </span>
                        </div>
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
                    <div className="flex flex-col items-center md:items-start gap-2">
                      <div className="flex justify-center md:justify-start gap-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-primary text-primary animate-pulse" />
                        ))}
                      </div>
                      {/* NOTE: 高清原件大图快速预览链接 */}
                      {awards[activeIndex].image && (
                        <button
                          onClick={handleImageClick}
                          className="mt-1 flex items-center gap-1.5 text-xs text-amber-500/80 hover:text-amber-400 font-medium transition-colors group"
                        >
                          <Eye className="w-3.5 h-3.5 group-hover:animate-bounce" />
                          <span>
                            {isChinese ? "💡 点击查看高清官方保单/证书原件" : "💡 Click to view high-res official document"}
                          </span>
                        </button>
                      )}
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

      {/* NOTE: 尊享高清大图幻灯片预览弹窗 (Lightbox) */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* 右上角关闭按钮 */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 z-55 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 border border-white/10 shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>

            {/* 弹窗主体 */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-4xl w-full h-[85vh] md:h-[80vh] flex flex-col items-center justify-between rounded-3xl border border-white/15 bg-stone-900/60 p-6 md:p-8 shadow-[0_24px_50px_rgba(0,0,0,0.8)] backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 头部标题与分页信息 */}
              <div className="text-center w-full pb-4 border-b border-white/10">
                <h4 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
                  {lightboxTitle}
                </h4>
                {lightboxImages.length > 1 && (
                  <p className="text-xs md:text-sm text-stone-400 mt-1">
                    {isChinese 
                      ? `官方保单原件（共 ${lightboxImages.length} 页，当前第 ${currentImageIndex + 1} 页）` 
                      : `Official Policy Document (${currentImageIndex + 1} of ${lightboxImages.length})`}
                  </p>
                )}
              </div>

              {/* 中间大图展示与左右翻页 */}
              <div className="relative flex-1 w-full flex items-center justify-center my-4 overflow-hidden">
                {lightboxImages.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
                    }}
                    className="absolute left-2 md:left-4 z-10 p-3 rounded-full bg-black/50 hover:bg-amber-600 hover:scale-105 border border-white/10 text-white transition-all duration-300 active:scale-95"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                <div className="relative w-full h-full max-h-[50vh] md:max-h-[55vh] flex items-center justify-center">
                  <Image
                    src={lightboxImages[currentImageIndex]}
                    alt={`${lightboxTitle} - Page ${currentImageIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority
                  />
                </div>

                {lightboxImages.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length);
                    }}
                    className="absolute right-2 md:right-4 z-10 p-3 rounded-full bg-black/50 hover:bg-amber-600 hover:scale-105 border border-white/10 text-white transition-all duration-300 active:scale-95"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* 底部缩略图与说明文字 */}
              <div className="w-full pt-4 border-t border-white/10 flex flex-col items-center gap-3">
                {/* 缩略图栏 */}
                {lightboxImages.length > 1 && (
                  <div className="flex gap-3 justify-center">
                    {lightboxImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative w-12 h-16 md:w-16 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          idx === currentImageIndex 
                            ? "border-amber-500 scale-105 shadow-[0_0_8px_rgba(245,158,11,0.5)]" 
                            : "border-white/10 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image src={img} alt="thumb" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* 针对食品安全保单的具体描述 */}
                {activeIndex === 4 && (
                  <p className="text-[10px] md:text-xs text-stone-400 max-w-xl text-center leading-relaxed">
                    {currentImageIndex === 0 && (
                      isChinese 
                        ? "第一页：苏黎世保险公司商业保障单 (Z Bizguard Declaration)。承保名称：KIM LONG CATERING SDN. BHD.，保单有效期：2025年12月16日至2026年12月15日。"
                        : "Page 1: Zurich Bizguard Declaration. Insured: KIM LONG CATERING SDN. BHD. Period of Insurance: 16 Dec 2025 to 15 Dec 2026."
                    )}
                    {currentImageIndex === 1 && (
                      isChinese 
                        ? "第二页：公众责任险保障范围。包含 Defective Sanitary 卫生缺陷责任保障及食品饮料特约保险条款 (Food & Drinks Clause)，全面确保餐食安全与第三方权益。"
                        : "Page 2: Public Liability Insurance detail containing Defective Sanitary endorsement and Food & Drinks Clause, fully protecting catering safety."
                    )}
                    {currentImageIndex === 2 && (
                      isChinese 
                        ? "第三页：苏黎世保险正式发票与保费收据。金龙自助餐已按期全额缴纳保费，获得商业金盾防线，让您的宴席无后顾之忧。"
                        : "Page 3: Zurich Insurance Official Invoice & Receipt. Premium paid in full for complete catering enterprise protection."
                    )}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
