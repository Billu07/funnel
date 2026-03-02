"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, ChevronLeft, ChevronRight, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function ConversationDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

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

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));

    if (audioRef.current.duration) {
      audioRef.current.currentTime = percentage * audioRef.current.duration;
      setProgress(percentage * 100);
    }
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
        <p className="text-sm lg:text-base font-semibold text-blue-600 uppercase tracking-wider mb-3">
          Interactive Demo
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
          Hear the Difference
        </h2>
        <p className="text-slate-700 mb-20 max-w-2xl mx-auto text-lg">
          Listen to real conversations between our AI and actual leads.
        </p>

        {/* MAIN MONITOR CONTAINER */}
        <div className="relative max-w-5xl mx-auto">
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
              >
                <ChevronLeft
                  size={28}
                  className="group-hover:-translate-x-0.5 transition-"
                />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-[40%] -translate-y-1/2 z-50 bg-white/80 hover:bg-white text-slate-900 p-3 rounded-none backdrop-blur-md transition-all hover:scale-110 border border-slate-200 shadow-sm group"
              >
                <ChevronRight
                  size={28}
                  className="group-hover:translate-x-0.5 transition-"
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
                              animate={{ height: [8, 24, 12, 28, 8] }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.1,
                              }}
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
                          <User size={64} className="text-slate-900" />
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
                              animate={{ height: [12, 8, 28, 16, 12] }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.15,
                              }}
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
                    className="flex-shrink-0 w-12 h-12 rounded-none bg-slate-900 text-white flex items-center justify-center  transition- shadow-sm"
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
                    <div
                      ref={progressBarRef}
                      onClick={handleSeek}
                      className="h-2 bg-slate-100 rounded-none overflow-hidden cursor-pointer relative group"
                    >
                      <motion.div
                        className="h-full bg-slate-500 relative"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-none shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
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
        </div>
      </div>
    </section>
  );
}
