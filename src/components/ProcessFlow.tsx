"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Database, Phone, ScanSearch, LayoutDashboard } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "We Scrape Targeted Leads",
    desc: "Don't have a list? No problem. We scrape and verify high-quality leads for you. Already have data? Just upload it. Our system is flexible.",
    icon: <Database size={20} />,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    image: "/images/data.png", // Placeholder
  },
  {
    id: 2,
    title: "Our AI Agents Start Calling",
    desc: "Our Vapi-powered AI agents dial thousands of numbers simultaneously. They hold natural, human-like conversations to identify interest.",
    icon: <Phone size={20} />,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    image: "/images/call.png", // Placeholder for "Calling/Active"
  },
  {
    id: 3,
    title: "Analysis of Every Call",
    desc: "We analyze every call instantly. Our system extracts intent, qualifies the lead based on your criteria, and filters out the noise.",
    icon: <ScanSearch size={20} />,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    image: "/images/anals.png", // Placeholder for "Analysis/Report"
  },
  {
    id: 4,
    title: "Qualified Leads Dashboard",
    desc: "Qualified leads are pushed to your dashboard immediately. Use our built-in Mini CRM to manage pipeline status or sync with your tools.",
    icon: <LayoutDashboard size={20} />,
    color: "text-green-400",
    bg: "bg-green-400/10",
    image: "/images/dashboard/dashboard.png", // Placeholder for "Dashboard/CRM"
  },
];

export default function ProcessFlow() {
  return (
    <div className="w-full max-w-6xl mx-auto py-10 relative">
      {/* THE MAIN CONNECTING LINE (The "Link") */}
      <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-cyan-glow/50 to-transparent z-0">
        {/* Animated Pulse moving down the line */}
        <motion.div
          className="w-full h-[150px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent blur-sm"
          animate={{ y: ["-100%", "1000%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="space-y-24 md:space-y-32">
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
              className={`relative flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-0 ${
                isEven ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* --- TEXT CONTENT CARD --- */}
              <div
                className={`
                    pl-16 md:pl-0 w-full md:w-[45%] 
                    ${isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}
                `}
              >
                <div className="relative p-6 rounded-2xl bg-brand-card/40 backdrop-blur-md border border-white/5 hover:border-cyan-glow/30 hover:bg-brand-card/60 transition-all duration-300 group shadow-lg z-10">
                  <h3
                    className={`text-2xl font-bold text-white mb-3 group-hover:text-cyan-glow transition-colors`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-slate-300 text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* --- CENTRAL NODE (The Linked List Node) --- */}
              <div className="absolute left-[10px] md:left-1/2 md:-translate-x-1/2 z-10 flex flex-col items-center justify-center top-0 md:top-1/2 md:-translate-y-1/2">
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

              {/* --- IMAGE / SCREENSHOT --- */}
              <div
                className={`
                    pl-16 md:pl-0 w-full md:w-[45%]
                    ${isEven ? "md:pl-12" : "md:pr-12"}
                `}
              >
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/50 group">
                  {/* Overlay Gradient on hover */}
                  <div className="absolute inset-0 bg-cyan-glow/0 group-hover:bg-cyan-glow/5 transition-colors z-10 pointer-events-none" />

                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
