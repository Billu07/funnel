"use client";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

/**
 * AnimatedHeader Component
 * 
 * Provides an "Industry Level" text reveal effect.
 * Each word is wrapped in an overflow-hidden container and slides up.
 */
export default function AnimatedHeader({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08, 
        delayChildren: delay 
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { 
      y: "110%",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 }
    },
    visible: { 
      y: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 }
    },
  };

  return (
    <motion.h2
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`relative overflow-hidden ${className}`}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="flex flex-wrap justify-center">
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden py-1">
            <motion.span 
              variants={wordVariants} 
              className="inline-block whitespace-nowrap"
            >
              {word}&nbsp;
            </motion.span>
          </span>
        ))}
      </span>
    </motion.h2>
  );
}
