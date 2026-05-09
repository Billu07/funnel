"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: number;
  company: string;
  website: string;
  logoUrl?: string;
  text: string;
  author: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    company: "SmallBayFlex",
    website: "smallbayflex.com",
    logoUrl: "/images/smallbay.webp",
    text: "Voicium has completely transformed how we handle inbound leads. We no longer waste time on dead numbers.",
    author: "Sarah Chen",
    rating: 5,
  },
  {
    id: 2,
    company: "AgentWorkForce",
    website: "agentworkforce.io",
    logoUrl: "/images/agentWorkforce.png",
    text: "The AI lead qualification is incredibly accurate. It feels like having a 24/7 sales assistant.",
    author: "Walker Music",
    rating: 5,
  },
  {
    id: 3,
    company: "Diamond Equity",
    website: "diamondequity.com",
    logoUrl: "/images/diamond equity.png",
    text: "Our conversion rates have tripled since we started using Voicium. The ROI was almost immediate.",
    author: "Dan Breslin",
    rating: 5,
  },
  {
    id: 4,
    company: "CrowdCopia",
    website: "crowdcopia.com",
    logoUrl: "/images/crowdcopia.png",
    text: "The integration was seamless. We were up and running in less than 24 hours as promised.",
    author: "Bil Wilson",
    rating: 5,
  },
];

interface LogoPosition {
  x: number;
  y: number;
  scale: number;
  zIndex: number;
}

