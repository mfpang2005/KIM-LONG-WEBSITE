"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Star, Check } from "lucide-react";
import { GradientGlowIcon } from "./gradient-glow-icon";

// NOTE: 自助餐菜单项类型定义
interface MenuItem {
  name: string;
  chineseName: string;
  price: string;
  chinesePrice: string;
  badge?: string;
  chineseBadge?: string;
  items: string[];
  chineseItems: string[];
}

// NOTE: 个人会议便当菜单项类型定义
interface BentoItem {
  name: string;
  chineseName: string;
  price: string;
  chinesePrice: string;
  badge?: string;
  chineseBadge?: string;
  items: string[];
  chineseItems: string[];
}

// NOTE: 工厂膳食供应核心亮点类型定义
interface FactoryHighlight {
  title: string;
  chineseTitle: string;
  desc: string;
  chineseDesc: string;
  iconName: "Calendar" | "Truck" | "ShieldCheck" | "CircleDollarSign";
  colorScheme: "amber" | "sapphire" | "emerald" | "gold";
}

// ----------------------------------------------------
// 1. 大型宴会自助餐菜单数据
// ----------------------------------------------------
const eventCateringMenus: MenuItem[] = [
  {
    name: "Classic Menu A",
    chineseName: "经典套餐 A",
    price: "RM 23 / PAX",
    chinesePrice: "RM 23 / 每人",
    badge: "Best Seller",
    chineseBadge: "热销推荐",
    items: [
      "Roasted Chicken",
      "Nestum Fish Fillet",
      "Sesame Ribs",
      "Curry Vegetable",
      "Fried Mee Hoon",
      "Golden Fried Rice",
      "Watermelon",
      "Beverage",
    ],
    chineseItems: [
      "红粉靓炸当红炸子鸡 (Roasted Chicken)",
      "避风塘麦片香脆鱼片 (Nestum Fish Fillet)",
      "秘制京都芝麻排骨皇 (Sesame Ribs)",
      "南洋香浓咖喱什锦菜 (Curry Vegetable)",
      "金丝富贵炒星洲米粉 (Fried Mee Hoon)",
      "扬州金牌黄金炒饭 (Golden Fried Rice)",
      "消暑清甜西瓜果盘 (Watermelon)",
      "清凉爽口特调冷饮 (Beverage)",
    ],
  },
  {
    name: "Heritage Menu B",
    chineseName: "传统招牌套餐 B",
    price: "RM 26 / PAX",
    chinesePrice: "RM 26 / 每人",
    items: [
      "Signature Pipa Duck",
      "Roast Chicken",
      "Nestum Prawn",
      "Curry Vegetable",
      "Sweet & Sour Fish Fillet",
      "Fried Mee Hoon",
      "Golden Fried Rice",
      "Watermelon",
      "Beverage",
    ],
    chineseItems: [
      "老字号招牌纯手工琵琶鸭 (Signature Pipa Duck)",
      "红粉靓炸当红炸子鸡 (Roasted Chicken)",
      "避风塘麦片黄金大虾 (Nestum Prawn)",
      "南洋香浓咖喱什锦菜 (Curry Vegetable)",
      "港式风味酸甜糖醋鱼片 (Sweet & Sour Fish)",
      "金丝富贵炒星洲米粉 (Fried Mee Hoon)",
      "扬州金牌黄金炒饭 (Golden Fried Rice)",
      "消暑清甜西瓜果盘 (Watermelon)",
      "清凉爽口特调冷饮 (Beverage)",
    ],
  },
  {
    name: "Grand Menu C",
    chineseName: "至尊宴席套餐 C",
    price: "RM 29 / PAX",
    chinesePrice: "RM 29 / 每人",
    badge: "Best Value",
    chineseBadge: "至尊首选",
    items: [
      "Signature Pipa Duck",
      "Sesame Ribs",
      "Har Lok (Pan-fried Prawns)",
      "Curry Chicken",
      "Broccoli",
      "Fried Mee Hoon",
      "Golden Fried Rice",
      "Watermelon",
      "Beverage",
    ],
    chineseItems: [
      "老字号招牌纯手工琵琶鸭 (Signature Pipa Duck)",
      "秘制京都芝麻排骨皇 (Sesame Ribs)",
      "港式干煎鲜大虾 - 哈禄 (Har Lok Prawns)",
      "香浓椰浆土豆咖喱鸡 (Curry Chicken)",
      "金蒜双菇清炒西兰花 (Broccoli)",
      "金丝富贵炒星洲米粉 (Fried Mee Hoon)",
      "扬州金牌黄金炒饭 (Golden Fried Rice)",
      "消暑清甜西瓜果盘 (Watermelon)",
      "清凉爽口特调冷饮 (Beverage)",
    ],
  },
  {
    name: "Western Buffet",
    chineseName: "华丽西式自助餐",
    price: "From RM 40 / PAX",
    chinesePrice: "RM 40 / 每人起",
    items: [
      "Garden Egg Salad",
      "Tuscany Tomato Prawn",
      "Grilled Chicken Chop",
      "Fruits Honey Grilled Pork Ribs",
      "Aglio Olio",
      "Butter Raisin Rice",
      "Desserts",
    ],
    chineseItems: [
      "田园水煮鸡蛋时蔬沙拉 (Garden Egg Salad)",
      "地中海托斯卡纳茄汁大虾 (Tuscany Tomato Prawn)",
      "意式香草碳烤多汁鸡扒 (Grilled Chicken Chop)",
      "香浓果蜜慢烤猪排骨 (Grilled Pork Ribs)",
      "蒜香海鲜海盐意大利面 (Aglio Olio)",
      "香浓牛油黄金葡萄干饭 (Butter Raisin Rice)",
      "精美西式一口甜点拼盘 (Desserts)",
    ],
  },
];

