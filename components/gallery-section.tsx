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
  // ================= 招牌中餐 (6张) =================
  {
    id: "pipa-duck",
    title: "Signature Pipa Duck",
    chineseTitle: "老字号招牌琵琶鸭",
    category: "chinese",
    description: "Our legendary recipe since 1982. Crispy skin with tender, aromatic duck meat served with custom Plum Sauce.",
    chineseDescription: "自1982年传承至今的镇店之宝。外皮酥脆香浓，鸭肉鲜嫩多汁，搭配特制秘方酸梅酱。",
    image: "/images/pipa-duck.jpg",
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
    id: "steamed-grouper",
    title: "Premium Steamed Grouper",
    chineseTitle: "古法清蒸龙虎斑",
    category: "chinese",
    description: "Fresh live grouper steamed with superior soy sauce, ginger slivers, and fragrant scallions for a tender texture.",
    chineseDescription: "精选新鲜活石斑，以古法加入特制头抽、细嫩姜丝与香葱清蒸，肉质莹白鲜美、滑嫩弹牙。",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
  },
  {
    id: "braised-abalone-fishmaw",
    title: "Braised Shiitake & Fish Maw",
    chineseTitle: "鲍汁花菇扣花胶",
    category: "chinese",
    description: "Deluxe fish maw and premium shiitake mushrooms slow-simmered in a rich, velvety abalone stock.",
    chineseDescription: "上等深海花胶与顶级厚身花菇，在特制鲍鱼高汤中历经数小时慢火细熬，胶原蛋白满满，浓郁软糯。",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80",
  },
  {
    id: "salted-egg-crab",
    title: "Signature Salt Egg Crab",
    chineseTitle: "招牌金沙咸蛋蟹",
    category: "chinese",
    description: "Meaty mud crabs coated in a savory, aromatic salted egg yolk sauce with curry leaves and bird's eye chilies.",
    chineseDescription: "精选肥美肉蟹大火爆炒，裹满咸香浓郁的纯手工金黄咸蛋黄沙，伴以咖喱叶清香，吮指留香。",
    image: "https://images.unsplash.com/photo-1534080391025-a77af6ebc1a4?w=800&q=80",
  },

  // ================= 精致西餐 (6张) =================
  {
    id: "tuscany-prawns",
    title: "Tuscany Tomato Prawns",
    chineseTitle: "托斯卡纳茄汁虾",
    category: "western",
    description: "Pan-seared prawns tossed in a vibrant Mediterranean tomato glaze with fresh Italian basil and olive oil.",
    chineseDescription: "煎至弹牙的鲜虾裹满地中海风味茄汁，伴以新鲜意大利罗勒与初榨橄榄油，酸甜清爽。",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8317fba10?w=800&q=80",
  },
  {
    id: "dessert-table",
    title: "Premium Pastry & Sweet Table",
    chineseTitle: "西式精美甜点拼盘",
    category: "western",
    description: "An elegant assortment of petite desserts, fresh seasonal fruits, and premium traditional Chinese sweet soup.",
    chineseDescription: "琳琅满目的西式一口小甜点、时令新鲜水果，搭配传统滋补中式糖水，为宴席画上完美句号。",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
  },
  {
    id: "black-pepper-sirloin",
    title: "Prime Black Pepper Sirloin",
    chineseTitle: "黑椒澳洲沙朗牛排",
    category: "western",
    description: "Australian grain-fed sirloin grilled to perfection, drizzled with robust cracked black pepper sauce.",
    chineseDescription: "严选澳洲谷饲沙朗牛排煎烤至完美熟度，淋上特调粗磨黑胡椒汁，外焦里嫩，肉汁充盈。",
    image: "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=800&q=80",
    tag: "High Protein • 精选牛肉",
  },
  {
    id: "pan-seared-salmon",
    title: "Salmon in Truffle Cream",
    chineseTitle: "香煎松露奶油三文鱼",
    category: "western",
    description: "Norwegian salmon fillet pan-seared with crispy skin, served in a rich black truffle white wine cream.",
    chineseDescription: "挪威直达三文鱼排煎至表皮酥脆，伴以黑松露白葡萄酒奶油调色，奶香浓郁，层次丰富。",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
  },
  {
    id: "braised-beef-cheek",
    title: "Classic Red Wine Beef Cheek",
    chineseTitle: "红酒慢烹牛颊肉",
    category: "western",
    description: "Tender beef cheek slow-braised for 6 hours in rich Bordeaux red wine, root vegetables, and fresh herbs.",
    chineseDescription: "精选极嫩牛颊肉，融入波尔多红酒、香草和根茎蔬菜在文火中慢熬6小时，入口即化，极为甘美。",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  },
  {
    id: "truffle-mushroom-pasta",
    title: "Truffle Wild Mushroom Pasta",
    chineseTitle: "松露野菇手工宽面",
    category: "western",
    description: "Artisanal pasta tossed with woodland mushrooms and a luxurious porcini and truffle cream sauce.",
    chineseDescription: "意式手工宽面融入饱满野菇，裹着细腻馥郁的牛肝菌与黑松露特制奶油，香气极其摄人。",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
  },

  // ================= 宴席摆盘 (6张) =================
  {
    id: "buffet-setup-luxury",
    title: "Grand Banquet Buffet Setup",
    chineseTitle: "奢华婚宴自助餐现场",
    category: "setup",
    description: "Premium warm-lit catering layout with silver chafing dishes, premium tablecloths, and floral decorations.",
    chineseDescription: "高端温光餐台布置，配备银光熠熠的保温炉、高雅桌布和精致花艺，尽显宴席奢华气度。",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    tag: "5-Star Setup • 五星布置",
  },
  {
    id: "setup-white-gold",
    title: "Elite White & Gold Plating",
    chineseTitle: "白金欧式烛光宴席",
    category: "setup",
    description: "Stunning table design featuring fresh white roses, gold cutlery, crystal goblets, and ambient candlelights.",
    chineseDescription: "欧式典雅长桌设计，精选白玫瑰花艺，烫金描边餐盘，水晶高脚杯与浪漫烛光交相辉映。",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
    tag: "Romantic • 唯美浪漫",
  },
  {
    id: "setup-garden-party",
    title: "Garden Starry Night Buffet",
    chineseTitle: "草坪户外星光晚宴",
    category: "setup",
    description: "Enchanting outdoor lawn layout decorated with fairy lights, wooden accents, and cozy ambient styling.",
    chineseDescription: "绿茵草坪交织满天星光彩灯，配以原木餐桌、舒适椅垫与清新野奢风装饰，倍感惬意自然。",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
  },
  {
    id: "setup-chinese-royal",
    title: "Royal Chinese Banquet Setup",
    chineseTitle: "中式皇家大红喜宴",
    category: "setup",
    description: "Majestic round table layout adorned with traditional rich crimson linen, golden centerpieces, and fine china.",
    chineseDescription: "极具威仪的巨型圆桌，大气的传统喜庆正红台布，配以璀璨金器盆景与华贵瓷器，尽显大家风范。",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  },
  {
    id: "setup-cocktail-canapes",
    title: "Premium Cocktail Canapé",
    chineseTitle: "商务鸡尾酒会冷餐台",
    category: "setup",
    description: "Sleek and illuminated food stations featuring meticulously arranged finger foods and party appetizers.",
    chineseDescription: "极简发光餐盘上，整齐排列着五彩斑斓、精致玲珑的西式一口冷餐小食，凸显商务酒会的高端格调。",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80",
  },
  {
    id: "setup-eco-elegant",
    title: "Premium Dessert Table",
    chineseTitle: "奢华艺术甜品台设计",
    category: "setup",
    description: "Elegant curation of handcrafted pastries, fine desserts, and fresh seasonal fruits elegantly presented on tiered platters.",
    chineseDescription: "精心陈列的手工烘焙西式糕点、精美甜品与时令鲜果，以极具艺术层次感的层架高雅呈现，为您的盛宴更添甜蜜与尊贵。",
    image: "https://images.unsplash.com/photo-1517260911058-0fcfd733c021?w=800&q=80",
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
            {lang === "en" ? "Culinary Showcase & Elite Layout" : "菜品与宴席实景展示"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed"
          >
            {lang === "en"
              ? "Kim Long Catering redefines mobile dining with award-winning heritage flavors and elite banquet layouts. Here, every masterfully crafted dish and high-spec service crowns your life's greatest moments."
              : "“金龙餐饮，以屡获殊荣的传世风味与高规格宴席布置，重塑外烩餐饮新标准。在这里，每一道大师级臻肴与高级工序，皆为您的人生成就加冕。”"}
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
