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
    aiImage: "/images/agent2.png",
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
    setIsPlaying(false);
    setProgress(0);
  }, [currentIndex]);

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
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + DEMO_CALLS.length) % DEMO_CALLS.length,
    );
  };

  return (
    <section className="py-24 bg-brand-dark border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
          Hear the Difference
        </h2>
        <p className="text-slate-400 mb-16 max-w-2xl mx-auto text-lg">
          Listen to real conversations between our AI and actual leads.
        </p>

        {/* MAIN MONITOR CONTAINER */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative bg-[#1a1a1a] p-4 md:p-8 pb-12 md:pb-16 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] border-t-2 border-white/10 border-l-2 border-r-2 border-b-[12px] border-[#222]">
            {/* SCREEN AREA */}
            <div className="relative bg-[#050505] rounded-xl overflow-hidden aspect-[16/10] md:aspect-[16/9] border-4 border-black">
              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none z-40 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-15" />

              {/* LIVE Badge */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-[#E02424] text-white px-4 py-1.5 rounded flex items-center gap-2 font-black text-sm tracking-[0.2em] shadow-[0_0_20px_rgba(224,36,36,0.5)]">
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                  LIVE CALL
                </div>
              </div>

              {/* SLIDER CONTROLS */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-[40%] -translate-y-1/2 z-50 bg-white/5 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-all hover:scale-110 border border-white/10 group"
              >
                <ChevronLeft
                  size={28}
                  className="group-hover:-translate-x-0.5 transition-transform"
                />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-[40%] -translate-y-1/2 z-50 bg-white/5 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-all hover:scale-110 border border-white/10 group"
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
                    <div className="flex-1 relative rounded-lg overflow-hidden border-4 border-[#3B82F6] shadow-[0_0_30px_rgba(59,130,246,0.3)] bg-slate-900">
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
                        <User size={64} className="text-blue-500/50" />
                      </div>
                      {isPlaying && (
                        <div className="absolute bottom-4 right-4 flex items-end gap-1 h-8">
                          {[1, 2, 3, 4].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 bg-blue-400 rounded-full"
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
                    <div className="mt-2 bg-[#245097] text-white font-black text-center py-2 md:py-3 rounded-md text-[10px] md:text-xs tracking-wider uppercase">
                      VIRTUAL ACQUISITION AGENT
                    </div>
                  </div>

                  {/* RIGHT: REAL OWNER (Human Icon only) */}
                  <div className="relative flex flex-col">
                    <div className="flex-1 relative rounded-lg overflow-hidden border-4 border-[#22C55E] shadow-[0_0_30px_rgba(34,197,94,0.3)] bg-slate-900 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-8 rounded-full bg-green-500/10 border-2 border-green-500/20">
                          <User size={80} className="text-green-500" />
                        </div>
                        <span className="text-green-500/50 font-bold text-[10px] uppercase tracking-widest">
                          Privacy Protected
                        </span>
                      </div>
                      {isPlaying && (
                        <div className="absolute bottom-4 right-4 flex items-end gap-1 h-8">
                          {[1, 2, 3, 4].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 bg-green-400 rounded-full"
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
                    <div className="mt-2 bg-[#22C55E] text-white font-black text-center py-2 md:py-3 rounded-md text-[10px] md:text-xs tracking-wider uppercase">
                      REAL HOME OWNER
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* INTEGRATED LOWER THIRD / CONTROL BAR */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black via-black/90 to-transparent z-50 flex flex-col justify-end px-8 pb-6">
                <div className="flex items-center gap-6">
                  <button
                    onClick={togglePlay}
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    {isPlaying ? (
                      <Pause size={20} fill="currentColor" />
                    ) : (
                      <Play size={20} fill="currentColor" className="ml-1" />
                    )}
                  </button>

                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                      <span className="text-white font-black text-sm tracking-widest uppercase truncate">
                        DEMO: {currentCall.title}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    {/* SEEKABLE PROGRESS BAR */}
                    <div
                      ref={progressBarRef}
                      onClick={handleSeek}
                      className="h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer relative group"
                    >
                      <motion.div
                        className="h-full bg-blue-500 relative"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MONITOR STAND */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-10 bg-[#222] rounded-b-xl shadow-2xl -z-10" />
            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-64 h-4 bg-[#1a1a1a] rounded-full shadow-2xl -z-20" />
          </div>

          {/* Pagination Dots (Below Block) */}
          <div className="mt-8 flex justify-center gap-3">
            {DEMO_CALLS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "bg-blue-500 w-10 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    : "bg-slate-700 w-2 hover:bg-slate-600"
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
