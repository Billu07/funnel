"use client";
import React from "react";
import Image from "next/image";
import {
  UploadCloud,
  BarChart3,
  LayoutDashboard,
  Search,
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
    icon: <BarChart3 className="text-slate-900" size={24} />,
    iconBg: "bg-slate-50 border-slate-200",
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
    icon: <LayoutDashboard className="text-slate-900" size={24} />,
    iconBg: "bg-slate-50 border-slate-200",
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
    icon: <Search className="text-slate-900" size={24} />,
    iconBg: "bg-slate-50 border-slate-200",
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
    icon: <UploadCloud className="text-slate-900" size={24} />,
    iconBg: "bg-slate-50 border-slate-200",
    align: "right",
  },
];

export default function DashboardFeatures() {
  return (
    <div className="space-y-20 md:space-y-40">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center gap-12 md:gap-32"
        >
          {/* Text Content */}
          <div
            className={`flex-1 ${feature.align === "right" ? "md:order-2" : "md:order-1"}`}
          >
            <div className="flex flex-col mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-px bg-blue-500" />
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-blue-600">Enterprise Feature</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                {feature.title}
              </h3>
            </div>

            <p className="text-slate-600 text-lg md:text-xl mb-10 leading-relaxed font-light">
              {feature.description}
            </p>

            <div className="grid grid-cols-1 gap-4">
              {feature.bullets.map((bullet, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  </div>
                  <span className="text-slate-800 font-medium">{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Screenshot - Premium Real Estate Framing */}
          <div
            className={`flex-1 w-full ${feature.align === "right" ? "md:order-1" : "md:order-2"}`}
          >
            <div className="relative group p-4 lg:p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner">

              {/* Outer Blue Glow */}
              <div className="absolute -inset-2 bg-blue-500/5 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative rounded-2xl overflow-hidden border-[8px] border-white shadow-2xl bg-white transition-transform duration-500 group-hover:scale-[1.01]">
                {/* Browser/Window Header Mockup - Refined */}
                <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-6 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200 group-hover:bg-red-400 transition-colors duration-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200 group-hover:bg-yellow-400 transition-colors duration-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200 group-hover:bg-green-400 transition-colors duration-300" />
                  </div>
                  <div className="mx-auto w-1/3 h-4 bg-slate-100 rounded-full" />
                </div>

                <div className="relative aspect-[16/10] w-full p-6 bg-slate-50/30">
                  {/* Internal Blue Border for the actual screenshot */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden border border-blue-600/10 shadow-sm bg-white">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-contain object-center scale-95 group-hover:scale-100 transition-transform duration-1000 p-2"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/[0.02] transition-colors duration-700 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-tr-[2.5rem] pointer-events-none" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