export default function TestimonialsSection() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const selectedTestimonial = testimonials.find((t) => t.id === selectedId);

  // Auto-cycle logic
  useEffect(() => {
    if (hoveredId !== null || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setSelectedId((current) => {
        const currentIndex = testimonials.findIndex((t) => t.id === current);
        const nextIndex = (currentIndex + 1) % testimonials.length;
        return testimonials[nextIndex].id;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [hoveredId, shouldReduceMotion]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const logoPositions = useMemo(() => {
    const positions: Record<number, LogoPosition> = {};
    const m = isMobile ? 0.5 : 1;

    const positionData = [
      { x: -160 * m, y: -100 * m },
      { x: 160 * m, y: -100 * m },
      { x: -220 * m, y: 20 * m },
      { x: 220 * m, y: 20 * m },
    ];

    testimonials.forEach((testimonial, index) => {
      const data = positionData[index % positionData.length];
      positions[testimonial.id] = {
        x: data.x,
        y: data.y,
        scale: isMobile ? 0.45 : 0.6,
        zIndex: 1,
      };
    });

    positions[selectedId] = {
      x: 0,
      y: 0,
      scale: isMobile ? 0.9 : 1.15,
      zIndex: 10,
    };

    return positions;
  }, [selectedId, isMobile]);

  return (
    <section className="relative w-full py-4 md:py-8 bg-white overflow-hidden border-y border-slate-200">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808025_1px,transparent_1px),linear-gradient(to_bottom,#80808025_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_95%)]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-2 md:mb-4">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed font-light"
          >
            See how elite real estate teams are transforming their workflow with
            Voicium.
          </motion.p>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 min-h-[300px] md:min-h-[400px]">
          <div className="relative w-full lg:w-1/2 h-[250px] md:h-[350px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-75 md:scale-100">
              <div className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] border border-dashed border-slate-200 rounded-full opacity-50 animate-[spin_60s_linear_infinite] motion-reduce:animate-none" />
              <div className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] border border-dashed border-slate-100 rounded-full opacity-30 animate-[spin_90s_linear_infinite_reverse] motion-reduce:animate-none" />
            </div>

            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-blue-50/40 opacity-0 blur-3xl"
                animate={{
                  opacity: selectedTestimonial ? 0.3 : 0.1,
                }}
                transition={{ duration: 0.6 }}
              />

              <AnimatePresence mode="popLayout">
                {testimonials.map((testimonial) => {
                  const pos = logoPositions[testimonial.id];
                  const isSelected = selectedId === testimonial.id;
                  const isHovered = hoveredId === testimonial.id;

                  return (
                    <motion.div
                      key={testimonial.id}
                      layout
                      onMouseEnter={() => setHoveredId(testimonial.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="absolute rounded-full"
                      animate={{
                        x: pos.x,
                        y: pos.y,
                        scale: pos.scale,
                        zIndex: isSelected ? 10 : isHovered ? 5 : 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 90,
                        damping: 25,
                        mass: 1.2,
                      }}
                    >
                      {/* WEBSITE MESSAGE BUBBLE - CLICKABLE LINK */}
                      <AnimatePresence>
                        {(isSelected || isHovered) && (
                          <motion.a
                            href={`https://${testimonial.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.5, y: -10, x: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: -10, x: -10 }}
                            whileHover={{ scale: 1.05 }}
                            className="absolute -bottom-2 -right-16 z-30 pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="relative bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-xl rounded-tl-none font-bold shadow-xl border border-white/20 whitespace-nowrap flex items-center gap-1.5 hover:bg-black transition-colors cursor-pointer">
                              <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
                              {testimonial.website}
                            </div>
                          </motion.a>
                        )}
                      </AnimatePresence>

                      <div className="absolute inset-0 pointer-events-none">
                        {isSelected &&
                          [
                            { x: -55, y: -55 },
                            { x: 55, y: -55 },
                            { x: -65, y: 15 },
                            { x: 65, y: 15 },
                            { x: 0, y: 65 },
                            { x: 0, y: -70 },
                          ].map((spark, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{
                                opacity: shouldReduceMotion ? 0.35 : [0.2, 0.8, 0.2],
                                scale: shouldReduceMotion ? 1 : [1, 1.3, 1],
                                x: spark.x,
                                y: spark.y,
                              }}
                              transition={{
                                duration: shouldReduceMotion ? 0 : 1.2 + i * 0.2,
                                repeat: shouldReduceMotion ? 0 : Infinity,
                                ease: shouldReduceMotion ? "linear" : "easeInOut",
                              }}
                              className="absolute left-1/2 top-1/2 w-1 h-1 bg-blue-600 rounded-sm"
                            />
                          ))}
                      </div>

                      {/* Logo selection area */}
                      <button
                        onClick={() => setSelectedId(testimonial.id)}
                        type="button"
                        aria-label={`Show testimonial from ${testimonial.company}`}
                        aria-pressed={isSelected}
                        className="relative focus:outline-none rounded-full group pointer-events-auto"
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full border border-slate-200"
                          animate={{
                            opacity: isSelected ? 1 : 0.2,
                            borderColor: isSelected ? "#0000FF" : "#e2e8f0",
                          }}
                          transition={{ duration: 0.3 }}
                        />

                        <motion.div
                          className={`w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isSelected
                              ? "bg-white shadow-lg shadow-blue-500/5 border border-blue-50"
                              : "bg-white/80 shadow-sm border border-slate-100"
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {testimonial.logoUrl && (
                            <div className="relative w-full h-full p-5 md:p-7">
                              <Image
                                src={testimonial.logoUrl}
                                alt={testimonial.company}
                                fill
                                className="object-contain p-2"
                              />
                            </div>
                          )}
                        </motion.div>
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          <div className="w-full lg:w-1/2 max-w-xl mx-auto relative z-20">
            <AnimatePresence mode="wait">
              {selectedTestimonial && (
                <motion.div
                  key={selectedTestimonial.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="bg-white/90 backdrop-blur-sm p-6 md:p-10 border-l-4 border-blue-600 text-left shadow-sm"
                >
                  <Quote className="w-8 h-8 text-blue-600/10 mb-4" />
                  <motion.p
                    className="text-lg md:text-xl text-slate-700 font-sans font-medium mb-8 leading-relaxed italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    &ldquo;{selectedTestimonial.text}&rdquo;
                  </motion.p>
                  <div className="flex flex-col items-start">
                    <p className="text-lg font-bold text-slate-900">
                      {selectedTestimonial.author}
                    </p>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">
                      {selectedTestimonial.company}
                    </p>
                    <div className="flex justify-start gap-1 mt-4">
                      {Array.from({ length: selectedTestimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-blue-600 text-blue-600"
                            strokeWidth={0}
                          />
                        ),
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
