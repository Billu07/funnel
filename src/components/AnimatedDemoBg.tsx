"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AnimatedDemoBg({ onBook }: { onBook: () => void }) {
  const svgRef = useRef<SVGSVGElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: svgRef as unknown as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"]
  });

  // Buildings start at x=700 (center of viewport basically)
  // B1: x=0,   y=50
  // B3: x=140, y=0
  // B5: x=287, y=20
  // B7: x=427, y=55
  
  // Total transform translate(700, 350)
  // Actual X offsets from SVG left: 700, 840, 987, 1127
  // Actual roof Y (from top, adding 350): 400, 350, 370, 405
  
  // We want the button to track exactly over these rooftops as the user scrolls.
  const xStops = [0, 0.3, 0.45, 0.6, 0.75, 1];
  
  const xVals = [
    500,        // Start hidden to the left
    700 + 32,   // B1 center
    840 + 36,   // B3 center
    987 + 32,   // B5 center
    1127 + 32,  // B7 center
    1350        // End off to the right
  ];
  
  const yVals = [
    400,        // Match B1
    400,        // On B1
    350,        // On B3
    370,        // On B5
    405,        // On B7
    450         // Falling off
  ];
  
  // We map the scroll progress to X and Y coordinates.
  // We offset X by -140 so the center of the 280px button aligns with the building center.
  // We offset Y by -90 so the 80px button floats nicely on top of the roof.
  const buttonX = useTransform(scrollYProgress, xStops, xVals.map(x => x - 140));
  const buttonY = useTransform(scrollYProgress, xStops, yVals.map(y => y - 90));

  return (
    <svg 
      ref={svgRef}
      viewBox="0 0 1400 700" 
      preserveAspectRatio="xMidYMid slice" 
      className="w-full h-full opacity-90 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient for sky background */}
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor: "#d4e8f0", stopOpacity: 1}} />
          <stop offset="50%" style={{stopColor: "#c5dce6", stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: "#b8d4e0", stopOpacity: 1}} />
        </linearGradient>
        
        {/* Gradient for cloud shadows */}
        <radialGradient id="cloudShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{stopColor: "#ffffff", stopOpacity: 0.95}} />
          <stop offset="60%" style={{stopColor: "#f8f8f8", stopOpacity: 0.8}} />
          <stop offset="100%" style={{stopColor: "#e8e8e8", stopOpacity: 0.5}} />
        </radialGradient>
        
        {/* Sparkle glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Sky background */}
      <rect width="1400" height="700" fill="url(#skyGradient)"/>
      
      {/* Soft gradient overlay for depth on right side */}
      <ellipse cx="1100" cy="200" rx="500" ry="300" fill="#a8d8e8" opacity="0.25"/>
      
      {/* Large fluffy cloud in upper-right area */}
      <g id="mainCloud">
        <circle cx="850" cy="220" r="80" fill="url(#cloudShadow)"/>
        <circle cx="950" cy="190" r="95" fill="url(#cloudShadow)"/>
        <circle cx="1050" cy="210" r="85" fill="url(#cloudShadow)"/>
        <circle cx="750" cy="240" r="70" fill="url(#cloudShadow)"/>
        <circle cx="1120" cy="250" r="75" fill="url(#cloudShadow)"/>
        <ellipse cx="900" cy="170" rx="60" ry="35" fill="#ffffff" opacity="0.7"/>
        <ellipse cx="1000" cy="155" rx="55" ry="30" fill="#ffffff" opacity="0.6"/>
        <ellipse cx="800" cy="200" rx="40" ry="25" fill="#ffffff" opacity="0.5"/>
      </g>
      
      {/* Sparkles scattered around cloud area */}
      <g id="sparkles" fill="#ffffff" opacity="0.85" filter="url(#glow)">
        <circle cx="700" cy="150" r="3.5"/>
        <circle cx="730" cy="130" r="3"/>
        <circle cx="1150" cy="140" r="3.5"/>
        <circle cx="1180" cy="165" r="3"/>
        <circle cx="1200" cy="190" r="2.5"/>
        <circle cx="1220" cy="160" r="3"/>
        <circle cx="680" cy="180" r="2.5"/>
        <circle cx="660" cy="210" r="3"/>
        <circle cx="620" cy="240" r="2.5"/>
        <circle cx="1100" cy="280" r="2.5"/>
        <g transform="translate(750, 110)">
          <polygon points="0,-5 1.5,-1.5 5,-1.5 2.5,1.5 4,5 0,2.5 -4,5 -2.5,1.5 -5,-1.5 -1.5,-1.5" fill="#ffffff"/>
        </g>
        <g transform="translate(1160, 120)">
          <polygon points="0,-4 1.2,-1.2 4,-1.2 2,1 3.2,4 0,2 -3.2,4 -2,1 -4,-1.2 -1.2,-1.2" fill="#ffffff"/>
        </g>
      </g>
      
      {/* Lower cloud (left side) */}
      <g id="lowerLeftCloud">
        <circle cx="550" cy="480" r="65" fill="url(#cloudShadow)"/>
        <circle cx="630" cy="460" r="72" fill="url(#cloudShadow)"/>
        <circle cx="700" cy="485" r="60" fill="url(#cloudShadow)"/>
        <circle cx="480" cy="505" r="55" fill="url(#cloudShadow)"/>
        <ellipse cx="600" cy="445" rx="50" ry="28" fill="#ffffff" opacity="0.55"/>
      </g>
      
      {/* Lower cloud (right side) */}
      <g id="lowerRightCloud">
        <circle cx="1100" cy="500" r="62" fill="url(#cloudShadow)"/>
        <circle cx="1180" cy="480" r="68" fill="url(#cloudShadow)"/>
        <circle cx="1250" cy="505" r="58" fill="url(#cloudShadow)"/>
        <circle cx="1030" cy="520" r="52" fill="url(#cloudShadow)"/>
        <ellipse cx="1150" cy="465" rx="48" ry="26" fill="#ffffff" opacity="0.55"/>
      </g>
      
      {/* Buildings group */}
      <g id="buildings" transform="translate(700, 350)">
        {/* Building 1 */}
        <rect x="0" y="50" width="65" height="140" fill="#4a9fb5" rx="3"/>
        <rect x="10" y="65" width="11" height="11" fill="#1a3a4a"/>
        <rect x="28" y="65" width="11" height="11" fill="#1a3a4a"/>
        <rect x="46" y="65" width="11" height="11" fill="#1a3a4a"/>
        <rect x="10" y="85" width="11" height="11" fill="#1a3a4a"/>
        <rect x="28" y="85" width="11" height="11" fill="#1a3a4a"/>
        <rect x="46" y="85" width="11" height="11" fill="#1a3a4a"/>
        <rect x="10" y="105" width="11" height="11" fill="#1a3a4a"/>
        <rect x="28" y="105" width="11" height="11" fill="#1a3a4a"/>
        <rect x="46" y="105" width="11" height="11" fill="#1a3a4a"/>
        <rect x="10" y="125" width="11" height="11" fill="#1a3a4a"/>
        <rect x="28" y="125" width="11" height="11" fill="#1a3a4a"/>
        <rect x="46" y="125" width="11" height="11" fill="#1a3a4a"/>
        <rect x="10" y="145" width="11" height="11" fill="#1a3a4a"/>
        <rect x="28" y="145" width="11" height="11" fill="#1a3a4a"/>
        <rect x="46" y="145" width="11" height="11" fill="#1a3a4a"/>
        <rect x="10" y="165" width="11" height="11" fill="#1a3a4a"/>
        <rect x="28" y="165" width="11" height="11" fill="#1a3a4a"/>
        <rect x="46" y="165" width="11" height="11" fill="#1a3a4a"/>
        
        {/* Building 2 */}
        <rect x="70" y="30" width="65" height="160" fill="#c0c0c0" rx="3"/>
        <rect x="80" y="45" width="11" height="11" fill="#505050"/>
        <rect x="98" y="45" width="11" height="11" fill="#505050"/>
        <rect x="116" y="45" width="11" height="11" fill="#505050"/>
        <rect x="80" y="65" width="11" height="11" fill="#505050"/>
        <rect x="98" y="65" width="11" height="11" fill="#505050"/>
        <rect x="116" y="65" width="11" height="11" fill="#505050"/>
        <rect x="80" y="85" width="11" height="11" fill="#505050"/>
        <rect x="98" y="85" width="11" height="11" fill="#505050"/>
        <rect x="116" y="85" width="11" height="11" fill="#505050"/>
        <rect x="80" y="105" width="11" height="11" fill="#505050"/>
        <rect x="98" y="105" width="11" height="11" fill="#505050"/>
        <rect x="116" y="105" width="11" height="11" fill="#505050"/>
        <rect x="80" y="125" width="11" height="11" fill="#505050"/>
        <rect x="98" y="125" width="11" height="11" fill="#505050"/>
        <rect x="116" y="125" width="11" height="11" fill="#505050"/>
        <rect x="80" y="145" width="11" height="11" fill="#505050"/>
        <rect x="98" y="145" width="11" height="11" fill="#505050"/>
        <rect x="116" y="145" width="11" height="11" fill="#505050"/>
        <rect x="80" y="165" width="11" height="11" fill="#505050"/>
        <rect x="98" y="165" width="11" height="11" fill="#505050"/>
        <rect x="116" y="165" width="11" height="11" fill="#505050"/>
        
        {/* Building 3 */}
        <rect x="140" y="0" width="72" height="190" fill="#e74c3c" rx="3"/>
        <rect x="154" y="18" width="12" height="12" fill="#8b1a1a"/>
        <rect x="175" y="18" width="12" height="12" fill="#8b1a1a"/>
        <rect x="196" y="18" width="12" height="12" fill="#8b1a1a"/>
        <rect x="154" y="40" width="12" height="12" fill="#8b1a1a"/>
        <rect x="175" y="40" width="12" height="12" fill="#8b1a1a"/>
        <rect x="196" y="40" width="12" height="12" fill="#8b1a1a"/>
        <rect x="154" y="62" width="12" height="12" fill="#8b1a1a"/>
        <rect x="175" y="62" width="12" height="12" fill="#8b1a1a"/>
        <rect x="196" y="62" width="12" height="12" fill="#8b1a1a"/>
        <rect x="154" y="84" width="12" height="12" fill="#8b1a1a"/>
        <rect x="175" y="84" width="12" height="12" fill="#8b1a1a"/>
        <rect x="196" y="84" width="12" height="12" fill="#8b1a1a"/>
        <rect x="154" y="106" width="12" height="12" fill="#8b1a1a"/>
        <rect x="175" y="106" width="12" height="12" fill="#8b1a1a"/>
        <rect x="196" y="106" width="12" height="12" fill="#8b1a1a"/>
        <rect x="154" y="128" width="12" height="12" fill="#8b1a1a"/>
        <rect x="175" y="128" width="12" height="12" fill="#8b1a1a"/>
        <rect x="196" y="128" width="12" height="12" fill="#8b1a1a"/>
        <rect x="154" y="150" width="12" height="12" fill="#8b1a1a"/>
        <rect x="175" y="150" width="12" height="12" fill="#8b1a1a"/>
        <rect x="196" y="150" width="12" height="12" fill="#8b1a1a"/>
        <rect x="154" y="172" width="12" height="12" fill="#8b1a1a"/>
        <rect x="175" y="172" width="12" height="12" fill="#8b1a1a"/>
        <rect x="196" y="172" width="12" height="12" fill="#8b1a1a"/>
        
        {/* Building 4 */}
        <rect x="217" y="40" width="65" height="150" fill="#f1c40f" rx="3"/>
        <rect x="227" y="58" width="11" height="11" fill="#b8860b"/>
        <rect x="245" y="58" width="11" height="11" fill="#b8860b"/>
        <rect x="263" y="58" width="11" height="11" fill="#b8860b"/>
        <rect x="227" y="78" width="11" height="11" fill="#b8860b"/>
        <rect x="245" y="78" width="11" height="11" fill="#b8860b"/>
        <rect x="263" y="78" width="11" height="11" fill="#b8860b"/>
        <rect x="227" y="98" width="11" height="11" fill="#b8860b"/>
        <rect x="245" y="98" width="11" height="11" fill="#b8860b"/>
        <rect x="263" y="98" width="11" height="11" fill="#b8860b"/>
        <rect x="227" y="118" width="11" height="11" fill="#b8860b"/>
        <rect x="245" y="118" width="11" height="11" fill="#b8860b"/>
        <rect x="263" y="118" width="11" height="11" fill="#b8860b"/>
        <rect x="227" y="138" width="11" height="11" fill="#b8860b"/>
        <rect x="245" y="138" width="11" height="11" fill="#b8860b"/>
        <rect x="263" y="138" width="11" height="11" fill="#b8860b"/>
        <rect x="227" y="158" width="11" height="11" fill="#b8860b"/>
        <rect x="245" y="158" width="11" height="11" fill="#b8860b"/>
        <rect x="263" y="158" width="11" height="11" fill="#b8860b"/>
        
        {/* Building 5 */}
        <rect x="287" y="20" width="65" height="170" fill="#d3d3d3" rx="3"/>
        <rect x="297" y="38" width="11" height="11" fill="#505050"/>
        <rect x="315" y="38" width="11" height="11" fill="#505050"/>
        <rect x="333" y="38" width="11" height="11" fill="#505050"/>
        <rect x="297" y="58" width="11" height="11" fill="#505050"/>
        <rect x="315" y="58" width="11" height="11" fill="#505050"/>
        <rect x="333" y="58" width="11" height="11" fill="#505050"/>
        <rect x="297" y="78" width="11" height="11" fill="#505050"/>
        <rect x="315" y="78" width="11" height="11" fill="#505050"/>
        <rect x="333" y="78" width="11" height="11" fill="#505050"/>
        <rect x="297" y="98" width="11" height="11" fill="#505050"/>
        <rect x="315" y="98" width="11" height="11" fill="#505050"/>
        <rect x="333" y="98" width="11" height="11" fill="#505050"/>
        <rect x="297" y="118" width="11" height="11" fill="#505050"/>
        <rect x="315" y="118" width="11" height="11" fill="#505050"/>
        <rect x="333" y="118" width="11" height="11" fill="#505050"/>
        <rect x="297" y="138" width="11" height="11" fill="#505050"/>
        <rect x="315" y="138" width="11" height="11" fill="#505050"/>
        <rect x="333" y="138" width="11" height="11" fill="#505050"/>
        <rect x="297" y="158" width="11" height="11" fill="#505050"/>
        <rect x="315" y="158" width="11" height="11" fill="#505050"/>
        <rect x="333" y="158" width="11" height="11" fill="#505050"/>
        
        {/* Building 6 */}
        <rect x="357" y="35" width="65" height="155" fill="#f39c12" rx="3"/>
        <rect x="367" y="53" width="11" height="11" fill="#b8860b"/>
        <rect x="385" y="53" width="11" height="11" fill="#b8860b"/>
        <rect x="403" y="53" width="11" height="11" fill="#b8860b"/>
        <rect x="367" y="73" width="11" height="11" fill="#b8860b"/>
        <rect x="385" y="73" width="11" height="11" fill="#b8860b"/>
        <rect x="403" y="73" width="11" height="11" fill="#b8860b"/>
        <rect x="367" y="93" width="11" height="11" fill="#b8860b"/>
        <rect x="385" y="93" width="11" height="11" fill="#b8860b"/>
        <rect x="403" y="93" width="11" height="11" fill="#b8860b"/>
        <rect x="367" y="113" width="11" height="11" fill="#b8860b"/>
        <rect x="385" y="113" width="11" height="11" fill="#b8860b"/>
        <rect x="403" y="113" width="11" height="11" fill="#b8860b"/>
        <rect x="367" y="133" width="11" height="11" fill="#b8860b"/>
        <rect x="385" y="133" width="11" height="11" fill="#b8860b"/>
        <rect x="403" y="133" width="11" height="11" fill="#b8860b"/>
        <rect x="367" y="153" width="11" height="11" fill="#b8860b"/>
        <rect x="385" y="153" width="11" height="11" fill="#b8860b"/>
        <rect x="403" y="153" width="11" height="11" fill="#b8860b"/>
        
        {/* Building 7 */}
        <rect x="427" y="55" width="65" height="135" fill="#e8d5c4" rx="3"/>
        <rect x="437" y="73" width="11" height="11" fill="#8b7355"/>
        <rect x="455" y="73" width="11" height="11" fill="#8b7355"/>
        <rect x="473" y="73" width="11" height="11" fill="#8b7355"/>
        <rect x="437" y="93" width="11" height="11" fill="#8b7355"/>
        <rect x="455" y="93" width="11" height="11" fill="#8b7355"/>
        <rect x="473" y="93" width="11" height="11" fill="#8b7355"/>
        <rect x="437" y="113" width="11" height="11" fill="#8b7355"/>
        <rect x="455" y="113" width="11" height="11" fill="#8b7355"/>
        <rect x="473" y="113" width="11" height="11" fill="#8b7355"/>
        <rect x="437" y="133" width="11" height="11" fill="#8b7355"/>
        <rect x="455" y="133" width="11" height="11" fill="#8b7355"/>
        <rect x="473" y="133" width="11" height="11" fill="#8b7355"/>
        <rect x="437" y="153" width="11" height="11" fill="#8b7355"/>
        <rect x="455" y="153" width="11" height="11" fill="#8b7355"/>
        <rect x="473" y="153" width="11" height="11" fill="#8b7355"/>
      </g>
      
      {/* Snow/frost drifts at bottom */}
      <g id="snowEffect" fill="#ffffff" opacity="0.85">
        <ellipse cx="350" cy="580" rx="280" ry="90" fill="#ffffff" opacity="0.75"/>
        <path d="M 100 580 Q 150 560 200 570 T 300 575 T 400 570 Q 450 575 500 580 L 500 700 L 100 700 Z" fill="#ffffff" opacity="0.7"/>
        <ellipse cx="700" cy="600" rx="350" ry="100" fill="#ffffff" opacity="0.7"/>
        <path d="M 400 600 Q 500 575 600 585 T 800 595 T 950 590 Q 1000 595 1050 600 L 1050 700 L 400 700 Z" fill="#ffffff" opacity="0.65"/>
        <ellipse cx="1150" cy="590" rx="320" ry="95" fill="#ffffff" opacity="0.75"/>
        <path d="M 900 590 Q 950 570 1000 580 T 1150 590 T 1300 585 Q 1350 590 1400 595 L 1400 700 L 900 700 Z" fill="#ffffff" opacity="0.7"/>
      </g>
      
      {/* Subtle shadow at bottom for depth */}
      <ellipse cx="700" cy="650" rx="700" ry="100" fill="#000000" opacity="0.04"/>

      {/* 
        ========================================================
        THE ANIMATED BUTTON
        This acts as the "mountain car", perfectly scaling inside 
        the SVG coordinate system and matching the rooftops!
        ======================================================== 
      */}
      <motion.foreignObject 
        style={{ x: buttonX, y: buttonY }} 
        width="280" 
        height="80"
        className="overflow-visible z-50 pointer-events-none"
      >
        <div className="w-full h-full flex flex-col items-center justify-center relative pointer-events-auto">
           {/* Shadow matching SVG lighting */}
           <div className="absolute -bottom-6 w-1/2 h-6 bg-black/10 blur-md rounded-full" />
           
           <button
             onClick={onBook}
             className="w-full h-full bg-[#0000FF] text-white rounded-xl text-2xl font-bold transition-transform shadow-[0_20px_40px_rgba(0,0,255,0.4)] hover:shadow-[0_25px_50px_rgba(0,0,255,0.6)] flex items-center justify-center border-4 border-white active:scale-95"
           >
             Book Your Demo
           </button>
           
           {/* Little exhaust particles for fun "car" effect */}
           <div className="absolute -left-6 bottom-4 w-4 h-4 rounded-full bg-white/60 blur-sm animate-pulse" />
           <div className="absolute -left-12 bottom-6 w-6 h-6 rounded-full bg-white/40 blur-md animate-pulse delay-75" />
        </div>
      </motion.foreignObject>
    </svg>
  );
}