// ----------------------------------------------------
// 2. 高级企业会议便当盒数据
// ----------------------------------------------------
const corporateBentoMenus: BentoItem[] = [
  {
    name: "Executive Bento A",
    chineseName: "行政商务会议便当 A",
    price: "RM 18 / BOX",
    chinesePrice: "RM 18 / 每盒",
    badge: "Essential Choice",
    chineseBadge: "会议特选",
    items: [
      "Imperial Roast Chicken",
      "Minced Meat Tofu",
      "Garlic Seasonal Greens",
      "Fragrant Jasmine Rice",
    ],
    chineseItems: [
      "老字号御膳红炸当红鸡 (Imperial Roast Chicken)",
      "家常肉碎焖煮手作豆腐 (Minced Meat Tofu)",
      "金蒜双菇清炒有机时蔬 (Garlic Greens)",
      "清香丝苗茉莉白米饭 (Fragrant Jasmine Rice)",
    ],
  },
  {
    name: "Premium Director Bento B",
    chineseName: "尊贵总监商务便当 B",
    price: "RM 22 / BOX",
    chinesePrice: "RM 22 / 每盒",
    badge: "Most Popular",
    chineseBadge: "高管首选",
    items: [
      "Signature Handcrafted Pipa Duck",
      "Nyonya Sauce Barramundi Fish",
      "Golden Garlic Broccoli",
      "Golden Egg Fried Rice",
    ],
    chineseItems: [
      "老字号招牌纯手工琵琶鸭 (Signature Pipa Duck)",
      "南洋娘惹酱焖金目鲈鱼片 (Nyonya Barramundi Fish)",
      "金蒜双菇清炒珍味西兰花 (Garlic Broccoli)",
      "扬州金牌黄金蛋炒饭 (Golden Fried Rice)",
    ],
  },
  {
    name: "VIP Royal Gastronomy Bento C",
    chineseName: "VIP 皇家豪气贵宾便当 C",
    price: "RM 26 / BOX",
    chinesePrice: "RM 26 / 每盒",
    badge: "Top Tier",
    chineseBadge: "顶级尊贵",
    items: [
      "Har Lok Tiger Prawn",
      "Sesame Emperor Pork Ribs",
      "Double Ear Braised Mushroom Mix",
      "Golden Egg Fried Rice",
    ],
    chineseItems: [
      "港式经典干煎猛虎虾 (Har Lok Tiger Prawn)",
      "秘制京都芝麻排骨皇 (Sesame Pork Ribs)",
      "金蒜双耳炒时珍杂菇 (Mushroom Mix)",
      "扬州金牌黄金蛋炒饭 (Golden Fried Rice)",
    ],
  },
];

