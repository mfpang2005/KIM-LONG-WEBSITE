"use client";

import { useState, useEffect } from "react";
import { motion } from "react-motion"; // wait, the user's package.json uses framer-motion! Let's import from "framer-motion"!
import { motion as motionFramer } from "framer-motion";
import { Calculator, MessageCircle, Info, ChevronRight, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface PackageOption {
  id: string;
  name: string;
  chineseName: string;
  pricePerPax: number;
  description: string;
  chineseDescription: string;
}

const packages: PackageOption[] = [
  {
    id: "menu-a",
    name: "Classic Menu A",
    chineseName: "经典套餐 A",
    pricePerPax: 23,
    description: "Roasted Chicken, Nestum Fish Fillet, Sesame Ribs, Fried Mee Hoon, etc.",
    chineseDescription: "当红炸子鸡、麦片鱼片、京都排骨皇、炒米粉、炒饭等8道名菜",
  },
  {
    id: "menu-b",
    name: "Heritage Menu B",
    chineseName: "传统招牌套餐 B",
    pricePerPax: 26,
    description: "Signature Pipa Duck, Nestum Prawn, Sweet & Sour Fish, Golden Rice, etc.",
    chineseDescription: "老字号招牌琵琶鸭、麦片大虾、酸甜鱼片、黄金炒饭等9道丰盛佳肴",
  },
  {
    id: "menu-c",
    name: "Grand Menu C",
    chineseName: "至尊宴席套餐 C",
    pricePerPax: 29,
    description: "Pipa Duck, Har Lok Prawns, Sesame Ribs, Curry Chicken, Broccoli, etc.",
    chineseDescription: "琵琶鸭、干煎大虾（哈禄）、京都排骨、咖喱鸡、双菇西兰花等豪华名菜",
  },
  {
    id: "western",
    name: "Western Buffet",
    chineseName: "华丽西式自助餐",
    pricePerPax: 40,
    description: "Tuscany Tomato Prawn, Raisin Rice, Grilled Pork Ribs, Aglio Olio, etc.",
    chineseDescription: "托斯卡纳茄汁虾、果蜜烤排骨、香草烤鸡扒、蒜香海鲜意面等精致洋食",
  },
];

interface UpgradeItem {
  id: string;
  name: string;
  chineseName: string;
  price: number;
  type: "flat" | "per-pax" | "calculated-servers";
  description: string;
  chineseDescription: string;
}

const upgrades: UpgradeItem[] = [
  {
    id: "waitstaff",
    name: "Professional Waitstaff",
    chineseName: "专业现场服务生",
    price: 150,
    type: "calculated-servers",
    description: "1 waiter recommended per 30 pax. Includes setting up, replenishing food, and cleaning tables.",
    chineseDescription: "建议每30人配备1位。服务生负责餐台摆盘、持续补菜、收拾盘子及现场垃圾清理。",
  },
  {
    id: "canopy",
    name: "Golden Canopy & Tables Rental",
    chineseName: "金色雨篷与宴席桌椅租赁",
    price: 450,
    type: "flat",
    description: "Includes 1 high-quality gold/red canopy (18x18ft), 4 round tables with table cloths, and 40 chairs.",
    chineseDescription: "包含1顶精美红金防雨雨篷（18x18尺）、4张精美铺巾圆餐桌及40张宴会红靠椅。",
  },
  {
    id: "dessert",
    name: "Premium Sweet & Dessert Station",
    chineseName: "升级精美西式一口甜点台",
    price: 6,
    type: "per-pax",
    description: "Upgrades your buffet with custom macaron displays, petite fruit tarts, chocolate shooters, and traditional sweet soup.",
    chineseDescription: "为人均增加精美马卡龙、迷你果挞、巧克力慕斯杯拼盘，以及经典中式养生温润糖水。",
  },
];

interface QuoteCalculatorProps {
  lang?: "en" | "zh";
}

export function QuoteCalculator({ lang = "en" }: QuoteCalculatorProps) {
  const [selectedPackageId, setSelectedPackageId] = useState(packages[1].id);
  const [paxCount, setPaxCount] = useState(80);
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);

  // Find active package
  const activePackage = packages.find((p) => p.id === selectedPackageId) || packages[1];

  // Calculate costs
  const baseCost = activePackage.pricePerPax * paxCount;

  // Waitstaff server count logic: Math.ceil(paxCount / 30)
  const serverCount = Math.ceil(paxCount / 30);

  let upgradesCost = 0;
  selectedUpgrades.forEach((id) => {
    const upgrade = upgrades.find((u) => u.id === id);
    if (upgrade) {
      if (upgrade.type === "flat") {
        upgradesCost += upgrade.price;
      } else if (upgrade.type === "per-pax") {
        upgradesCost += upgrade.price * paxCount;
      } else if (upgrade.type === "calculated-servers") {
        upgradesCost += upgrade.price * serverCount;
      }
    }
  });

  const totalCost = baseCost + upgradesCost;
  const avgCostPerPax = totalCost / paxCount;

  const handleToggleUpgrade = (id: string) => {
    setSelectedUpgrades((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Preformat WhatsApp Inquiry Text
  const handleSendWhatsApp = () => {
    const formattedDate = new Date().toLocaleDateString(lang === "en" ? "en-US" : "zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const isChinese = lang === "zh";

    let message = "";
    if (isChinese) {
      message = `你好，Kim Long Catering！我想咨询一下贵公司的自助餐宴席承办服务：
----------------------------------
【预订配套】：${activePackage.chineseName} (RM ${activePackage.pricePerPax}/PAX)
【预计人数】：${paxCount} 人 (PAX)
【选择升级项目】：
${
  selectedUpgrades.length === 0
    ? "无额外加购项目"
    : selectedUpgrades
        .map((id) => {
          const u = upgrades.find((item) => item.id === id);
          if (u?.id === "waitstaff") {
            return ` - ${u.chineseName} (配置 ${serverCount} 位服务员): RM ${u.price * serverCount}`;
          }
          if (u?.type === "per-pax") {
            return ` - ${u?.chineseName}: RM ${u!.price * paxCount}`;
          }
          return ` - ${u?.chineseName}: RM ${u?.price}`;
        })
        .join("\n")
}
----------------------------------
【基础套餐估算】：RM ${baseCost.toLocaleString()}
【加购项目总计】：RM ${upgradesCost.toLocaleString()}
【预计总金额】：RM ${totalCost.toLocaleString()}
【预计人均开销】：RM ${avgCostPerPax.toFixed(1)} / 人
----------------------------------
【宴席预计日期】：[请在此填写您的举办日期]
【宴席配送地址】：[请在此填写您的举办地址]

期待您的回复，谢谢！`;
    } else {
      message = `Hello Kim Long Catering, I would like to inquire about your professional catering services:
----------------------------------
- Package Chosen: ${activePackage.name} (RM ${activePackage.pricePerPax}/PAX)
- Total Guests: ${paxCount} PAX
- Selected Add-ons:
${
  selectedUpgrades.length === 0
    ? "None"
    : selectedUpgrades
        .map((id) => {
          const u = upgrades.find((item) => item.id === id);
          if (u?.id === "waitstaff") {
            return `  * ${u.name} (Qty: ${serverCount} servers): RM ${u.price * serverCount}`;
          }
          if (u?.type === "per-pax") {
            return `  * ${u?.name}: RM ${u!.price * paxCount}`;
          }
          return `  * ${u?.name}: RM ${u?.price}`;
        })
        .join("\n")
}
----------------------------------
- Base Catering Cost: RM ${baseCost.toLocaleString()}
- Upgrades Cost: RM ${upgradesCost.toLocaleString()}
- Estimated Total: RM ${totalCost.toLocaleString()}
- Avg. Cost Per Guest: RM ${avgCostPerPax.toFixed(1)} / PAX
----------------------------------
- Preferred Event Date: [Please enter your event date here]
- Setup Address: [Please enter your delivery location here]

Thank you!`;
    }

    const whatsappUrl = `https://wa.me/60197288226?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="calculator" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motionFramer.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider uppercase mb-2"
          >
            {lang === "en" ? "Self-Service Budgeting" : "透明化报价"}
          </motionFramer.p>
          <motionFramer.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance"
          >
            {lang === "en" ? "Interactive Quote Calculator" : "智能自助报价计算器"}
          </motionFramer.h2>
          <motionFramer.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            {lang === "en"
              ? "Plan your perfect feast in 3 easy steps. Select your package, adjust guest headcount, customize add-ons, and get an instant cost summary."
              : "只需简单3步，在线定制专属大宴。选择套餐、滑动人数、勾选现场升级，系统一秒算出明细预算，直观清晰。"}
          </motionFramer.p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Left panel: Inputs (8 cols) */}
          <div className="lg:col-span-7 bg-card border border-border rounded-3xl p-6 md:p-8 space-y-8 flex flex-col justify-between shadow-sm">
            
            {/* Step 1: Select Package */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">1</span>
                <h3 className="font-bold text-lg text-foreground">
                  {lang === "en" ? "Choose Buffet Package" : "第一步：选择订餐配套"}
                </h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    id={`calc-pkg-btn-${pkg.id}`}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`flex flex-col text-left p-4 rounded-2xl border transition-all duration-300 ${
                      selectedPackageId === pkg.id
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border bg-background hover:border-foreground/20"
                    }`}
                  >
                    <span className="font-bold text-sm text-foreground">
                      {lang === "en" ? pkg.name : pkg.chineseName}
                    </span>
                    <span className="text-primary font-extrabold text-base mt-1">
                      RM {pkg.pricePerPax} <span className="text-xs font-normal text-muted-foreground">/ PAX</span>
                    </span>
                    <span className="text-xs text-muted-foreground mt-2 line-clamp-1">
                      {lang === "en" ? pkg.description : pkg.chineseDescription}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Slider Pax */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">2</span>
                  <h3 className="font-bold text-lg text-foreground">
                    {lang === "en" ? "Select Guest Headcount" : "第二步：设定预计人数 (PAX)"}
                  </h3>
                </div>
                <div className="bg-primary/10 text-foreground px-4 py-1.5 rounded-full font-extrabold text-lg flex items-center gap-1.5">
                  <span id="calc-pax-count-display">{paxCount}</span>
                  <span className="text-xs font-semibold text-muted-foreground">PAX</span>
                </div>
              </div>

              <div className="pt-2 px-1">
                <Slider
                  defaultValue={[80]}
                  min={50}
                  max={500}
                  step={5}
                  value={[paxCount]}
                  onValueChange={(val) => setPaxCount(val[0])}
                  className="[&_[data-slot=slider-range]]:bg-primary [&_[data-slot=slider-thumb]]:border-primary [&_[data-slot=slider-thumb]]:bg-background"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-3">
                  <span>50 PAX ({lang === "en" ? "Min Order" : "起订人数"})</span>
                  <span>250 PAX</span>
                  <span>500+ PAX</span>
                </div>
              </div>
            </div>

            {/* Step 3: Upgrades */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">3</span>
                <h3 className="font-bold text-lg text-foreground">
                  {lang === "en" ? "Add Optional Upgrades" : "第三步：加购升级服务（可选）"}
                </h3>
              </div>

              <div className="space-y-3">
                {upgrades.map((upg) => {
                  const isSelected = selectedUpgrades.includes(upg.id);
                  return (
                    <button
                      key={upg.id}
                      id={`calc-upg-btn-${upg.id}`}
                      onClick={() => handleToggleUpgrade(upg.id)}
                      className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all duration-300 ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border bg-background hover:border-foreground/20"
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 ${
                        isSelected ? "bg-primary border-primary text-primary-foreground" : "border-border bg-card"
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline flex-wrap gap-2">
                          <span className="font-bold text-sm text-foreground">
                            {lang === "en" ? upg.name : upg.chineseName}
                          </span>
                          <span className="text-primary font-bold text-sm">
                            {upg.id === "waitstaff"
                              ? `+ RM ${upg.price} / server`
                              : upg.type === "per-pax"
                              ? `+ RM ${upg.price} / PAX`
                              : `+ RM ${upg.price}`}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                          {lang === "en" ? upg.description : upg.chineseDescription}
                        </p>
                        {upg.id === "waitstaff" && isSelected && (
                          <div className="mt-2 inline-flex items-center gap-1.5 bg-primary/10 text-foreground text-xs px-2.5 py-1 rounded-md font-medium">
                            <Info className="w-3.5 h-3.5 text-primary" />
                            <span>
                              {lang === "en"
                                ? `Allocating ${serverCount} servers for ${paxCount} guests`
                                : `已自动为您计算配给 ${serverCount} 位服务员`}
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right panel: Receipt & Summary (5 cols) */}
          <div className="lg:col-span-5 bg-foreground text-background rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-xl" />

            <div className="space-y-8 relative z-10">
              <div className="flex items-center gap-2 border-b border-background/10 pb-4">
                <Calculator className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg">
                  {lang === "en" ? "Estimate Cost Summary" : "预算结算明细单"}
                </h3>
              </div>

              {/* Receipt Breakdown */}
              <div className="space-y-4 text-sm font-medium">
                {/* Package Base Item */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="text-background/90 text-sm">
                      {lang === "en" ? activePackage.name : activePackage.chineseName}
                    </p>
                    <p className="text-background/50 text-xs mt-1">
                      RM {activePackage.pricePerPax} × {paxCount} PAX
                    </p>
                  </div>
                  <span className="text-background font-bold">
                    RM {baseCost.toLocaleString()}
                  </span>
                </div>

                {/* Selected Upgrades Items */}
                {selectedUpgrades.length > 0 && (
                  <div className="border-t border-background/10 pt-4 space-y-4">
                    <p className="text-xs text-primary font-bold tracking-widest uppercase">
                      {lang === "en" ? "Selected Upgrades" : "已选升级项目"}
                    </p>
                    
                    {selectedUpgrades.map((id) => {
                      const u = upgrades.find((item) => item.id === id);
                      if (!u) return null;
                      
                      let displayCost = 0;
                      let calculationText = "";
                      
                      if (u.type === "flat") {
                        displayCost = u.price;
                        calculationText = lang === "en" ? "One-time rental cost" : "一次性租赁配套价格";
                      } else if (u.type === "per-pax") {
                        displayCost = u.price * paxCount;
                        calculationText = `RM ${u.price} × ${paxCount} PAX`;
                      } else if (u.id === "waitstaff") {
                        displayCost = u.price * serverCount;
                        calculationText = `RM ${u.price} × ${serverCount} servers`;
                      }
                      
                      return (
                        <div key={u.id} className="flex justify-between items-start gap-4">
                          <div>
                            <p className="text-background/90 text-sm">
                              {lang === "en" ? u.name : u.chineseName}
                            </p>
                            <p className="text-background/50 text-xs mt-1">{calculationText}</p>
                          </div>
                          <span className="text-background font-bold">
                            RM {displayCost.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Table display tables warning note */}
                <div className="bg-background/5 rounded-2xl p-4 text-xs text-background/60 leading-relaxed border border-background/10 mt-4">
                  <span className="font-bold text-primary mr-1">💡 {lang === "en" ? "Included Service" : "免费配套福利"} :</span>
                  {lang === "en"
                    ? "Includes double portion of standard disposable cutlery, food warmers/table layouts, trash bags, and post-event cleanup."
                    : "价格已自动包揽双倍容量一次性餐具、高档保温炉架、餐台白金布幔铺设、现场垃圾清理等全套服务。"}
                </div>
              </div>
            </div>

            {/* Total Section */}
            <div className="border-t border-background/10 pt-6 mt-8 relative z-10 space-y-6">
              <div className="flex justify-between items-baseline">
                <div>
                  <p className="text-background font-black text-2xl md:text-3xl tracking-tight">
                    RM {totalCost.toLocaleString()}
                  </p>
                  <p className="text-background/50 text-xs mt-1">
                    {lang === "en" ? "Estimated Total Price" : "预计总金额"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-primary font-extrabold text-base md:text-lg">
                    RM {avgCostPerPax.toFixed(1)}
                  </p>
                  <p className="text-background/50 text-xs mt-1">
                    {lang === "en" ? "Avg. Per Pax" : "人均预算额"}
                  </p>
                </div>
              </div>

              {/* Call-to-action button */}
              <button
                id="btn-calc-submit-whatsapp"
                onClick={handleSendWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-full font-bold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/20 cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                {lang === "en" ? "Inquire Price via WhatsApp" : "一键发至 WhatsApp 询价"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
