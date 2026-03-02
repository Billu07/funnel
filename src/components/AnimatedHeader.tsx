"use client";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

export default function AnimatedHeader({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.h2
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`text-center ${className}`}
    >
      {words.map((word, index) => (
        <motion.span 
          variants={child} 
          key={index} 
          className="inline-block whitespace-nowrap"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.h2>
  );
}