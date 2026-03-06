"use client";
import React from "react";
import Image from "next/image";

import { Star } from "lucide-react";

const CLIENTS = [
  { name: "SmallBayFlex", logo: "/images/smallbay.webp" },
  { name: "AgentWorkForce", logo: "/images/agentWorkforce.png" },
  { name: "Diamond Equity", logo: "/images/diamond equity.png" },
  { name: "CrowdCopia", logo: "/images/crowdcopia.png" },
];

export default function ClientTrustBlock() {
  return (
    <section className="py-16 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col items-center">
        {/* Trendy Trust Badge */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-blue-600 text-blue-600" />
            ))}
          </div>
          <div className="text-slate-800 font-medium">
            <span className="font-bold">4.9/5</span> Rating by Top Brokerages
          </div>
        </div>
        
        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
          Powering the Pipeline For Elite Real Estate Teams
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        {/* Gradients for smooth fade edges - Updated for light background */}
        <div className="absolute top-0 bottom-0 left-0 w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

        {/* Scrolling track */}
        <div className="flex w-max animate-[scroll-x_40s_linear_infinite] group-hover:[animation-play-state:paused]">
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center shrink-0">
              {CLIENTS.map((client, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center mx-12 md:mx-20 min-w-[150px] relative h-16 opacity-100 transition-all duration-500 cursor-default"
                >
                  {client.logo ? (
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-xl md:text-2xl font-bold tracking-wider text-gray-500 whitespace-nowrap uppercase">
                      {client.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}