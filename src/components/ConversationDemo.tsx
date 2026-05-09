"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, ChevronLeft, ChevronRight, User } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import AnimatedHeader from "./AnimatedHeader";

const DEMO_CALLS = [
  {
    id: 1,
    title: "Real Estate Home Buyer",
    aiImage: "/images/agent1.png",
    humanImage: "/images/person1.png",
    audioSrc: "/audio/home1.wav",
  },
  {
    id: 2,
    title: "Corporate Lease Company",
    aiImage: "/images/agent3.png",
    humanImage: "/images/person2.png",
    audioSrc: "/audio/lease.wav",
  },
  {
    id: 3,
    title: "Real Estate Lead Acquisition",
    aiImage: "/images/agent1.png",
    humanImage: "/images/person1.png",
    audioSrc: "/audio/home2.wav",
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function ConversationDemo() {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentCall = DEMO_CALLS[currentIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentCall]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const nextProgress = Number(e.target.value);
    audioRef.current.currentTime = (nextProgress / 100) * audioRef.current.duration;
    setProgress(nextProgress);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % DEMO_CALLS.length);
    setIsPlaying(false);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + DEMO_CALLS.length) % DEMO_CALLS.length,
    );
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <section className="py-32 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.p variants={itemVariants} className="text-sm lg:text-base font-semibold text-blue-600 uppercase tracking-wider mb-3">
            Interactive Demo
          </motion.p>
          <AnimatedHeader 
            text="Hear the Difference"
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900"
          />
          <motion.p variants={itemVariants} className="text-slate-700 max-w-2xl mx-auto text-lg">
            Listen to real conversations between our AI and actual leads.
          </motion.p>
        </motion.div>

        {/* MAIN MONITOR CONTAINER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative bg-slate-50 p-4 md:p-8 pb-12 md:pb-16 rounded-sm shadow-sm border border-slate-200">
            {/* SCREEN AREA */}
            <div className="relative bg-white rounded-sm overflow-hidden aspect-[16/10] md:aspect-[16/9] border border-slate-200 shadow-inner">

              {/* LIVE Badge */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-slate-500 text-white px-4 py-1.5 rounded-none flex items-center gap-2 font-bold text-xs tracking-wider shadow-sm">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  LIVE CALL
                </div>
              </div>

              {/* SLIDER CONTROLS */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-[40%] -translate-y-1/2 z-50 bg-white/80 hover:bg-white text-slate-900 p-3 rounded-none backdrop-blur-md transition-all hover:scale-110 border border-slate-200 shadow-sm group"
                type="button"
                aria-label="Previous demo call"
              >
                <ChevronLeft
                  size={28}
                  className="group-hover:-translate-x-0.5 transition-transform"
                />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-[40%] -translate-y-1/2 z-50 bg-white/80 hover:bg-white text-slate-900 p-3 rounded-none backdrop-blur-md transition-all hover:scale-110 border border-slate-200 shadow-sm group"
                type="button"
                aria-label="Next demo call"
              >
                <ChevronRight
                  size={28}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCall.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-2 h-[80%] p-4 md:p-8 gap-4 md:gap-8"
                >
                  {/* LEFT: VIRTUAL AGENT */}
                  <div className="relative flex flex-col">
                    <div className="flex-1 relative rounded-sm overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
                      <Image
                        src={currentCall.aiImage}
                        alt="AI Agent"
                        fill
                        className="object-cover object-top"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center -z-10">
                        <User size={64} className="text-slate-300" />
                      </div>
                      {isPlaying && (
                        <div className="absolute bottom-4 right-4 flex items-end gap-1 h-8">
                          {[1, 2, 3, 4].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 bg-slate-900 rounded-full"
                              animate={
                                shouldReduceMotion
                                  ? { height: 12 }
                                  : { height: [8, 24, 12, 28, 8] }
                              }
                              transition={
                                shouldReduceMotion
                                  ? { duration: 0 }
                                  : {
                                      duration: 0.8,
                                      repeat: Infinity,
                                      delay: i * 0.1,
                                    }
                              }
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="mt-3 bg-slate-900 text-white font-bold text-center py-2 rounded-lg text-xs tracking-wider uppercase shadow-sm">
                      VIRTUAL ACQUISITION AGENT
                    </div>
                  </div>

                  {/* RIGHT: REAL OWNER (Human Icon only) */}
                  <div className="relative flex flex-col">
                    <div className="flex-1 relative rounded-sm overflow-hidden border border-slate-200 bg-slate-50 shadow-sm flex items-center justify-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-8 rounded-none bg-slate-900 border border-slate-200">
                          <User size={64} className="text-white" />
                        </div>
                        <span className="text-slate-900 font-bold text-[10px] uppercase tracking-widest">
                          Privacy Protected
                        </span>
                      </div>
                      {isPlaying && (
                        <div className="absolute bottom-4 right-4 flex items-end gap-1 h-8">
                          {[1, 2, 3, 4].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 bg-slate-500 rounded-full"
                              animate={
                                shouldReduceMotion
                                  ? { height: 12 }
                                  : { height: [12, 8, 28, 16, 12] }
                              }
                              transition={
                                shouldReduceMotion
                                  ? { duration: 0 }
                                  : {
                                      duration: 1,
                                      repeat: Infinity,
                                      delay: i * 0.15,
                                    }
                              }
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="mt-3 bg-slate-500 text-white font-bold text-center py-2 rounded-lg text-xs tracking-wider uppercase shadow-sm">
                      REAL HOME OWNER
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* INTEGRATED LOWER THIRD / CONTROL BAR */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-white border-t border-slate-100 flex flex-col justify-end px-8 pb-6">
                <div className="flex items-center gap-6">
                  <button
                    onClick={togglePlay}
                    className="flex-shrink-0 w-12 h-12 rounded-none bg-slate-900 text-white flex items-center justify-center transition-colors shadow-sm hover:bg-slate-800"
                    type="button"
                    aria-label={isPlaying ? "Pause audio demo" : "Play audio demo"}
                  >
                    {isPlaying ? (
                      <Pause size={20} fill="currentColor" />
                    ) : (
                      <Play size={20} fill="currentColor" className="ml-1" />
                    )}
                  </button>

                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                      <span className="text-slate-900 font-bold text-sm tracking-wide uppercase truncate">
                        DEMO: {currentCall.title}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    {/* SEEKABLE PROGRESS BAR */}
                    <div className="h-2 bg-slate-100 rounded-none overflow-hidden cursor-pointer relative group">
                      <motion.div
                        className="h-full bg-slate-500 relative pointer-events-none"
                        style={{ width: `${progress}%` }}
                      />
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        value={Number.isFinite(progress) ? progress : 0}
                        onChange={handleSeekChange}
                        aria-label="Seek demo audio position"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Dots (Below Block) */}
          <div className="mt-8 flex justify-center gap-3 relative z-10">
            {DEMO_CALLS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsPlaying(false);
                  setProgress(0);
                }}
                type="button"
                aria-label={`View demo call ${idx + 1}`}
                className={`h-2 rounded-none transition-all duration-300 ${
                  idx === currentIndex
                    ? "bg-slate-900 w-10"
                    : "bg-slate-300 w-2 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <audio
            ref={audioRef}
            src={currentCall.audioSrc}
            key={currentCall.audioSrc}
          />
        </motion.div>
      </div>
    </section>
  );
}
