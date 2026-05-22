"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Phone, Navigation, Compass, ExternalLink } from "lucide-react";

/**
 * @file location-section.tsx
 * @description 我们的位置与 Google Map 嵌入板块，支持响应式布局、中英双语、Skeleton 渐入动画以及一键导航。
 */

interface LocationSectionProps {
  lang?: "en" | "zh";
}

export function LocationSection({ lang = "en" }: LocationSectionProps) {
  const isChinese = lang === "zh";
  const [mapLoaded, setMapLoaded] = useState(false);

  // 精准定位的 Google Maps 位置链接 (由用户提供)
  const mapUrl =
    "https://www.google.com/maps/place/Kim+Long+Catering+Sdn+Bhd+%E9%87%91%E9%BE%99%E8%87%AA%E7%94%B1%E9%A4%90%E6%9C%8D%E5%8A%A1/data=!4m2!3m1!1s0x0:0x9b84a16198f3e89b?sa=X&ved=1t:2428&ictx=111";

  // Google Maps iframe 嵌入 PB 码 (基于 120, Jalan Senai Utama 5/17)
  const mapEmbedSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.196306354898!2d103.6338575!3d1.6033783999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da76bbf11dfc5b%3A0x9b84a16198f3e89b!2sKim%20Long%20Catering%20Sdn%20Bhd%20%E9%87%91%E9%BE%99%E8%87%AA%E7%94%B1%E9%A4%90%E6%9C%8D%E5%8A%A1!5e0!3m2!1szh-CN!2smy!4v1716388800000!5m2!1szh-CN!2smy";

  return (
    <section id="location" className="relative py-12 md:py-16 bg-background overflow-hidden border-t border-border/40">
      {/* 装饰背景元素，呼应金龙黑金主题 */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* 圈起来的高端一体化奢华卡片容器 - max-w-6xl 缩小横向跨度，内缩 padding，加精美细致边框和柔和阴影 */}
        <div className="max-w-6xl mx-auto p-6 sm:p-10 md:p-12 rounded-[2.5rem] bg-card/45 border border-border/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] backdrop-blur-md relative overflow-hidden">
          {/* 精致的一角微光渐变装饰，增强呼吸感 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* 左侧：位置信息面板 */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-9 space-y-5"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-[10px] uppercase tracking-widest mb-3 select-none cursor-default">
                  <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                  {isChinese ? "我们的位置" : "Our Location"}
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-foreground leading-tight text-balance">
                  {isChinese ? (
                    <>
                      舌尖传承 <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">老字号府邸</span>
                    </>
                  ) : (
                    <>
                      Visit Our <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">Catering Base</span>
                    </>
                  )}
                </h2>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mt-2.5">
                  {isChinese
                    ? "欢迎莅临金龙自助餐位于柔佛士乃的总部。在此为您量身定制专属宴席方案，提供一站式高端餐饮咨询。"
                    : "Welcome to Kim Long Catering headquarters in Senai, Johor. Visit us to customize your exclusive event buffet and consult with our professionals."}
                </p>
              </div>

              {/* 卡片组：精致的高亮玻璃感设计 - 网格并排排列，高度减半 */}
              <div className="grid md:grid-cols-2 gap-3.5">
                {/* 地址卡片 - 独占一行以容纳较长地址 */}
                <div className="md:col-span-2 group flex items-start gap-3.5 p-4 rounded-2xl bg-card border border-border/40 hover:border-amber-500/20 hover:bg-card/80 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-extrabold text-foreground tracking-wide uppercase">
                      {isChinese ? "公司地址" : "Address"}
                    </h4>
                    <p className="text-muted-foreground text-xs font-medium leading-relaxed">
                      120, Jalan Senai Utama 5/17, Taman Senai Utama, 81400 Senai, Johor
                    </p>
                  </div>
                </div>

                {/* 营业时间 - 占一列 */}
                <div className="col-span-1 group flex items-start gap-3.5 p-4 rounded-2xl bg-card border border-border/40 hover:border-amber-500/20 hover:bg-card/80 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-extrabold text-foreground tracking-wide uppercase">
                      {isChinese ? "营业时间" : "Business Hours"}
                    </h4>
                    <p className="text-muted-foreground text-xs font-medium leading-relaxed">
                      {isChinese 
                        ? "09:00 - 18:00 (含周末假期)" 
                        : "9:00 AM - 6:00 PM Daily"}
                    </p>
                  </div>
                </div>

                {/* 联络热线 - 占一列 */}
                <div className="col-span-1 group flex items-start gap-3.5 p-4 rounded-2xl bg-card border border-border/40 hover:border-amber-500/20 hover:bg-card/80 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-extrabold text-foreground tracking-wide uppercase">
                      {isChinese ? "客服热线" : "Customer Hotline"}
                    </h4>
                    <p className="text-muted-foreground text-xs font-semibold tracking-wide">
                      019-728 8226 / 012-728 8226
                    </p>
                  </div>
                </div>
              </div>

              {/* 流光一键导航按钮 - px/py 缩小，尺寸更显灵巧与整齐 */}
              <div>
                <a
                  id="btn-navigate-google-maps"
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full font-bold text-xs text-primary-foreground bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-[0_4px_16px_rgba(245,158,11,0.2)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.3)] transition-all duration-300 overflow-hidden cursor-pointer active:scale-98"
                >
                  {/* 悬停流光闪烁 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer pointer-events-none" />
                  <Navigation className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span>
                    {isChinese ? "在谷歌地图中打开导航" : "Navigate via Google Maps"}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>
            </motion.div>

            {/* 右侧：Google Map 嵌入 */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-3"
            >
              {/* 地图高级相框容器 - 尺寸再缩小两倍，高度调整为精细紧凑的 130px (移动端 110px)，最大宽度限制为 260px */}
              <div className="relative group w-full max-w-[260px] mx-auto lg:ml-auto h-[110px] md:h-[130px] rounded-3xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.1)] border border-border/80 hover:border-amber-500/30 transition-all duration-500">
                
                {/* Skeleton 骨架屏占位图与加载状态 */}
                <AnimatePresence>
                  {!mapLoaded && (
                    <motion.div
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-900 animate-pulse"
                    >
                      <div className="p-4 rounded-full bg-amber-500/10 text-amber-600 mb-3">
                        <Compass className="w-8 h-8 animate-spin-slow" />
                      </div>
                      <span className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase text-center px-2">
                        {isChinese ? "加载中..." : "Loading..."}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 地图 iframe 嵌入 - 移除了 grayscale 灰度滤镜，保证常态下 Google Map 保持彩色原生原貌 */}
                <iframe
                  title="Kim Long Catering Location Map"
                  src={mapEmbedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setMapLoaded(true)}
                  className="w-full h-full contrast-[1.02] brightness-[0.99] transition-all duration-700"
                />

                {/* 装饰边框微光 */}
                <div className="absolute inset-0 pointer-events-none rounded-3xl border border-white/5 group-hover:border-amber-500/10 transition-colors duration-500" />
              </div>
            </motion.div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
