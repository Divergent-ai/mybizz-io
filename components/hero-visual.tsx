"use client";
import { motion } from "motion/react";
import { BrainCircuit, Code2, Scale, ShieldCheck } from "lucide-react";

const nodes = [
  { icon: Code2, label: "Engineering", className: "left-[8%] top-[16%] sm:left-[10%] sm:top-[18%]" },
  { icon: BrainCircuit, label: "Applied AI", className: "left-[58%] top-[8%] sm:left-[62%] sm:top-[8%]" },
  { icon: ShieldCheck, label: "Security", className: "left-[62%] top-[64%] sm:left-[67%] sm:top-[64%]" },
  { icon: Scale, label: "Compliance", className: "left-[8%] top-[68%] sm:left-[8%] sm:top-[70%]" },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px] min-h-[320px] overflow-hidden rounded-[36px] border border-white/10 bg-[#0d0f12] p-3 shadow-2xl shadow-black/50 noise sm:p-6">
      <div className="grid-bg absolute inset-0" />
      <motion.div
        className="absolute inset-[16%] rounded-full border border-[#ff5b1f]/30 sm:inset-[19%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute left-1/2 top-[-4px] size-2.5 -translate-x-1/2 rounded-full bg-[#ff5b1f] shadow-[0_0_20px_#ff5b1f] sm:top-[-6px] sm:size-3" />
      </motion.div>

      <div className="absolute inset-[24%] rounded-[24px] border border-white/10 bg-white/[.045] p-4 backdrop-blur sm:inset-[31%] sm:p-6">
        <div className="eyebrow">mybizz core</div>
        <div className="display mt-2 text-xl font-bold leading-tight sm:mt-3 sm:text-3xl">
          One aligned delivery system.
        </div>
      </div>

      {nodes.map((n, i) => (
        <motion.div
          key={n.label}
          className={`absolute card flex items-center gap-2 px-3 py-2 text-[11px] font-bold leading-none sm:gap-3 sm:px-4 sm:py-3 sm:text-sm ${n.className}`}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <n.icon className="size-3.5 text-[#ff6c35] sm:size-4" />
          {n.label}
        </motion.div>
      ))}
    </div>
  );
}
