"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxPhotoCardProps {
  imageSrc: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  align?: "left" | "right";
  index?: number;
}

export default function ParallaxPhotoCard({
  imageSrc,
  title,
  desc,
  icon,
  align = "left",
  index = 0,
}: ParallaxPhotoCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track the layout position of the card container for stacking effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"], 
  });

  // Scale down the card and fade it out as the next one covers it
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  
  // Internal image parallax
  const { scrollYProgress: internalScroll } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(internalScroll, [0, 1], ["-15%", "15%"]);

  return (
    <div
      ref={containerRef}
      className="sticky w-full flex items-center justify-center min-h-[110vh]"
      style={{
        // Stagger the top position slightly based on index so previous cards peek out from the top
        top: `calc(5vh + ${index * 2}rem)`, 
      }}
    >
      <motion.div 
        style={{ scale, opacity }}
        className={`flex flex-col ${
          align === "right" ? "md:flex-row-reverse" : "md:flex-row"
        } items-center gap-10 lg:gap-20 w-full max-w-6xl mx-auto group bg-[#0f2342] p-8 md:p-12 lg:p-16 rounded-[2.5rem] border border-slate-700/50 shadow-2xl origin-top relative backdrop-blur-sm`}
      >
        {/* Image Side */}
        <div className="flex-1 w-full relative h-[350px] md:h-[500px] overflow-hidden rounded-[2rem] border border-slate-800 shadow-2xl bg-[#0a192f]">
          <motion.div style={{ y: imageY }} className="absolute inset-0 h-[130%] -top-[15%] w-full">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover opacity-90 transition-opacity duration-700 group-hover:opacity-100"
            />
          </motion.div>
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/40 to-transparent pointer-events-none" />
        </div>
        
        {/* Text Side */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-8 bg-cyan-500/10 w-fit p-5 rounded-3xl border border-cyan-500/20 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
          >
            {icon}
          </motion.div>
          <h3 className="font-serif font-medium tracking-tight text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-[1.1]">
            {title}
          </h3>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-light">
            {desc}
          </p>
          
          {/* Visual accent */}
          <div className="mt-10 w-20 h-1 bg-gradient-to-r from-cyan-500 to-transparent rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}
