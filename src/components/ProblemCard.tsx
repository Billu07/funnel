"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ProblemCardProps {
  imageSrc: string;
  title: string;
  desc: string;
  index: number;
}

export default function ProblemCard({
  imageSrc,
  title,
  desc,
  index,
}: ProblemCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: isMobile ? ["start end", "center center"] : ["start end", "center center", "end start"], 
  });

  // Toned down animations for mobile
  const opacity = useTransform(
    scrollYProgress, 
    isMobile ? [0, 0.8] : [0, 0.4, 0.6, 1], 
    isMobile ? [0.6, 1] : [0, 1, 1, 0]
  );
  
  const y = useTransform(
    scrollYProgress, 
    isMobile ? [0, 1] : [0, 0.4, 0.6, 1], 
    isMobile ? [20, 0] : [40, 0, 0, -40]
  );

  return (
    <div
      ref={containerRef}
      className={`${isMobile ? "min-h-[40vh]" : "min-h-[60vh]"} flex items-center justify-center py-6 md:py-10`}
    >
      <motion.div 
        style={{ opacity, y }}
        className="w-full bg-[#0a192f] border border-white/10 p-6 md:p-10 rounded-2xl shadow-2xl relative group overflow-hidden"
      >
        {/* Decorative Blue Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className={`relative w-full ${isMobile ? "h-[200px]" : "h-[300px]"} mb-8 rounded-xl overflow-hidden border-2 border-white/5 group-hover:border-blue-500/30 transition-all duration-700 bg-slate-900/50`}>
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100 p-4"
          />
          {/* Subtle Blue Overlay on Hover */}
          <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-700 pointer-events-none" />
          
          {/* Real Estate "Status" Tag Style */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-widest text-white border border-white/20">
              Critical Issue 0{index + 1}
            </span>
          </div>
        </div>

        <h3 className="font-serif font-medium tracking-tight text-2xl md:text-3xl text-white mb-4 md:mb-6 leading-tight flex items-center gap-4">
          <span className="w-6 md:w-10 h-px bg-blue-500" />
          {title}
        </h3>
        
        <p className="text-slate-400 text-base md:text-lg leading-relaxed font-light max-w-lg">
          {desc}
        </p>
      </motion.div>
    </div>
  );
}
