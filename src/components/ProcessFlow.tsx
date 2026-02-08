"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Crosshair,
  Database,
  Bot,
  Cpu,
  Activity,
  Layers,
  FileSearch,
  RefreshCcw,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Target Setup",
    sub: "Niche Selection",
    icon: <Crosshair className="text-cyan-400" />,
    desc: "Define target field (e.g. Real Estate).",
  },
  {
    id: 2,
    title: "Data Scraping",
    sub: "Lead Extraction",
    icon: <Database className="text-blue-400" />,
    desc: "High-volume data collection.",
  },
  {
    id: 3,
    title: "Cold Calling",
    sub: "n8n + Vapi",
    icon: <Bot className="text-purple-400" />,
    desc: "Refinement & Autonomous Calling.",
  },
  {
    id: 4,
    title: "Call Analysis",
    sub: "AI Processing",
    icon: <Cpu className="text-indigo-400" />,
    desc: "Sentiment & intent scoring.",
  },
  {
    id: 5,
    title: "Live Dashboard",
    sub: "Real-time Flow",
    icon: <Activity className="text-green-400" />,
    desc: "Watch calls happen live.",
  },
  {
    id: 6,
    title: "Lead Pipeline",
    sub: "Generation",
    icon: <Layers className="text-yellow-400" />,
    desc: "Qualified leads populate CRM.",
  },
  {
    id: 7,
    title: "Deep Analysis",
    sub: "Call Details",
    icon: <FileSearch className="text-orange-400" />,
    desc: "Transcripts & recording review.",
  },
  {
    id: 8,
    title: "Loop & Scale",
    sub: "Follow Up / DNC",
    icon: <RefreshCcw className="text-red-400" />,
    desc: "Status updates & retargeting.",
  },
];

export default function ProcessFlow() {
  return (
    <div className="w-full relative py-10">
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* CONNECTING LINE (Desktop) */}
      <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 z-0">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-cyan-glow to-transparent w-1/3 blur-sm"
          animate={{ x: ["-100%", "400%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative"
          >
            {/* CONNECTOR ARROW (Mobile/Tablet) */}
            {i < steps.length - 1 && (
              <div className="lg:hidden absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-white/20">
                ↓
              </div>
            )}

            {/* CARD */}
            <div className="h-full bg-brand-card/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-cyan-glow/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col items-center text-center">
              {/* STEP NUMBER */}
              <div className="absolute top-3 right-3 text-[10px] font-bold text-white/20">
                0{step.id}
              </div>

              {/* ICON GLOW */}
              <div className="mb-4 relative">
                <div className="absolute inset-0 bg-current blur-xl opacity-20 text-cyan-glow rounded-full" />
                <div className="bg-brand-dark p-3 rounded-xl border border-white/10 relative z-10">
                  {step.icon}
                </div>
              </div>

              {/* TEXT */}
              <h3 className="text-lg font-bold text-white mb-1">
                {step.title}
              </h3>
              <div className="text-xs font-bold text-cyan-glow uppercase tracking-wider mb-2">
                {step.sub}
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
