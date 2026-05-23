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
  { name: "PHHP", image: "/images/clients/phhp.png" },
  { name: "Persatuan Hainan Johor Bahru", image: "/images/clients/hainan.png" },
  { name: "EPG", image: "/images/clients/epg.png" },
  { name: "SP SAM PROPERTY", image: "/images/clients/spsam.png" },
  { name: "Bank Rakyat", image: "/images/clients/bankrakyat.png" },
  { name: "Persatuan Hin Ann Johor Selatan", image: "/images/clients/hinann.png" },
  { name: "PRO3C", image: "/images/clients/pro3c.png" },
  { name: "GS P", image: "/images/clients/gsp.png" },
  { name: "Persatuan Hokkien Johor Bahru", image: "/images/clients/hokkien.png" },
  { name: "Teochew Eight Districts Assoc.", image: "/images/clients/teochew.png" },
  { name: "Joyee Preschool", image: "/images/clients/joyee.png" },
  { name: "S.J.K (C) Seelong", image: "/images/clients/seelong.png" },
  { name: "Nirvana", image: "/images/clients/nirvana.png" },
  { name: "LINBAQ", image: "/images/clients/linbaq.png" },
];

const clientsRow2 = [
  { name: "VK", image: "/images/clients/vk.png" },
  { name: "SJK (C) Foon Yew 1", image: "/images/clients/foonyew1.png" },
  { name: "SJK (C) Foon Yew 2", image: "/images/clients/foonyew2.png" },
  { name: "SJK (C) Foon Yew 4", image: "/images/clients/foonyew4.png" },
  { name: "SJK (C) Foon Yew 5", image: "/images/clients/foonyew5.png" },
  { name: "SJK (C) Kulai Besar", image: "/images/clients/kulaibesar.png" },
  { name: "SJK (C) Senai", image: "/images/clients/senai.png" },
  { name: "Foon Yew High School", image: "/images/clients/foonyew.png" },
  { name: "Foon Yew High School - Kulai", image: "/images/clients/foonyew-kulai.png" },
  { name: "Chinese Chamber of Commerce Kulai (CCCK)", image: "/images/clients/ccck.png" },
  { name: "Persekutuan Tiong-Hua Johor Baru", image: "/images/clients/tionghua.png" },
  { name: "Southern University College", image: "/images/clients/southern.png" },
  { name: "Corporate Client", image: "/images/clients/client-a.png" },
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
