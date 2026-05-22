"use client";

import React, { useId } from "react";
import { icons } from "lucide-react";
import { cn } from "@/lib/utils";

// NOTE: 定义金龙餐饮专属的尊贵色彩体系
export type IconColorScheme = "gold" | "roseGold" | "emerald" | "sapphire" | "ruby" | "amber";

export interface GradientGlowIconProps {
  /** Lucide 图标的名称，例如 'ChefHat', 'Sparkles', 'Utensils' 等 */
  name: keyof typeof icons;
  /** 尊贵配色方案 */
  colorScheme?: IconColorScheme;
  /** 图标大小（像素） */
  size?: number;
  /** 是否开启霓虹发光晕染效果 */
  glow?: boolean;
  /** 额外的样式类 */
  className?: string;
}

// NOTE: 渐变色数值定义，用于 SVG 渐变与阴影发光颜色匹配
const COLOR_CONFIGS = {
  gold: {
    from: "#FFE57F", // 亮金
    via: "#FFC400",  // 皇家金
    to: "#FF8F00",   // 暗金
    glowColor: "rgba(255, 196, 0, 0.45)",
  },
  roseGold: {
    from: "#F8BBD0", // 淡玫瑰
    via: "#F48FB1",  // 玫瑰金
    to: "#C2185B",   // 勃艮第红
    glowColor: "rgba(244, 143, 177, 0.45)",
  },
  emerald: {
    from: "#CCFF90", // 鲜绿
    via: "#00E676",  // 翡翠绿
    to: "#00BFA5",   // 幽深绿
    glowColor: "rgba(0, 230, 118, 0.45)",
  },
  sapphire: {
    from: "#80D8FF", // 晴空蓝
    via: "#2979FF",  // 皇家蓝
    to: "#304FFE",   // 深邃蓝
    glowColor: "rgba(41, 121, 255, 0.45)",
  },
  ruby: {
    from: "#FF8A80", // 珊瑚红
    via: "#FF1744",  // 尊贵朱红
    to: "#D50000",   // 深红
    glowColor: "rgba(255, 23, 68, 0.45)",
  },
  amber: {
    from: "#FFE082", // 亮琥珀
    via: "#FF9100",  // 暖阳橙
    to: "#FF6D00",   // 深琥珀
    glowColor: "rgba(255, 145, 0, 0.45)",
  },
};

/**
 * GradientGlowIcon 组件
 * 
 * 用于将普通的线框图标升华为带有高精度彩色线性渐变、柔和同色系发光阴影的“顶奢设计质感”图标。
 * 完美适用于金龙餐饮网站的 VIP 体验、金牌服务与报价系统等需要 WOW 视觉效果的场景。
 */
export function GradientGlowIcon({
  name,
  colorScheme = "gold",
  size = 32,
  glow = true,
  className,
}: GradientGlowIconProps) {
  const uniqueId = useId();
  const gradientId = `icon-grad-${colorScheme}-${uniqueId}`;
  
  const IconComponent = icons[name];

  if (!IconComponent) {
    // FIXME: 当传入不存在的图标名称时，进行友好降级，防止页面奔溃
    console.warn(`[GradientGlowIcon] Icon "${name}" does not exist in lucide-react.`);
    return null;
  }

  const config = COLOR_CONFIGS[colorScheme];

  return (
    <div 
      className={cn("relative inline-flex items-center justify-center transition-all duration-300", className)}
      style={{ width: size, height: size }}
    >
      {/* 隐藏的 SVG 定义，用于注入线性渐变 */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={config.from} />
            <stop offset="50%" stopColor={config.via} />
            <stop offset="100%" stopColor={config.to} />
          </linearGradient>
        </defs>
      </svg>

      {/* 背景流光发光层（Glow Filter） */}
      {glow && (
        <span
          className="absolute inset-0 rounded-full blur-[16px] opacity-75 transform scale-110 pointer-events-none transition-all duration-500 animate-pulse"
          style={{
            backgroundColor: config.glowColor,
            animationDuration: "4s",
          }}
        />
      )}

      {/* 前景渐变图标 */}
      <IconComponent
        size={size}
        className="relative z-10 transition-transform duration-300 hover:scale-110 active:scale-95"
        style={{
          // NOTE: 通过将 stroke 设置为刚才定义的全局渐变 ID 来实现彩色线框
          stroke: `url(#${gradientId})`,
          strokeWidth: 1.8,
        }}
      />
    </div>
  );
}
