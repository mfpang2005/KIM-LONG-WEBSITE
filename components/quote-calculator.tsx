"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, MessageCircle, Info, ChevronRight, Check, RefreshCw, Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface PackageOption {
  id: string;
  name: string;
  chineseName: string;
  pricePerPax: number;
  description: string;
  chineseDescription: string;
  defaultDishes: Record<string, string>; // category -> dishId
}

const packages: PackageOption[] = [
  {
    id: "menu-a",
    name: "Classic Menu A",
    chineseName: "经典套餐 A",
    pricePerPax: 23,
    description: "Roasted Chicken, Nestum Fish Fillet, Sesame Ribs, Fried Mee Hoon, etc.",
    chineseDescription: "当红炸子鸡、麦片鱼片、京都排骨皇、炒米粉、炒饭等8道名菜",
    defaultDishes: {
      meat: "roast-chicken",
      seafood: "nestum-fish",
      veggie: "curry-veg",
      carb: "fried-rice",
      dessert: "watermelon",
    },
  },
  {
    id: "menu-b",
    name: "Heritage Menu B",
    chineseName: "传统招牌套餐 B",
    pricePerPax: 26,
    description: "Signature Pipa Duck, Nestum Prawn, Sweet & Sour Fish, Golden Rice, etc.",
    chineseDescription: "老字号招牌琵琶鸭、麦片大虾、酸甜鱼片、黄金炒饭等9道丰盛佳肴",
    defaultDishes: {
      meat: "pipa-duck",
      seafood: "nestum-prawn",
      veggie: "curry-veg",
      carb: "fried-rice",
      dessert: "watermelon",
    },
  },
  {
    id: "menu-c",
    name: "Grand Menu C",
    chineseName: "至尊宴席套餐 C",
    pricePerPax: 29,
    description: "Pipa Duck, Har Lok Prawns, Sesame Ribs, Curry Chicken, Broccoli, etc.",
    chineseDescription: "琵琶鸭、干煎大虾（哈禄）、京都排骨、咖喱鸡、双菇西兰花等豪华名菜",
    defaultDishes: {
      meat: "pipa-duck",
      seafood: "har-lok-prawn",
      veggie: "broccoli-mush",
      carb: "fried-meehoon",
      dessert: "watermelon",
    },
  },
  {
    id: "western",
    name: "Western Buffet",
    chineseName: "华丽西式自助餐",
    pricePerPax: 40,
    description: "Tuscany Tomato Prawn, Raisin Rice, Grilled Pork Ribs, Aglio Olio, etc.",
    chineseDescription: "托斯卡纳茄汁虾、果蜜烤排骨、香草烤鸡扒、蒜香海鲜意面等精致洋食",
    defaultDishes: {
      meat: "chicken-chop",
      seafood: "tuscany-prawn",
      veggie: "egg-salad",
      carb: "aglio-olio",
      dessert: "pastries",
    },
  },
];

interface DishOption {
  id: string;
  name: string;
  chineseName: string;
  category: "meat" | "seafood" | "veggie" | "carb" | "dessert";
  surcharge: number; // Extra charge per pax
}

