"use client";

import { motion } from "framer-motion";
import { Award, Star, Trophy, Crown } from "lucide-react";
import Image from "next/image";

const awardsData = {
  en: [
    { icon: Trophy, title: "Malaysia Top Heritage Award 2019" },
    { icon: Star, title: "Consumer's Choice Award 2020" },
    { icon: Award, title: "The Asia Pacific Book of The Top Recognition 2019" },
    { icon: Crown, title: "World Heritage Food Recognition" },
  ],
  zh: [
    { icon: Trophy, title: "马来西亚老字号传统经典品牌奖 2019" },
    { icon: Star, title: "国家消费者首选品牌大奖 2020" },
    { icon: Award, title: "亚太杰出品牌至高荣誉认证 2019" },
    { icon: Crown, title: "世界非遗美食文化传承奖" },
  ],
};

interface AboutSectionProps {
  lang?: "en" | "zh";
}

export function AboutSection({ lang = "en" }: AboutSectionProps) {
  const isChinese = lang === "zh";
  const awards = awardsData[lang];

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

            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                {isChinese
                  ? "金龙自助餐（Kim Long Catering）创立于 1982 年马来西亚柔佛士乃（Senai, Johor），如今已是全柔佛备受推崇、深受信赖的招牌中餐与高端宴席承办商。我们享有盛誉的纯手工秘制琵琶鸭（Pipa Duck）更是红遍全马的传奇美食。"
                  : "Founded in 1982 in Senai, Johor, Kim Long Catering has become synonymous with exceptional Chinese cuisine and unforgettable dining experiences. Our signature handmade Pipa Duck has earned us a legendary reputation across Malaysia."}
              </p>
              <p>
                {isChinese
                  ? "如今，在第三代首席执行官郭志贤（Keh Zhi Xian）的带领下，我们在恪守传统祖传秘方的同时，积极拥抱数字化变革，引入冷链配送车队与标准化现代厨政管理。每一道摆上餐台的佳肴，都倾注了三代人传承不息的诚意与温度。"
                  : "Now led by our 3rd-generation CEO, Keh Zhi Xian, we continue to honor our heritage while embracing innovation. Every dish we serve carries the passion, dedication, and expertise passed down through three generations of culinary masters."}
              </p>
            </div>

            {/* CEO Image */}
            <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl shadow-sm">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-secondary">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
                  alt="CEO Keh Zhi Xian"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-foreground">
                  {isChinese ? "郭志贤" : "Keh Zhi Xian"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isChinese ? "第三代首席执行官 (CEO)" : "3rd Generation CEO"}
                </p>
                <p className="text-xs text-primary font-bold mt-1">
                  {isChinese ? "坚守本源 • 开拓前行" : "Leading with Vision & Tradition"}
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

            {/* Awards Marquee */}
            <div className="relative overflow-hidden py-4 border-y border-border/60">
              <div className="flex animate-marquee gap-6">
                {[...awards, ...awards].map((award, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 bg-card border border-border rounded-2xl p-6 min-w-[280px] hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <award.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-foreground text-sm leading-snug">
                          {award.title}
                        </p>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 rounded-2xl p-6 text-center border border-primary/25">
                <p className="text-4xl font-extrabold text-foreground tracking-tight">1982</p>
                <p className="text-muted-foreground text-xs mt-1">
                  {isChinese ? "老字号创立年份" : "Year Founded"}
                </p>
              </div>
              <div className="bg-primary/10 rounded-2xl p-6 text-center border border-primary/25">
                <p className="text-4xl font-extrabold text-foreground tracking-tight">4+</p>
                <p className="text-muted-foreground text-xs mt-1">
                  {isChinese ? "项重量级行业大奖" : "Major Industry Awards"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
