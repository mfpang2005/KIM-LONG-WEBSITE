"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search, Utensils, Award } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  chineseTitle: string;
  category: "chinese" | "western" | "setup";
  description: string;
  chineseDescription: string;
  image: string;
  tag?: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "pipa-duck",
    title: "Signature Pipa Duck",
    chineseTitle: "老字号招牌琵琶鸭",
    category: "chinese",
    description: "Our legendary recipe since 1982. Crispy skin with tender, aromatic duck meat served with custom Plum Sauce.",
    chineseDescription: "自1982年传承至今的镇店之宝。外皮酥脆香浓，鸭肉鲜嫩多汁，搭配特制秘方酸梅酱。",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80",
    tag: "Signature • 招牌",
  },
  {
    id: "nestum-prawns",
    title: "Nestum Butter Prawns",
    chineseTitle: "黄金麦片牛油虾",
    category: "chinese",
    description: "Jumbo prawns wok-fried with fragrant butter, curry leaves, bird's eye chilies, and crispy golden Nestum cereal.",
    chineseDescription: "特大鲜虾与香浓牛油、咖喱叶、指天椒及香脆麦片大火爆炒，咸香酥脆，风味十足。",
    image: "https://images.unsplash.com/photo-1559737607-2da76d7d3d75?w=800&q=80",
    tag: "Chef's Choice • 主厨推荐",
  },
  {
    id: "sesame-ribs",
    title: "Sesame Spare Ribs",
    chineseTitle: "京都芝麻排骨皇",
    category: "chinese",
    description: "Tender ribs caramelized in an authentic sweet-savory glaze, sprinkled with toasted white sesame.",
    chineseDescription: "精选排骨炸至金黄，裹上酸甜浓郁的特制酱汁，微焦香脆，最后撒上炒香的白芝麻。",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    tag: "Popular • 热销",
  },
  {
    id: "tuscany-prawns",
    title: "Tuscany Tomato Prawns",
    chineseTitle: "托斯卡纳茄汁虾",
    category: "western",
    description: "Pan-seared prawns tossed in a vibrant Mediterranean tomato glaze with fresh Italian basil and olive oil.",
    chineseDescription: "煎至弹牙的鲜虾裹满地中海风味茄汁，伴以新鲜意大利罗勒与初榨橄榄油，酸甜清爽。",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
  },
  {
    id: "buffet-setup-luxury",
    title: "Grand Banquet Buffet Setup",
    chineseTitle: "奢华婚宴自助餐现场",
    category: "setup",
    description: "Premium warm-lit catering layout with silver chafing dishes, premium tablecloths, and floral decorations.",
    chineseDescription: "高端温光餐台布置，配备银光熠熠的保温炉、高雅桌布和精致花艺，尽显宴席奢华气度。",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80",
    tag: "5-Star Setup • 五星布置",
  },
  {
    id: "dessert-table",
    title: "Premium Pastry & Sweet Table",
    chineseTitle: "西式精美甜点拼盘",
    category: "western",
    description: "An elegant assortment of petite desserts, fresh seasonal fruits, and premium traditional Chinese sweet soup.",
    chineseDescription: "琳琅满目的西式一口小甜点、时令新鲜水果，搭配传统滋补中式糖水，为宴席画上完美句号。",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=800&q=80",
  },
];

interface GallerySectionProps {
  lang?: "en" | "zh";
}

export function GallerySection({ lang = "en" }: GallerySectionProps) {
  const [filter, setFilter] = useState<"all" | "chinese" | "western" | "setup">("all");

  const filteredItems = galleryItems.filter(
    (item) => filter === "all" || item.category === filter
  );

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider uppercase mb-2"
          >
            {lang === "en" ? "Visual Feast" : "视觉盛宴"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance"
          >
            {lang === "en" ? "Culinary Showcase & Setup" : "菜品与宴席实景展示"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            {lang === "en"
              ? "Take a look at our award-winning heritage dishes and premium catering setups crafted for your special moments."
              : "饱览我们屡获殊荣的传统手工名菜与专为您的珍贵时刻精心设计的五星级宴会布置。"}
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {(
            [
              { id: "all", en: "All Showcase", zh: "全部展示" },
              { id: "chinese", en: "Chinese Heritage", zh: "招牌中餐" },
              { id: "western", en: "Western Favorites", zh: "精致西餐" },
              { id: "setup", en: "Catering Setups", zh: "宴席摆盘" },
            ] as const
          ).map((btn) => (
            <button
              key={btn.id}
              id={`btn-gallery-filter-${btn.id}`}
              onClick={() => setFilter(btn.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                filter === btn.id
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                  : "bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {lang === "en" ? btn.en : btn.zh}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                id={`gallery-card-${item.id}`}
                className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Container with Hover Shine & Zoom */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                  <Image
                    src={item.image}
                    alt={lang === "en" ? item.title : item.chineseTitle}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Subtle Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
                  
                  {/* Tags */}
                  {item.tag && (
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-primary/95 text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-md">
                      <Award className="w-3.5 h-3.5" />
                      {item.tag}
                    </span>
                  )}
                </div>

                {/* Content Container */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs text-primary font-bold tracking-widest uppercase">
                      {item.category === "chinese"
                        ? (lang === "en" ? "Heritage Chinese" : "经典中餐")
                        : item.category === "western"
                        ? (lang === "en" ? "Western Delights" : "西式精选")
                        : (lang === "en" ? "Banquet Setup" : "现场布置")}
                    </span>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {lang === "en" ? item.title : item.chineseTitle}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {lang === "en" ? item.description : item.chineseDescription}
                    </p>
                  </div>

                  {/* Micro-interaction detail button */}
                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {lang === "en" ? "Fresh Daily" : "每日新鲜制作"}
                    </span>
                    <div className="inline-flex items-center gap-1 text-primary text-xs font-bold group-hover:underline">
                      <Utensils className="w-3.5 h-3.5" />
                      {lang === "en" ? "View Menu" : "查看对应菜单"}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