const dishPool: Record<string, DishOption[]> = {
  meat: [
    { id: "roast-chicken", name: "Fragrant Roasted Chicken", chineseName: "金牌红粉炸香鸡", category: "meat", surcharge: 0 },
    { id: "sesame-ribs", name: "Sesame Spare Ribs", chineseName: "京都香浓芝麻排骨皇", category: "meat", surcharge: 0 },
    { id: "curry-chicken", name: "Nanyang Potato Curry Chicken", chineseName: "南洋香浓土豆咖喱鸡", category: "meat", surcharge: 0 },
    { id: "pipa-duck", name: "Signature Handmade Pipa Duck", chineseName: "老字号招牌纯手工琵琶鸭", category: "meat", surcharge: 4 },
  ],
  seafood: [
    { id: "nestum-fish", name: "Nestum Fish Fillet", chineseName: "金沙避风塘麦片鱼片", category: "seafood", surcharge: 0 },
    { id: "sweet-sour-fish", name: "Sweet & Sour Fish Fillet", chineseName: "港式风味酸甜糖醋鱼片", category: "seafood", surcharge: 0 },
    { id: "nestum-prawn", name: "Crispy Cereal Nestum Prawn", chineseName: "避风塘麦片黄金大虾", category: "seafood", surcharge: 3 },
    { id: "har-lok-prawn", name: "Pan-fried Jumbo Har Lok Prawns", chineseName: "港式秘制干煎大虾 - 哈禄", category: "seafood", surcharge: 4 },
  ],
  veggie: [
    { id: "curry-veg", name: "Traditional Curry Mixed Vegetable", chineseName: "南洋香浓咖喱什锦菜", category: "veggie", surcharge: 0 },
    { id: "broccoli-mush", name: "Broccoli with Braised Mushrooms", chineseName: "金蒜双菇清炒西兰花", category: "veggie", surcharge: 1.5 },
    { id: "egg-salad", name: "Garden Egg Salad", chineseName: "田园水煮鸡蛋时蔬沙拉", category: "veggie", surcharge: 0 },
  ],
  carb: [
    { id: "fried-meehoon", name: "Fried Star Mee Hoon", chineseName: "金丝富贵炒星洲米粉", category: "carb", surcharge: 0 },
    { id: "fried-rice", name: "Golden Yangzhou Fried Rice", chineseName: "扬州金牌黄金炒饭", category: "carb", surcharge: 0 },
    { id: "aglio-olio", name: "Seafood Aglio Olio", chineseName: "蒜香海鲜海盐意大利面", category: "carb", surcharge: 3 },
    { id: "raisin-rice", name: "Butter Raisin Rice", chineseName: "香浓牛油黄金葡萄干饭", category: "carb", surcharge: 1.5 },
  ],
  dessert: [
    { id: "watermelon", name: "Chilled Sliced Watermelon Fruit Plate", chineseName: "消暑清甜西瓜果盘", category: "dessert", surcharge: 0 },
    { id: "beverage", name: "Refreshment Fruit Juice Pitcher", chineseName: "清凉爽口特调冷饮", category: "dessert", surcharge: 0 },
    { id: "pastries", name: "Premium French Mini Pastries Plate", chineseName: "精美西式一口甜点拼盘", category: "dessert", surcharge: 4 },
  ],
};

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
  
  const [selectedDishes, setSelectedDishes] = useState<Record<string, string>>({});
  const [activeSwapCategory, setActiveSwapCategory] = useState<string | null>(null);

  const activePackage = packages.find((p) => p.id === selectedPackageId) || packages[0];

  useEffect(() => {
    if (activePackage && activePackage.defaultDishes) {
      setSelectedDishes(Object.assign({}, activePackage.defaultDishes));
    }
    setActiveSwapCategory(null);
  }, [selectedPackageId, activePackage]);

  // Calculate extra surcharges from customized dishes
  let extraDishSurcharge = 0;
  const chosenDishesList: DishOption[] = [];
  
  Object.entries(selectedDishes).forEach(([category, dishId]) => {
    const pool = dishPool[category];
    const dish = pool?.find((d) => d.id === dishId);
    if (dish) {
      chosenDishesList.push(dish);
      extraDishSurcharge += dish.surcharge;
    }
  });

  const basePricePerPax = activePackage.pricePerPax + extraDishSurcharge;
  const baseCost = basePricePerPax * paxCount;

  // Waitstaff count: 1 waiter per 30 guests
  const serverCount = Math.ceil(paxCount / 30);

  let upgradesCost = 0;
  selectedUpgrades.forEach((id: string) => {
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
    setSelectedUpgrades((prev: string[]) =>
      prev.includes(id) ? prev.filter((item: string) => item !== id) : [...prev, id]
    );
  };

  const handleSwapDish = (category: string, dishId: string) => {
    setSelectedDishes((prev: Record<string, string>) => ({
      ...prev,
      [category]: dishId,
    }));
    setActiveSwapCategory(null);
  };

  const handleSendWhatsApp = () => {
    const isChinese = lang === "zh";

    // Format selected dishes detail
    const dishesText = (Object.entries(selectedDishes) as [string, string][])
      .map(([category, dishId]) => {
        const pool = dishPool[category];
        const dish = pool?.find((d) => d.id === dishId);
        if (!dish) return "";
        const catName = category === "meat" ? (isChinese ? "肉禽类" : "Poultry") :
                        category === "seafood" ? (isChinese ? "海鲜类" : "Seafood") :
                        category === "veggie" ? (isChinese ? "时蔬类" : "Vegetables") :
                        category === "carb" ? (isChinese ? "主食类" : "Carbohydrates") :
                        (isChinese ? "甜品饮料" : "Desserts/Drinks");
        const dishLabel = isChinese ? dish.chineseName : dish.name;
        const surchargeText = dish.surcharge > 0 ? ` (+RM ${dish.surcharge}/PAX)` : "";
        return `   - ${catName}: ${dishLabel}${surchargeText}`;
      })
      .filter(Boolean)
      .join("\n");

    let message = "";
    if (isChinese) {
      message = `你好，Kim Long Catering！我想咨询一下贵公司的自助餐宴席自选承办服务：
----------------------------------
【订购主配套】：${activePackage.chineseName} (基础人均价: RM ${activePackage.pricePerPax}/PAX)
【预计人数】：${paxCount} 人 (PAX)

【👩‍🍳 顾客 DIY 亲手定制菜单】：
${dishesText}

【选择升级服务】：
${
  selectedUpgrades.length === 0
    ? " 无额外加购项目"
    : selectedUpgrades
        .map((id: string) => {
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
【自定义人均单价】：RM ${basePricePerPax.toFixed(1)} / 人
【基础餐饮总价】：RM ${baseCost.toLocaleString()}
【服务加购总计】：RM ${upgradesCost.toLocaleString()}
【预计总金额】：RM ${totalCost.toLocaleString()}
【预计综合人均】：RM ${avgCostPerPax.toFixed(1)} / 人
----------------------------------
【宴席预计日期】：[请在此填写您的举办日期]
【宴席配送地址】：[请在此填写您的举办地址]

我已在官网使用智能报价器完成自定义，期待您的确认，谢谢！`;
    } else {
      message = `Hello Kim Long Catering, I would like to inquire about your premium customized catering services:
----------------------------------
- Main Package: ${activePackage.name} (Base: RM ${activePackage.pricePerPax}/PAX)
- Guest Headcount: ${paxCount} PAX

- 👩‍🍳 Customized DIY Menu Selection:
${dishesText}

- Selected Add-ons:
${
  selectedUpgrades.length === 0
    ? " None"
    : selectedUpgrades
        .map((id: string) => {
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
- Custom Price/Guest: RM ${basePricePerPax.toFixed(1)} / PAX
- Base Catering Total: RM ${baseCost.toLocaleString()}
- Service Upgrades: RM ${upgradesCost.toLocaleString()}
- Estimated Grand Total: RM ${totalCost.toLocaleString()}
- Total Cost/Guest: RM ${avgCostPerPax.toFixed(1)} / PAX
----------------------------------
- Event Date: [Please enter your event date here]
- Setup Address: [Please enter your delivery location here]

Thank you!`;
    }

    const whatsappUrl = `https://wa.me/60197288226?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="calculator" className="py-24 bg-background border-t border-border/20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-wider uppercase mb-2 flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            {lang === "en" ? "Self-Service Budgeting & Customization" : "智慧自助定制与估价"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-foreground mb-4 text-balance tracking-tight"
          >
            {lang === "en" ? "DIY Buffet Builder & Calculator" : "智能自助餐 DIY 定制计算器"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {lang === "en"
              ? "Plan your perfect feast in real-time. Choose your package, slide guests count, customize dishes dynamically, and export immediately to WhatsApp."
              : "首创菜品在线实时自选拼盘。滑动人数、随心替换招牌名菜、勾选增值配套，系统精确演算明细，尊享星级定制。"}
          </motion.p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-6 max-w-5xl mx-auto items-stretch">
          
          {/* Left panel: Inputs (7 cols) */}
          <div className="lg:col-span-7 bg-card border border-border rounded-3xl p-5 md:p-6 space-y-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
            
            {/* Step 1: Select Package */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">1</span>
                <h3 className="font-extrabold text-sm md:text-base text-foreground">
                  {lang === "en" ? "Choose Main Buffet Package" : "第一步：选择基准订餐配套"}
                </h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-2.5">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    id={`calc-pkg-btn-${pkg.id}`}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      selectedPackageId === pkg.id
                        ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm shadow-primary/10"
                        : "border-border bg-background hover:border-foreground/20"
                    }`}
                  >
                    <span className="font-extrabold text-[13px] text-foreground">
                      {lang === "en" ? pkg.name : pkg.chineseName}
                    </span>
                    <span className="text-primary font-black text-[15px] mt-1">
                      RM {pkg.pricePerPax} <span className="text-[10px] font-normal text-muted-foreground">/ PAX</span>
                    </span>
                    <span className="text-xs text-muted-foreground mt-2 line-clamp-1">
                      {lang === "en" ? pkg.description : pkg.chineseDescription}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Slider Pax */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">2</span>
                  <h3 className="font-extrabold text-sm md:text-base text-foreground">
                    {lang === "en" ? "Set Guest Headcount" : "第二步：设定预计来宾人数 (PAX)"}
                  </h3>
                </div>
                <div className="bg-primary/10 text-foreground px-3 py-1 rounded-full font-black text-base flex items-center gap-1">
                  <span>{paxCount}</span>
                  <span className="text-[10px] font-bold text-muted-foreground">PAX</span>
                </div>
              </div>

              <div className="pt-2 px-1">
                <Slider
                  defaultValue={[80]}
                  min={50}
                  max={500}
                  step={5}
                  value={[paxCount]}
                  onValueChange={(val: number[]) => setPaxCount(val[0])}
                  className="[&_[data-slot=slider-range]]:bg-primary [&_[data-slot=slider-thumb]]:border-primary [&_[data-slot=slider-thumb]]:bg-background"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-3">
                  <span>50 PAX ({lang === "en" ? "Min Order" : "最低起订"})</span>
                  <span>250 PAX</span>
                  <span>500+ PAX</span>
                </div>
              </div>
            </div>

            {/* Step 3: NEW INTERACTIVE DIY MENU BUILDER */}
            <div className="space-y-3 border-t border-border/40 pt-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">3</span>
                  <h3 className="font-extrabold text-sm md:text-base text-foreground flex items-center gap-1.5">
                    {lang === "en" ? "Custom DIY Dish Swapper" : "第三步：菜品在线自选与替换"}
                  </h3>
                </div>
                {extraDishSurcharge > 0 && (
                  <span className="text-[10px] bg-primary text-primary-foreground font-bold px-2 py-0.5 rounded-full animate-bounce">
                    {lang === "en" ? `+RM ${extraDishSurcharge}/PAX Upgrades` : `已升级: +RM ${extraDishSurcharge}/人`}
                  </span>
                )}
              </div>

              {/* Customized Dishes List */}
              <div className="space-y-3">
                {(Object.keys(dishPool) as Array<keyof typeof dishPool>).map((category) => {
                  const pool = dishPool[category];
                  const currentDishId = selectedDishes[category];
                  const currentDish = pool.find((d) => d.id === currentDishId) || pool[0];
                  
                  const categoryLabel = category === "meat" ? (lang === "en" ? "Poultry / Meat" : "肉禽类") :
                                        category === "seafood" ? (lang === "en" ? "Seafood Favorites" : "海鲜类") :
                                        category === "veggie" ? (lang === "en" ? "Vegetable / Salads" : "时蔬类") :
                                        category === "carb" ? (lang === "en" ? "Rice / Noodles / Pasta" : "主食类") :
                                        (lang === "en" ? "Dessert & Beverage" : "甜品果盘");

                  const isSwapping = activeSwapCategory === category;

                  return (
                    <div
                      key={category}
                      className="border border-border/60 rounded-2xl p-3 bg-background/50 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-primary font-bold tracking-widest uppercase">
                          {categoryLabel}
                        </span>
                        <button
                          onClick={() => setActiveSwapCategory(isSwapping ? null : category)}
                          className="inline-flex items-center gap-1 text-[10px] font-extrabold text-primary hover:text-primary/80 cursor-pointer"
                        >
                          <RefreshCw className={`w-3 h-3 ${isSwapping ? "animate-spin" : ""}`} />
                          {isSwapping ? (lang === "en" ? "Cancel" : "取消") : (lang === "en" ? "Swap Dish" : "替换/升级")}
                        </button>
                      </div>

                      {/* Display Selected Dish */}
                      <AnimatePresence mode="wait">
                        {!isSwapping ? (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="flex justify-between items-center"
                          >
                            <span className="font-bold text-[13px] text-foreground">
                              {lang === "en" ? currentDish.name : currentDish.chineseName}
                            </span>
                            {currentDish.surcharge > 0 ? (
                              <span className="text-[11px] font-bold text-primary">
                                + RM {currentDish.surcharge} / PAX
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                {lang === "en" ? "Included" : "已含"}
                              </span>
                            )}
                          </motion.div>
                        ) : (
                          // Swap Selection Panel
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid gap-2 pt-2"
                          >
                            {pool.map((dish) => {
                              const isCurrent = dish.id === currentDishId;
                              return (
                                <button
                                  key={dish.id}
                                  onClick={() => handleSwapDish(category, dish.id)}
                                  className={`w-full flex justify-between items-center p-2.5 rounded-xl border text-left text-[11px] font-bold transition-all duration-300 cursor-pointer ${
                                    isCurrent
                                      ? "border-primary bg-primary/10 text-primary-foreground"
                                      : "border-border bg-card text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                                  }`}
                                >
                                  <span>{lang === "en" ? dish.name : dish.chineseName}</span>
                                  <span className="font-extrabold">
                                    {dish.surcharge > 0
                                      ? `+ RM ${dish.surcharge} / PAX`
                                      : (lang === "en" ? "Free Swap" : "免费替换")}
                                  </span>
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Upgrades */}
            <div className="space-y-3 border-t border-border/40 pt-5">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">4</span>
                <h3 className="font-extrabold text-sm md:text-base text-foreground">
                  {lang === "en" ? "Add Optional Services" : "第四步：加购现场服务配套（可选）"}
                </h3>
              </div>

              <div className="space-y-2.5">
                {upgrades.map((upg) => {
                  const isSelected = selectedUpgrades.includes(upg.id);
                  return (
                    <button
                      key={upg.id}
                      id={`calc-upg-btn-${upg.id}`}
                      onClick={() => handleToggleUpgrade(upg.id)}
                      className={`w-full flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border bg-background hover:border-foreground/20"
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 ${
                        isSelected ? "bg-primary border-primary text-primary-foreground" : "border-border bg-card"
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline flex-wrap gap-2">
                          <span className="font-bold text-[13px] text-foreground">
                            {lang === "en" ? upg.name : upg.chineseName}
                          </span>
                          <span className="text-primary font-bold text-[13px]">
                            {upg.id === "waitstaff"
                              ? `+ RM ${upg.price} / server`
                              : upg.type === "per-pax"
                              ? `+ RM ${upg.price} / PAX`
                              : `+ RM ${upg.price}`}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                          {lang === "en" ? upg.description : upg.chineseDescription}
                        </p>
                        {upg.id === "waitstaff" && isSelected && (
                          <div className="mt-2 inline-flex items-center gap-1.5 bg-primary/10 text-foreground text-xs px-2.5 py-1 rounded-md font-medium">
                            <Info className="w-3.5 h-3.5 text-primary" />
                            <span>
                              {lang === "en"
                                ? `Allocated ${serverCount} waiters for ${paxCount} guests`
                                : `系统已自动配给 ${serverCount} 位服务生`}
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
          <div className="lg:col-span-5 bg-foreground text-background rounded-3xl p-5 md:p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Design elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-xl" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-2 border-b border-background/10 pb-3">
                <Calculator className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-base">
                  {lang === "en" ? "Custom Order Summary" : "定制询价明细单"}
                </h3>
              </div>

              {/* Receipt Breakdown */}
              <div className="space-y-4 text-sm font-medium">
                {/* Base Package and Surcharges */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="text-background/90 text-sm">
                      {lang === "en" ? activePackage.name : activePackage.chineseName}
                    </p>
                    <p className="text-background/50 text-xs mt-1">
                      RM {activePackage.pricePerPax} + {extraDishSurcharge} (DIY) × {paxCount} PAX
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
                      {lang === "en" ? "Selected Upgrades" : "加购服务项目"}
                    </p>
                    
                    {selectedUpgrades.map((id: string) => {
                      const u = upgrades.find((item) => item.id === id);
                      if (!u) return null;
                      
                      let displayCost = 0;
                      let calculationText = "";
                      
                      if (u.type === "flat") {
                        displayCost = u.price;
                        calculationText = lang === "en" ? "Rental package cost" : "一次性租赁配套价格";
                      } else if (u.type === "per-pax") {
                        displayCost = u.price * paxCount;
                        calculationText = `RM ${u.price} × ${paxCount} PAX`;
                      } else if (u.id === "waitstaff") {
                        displayCost = u.price * serverCount;
                        calculationText = `RM ${u.price} × ${serverCount} waiters`;
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

                {/* Standard perks banner */}
                <div className="bg-background/5 rounded-xl p-3 text-[11px] text-background/60 leading-relaxed border border-background/10 mt-3">
                  <span className="font-bold text-primary mr-1">💡 {lang === "en" ? "Free Included Perks" : "配套尊享特权"} :</span>
                  {lang === "en"
                    ? "Includes double portion of high-end disposable cutleries, warming food pans, table spreads, trash bags, and post-event cleaning."
                    : "价格已全部包揽双倍容量一次性餐具、高档保温炉架、餐台红金布幔设计、垃圾清理等星级服务，绝无隐形消费。"}
                </div>
              </div>
            </div>

            {/* Total Section */}
            <div className="border-t border-background/10 pt-5 mt-6 relative z-10 space-y-5">
              <div className="flex justify-between items-baseline">
                <div>
                  <p className="text-background font-black text-xl md:text-2xl tracking-tight">
                    RM {totalCost.toLocaleString()}
                  </p>
                  <p className="text-background/50 text-[11px] mt-1">
                    {lang === "en" ? "Custom Estimated Total" : "预计总金额"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-primary font-extrabold text-[15px] md:text-base">
                    RM {avgCostPerPax.toFixed(1)}
                  </p>
                  <p className="text-background/50 text-[11px] mt-1">
                    {lang === "en" ? "Per Guest" : "人均预算"}
                  </p>
                </div>
              </div>

              {/* Call-to-action button */}
              <button
                id="btn-calc-submit-whatsapp"
                onClick={handleSendWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-full font-extrabold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/20 cursor-pointer active:scale-95 text-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                {lang === "en" ? "Send DIY Menu to WhatsApp" : "一键发送 DIY 菜单询价"}
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
