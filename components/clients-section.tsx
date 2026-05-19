"use client";

import { motion } from "framer-motion";
import { Quote, GraduationCap, Building2 } from "lucide-react";

const testimonialsData = {
  en: [
    {
      name: "Sunny",
      role: "Event Organizer",
      content: "Excellent service, delicious food. The portions are huge and very cost-effective!",
      rating: 5,
    },
    {
      name: "Shim Chung Nam",
      role: "Regular Customer",
      content: "This is the authentic Golden Dragon Catering. Great food, fair prices. The signature Pipa Duck is a must-order.",
      rating: 5,
    },
  ],
  zh: [
    {
      name: "Sunny",
      role: "专业婚宴策划师",
      content: "服务态度无可挑剔，菜品味道非常正宗！菜量极多，性价比极高，现场宾客反应特别好！",
      rating: 5,
    },
    {
      name: "沈忠南",
      role: "资深老顾客",
      content: "这就是士乃老字号正宗的‘金龙自助餐’。菜品水准常年稳定，收费合理。招牌手工琵琶鸭绝了，每场宴会必点！",
      rating: 5,
    },
  ],
};

const clientsData = {
  en: [
    {
      name: "Southern University College",
      icon: GraduationCap,
    },
    {
      name: "Chinese Chamber of Commerce Kulai (CCCK)",
      icon: Building2,
    },
  ],
  zh: [
    {
      name: "南方大学学院 (Southern University College)",
      icon: GraduationCap,
    },
    {
      name: "古来中华总商会 (CCCK)",
      icon: Building2,
    },
  ],
};

interface ClientsSectionProps {
  lang?: "en" | "zh";
}

export function ClientsSection({ lang = "en" }: ClientsSectionProps) {
  const isChinese = lang === "zh";
  const testimonials = testimonialsData[lang];
  const clients = clientsData[lang];

  return (
    <section id="clients" className="py-24 bg-secondary/30">
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
            {isChinese ? "载誉满满 • 口碑见证" : "Trusted By Many"}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance tracking-tight">
            {isChinese ? "合作伙伴与客户好评" : "Our Valued Clients & Reviews"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {isChinese
              ? "我们深感自豪，曾为柔佛州许多备受尊崇的高校、商会以及数千家庭的团圆宴提供专业餐饮配套。"
              : "We are proud to serve some of the most respected organizations in Johor."}
          </p>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          {clients.map((client, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-card border border-border rounded-2xl px-6 py-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <client.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="font-bold text-foreground text-sm">{client.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-border rounded-3xl p-8 relative flex flex-col justify-between shadow-sm"
            >
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />

              <div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-foreground font-semibold text-base md:text-lg mb-6 leading-relaxed">
                  {`"${testimonial.content}"`}
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-border pt-4 mt-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-extrabold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
