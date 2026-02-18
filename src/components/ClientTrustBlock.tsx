"use client";
import React from "react";

const CLIENTS = [
  { name: "SmallBayFlex", logo: null }, // Placeholder for logo if available
  { name: "AgentWorkForce", logo: null },
  { name: "RjSellsCheap", logo: null },
  { name: "Ken Joslin", logo: null }, // Context: Create Conference Call for Ken Joslin
];

// Duplicate the array to create the seamless loop effect
const MARQUEE_ITEMS = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

export default function ClientTrustBlock() {
  return (
    <section className="py-12 bg-brand-dark border-b border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">
          Trusted by Real Estate Business Owners
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        {/* Gradient Masks for smooth fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-24 z-10 bg-gradient-to-r from-brand-dark to-transparent pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-24 z-10 bg-gradient-to-l from-brand-dark to-transparent pointer-events-none"></div>

        <div className="flex animate-[scroll-x_40s_linear_infinite] hover:[animation-play-state:paused] w-max">
          {MARQUEE_ITEMS.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center mx-12 md:mx-16 min-w-[200px]"
            >
              {/* If we had logos, we would use Image here. For now, stylized text. */}
              <span className="text-2xl md:text-3xl font-bold text-slate-400 hover:text-cyan-glow transition-colors cursor-default whitespace-nowrap opacity-70 hover:opacity-100">
                {client.name}
              </span>
            </div>
          ))}
        </div>

        {/* Second identical track for seamless loop (if needed, but repeating the array is often simpler for pure CSS) 
            Actually, repeating the array inside the single flex container is usually enough if the content width > screen width.
            To be safe for very wide screens, I've repeated the items 4 times above.
        */}
      </div>
    </section>
  );
}
