"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Star, Trophy, Crown, ShieldCheck, Eye, X, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import Image from "next/image";

/**
 * @file about-section.tsx
 * @description 金龙故事与品牌荣誉板块，支持3D卡片滚动和苏黎世保险原件Lightbox幻灯片预览
 */

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
  const [selectedAwardIndex, setSelectedAwardIndex] = useState<number | null>(null);

  // NOTE: 声明高级 Lightbox 状态用于高清证书原件大图展示
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxTitle, setLightboxTitle] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // NOTE: 轮流滚动状态
  const [isHovered, setIsHovered] = useState(false);
  const [awardQueue, setAwardQueue] = useState(() => awards.map((a, i) => ({...a, originalIndex: i})));

  useEffect(() => {
    setAwardQueue(awards.map((a, i) => ({...a, originalIndex: i})));
  }, [awards]);

  useEffect(() => {
    if (isHovered || isLightboxOpen) return;
    const timer = setInterval(() => {
      setAwardQueue((prev) => {
        const next = [...prev];
        const first = next.shift();
        if (first) next.push(first);
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, isLightboxOpen]);

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
  const handleImageClick = (index: number) => {
    setSelectedAwardIndex(index);
    if (index === 4) {
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
      setLightboxImages([awards[index].image!]);
      setLightboxTitle(awards[index].title);
    }
    setCurrentImageIndex(0);
    setIsLightboxOpen(true);
  };

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

            {/* Stats Grid - 经过尺寸控制与精致质感重构的数据卡片 */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 pt-6 max-w-lg">
              {/* Card 1: 1982 - 历史积淀卡片，配备专属日历图标与轻量阴影动效 */}
              <div className="group relative bg-white/70 dark:bg-stone-900/40 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-amber-500/15 hover:border-amber-500/35 hover:bg-white dark:hover:bg-stone-900/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[140px] md:min-h-[160px]">
                <div className="flex justify-between items-center mb-2">
                  <div className="p-2 bg-amber-500/10 rounded-xl text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white duration-300">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] tracking-wider font-semibold text-amber-600/60 group-hover:text-amber-600 transition-colors duration-300">
                    {isChinese ? "品牌创立" : "Heritage"}
                  </span>
                </div>
                <div className="text-right">
                  <h4 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent tracking-tight">
                    1982
                  </h4>
                  <p className="text-stone-600 dark:text-stone-400 text-xs md:text-sm font-medium mt-1 leading-snug">
                    {isChinese ? "老字号创立年份" : "Year Founded"}
                  </p>
                </div>
                {/* 悬浮微光装饰 */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-amber-500/5 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card 2: 5+ - 荣誉认证卡片，配备奖杯图标与品牌色调呼应 */}
              <div className="group relative bg-white/70 dark:bg-stone-900/40 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-amber-500/15 hover:border-amber-500/35 hover:bg-white dark:hover:bg-stone-900/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[140px] md:min-h-[160px]">
                <div className="flex justify-between items-center mb-2">
                  <div className="p-2 bg-amber-500/10 rounded-xl text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white duration-300">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] tracking-wider font-semibold text-amber-600/60 group-hover:text-amber-600 transition-colors duration-300">
                    {isChinese ? "品质卓越" : "Awards"}
                  </span>
                </div>
                <div className="text-right">
                  <h4 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent tracking-tight">
                    5+
                  </h4>
                  <p className="text-stone-600 dark:text-stone-400 text-xs md:text-sm font-medium mt-1 leading-snug">
                    {isChinese ? "项行业荣誉与资质" : "Certifications"}
                  </p>
                </div>
                {/* 悬浮微光装饰 */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-amber-500/5 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </motion.div>

          {/* Right - Awards Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 h-full flex flex-col justify-center"
          >
            <div>
              <p className="text-primary font-bold mb-2">
                {isChinese ? "品牌声誉" : "Recognition"}
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
                {isChinese ? "获得荣誉与资质认证" : "Awards & Achievements"}
              </h3>
            </div>

            {/* Business-style Awards Spotlight - Smooth Single Item Carousel */}
            <div 
              className="relative w-full h-[320px] md:h-[400px] flex items-center justify-center py-4"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <AnimatePresence>
                {awardQueue.slice(0, 1).map((awardItem) => {
                  const { originalIndex, ...award } = awardItem;
                  return (
                    <motion.div 
                      key={award.title} 
                      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => award.image ? handleImageClick(originalIndex) : undefined}
                      className={`group absolute w-full max-w-[280px] md:max-w-[340px] flex flex-col items-center justify-center text-center gap-6 transition-all duration-500 ${award.image ? 'cursor-pointer' : ''}`}
                    >
                      {/* Large Image/Icon Container - Frameless & No Scaling */}
                      <div className="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0 flex items-center justify-center">
                        {award.image ? (
                          <>
                            <Image
                              src={award.image}
                              alt={award.title}
                              fill
                              className="object-contain drop-shadow-xl"
                              sizes="200px"
                            />
                            {/* Simple Hover Overlay */}
                            <div className="absolute inset-0 bg-white/10 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] rounded-xl">
                              <Eye className="w-8 h-8 text-amber-500 drop-shadow-md" />
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center justify-center">
                            {(() => {
                              const IconComponent = award.icon;
                              return <IconComponent className="w-24 h-24 text-amber-500/80 drop-shadow-xl" />;
                            })()}
                          </div>
                        )}
                      </div>

                      {/* Text Content */}
                      <div className="flex flex-col items-center gap-3 w-full">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500 drop-shadow-sm" />
                          ))}
                        </div>
                        <h4 className="font-bold text-foreground leading-tight line-clamp-2 transition-colors duration-300 group-hover:text-amber-600 dark:group-hover:text-amber-500 text-lg md:text-xl px-1">
                          {award.title}
                        </h4>
                        {award.image && (
                          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold mt-1 transition-colors group-hover:bg-amber-500/20">
                            <Eye className="w-3.5 h-3.5" />
                            {isChinese ? "点击查看原件" : "View Original"}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
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
                {selectedAwardIndex === 4 && (
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
