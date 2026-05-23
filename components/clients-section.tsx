"use client";

import { motion } from "framer-motion";
import { Quote, GraduationCap, Building2 } from "lucide-react";

import Image from "next/image";

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

// Total 27 clients divided into two rows for the marquee
const clientsRow1 = [
  { name: "PHHP Marketing", image: "/images/clients/phhp marketing (m) Sdn bhd.png" },
  { name: "新山海南会馆", image: "/images/clients/新山海南会馆.jpg" },
  { name: "EPG Data Central", image: "/images/clients/EPG DATA CENTRAL.jpg" },
  { name: "SP SAM Property", image: "/images/clients/sp sam property.png" },
  { name: "Bank Rakyat", image: "/images/clients/bank rakyat.png" },
  { name: "柔南兴安会馆", image: "/images/clients/柔南兴安会馆.png" },
  { name: "PRO3C (Malaysia)", image: "/images/clients/Pro3c (malaysia) sdn bhd.png" },
  { name: "GSP Automotive", image: "/images/clients/GSP AUTOMOTIVE.png" },
  { name: "新山福建公会", image: "/images/clients/新山福建公会.png" },
  { name: "柔佛潮州八邑会馆", image: "/images/clients/柔佛潮州会馆.png" },
  { name: "Joyee Preschool 卓悦幼儿园", image: "/images/clients/joyee preschool.png" },
  { name: "S.J.K. (C) Seelong 泗隆华小", image: "/images/clients/泗隆华文小学.jpg" },
  { name: "Nirvana 富贵", image: "/images/clients/nirvana 富贵.png" },
  { name: "LINBAQ Holding", image: "/images/clients/linbao holiding sdn bhd.png" },
];

const clientsRow2 = [
  { name: "Aczeon Ventures Capital", image: "/images/clients/ACZEON VENTURES CAPITAL SDN BHD.png" },
  { name: "S.J.K. (C) Foon Yew 1", image: "/images/clients/宽柔一校.jpg" },
  { name: "S.J.K. (C) Foon Yew 2", image: "/images/clients/宽柔二校.jpg" },
  { name: "S.J.K. (C) Foon Yew 4", image: "/images/clients/宽柔四校.jpg" },
  { name: "S.J.K. (C) Foon Yew 5", image: "/images/clients/宽柔五校.png" },
  { name: "S.J.K. (C) Kulai Besar", image: "/images/clients/大姑来华小.jpg" },
  { name: "S.J.K. (C) Senai", image: "/images/clients/士乃华文小学.jpg" },
  { name: "Foon Yew High School", image: "/images/clients/新山宽柔中学.jpg" },
  { name: "Foon Yew High School - Kulai", image: "/images/clients/古来宽柔中学.jpg" },
  { name: "Chinese Chamber of Commerce Kulai", image: "/images/clients/古来中华商会.jpg" },
  { name: "新山中华公会", image: "/images/clients/中华公会·.jpg" },
  { name: "Southern University College", image: "/images/clients/南方学院.png" },
  { name: "Kulai Vision Church", image: "/images/clients/kulai vision church.jpg" },
];

interface ClientsSectionProps {
  lang?: "en" | "zh";
}

export function ClientsSection({ lang = "en" }: ClientsSectionProps) {
  const isChinese = lang === "zh";
  const testimonials = testimonialsData[lang];

  return (
    <section id="clients" className="py-24 bg-secondary/30 overflow-hidden">
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

        {/* Client Logos 2-Row Marquee */}
        <div className="relative mb-20 flex flex-col gap-6">
          {/* 边缘渐变遮罩，让滚动过渡更自然 */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-secondary/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-secondary/30 to-transparent z-10 pointer-events-none" />

          {/* Row 1 - Scrolling Right */}
          <div className="flex w-[200%] sm:w-[150%] md:w-[200%] lg:w-[150%] overflow-hidden">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
              className="flex gap-4 sm:gap-6 w-full"
            >
              {[...clientsRow1, ...clientsRow1].map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 sm:w-56 flex flex-col items-center justify-center gap-3 bg-white border border-border/60 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative w-full h-20 sm:h-24 flex items-center justify-center p-2 mix-blend-multiply">
                    <Image
                      src={client.image}
                      alt={client.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 150px, 200px"
                    />
                  </div>
                  <span className="font-bold text-foreground text-xs sm:text-sm text-center line-clamp-2 min-h-[2rem]">
                    {client.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 - Scrolling Right (Different speed/offset) */}
          <div className="flex w-[200%] sm:w-[150%] md:w-[200%] lg:w-[150%] overflow-hidden">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
              className="flex gap-4 sm:gap-6 w-full"
            >
              {[...clientsRow2, ...clientsRow2].map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 sm:w-56 flex flex-col items-center justify-center gap-3 bg-white border border-border/60 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative w-full h-20 sm:h-24 flex items-center justify-center p-2 mix-blend-multiply">
                    <Image
                      src={client.image}
                      alt={client.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 150px, 200px"
                    />
                  </div>
                  <span className="font-bold text-foreground text-xs sm:text-sm text-center line-clamp-2 min-h-[2rem]">
                    {client.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-border rounded-3xl p-8 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
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
