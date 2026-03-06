"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

interface Step {
  id: number;
  title: string;
  desc: string;
  image: string;
  insight: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "We Source Targeted Leads For You",
    desc: "Don't have a list? No problem. Our system scrapes and verifies high-intent real estate leads in your target zip codes. Already have data? Just sync your existing CRM.",
    image: "/images/data.jpg",
    insight: "Verified against 50+ data points for accuracy.",
  },
  {
    id: 2,
    title: "Our AI Agents Make The Calls",
    desc: "Instead of your team dialing for hours, our conversational AI agents dial thousands of numbers simultaneously. They hold natural, human-like conversations to identify true buying or selling intent.",
    image: "/images/call.jpg",
    insight: "98.4% human-parity in conversational fluency.",
  },
  {
    id: 3,
    title: "Instant Call Analysis & Scoring",
    desc: "We analyze every single conversation instantly. Our system extracts intent, qualifies the lead based on your brokerage's strict criteria, and filters out the tire-kickers.",
    image: "/images/anals.jpg",
    insight: "Proprietary scoring engine detects urgency.",
  },
  {
    id: 4,
    title: "You Close The Deals",
    desc: "Only highly qualified leads are pushed to your dashboard. Your agents log in, review the call transcripts, and step in exactly when the prospect is ready to transact.",
    image: "/images/dashboard/dashboard.jpg",
    insight: "Integrated directly with your existing CRM.",
  },
];

export default function ProcessFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile) return;
    let newIndex = 0;
    if (latest < 0.2) newIndex = 0;
    else if (latest < 0.4) newIndex = 1;
    else if (latest < 0.6) newIndex = 2;
    else newIndex = 3;

    if (newIndex !== index) {
      setDirection(newIndex > index ? 1 : -1);
      setIndex(newIndex);
    }
  });

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      filter: "blur(10px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      filter: "blur(10px)",
    }),
  };

  if (isMobile) {
    return (
      <div className="w-full px-6 lg:px-12 py-12 space-y-16">
        {steps.map((step, i) => (
          <div key={step.id} className="flex flex-col gap-8 border-b border-gray-100 pb-16 last:border-0">
             {/* Phase Number Watermark */}
             <div className="relative">
                <div className="absolute -top-10 -left-4 text-[80px] font-sans font-bold text-gray-100 leading-none select-none pointer-events-none">
                  0{i + 1}
                </div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-8 h-px bg-blue-500" />
                    <span className="text-xs uppercase tracking-widest font-bold text-blue-600">Step {i + 1}</span>
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
                    {step.title}
                  </h3>
                </div>
             </div>

             <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-contain p-4"
                />
             </div>

             <div className="space-y-6">
                <p className="text-base text-gray-700 leading-relaxed">
                  {step.desc}
                </p>
                <div className="p-4 border border-gray-100 bg-gray-50 rounded-lg">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-blue-600 block mb-1">Strategic Advantage</span>
                  <p className="text-sm text-gray-700 font-medium italic">
                    &quot;{step.insight}&quot;
                  </p>
                </div>
             </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] scrollbar-hide">
      {/* Sticky Full-Screen Viewport */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
        
        {/* Main Content Area */}
        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                filter: { duration: 0.4 }
              }}
              className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center w-full"
            >
              
              {/* Text Side */}
              <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 relative">
                {/* Repositioned Phase Number - Behind text as a subtle watermark */}
                <div className="absolute -top-16 -left-8 lg:-top-24 lg:-left-12 z-0 select-none pointer-events-none">
                  <div className="text-[120px] lg:text-[180px] font-sans font-bold text-gray-100 leading-none">
                    0{index + 1}
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 mb-6">
                    <div className="w-8 h-px bg-blue-500" />
                    <span className="text-xs uppercase tracking-widest font-bold text-blue-600">Workflow Step {index + 1}</span>
                  </div>
                  
                  <h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-8 leading-[1.1]">
                    {steps[index].title}
                  </h3>
                  <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-12 max-w-lg">
                    {steps[index].desc}
                  </p>
                  
                  <div className="flex items-start gap-4 p-6 border border-gray-100 bg-gray-50/50 w-full lg:max-w-md rounded-xl shadow-sm">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-blue-600">Strategic Advantage</span>
                        <p className="text-sm text-gray-700 font-medium italic">
                          &quot;{steps[index].insight}&quot;
                        </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Side - Clean, No overlap */}
              <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center lg:justify-end">
                <div 
                  className="relative w-full aspect-[4/3] lg:max-w-xl group cursor-zoom-in"
                  onClick={() => setIsMaximized(true)}
                >
                   {/* Background Glow */}
                   <div className="absolute -inset-4 bg-blue-500/5 rounded-[2rem] blur-2xl group-hover:bg-blue-500/10 transition-colors duration-700" />
                   
                   <motion.div 
                     className="relative w-full h-full rounded-2xl overflow-hidden border-[6px] border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:scale-[1.02]"
                     animate={{ y: [0, -10, 0] }}
                     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                   >
                     <div className="absolute inset-0 border border-blue-600/20 rounded-xl z-10 pointer-events-none" />
                     
                     <div className="absolute inset-0 bg-white flex items-center justify-center">
                        <Image
                          src={steps[index].image}
                          alt={steps[index].title}
                          fill
                          className="object-contain opacity-95 group-hover:opacity-100 transition-opacity duration-500 p-4"
                          priority
                        />
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 to-transparent pointer-events-none" />
                     
                     {/* Click to Enlarge Hint */}
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <div className="px-4 py-2 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold border border-white/20">
                          Click to Enlarge
                        </div>
                     </div>
                   </motion.div>

                   <div className="absolute -top-2 -right-2 w-12 h-12 border-t-2 border-r-2 border-blue-500/30 rounded-tr-xl" />
                   <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-2 border-l-2 border-blue-500/30 rounded-bl-xl" />
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Navigation Hint - Discrete */}
        <div className="absolute bottom-10 left-0 w-full flex justify-center lg:justify-start lg:px-12 max-w-7xl mx-auto">
           <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.8em] font-bold text-gray-400">
                SCROLL TO NAVIGATE
              </span>
           </div>
        </div>
      </div>

      {/* Premium Image Lightbox */}
      <AnimatePresence>
        {isMaximized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMaximized(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/90 backdrop-blur-xl p-6 lg:p-12 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-[4/3] rounded-2xl overflow-hidden border-[8px] border-white shadow-2xl bg-white"
            >
              <Image
                src={steps[index].image}
                alt={steps[index].title}
                fill
                className="object-contain p-8"
              />
              <div className="absolute top-6 right-6">
                <button className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-black/70 transition-colors">
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
