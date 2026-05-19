"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Utensils, Briefcase, Factory, Star, Check } from "lucide-react";

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

const servicesData = {
  en: [
    {
      id: "event-catering",
      icon: Utensils,
      title: "Event Buffet Catering",
      description: "Perfect for weddings, birthdays, anniversaries, and corporate gatherings. Our signature buffet spreads will make your event unforgettable.",
      hasMenu: true,
    },
    {
      id: "corporate-bento",
      icon: Briefcase,
      title: "Premium Corporate Bento",
      description: "Premium bento boxes designed for meetings, seminars, and corporate events. Fresh, delicious, and professionally presented.",
      hasMenu: false,
    },
    {
      id: "factory-meal",
      icon: Factory,
      title: "Factory Daily Meal Supply",
      description: "Reliable daily meal supply for factories and large organizations. Serving over 5000+ pax daily with our dedicated fleet.",
      hasMenu: false,
    },
  ],
  zh: [
    {
      id: "event-catering",
      icon: Utensils,
      title: "大型宴会自助餐承办",
      description: "非常适合婚礼、寿宴、满月酒、新店开张及企业联欢。我们高规格餐台布置与经典美味将让您的活动终生难忘。",
      hasMenu: true,
    },
    {
      id: "corporate-bento",
      icon: Briefcase,
      title: "高级企业会议便当盒",
      description: "专为高端会议、学术研讨及商务宴请量身设计的精美个人便当。主打菜色新鲜、包装体面、大方得体。",
      hasMenu: false,
    },
    {
      id: "factory-meal",
      icon: Factory,
      title: "工厂膳食与大型机构长期供应",
      description: "为大型跨国工厂及机构提供准时、安全、卫生的膳食日常配给。拥有专业恒温保温车队，日配送超5000人份。",
      hasMenu: false,
    },
  ],
};

interface MenuCardProps {
  menu: MenuItem;
  lang: "en" | "zh";
}

function MenuCard({ menu, lang }: MenuCardProps) {
  const isChinese = lang === "zh";
  const items = isChinese ? menu.chineseItems : menu.items;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-xl font-bold text-foreground">
            {isChinese ? menu.chineseName : menu.name}
          </h4>
          <p className="text-2xl font-black text-primary mt-1">
            {isChinese ? menu.chinesePrice : menu.price}
          </p>
        </div>
        {(menu.badge || menu.chineseBadge) && (
          <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-sm shadow-primary/20">
            <Star className="w-3 h-3 fill-current" />
            {isChinese ? menu.chineseBadge : menu.badge}
          </span>
        )}
      </div>

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-muted-foreground">
            <Check className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm font-semibold">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

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
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
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
              className="border border-border rounded-3xl overflow-hidden bg-card"
            >
              {/* Service Header */}
              <button
                onClick={() => setOpenService(openService === service.id ? null : service.id)}
                className="w-full p-6 flex items-center gap-4 text-left hover:bg-secondary/30 transition-colors cursor-pointer"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm mt-1">
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
                {openService === service.id && service.hasMenu && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 border-t border-border">
                      <div className="grid sm:grid-cols-2 gap-4 mt-6">
                        {eventCateringMenus.map((menu, idx) => (
                          <MenuCard key={idx} menu={menu} lang={lang} />
                        ))}
                      </div>

                      {/* Footer Note */}
                      <div className="mt-6 p-4 bg-secondary/50 rounded-xl">
                        <p className="text-sm text-muted-foreground text-center leading-normal">
                          <span className="font-bold text-foreground mr-1">
                            {isChinese ? "注意事项：" : "Note:"}
                          </span>
                          {isChinese
                            ? "起订门槛为 50人 (PAX)。以上费用已包揽双倍备用一次性高档餐具、食品级恒温保温炉架、餐台布幔展示铺设、高强度垃圾袋，以及服务人员对餐台周围的现场卫生打扫整理。"
                            : "Minimum 50 PAX required. Includes double portion of disposable cutleries, food-grade chafing dishes, table linens, trash bags, and clean-up of the buffet area."}
                        </p>
                      </div>
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
