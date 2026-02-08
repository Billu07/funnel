"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Crosshair,
  Database,
  Cpu,
  Activity,
  Layers,
  FileSearch,
  RefreshCcw,
  Server,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Target Setup",
    desc: "Define your ideal customer profile (e.g., Real Estate, SaaS).",
    icon: <Crosshair size={20} />,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    id: 2,
    title: "Data Scraping",
    desc: "High-volume lead extraction from verified sources.",
    icon: <Database size={20} />,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    id: 3,
    title: "Refinement & Outreach",
    desc: "Orchestrated via n8n + Vapi for autonomous human-like calls.",
    icon: <Server size={20} />,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    id: 4,
    title: "Call Analysis",
    desc: "Real-time AI sentiment and intent scoring.",
    icon: <Cpu size={20} />,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
  },
  {
    id: 5,
    title: "Live Dashboard Flow",
    desc: "Watch the conversation logic execute in real-time.",
    icon: <Activity size={20} />,
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    id: 6,
    title: "Generated Pipeline",
    desc: "Qualified leads are automatically pushed to your CRM.",
    icon: <Layers size={20} />,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    id: 7,
    title: "Call Details Analysis",
    desc: "Forensic review of transcripts and audio recordings.",
    icon: <FileSearch size={20} />,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    id: 8,
    title: "Loop & Scale",
    desc: "Follow-up scheduling or DNC status updates.",
    icon: <RefreshCcw size={20} />,
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
];

export default function ProcessFlow() {
  return (
    <div className="w-full max-w-3xl mx-auto py-10 relative">
      {/* THE MAIN CONNECTING LINE (The "Link") */}
      <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-cyan-glow/50 to-transparent z-0">
        {/* Animated Pulse moving down the line */}
        <motion.div
          className="w-full h-[150px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent blur-sm"
          animate={{ y: ["-100%", "1000%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="space-y-12">
        {steps.map((step, index) => {
          // Alternate left/right alignment on Desktop
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-center md:justify-between ${
                isEven ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* --- CONTENT CARD --- */}
              <div
                className={`
                    pl-16 md:pl-0 w-full md:w-[45%] 
                    ${isEven ? "md:text-right md:pr-10" : "md:text-left md:pl-10"}
                `}
              >
                <div className="p-6 rounded-2xl bg-brand-card/40 backdrop-blur-md border border-white/5 hover:border-cyan-glow/30 hover:bg-brand-card/60 transition-all duration-300 group shadow-lg">
                  <h3
                    className={`text-lg font-bold text-white mb-2 group-hover:text-cyan-glow transition-colors`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* --- CENTRAL NODE (The Linked List Node) --- */}
              <div className="absolute left-[10px] md:left-1/2 md:-translate-x-1/2 z-10 flex flex-col items-center justify-center">
                {/* Glowing Halo */}
                <div
                  className={`absolute w-12 h-12 rounded-full ${step.bg} blur-xl opacity-50 animate-pulse`}
                />

                {/* The Icon Circle */}
                <div
                  className={`
                        relative w-9 h-9 rounded-full bg-brand-dark border border-white/10 flex items-center justify-center
                        ${step.color} shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20
                    `}
                >
                  {step.icon}
                </div>
              </div>

              {/* --- EMPTY SPACER for the other side (Desktop only) --- */}
              <div className="hidden md:block w-[45%]" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
