"use client";
import React from "react";
import Image from "next/image";
import {
  UploadCloud,
  Phone,
  FileText,
  BarChart3,
  Database,
  LayoutDashboard,
  Search,
  Eye,
} from "lucide-react";

const features = [
  {
    title: "Real-Time KPI Tracking",
    description:
      "Complete transparency on every dial. Track exactly how many calls were made (Today, 7 Days, 30 Days), how many humans picked up, and your conversion rates instantly.",
    bullets: [
      "Live call volume tracking",
      "Human connection rates",
      "Instant conversion metrics",
    ],
    image: "/images/KPI.png",
    icon: <BarChart3 className="text-cyan-glow" size={24} />,
    align: "left",
  },
  {
    title: "Live Pipeline Visibility",
    description:
      "Nothing is hidden. Watch leads move through your pipeline in real-time as our agents qualify them. Separate tabs for New, Qualified, and Follow-up leads.",
    bullets: [
      "Visual lead stages",
      "Automatic status updates",
      "Zero manual entry required",
    ],
    image: "/images/dashboard/analytics.webp",
    icon: <LayoutDashboard className="text-pink-400" size={24} />,
    align: "right",
  },
  {
    title: "Detailed Lead Drawer",
    description:
      "Click on any lead to reveal the full story. Access the complete 'Forensic Report' including audio recordings, verbatim transcripts, and AI-generated summaries.",
    bullets: [
      "Listen to call recordings",
      "Read full transcripts",
      "View AI motivation scores",
    ],
    image: "/images/dashboard/details.webp",
    icon: <Search className="text-purple-400" size={24} />,
    align: "left",
  },

  {
    title: "Flexible Data Options",
    description:
      "We scrape and verify data for you, but the dashboard is fully equipped if you prefer to upload your own lists. You have total control over your campaign sources.",
    bullets: [
      "Optional CSV/Excel upload",
      "Automatic list sanitization",
      "Campaign source tracking",
    ],
    image: "/images/dashboard/upload.webp",
    icon: <UploadCloud className="text-green-400" size={24} />,
    align: "right",
  },
];

export default function DashboardFeatures() {
  return (
    <div className="space-y-16 md:space-y-24">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center gap-12 md:gap-20"
        >
          {/* Text Content */}
          <div
            className={`flex-1 ${feature.align === "right" ? "md:order-2" : "md:order-1"}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                {feature.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                {feature.title}
              </h3>
            </div>
            <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed">
              {feature.description}
            </p>
            <ul className="space-y-4">
              {feature.bullets.map((bullet, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-glow shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                  <span className="text-slate-300 font-medium">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image/Screenshot */}
          <div
            className={`flex-1 w-full ${feature.align === "right" ? "md:order-1" : "md:order-2"}`}
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-900/10 group hover:shadow-cyan-900/20 transition-all duration-500 bg-brand-dark/50">
              {/* Browser/Window Header Mockup */}
              <div className="h-8 bg-black/40 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>

              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-contain object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
