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
      name: "PHHP Marketing",
      role: "Corporate Client",
      content: "We've used Kim Long for our annual dinners multiple times. The buffet setup is premium and the food quality is always top-notch.",
      rating: 5,
    },
    {
      name: "Foon Yew High School",
      role: "Mega Event Organizer",
      content: "Managing food for thousands of students and parents is not easy, but Kim Long handled it flawlessly. Punctual delivery and strict food safety.",
      rating: 5,
    },
    {
      name: "Shim Chung Nam",
      role: "Regular Customer",
      content: "This is the authentic Golden Dragon Catering. Great food, fair prices. The signature Pipa Duck is a must-order.",
      rating: 5,
    },
    {
      name: "Nirvana Asia",
      role: "Long-term Partner",
      content: "A highly reliable catering partner. Their service is extremely professional and the traditional Chinese dishes always meet our strict standards.",
      rating: 5,
    },
    {
      name: "Joyee Preschool",
      role: "Educational Institution",
      content: "The kids absolutely love the food! It's nutritious, safe, and the variety is excellent. We highly recommend their daily meal services.",
      rating: 5,
    {
      name: "Southern University College",
      role: "University Event Organizer",
      content: "As a higher education institution, we have high standards for our grand dinners. Kim Long catered our anniversary dinner flawlessly with exquisite dishes and attentive service.",
      rating: 5,
    },
    {
      name: "SP SAM Property",
      role: "Corporate Client",
      content: "Kim Long handles our annual appreciation dinners and sales celebrations. The food portions are always surprisingly generous, and our team absolutely loves it!",
      rating: 5,
    },
    {
      name: "Johor Hokkien Association",
      role: "Association Client",
      content: "A true heritage brand! We entrust our annual association banquets to Kim Long. They not only preserve the traditional taste but also manage everything with top-notch professionalism.",
      rating: 5,
    },
    {
      name: "Bank Rakyat",
      role: "Corporate Client",
      content: "A highly professional catering service. Their premium bento sets are our top choice for corporate meetings. Exquisitely packed and incredibly delicious. Highly recommended!",
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
      name: "PHHP 长青集团",
      role: "企业级客户",
      content: "作为企业客户，我们多次指定金龙承办公司晚宴。从高档的餐台布幔设计到菜品质量都极具水准，员工反馈非常满意！",
      rating: 5,
    },
    {
      name: "宽柔中学",
      role: "大型活动主办方",
      content: "要在校庆时为数千名师生与家长提供膳食是一项巨大挑战，但金龙完美做到了！不仅出餐准时，而且食品卫生把控得非常严格。",
      rating: 5,
    },
    {
      name: "沈忠南",
      role: "资深老顾客",
      content: "这就是士乃老字号正宗的‘金龙自助餐’。菜品水准常年稳定，收费合理。招牌手工琵琶鸭绝了，每场宴会必点！",
      rating: 5,
    },
    {
      name: "Nirvana 富贵",
      role: "长期合作伙伴",
      content: "非常可靠的长期餐饮合作伙伴。团队服务极度专业，无论是传统中式宴席还是精美企业便当，都完美契合我们的高标准要求。",
      rating: 5,
    },
    {
      name: "Joyee 卓悦幼儿园",
      role: "教育机构",
      content: "无论是每日餐食的营养科学搭配还是卫生安全，金龙都让人彻底放心。孩子们非常喜欢，强烈推荐他们的机构日常配餐服务！",
      rating: 5,
    {
      name: "南方大学学院",
      role: "高校大型活动组",
      content: "作为高等学府，我们对大型晚宴的要求极高。金龙不仅承接了我们的校庆晚宴，且菜品精致，服务周到，获得了海内外嘉宾的一致好评！",
      rating: 5,
    },
    {
      name: "SP SAM Property",
      role: "企业客户",
      content: "公司每年的慰劳宴和销售庆功宴都由金龙一手包办，食物的分量永远让人惊喜，员工们都吃得很开心！",
      rating: 5,
    },
    {
      name: "新山福建公会",
      role: "公会理事会",
      content: "老字号的品质保证！每年的会庆宴席我们都放心交托给金龙，他们不仅保留了正宗的古早味，在卫生和时间把控上也非常专业。",
      rating: 5,
    },
    {
      name: "Bank Rakyat",
      role: "企业级客户",
      content: "非常专业的企业服务团队！我们的高规格部门会议经常预订他们的高级便当，不仅包装精美，味道更是绝佳，强烈推荐！",
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

          {/* Row 1 - Scrolling Left */}
          <div className="flex overflow-hidden w-full">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
              className="flex gap-4 sm:gap-6 w-max"
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

          {/* Row 2 - Scrolling Left (Different speed/offset) */}
          <div className="flex overflow-hidden w-full">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
              className="flex gap-4 sm:gap-6 w-max ml-8"
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-[90rem] mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-5 right-5" />

              <div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-foreground font-semibold text-sm md:text-[15px] mb-5 leading-relaxed">
                  {`"${testimonial.content}"`}
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-border pt-4 mt-1">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-black text-base">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-extrabold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
