"use client";
import React, { useRef, useState } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomVideoPlayerProps {
  videoSrc: string;
  posterSrc: string;
}

export default function CustomVideoPlayer({ videoSrc, posterSrc }: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl group bg-slate-900">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        controls={isPlaying}
        playsInline
        poster={posterSrc}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Sleek Play Button Overlay (Visible only when paused/stopped) */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] cursor-pointer"
            onClick={handlePlayClick}
          >
            <motion.div 
              className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,255,0.4)] border border-white/20 group-hover:scale-110 transition-transform duration-300"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse" />
              <Play className="w-8 h-8 text-blue-600 ml-1.5 relative z-10" fill="currentColor" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