// ----------------------------------------------------
// 3. 工厂膳食供应核心亮点与实力展现
// ----------------------------------------------------
const factoryHighlights: FactoryHighlight[] = [
  {
    title: "Weekly Balanced Menu Rotation",
    chineseTitle: "科学营养周菜单循环",
    desc: "1 main meat, 2 veggie sides, 1 herbal soup & seasonal fruits. Our expert clinical dietitians approve all weekly menu rotations to ensure energy & health.",
    chineseDesc: "标准提供「一主荤、二副素、一靓汤、一水果」的科学搭配，由专业营养师每周定制菜单，确保一线员工能量满满，兼顾美味、健康与不重复。",
    iconName: "Calendar",
    colorScheme: "amber",
  },
  {
    title: "Thermal-Controlled Logistical Fleet",
    chineseTitle: "恒温物理链条保温配送",
    desc: "Our private delivery trucks deliver hot food within 60 minutes of cooking. Food temperature is strictly locked above 65°C using thermal chambers.",
    chineseDesc: "自有专职恒温保温车队，GPS实时智能调度，保证烹饪出炉后 60 分钟内准时送达。全程使用食品级多层锁温保温箱，入口依旧热气腾腾。",
    iconName: "Truck",
    colorScheme: "sapphire",
  },
  {
    title: "Supreme Food Safety Certifications",
    chineseTitle: "极高标准食品安全与ISO准则",
    desc: "Strict adherence to hygiene guidelines. 100% of staff are certified & fully vaccinated. Kitchen sterilized 3 times daily with high pressure.",
    chineseDesc: "严格遵循国家及国际卫生标准，全体后厨及配送员工持健康证上岗。厨房每日三次进行全方位高温高压与紫外线杀菌消毒，食材100%可溯源。",
    iconName: "ShieldCheck",
    colorScheme: "emerald",
  },
  {
    title: "Flexible Monthly Corporate Budgets",
    chineseTitle: "弹性化企业包月阶梯预算",
    desc: "Packages from RM 9.50 to RM 35.00 per head tailored to your allowance. Standard transparent invoices and audit logs provided.",
    chineseDesc: "提供 RM 9.50 / RM 18.50 / RM 25.50 / RM 35.00 等多种阶梯式包月或包餐预算方案，满足各类企业餐贴额度，对账透明，支持灵活月结。",
    iconName: "CircleDollarSign",
    colorScheme: "gold",
  },
];

// ----------------------------------------------------
// 4. 服务数据定义（支持中英文）
// ----------------------------------------------------
const servicesData = {
  en: [
    {
      id: "event-catering",
      iconName: "Utensils" as const,
      colorScheme: "gold" as const,
      title: "Event Buffet Catering",
      description: "Perfect for weddings, birthdays, anniversaries, and corporate gatherings. Our signature buffet spreads will make your event unforgettable.",
    },
    {
      id: "corporate-bento",
      iconName: "Briefcase" as const,
      colorScheme: "roseGold" as const,
      title: "Premium Corporate Bento",
      description: "Premium bento boxes designed for meetings, seminars, and corporate events. Fresh, delicious, and professionally presented.",
    },
    {
      id: "factory-meal",
      iconName: "Factory" as const,
      colorScheme: "emerald" as const,
      title: "Factory Daily Meal Supply",
      description: "Reliable daily meal supply for factories and large organizations. Serving over 5000+ pax daily with our dedicated fleet.",
    },
  ],
  zh: [
    {
      id: "event-catering",
      iconName: "Utensils" as const,
      colorScheme: "gold" as const,
      title: "大型宴会自助餐承办",
      description: "非常适合婚礼、寿宴、满月酒、新店开张及企业联欢。我们高规格餐台布置与经典美味将让您的活动终生难忘。",
    },
    {
      id: "corporate-bento",
      iconName: "Briefcase" as const,
      colorScheme: "roseGold" as const,
      title: "高级企业会议便当盒",
      description: "专为高端会议、学术研讨及商务宴请量身设计的精美个人便当。主打菜色新鲜、包装体面、大方得体。",
    },
    {
      id: "factory-meal",
      iconName: "Factory" as const,
      colorScheme: "emerald" as const,
      title: "工厂膳食与大型机构长期供应",
      description: "为大型跨国工厂及机构提供准时、安全、卫生的膳食日常配给。拥有专业恒温保温车队，日配送超5000人份。",
    },
  ],
};

