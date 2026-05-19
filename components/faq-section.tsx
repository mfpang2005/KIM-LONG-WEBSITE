"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  id: string;
  question: string;
  chineseQuestion: string;
  answer: string;
  chineseAnswer: string;
}

const faqs: FAQItem[] = [
  {
    id: "delivery-zones",
    question: "Which areas in Johor do you deliver to?",
    chineseQuestion: "金龙自助餐配送柔佛哪些地区？",
    answer: "Based in Senai, we deliver to Johor Bahru (JB), Kulai, Skudai, Senai, Masai, Pasir Gudang, and surrounding areas. For other districts in Johor, please contact our support to check scheduling availability.",
    chineseAnswer: "我们总部设在士乃（Senai），配送范围全面覆盖新山（JB）、古来（Kulai）、士姑来（Skudai）、巴西古当（Pasir Gudang）、马西（Masai）及周边邻近地区。若有柔佛其他县市需求，欢迎联系客服确认档期与安排。",
  },
  {
    id: "halal-sourced",
    question: "Is your food Halal-certified or Muslim-friendly?",
    chineseQuestion: "你们的食物是清真的吗？适合穆斯林食用吗？",
    answer: "We are a pork-free establishment. All raw meat, poultry, and ingredients are sourced exclusively from Halal-certified suppliers. We routinely cater for multicultural corporate events, government agencies, and multi-ethnic community gatherings.",
    chineseAnswer: "我们是一家无猪肉（Pork-Free）餐饮企业。所有家禽肉类及调味原料均100%采购自持有马来西亚清真认证（Halal）的合格供应商。我们经常承接各大跨国企业多元种族联欢会、政府机构及多元文化社区集会，广受各族同胞信赖。",
  },
  {
    id: "packages-include",
    question: "What is included in the buffet package price?",
    chineseQuestion: "自助餐配套价格里包含什么？",
    answer: "Our standard buffet package includes high-quality food presentation tables, white/gold themed tablecloths, food-grade warmers/chafing dishes, trash bags, and double-portion disposable plates, cups, spoons, and forks. Cleaning of the food setup area after the event is also included.",
    chineseAnswer: "我们的标准自助餐配套价格已包含：高雅的食物陈列展示长桌、精美白/金主题桌布、食品级保温炉架、垃圾袋以及双倍分量的一次性餐盘、水杯、汤匙和叉子。活动结束后，我们的工作人员还会负责清理餐台陈列区域的卫生。",
  },
  {
    id: "minimum-order",
    question: "What is the minimum guest requirement (PAX)?",
    chineseQuestion: "宴席预订的最少人数限制是多少？",
    answer: "Our event buffet catering has a minimum requirement of 50 PAX. For smaller groups, we highly recommend our premium Corporate Bento Boxes or customizing a mini buffet option. Feel free to WhatsApp our event experts to discuss special options.",
    chineseAnswer: "我们的宴会自助餐预订门槛最少为50人（PAX）。若您的活动人数少于50人，我们强烈推荐订购我们的精美企业便当盒（Bento Box）或定制迷你自助餐。欢迎直接联系我们的宴席专员了解灵活方案。",
  },
  {
    id: "booking-notice",
    question: "How early in advance should we place a booking?",
    chineseQuestion: "我们应该提前多久下单预订？",
    answer: "We recommend booking at least 7 to 14 days in advance to secure your preferred date, especially during weekend peak event seasons and public holidays. A 50% deposit is required to lock in the kitchen slots and logistics planning.",
    chineseAnswer: "为了确保您的黄金档期，特别是在周末、公共假期或年底婚宴旺季，我们建议您至少提前 7 至 14 天预订。确认下单后，需支付50%的订金以锁定后厨配给和物流车辆编排。",
  },
];

interface FAQSectionProps {
  lang?: "en" | "zh";
}

export function FAQSection({ lang = "en" }: FAQSectionProps) {
  return (
    <section id="faq" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Left Side: Header & Support Card */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-28">
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-primary font-semibold tracking-wider uppercase"
              >
                {lang === "en" ? "Got Questions?" : "常见问题"}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl font-bold text-foreground tracking-tight text-balance leading-tight"
              >
                {lang === "en" ? "Frequently Asked Questions" : "解答您的疑惑"}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground text-sm leading-relaxed"
              >
                {lang === "en"
                  ? "Here are answers to the most common questions about our services. Can't find what you need? Chat with our event specialists directly on WhatsApp."
                  : "这里汇集了顾客在预订自助餐时最常咨询的问题。没找到您想了解的信息？随时在右下角点击 WhatsApp 与我们的客服专员直接对话。"}
              </motion.p>
            </div>

            {/* Premium Support micro-card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden shadow-sm group hover:border-primary/40 transition-colors"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl translate-x-4 -translate-y-4" />
              <HelpCircle className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-bold text-foreground text-base">
                {lang === "en" ? "Still need assistance?" : "还有其他特殊需求？"}
              </h4>
              <p className="text-muted-foreground text-xs mt-1 leading-normal">
                {lang === "en"
                  ? "We customize packages for baby full moon parties, traditional corporate opening ceremonies, and large factory daily supplies."
                  : "无论是宝宝满月酒、新店开张传统舞狮拜神祭祖、还是上千人的工厂长期膳食供应，我们都能提供高度定制化方案。"}
              </p>
              <a
                href="https://wa.me/60197288226"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary text-xs font-bold mt-4 group-hover:underline"
              >
                {lang === "en" ? "Contact Support Now" : "立即联系专员定制"} →
              </a>
            </motion.div>
          </div>

          {/* Right Side: Accordion FAQs */}
          <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  id={`faq-item-${faq.id}`}
                  className="border-b border-border py-2 last:border-b-0"
                >
                  <AccordionTrigger className="text-base font-bold text-foreground hover:text-primary transition-colors text-left hover:no-underline md:text-lg">
                    {lang === "en" ? faq.question : faq.chineseQuestion}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pt-2 pb-4 pr-6">
                    {lang === "en" ? faq.answer : faq.chineseAnswer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
