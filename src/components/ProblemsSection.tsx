"use client";
import { motion, useSpring, useMotionValue, useMotionTemplate, useTransform, useInView } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

/**
 * ProgressiveLightReveal Component
 * 
 * Combines TWO high-end effects:
 * 1. Initial "Mask Reveal": Words slide up from behind a mask on scroll.
 * 2. "Light Up" Interaction: Letters light up into full color as the cursor moves through.
 */
function ProgressiveLightReveal({ 
  children, 
  activeColor = "bg-blue-600/10",
  className = "",
  delay = 0
}: { 
  children: React.ReactNode; 
  activeColor?: string;
  className?: string;
  delay?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  // Smooth spring for the reveal sweep
  const springX = useSpring(mouseX, { damping: 40, stiffness: 300 });
  
  // Create a clip-path that follows the spring
  const insetRight = useTransform(springX, [0, containerWidth || 1], ["100%", "0%"]);
  const clipPath = useMotionTemplate`inset(0 ${insetRight} 0 0)`;

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    mouseX.set(x);
  };

  // Variants for the "Industry Level" sliding entrance
  const wordVariants = {
    hidden: { y: "110%" },
    visible: { 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1],
        delay: delay 
      } 
    }
  };

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  // Helper to wrap characters/words for the entrance reveal
  const renderContent = (extraClass = "") => {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`flex flex-wrap justify-center py-1 ${extraClass}`}
      >
        {processContent(children, wordVariants)}
      </motion.div>
    );
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => mouseX.set(0)}
      className={`relative grid grid-cols-1 grid-rows-1 ${className} cursor-default select-none`}
    >
      {/* 1. Background layer: Dimmed/Static State */}
      <div className="col-start-1 row-start-1 opacity-50 transition-opacity duration-500 text-center">
        {renderContent()}
      </div>

      {/* 2. Sleek Highlight Bar (The "Stretching Block") */}
      <div className="col-start-1 row-start-1 relative pointer-events-none overflow-hidden">
        <motion.div
          className={`absolute left-0 top-[20%] h-[60%] ${activeColor} rounded-full blur-[4px]`}
          style={{ width: springX }}
        />
      </div>

      {/* 3. Reveal layer: The "Lit Up" State (Full color and opacity) */}
      <motion.div
        className="col-start-1 row-start-1 z-10 pointer-events-none overflow-hidden text-center"
        style={{ clipPath }}
      >
        {/* Same content, perfectly synced */}
        {renderContent()}
      </motion.div>
    </div>
  );
}

/**
 * Recursively process children to split strings into words while preserving tags.
 */
function processContent(node: React.ReactNode, variants: any): React.ReactNode {
  if (typeof node === "string") {
    const words = node.trim().split(/\s+/);
    return words.map((word, i) => (
      <span key={i} className="inline-block overflow-hidden mx-[0.2em]">
        <motion.span 
          variants={variants}
          className="inline-block"
        >
          {word}
        </motion.span>
      </span>
    ));
  }
  if (Array.isArray(node)) {
    return node.map((child, i) => <React.Fragment key={i}>{processContent(child, variants)}</React.Fragment>);
  }
  if (node && typeof node === "object" && "props" in node) {
    const element = node as React.ReactElement;
    const props = element.props as any;
    return React.cloneElement(element, {
      ...props,
      children: processContent(props.children, variants),
      // Ensure specific branding colors are preserved but layout is flex-friendly
      className: `${props.className || ""} !inline-flex flex-wrap items-center justify-center`
    });
  }
  return node;
}

interface Problem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const problems: Problem[] = [
  {
    id: "burnout",
    number: "01",
    title: "Agent Burnout",
    description:
      "Frustration grows when top talent is forced to dial for hours without a single meaningful connection.",
    icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663292946022/6qHHoDcVYXYWiN6jgpme4z/icon-burnout-6iBeMsZMwqiG4t2cMRDFgV.webp",
    color: "from-red-50 to-red-100",
  },
  {
    id: "guesswork",
    number: "02",
    title: "Expensive Guesswork",
    description:
      "Scaling a brokerage without verified intent data is an expensive gamble with your marketing budget.",
    icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663292946022/6qHHoDcVYXYWiN6jgpme4z/icon-guesswork-acxpqzfQAtWMeqiy3KnBcM.webp",
    color: "from-orange-50 to-orange-100",
  },
  {
    id: "decay",
    number: "03",
    title: "Lead Decay",
    description:
      "Opportunities rot when they aren't contacted immediately. Speed to lead is the only metric that matters.",
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663285576553/QZlELCtkihfPqSQI.png",
    color: "from-red-50 to-pink-100",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function ProblemsSection() {
  return (
    <section className="w-full pt-24 lg:pt-32 pb-12 lg:pb-16 bg-white relative overflow-hidden">
      {/* Decorative Left Accent - Brick Pattern */}
      <img
        src="https://d2xsxph8kpxj0f.cloudfront.net/310519663063245286/4NbDCkjGg5zEcuxt8PVxUE/svg-accent-brick-pattern-5Zc85zQmGUB8whjirStcYx.webp"
        alt="Decorative brick pattern"
        className="absolute top-0 -left-10 opacity-30 pointer-events-none z-0 w-64 h-64 md:w-96 md:h-96 animate-[breathe_7s_ease-in-out_infinite_alternate]"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-24">
          <ProgressiveLightReveal 
            activeColor="bg-red-500/10"
            className="mb-3"
          >
            <p className="text-sm lg:text-base font-semibold text-red-600 uppercase tracking-wider">
              The Core Challenge
            </p>
          </ProgressiveLightReveal>
          
          <ProgressiveLightReveal 
            activeColor="bg-blue-600/10"
            className="max-w-4xl mx-auto"
            delay={0.1}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Real estate teams dial{" "}
              <span className="text-blue-600">50+ numbers</span> to find just{" "}
              <span className="text-red-600">3 prospects</span>
            </h2>
          </ProgressiveLightReveal>
        </div>

        {/* Problems Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className={`group relative bg-gradient-to-br ${problem.color} rounded-2xl p-8 lg:p-12 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden`}
            >
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-3 rounded-full -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700" />

              {/* Problem Number */}
              <div className="relative z-10 mb-8">
                <span className="text-6xl lg:text-7xl font-bold text-gray-150 group-hover:text-gray-200 transition-colors duration-300">
                  {problem.number}
                </span>
              </div>

              {/* Icon */}
              <div className="relative z-10 mb-10 h-20 lg:h-24 flex items-center">
                <img
                  src={problem.icon}
                  alt={problem.title}
                  className="h-full w-auto object-contain opacity-85 group-hover:opacity-95 transition-opacity duration-300"
                />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                  {problem.title}
                </h3>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                  {problem.description}
                </p>
              </div>

              {/* Subtle accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-red-500 to-transparent transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Subtle spacing divider */}
        <div className="mt-12 lg:mt-16 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>
    </section>
  );
}