// ----------------------------------------------------
// 5. 内部卡片渲染子组件
// ----------------------------------------------------
interface MenuCardProps {
  menu: MenuItem;
  lang: "en" | "zh";
}

function MenuCard({ menu, lang }: MenuCardProps) {
  const isChinese = lang === "zh";
  const items = isChinese ? menu.chineseItems : menu.items;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
    >
      <div>
        {/* 上置的特色标签 */}
        {(menu.badge || menu.chineseBadge) && (
          <div className="mb-2">
            <span className="inline-flex items-center gap-0.5 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-[10px] font-extrabold shadow-sm shadow-primary/20">
              <Star className="w-3 h-3 fill-current" />
              {isChinese ? menu.chineseBadge : menu.badge}
            </span>
          </div>
        )}

        <div className="mb-4">
          <h4 className="text-lg font-bold text-foreground">
            {isChinese ? menu.chineseName : menu.name}
          </h4>
          <p className="text-xl font-black text-primary mt-1">
            {isChinese ? menu.chinesePrice : menu.price}
          </p>
        </div>

        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-muted-foreground">
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm font-semibold leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

interface BentoCardProps {
  menu: BentoItem;
  lang: "en" | "zh";
}

function BentoCard({ menu, lang }: BentoCardProps) {
  const isChinese = lang === "zh";
  const items = isChinese ? menu.chineseItems : menu.items;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
    >
      <div>
        {/* 上置的特色标签 */}
        {(menu.badge || menu.chineseBadge) && (
          <div className="mb-2">
            <span className="inline-flex items-center gap-0.5 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-extrabold shadow-sm">
              <Star className="w-3 h-3 fill-current" />
              {isChinese ? menu.chineseBadge : menu.badge}
            </span>
          </div>
        )}

        <div className="mb-4">
          <h4 className="text-lg font-bold text-foreground">
            {isChinese ? menu.chineseName : menu.name}
          </h4>
          <p className="text-xl font-black text-primary mt-1">
            {isChinese ? menu.chinesePrice : menu.price}
          </p>
        </div>

        <ul className="space-y-2 mb-4">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-muted-foreground">
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm font-semibold leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// 6. 主服务区域组件
// ----------------------------------------------------
interface ServicesSectionProps {
  lang?: "en" | "zh";
}

export function ServicesSection({ lang = "en" }: ServicesSectionProps) {
  const [openService, setOpenService] = useState<string | null>("event-catering");
  const isChinese = lang === "zh";
  const services = servicesData[lang];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-bold mb-2">
            {isChinese ? "核心业务服务" : "Our Services"}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance tracking-tight">
            {isChinese ? "全方位的大型宴会餐饮解决方案" : "Catering Solutions for Every Occasion"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {isChinese
              ? "无论是温馨惬意的家庭小聚，高规格的企业商务宴席，还是上千人的日常工作餐，我们都能为您提供完美的配餐选择。"
              : "From intimate gatherings to large-scale corporate events, we have the perfect catering solution for you."}
          </p>
        </motion.div>

        {/* Services Accordion list */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-border rounded-3xl overflow-hidden bg-card transition-all duration-300"
              style={{
                boxShadow: openService === service.id ? "0 10px 30px -10px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {/* Service Header Button */}
              <button
                onClick={() => setOpenService(openService === service.id ? null : service.id)}
                className="w-full p-6 flex items-center gap-4 text-left hover:bg-secondary/30 transition-all duration-300 cursor-pointer"
              >
                {/* 顶奢渐变发光图标组件，完美替代原来的普通灰色线框 */}
                <div className="flex-shrink-0">
                  <GradientGlowIcon 
                    name={service.iconName} 
                    colorScheme={service.colorScheme} 
                    size={30}
                    glow={openService === service.id}
                  />
                </div>
                
                <div className="flex-1 pl-2">
                  <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm mt-1 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <motion.div
                  animate={{ rotate: openService === service.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-muted-foreground" />
                </motion.div>
              </button>

              {/* Expandable Menu Details */}
              <AnimatePresence initial={false}>
                {openService === service.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 border-t border-border bg-card/50">
                      
                      {/* 1. 大型宴会自助餐承办内容 */}
                      {service.id === "event-catering" && (
                        <>
                          <div className="grid sm:grid-cols-2 gap-4 mt-6">
                            {eventCateringMenus.map((menu, idx) => (
                              <MenuCard key={idx} menu={menu} lang={lang} />
                            ))}
                          </div>

                          {/* Footer Note */}
                          <div className="mt-6 p-4 bg-secondary/50 rounded-2xl border border-border/60">
                            <p className="text-sm text-muted-foreground text-center leading-relaxed">
                              <span className="font-bold text-foreground mr-1">
                                {isChinese ? "注意事项：" : "Note:"}
                              </span>
                              {isChinese
                                ? "起订门槛为 50 人 (PAX)。以上费用已包揽高档食品级恒温保温炉架、餐台精美布幔展示铺设、双倍备用高档餐具、高强度垃圾袋，以及服务人员对餐台周围的现场卫生打扫整理。"
                                : "Minimum 50 PAX required. Includes premium food-grade chafing dishes, elegant table linen displays, double portions of upscale disposable cutleries, trash bags, and professional clean-up of the buffet area."}
                            </p>
                          </div>
                        </>
                      )}

                      {/* 2. 高级企业会议便当盒内容 */}
                      {service.id === "corporate-bento" && (
                        <>
                          <div className="grid sm:grid-cols-3 gap-4 mt-6">
                            {corporateBentoMenus.map((menu, idx) => (
                              <BentoCard key={idx} menu={menu} lang={lang} />
                            ))}
                          </div>

                          {/* Footer Note */}
                          <div className="mt-6 p-4 bg-secondary/50 rounded-2xl border border-border/60">
                            <p className="text-sm text-muted-foreground text-center leading-relaxed">
                              <span className="font-bold text-foreground mr-1">
                                {isChinese ? "注意事项：" : "Note:"}
                              </span>
                              {isChinese
                                ? "会议便当起订门槛为 30 盒（已免费赠送特调冷饮与精美甜品），提供专属恒温保温箱派送上门。所有便当均采用食品级防溢多格环保盒装，附赠精美独立包装餐具及高级消毒湿纸巾。"
                                : "Minimum order 30 boxes (Includes complimentary beverage & dessert). Delivered in dedicated insulation bags. Packaged in premium spill-proof compartmentalized boxes. Includes individually packed utensils and sanitized wet wipes."}
                            </p>
                          </div>
                        </>
                      )}

                      {/* 3. 工厂膳食供应内容 */}
                      {service.id === "factory-meal" && (
                        <>
                          <div className="grid sm:grid-cols-2 gap-6 mt-6">
                            {factoryHighlights.map((highlight, idx) => (
                              <div
                                key={idx}
                                className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-start gap-4"
                              >
                                <div className="flex-shrink-0 mt-1">
                                  <GradientGlowIcon
                                    name={highlight.iconName}
                                    colorScheme={highlight.colorScheme}
                                    size={28}
                                    glow={false}
                                  />
                                </div>
                                <div>
                                  <h4 className="text-lg font-bold text-foreground mb-2">
                                    {isChinese ? highlight.chineseTitle : highlight.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {isChinese ? highlight.chineseDesc : highlight.desc}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Footer Note */}
                          <div className="mt-6 p-4 bg-secondary/50 rounded-2xl border border-border/60">
                            <p className="text-sm text-muted-foreground text-center leading-relaxed">
                              <span className="font-bold text-foreground mr-1">
                                {isChinese ? "专属通道：" : "Cooperation Channel:"}
                              </span>
                              {isChinese
                                ? "我们热忱欢迎企业行政及厂区经理亲临中央厨房实地考察卫生。针对百人以上长期客户，可提供1天免费样餐试吃评估，并享有透明对账与灵活月结金融支持。"
                                : "We warmly invite corporate HR & factory site managers to physically inspect our central kitchens. For 100+ pax long-term clients, we offer 1 day of free trial meals for quality auditing, plus flexible credit terms."}
                            </p>
                          </div>
                        </>
                      )}

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
