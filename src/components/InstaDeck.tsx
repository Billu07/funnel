"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Verified,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const items = [
  {
    id: 1,
    username: "autolinium_ai",
    location: "Global Dashboard",
    caption:
      "Real-time visibility. 🌍 Watch your leads move from 'Cold' to 'Qualified' instantly in our live pipeline view. #SalesAutomation #AI",
    src: "/images/dashboard/dashboard.png",
    likes: "4,281",
  },
  {
    id: 2,
    username: "autolinium_ai",
    location: "Generated Lead Pipeline",
    caption:
      "Numbers don't lie. 📈 Track conversion rates, call volume, and ROI with forensic precision. Complete transparency. #Analytics",
    src: "/images/dashboard/analytics.webp",
    likes: "5,190",
  },
  {
    id: 3,
    username: "autolinium_ai",
    location: "Call Forensics",
    caption:
      "Listen in. 🎧 Review recordings, read transcripts, and check agent notes for every single interaction. Quality control solved.",
    src: "/images/dashboard/details.webp",
    likes: "2,844",
  },

  {
    id: 4,
    username: "autolinium_ai",
    location: "Data Import",
    caption:
      "Drag. Drop. Dial. 🚀 Upload 10k+ leads via CSV and let our AI agents start calling immediately. No manual data entry. #GrowthHack",
    src: "/images/dashboard/upload.webp",
    likes: "3,502",
  },
];

export default function InstaDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Auto-play logic (Like Instagram Stories)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000); // 5 seconds per slide
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setIsLiked(false); // Reset like for next slide
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setIsLiked(false);
  };

  const activeItem = items[currentIndex];

  return (
    <div className="w-full flex justify-center py-10">
      {/* PHONE/CARD CONTAINER */}
      <div className="relative w-full max-w-md md:max-w-xl bg-black border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-cyan-900/20">
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between p-4 bg-brand-card/80 backdrop-blur-md z-20 relative border-b border-white/5">
          <div className="flex items-center gap-3">
            {/* Avatar Gradient Ring */}
            <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
              <div className="bg-black p-0.5 rounded-full">
                <div className="w-8 h-8 bg-cyan-glow rounded-full flex items-center justify-center text-brand-dark font-bold text-xs">
                  AI
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-white font-bold text-sm">
                  {activeItem.username}
                </span>
                <Verified size={12} className="text-blue-500" />
              </div>
              <p className="text-xs text-slate-400">{activeItem.location}</p>
            </div>
          </div>
          <MoreHorizontal className="text-white cursor-pointer" />
        </div>

        {/* --- PROGRESS BARS (Story Style) --- */}
        <div className="absolute top-[70px] left-0 right-0 z-20 flex gap-1 px-2">
          {items.map((_, idx) => (
            <div
              key={idx}
              className="h-1 bg-white/20 flex-1 rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{
                  width:
                    idx === currentIndex
                      ? "100%"
                      : idx < currentIndex
                        ? "100%"
                        : "0%",
                }}
                transition={{
                  duration: idx === currentIndex ? 5 : 0,
                  ease: "linear",
                }}
                className="h-full bg-white"
              />
            </div>
          ))}
        </div>

        {/* --- MAIN IMAGE CONTENT --- */}
        <div className="relative aspect-square md:aspect-[4/3] bg-brand-dark group cursor-pointer">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={activeItem.src}
                alt={activeItem.caption}
                fill
                className="object-cover object-top"
              />
            </motion.div>
          </AnimatePresence>

          {/* Tap Areas for Navigation */}
          <div
            className="absolute inset-y-0 left-0 w-1/3 z-10"
            onClick={handlePrev}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/3 z-10"
            onClick={handleNext}
          />

          {/* Like Animation Overlay */}
          <AnimatePresence>
            {isLiked && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1.5 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none"
              >
                <Heart
                  size={100}
                  className="fill-white text-white drop-shadow-2xl opacity-90"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- ACTION BAR --- */}
        <div className="p-4 bg-brand-card z-20 relative">
          <div className="flex justify-between items-center mb-3">
            <div className="flex gap-4">
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart
                  size={26}
                  className={
                    isLiked
                      ? "fill-red-500 text-red-500"
                      : "text-white hover:text-gray-300"
                  }
                />
              </motion.button>
              <MessageCircle
                size={26}
                className="text-white hover:text-gray-300 -rotate-90"
              />
              <Send
                size={26}
                className="text-white hover:text-gray-300 -rotate-12"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => setIsSaved(!isSaved)}
            >
              <Bookmark
                size={26}
                className={
                  isSaved
                    ? "fill-white text-white"
                    : "text-white hover:text-gray-300"
                }
              />
            </motion.button>
          </div>

          {/* --- LIKES & CAPTION --- */}
          <div className="space-y-2">
            <p className="text-white text-sm font-bold">
              {activeItem.likes} likes
            </p>
            <p className="text-white text-sm leading-relaxed">
              <span className="font-bold mr-2">{activeItem.username}</span>
              {activeItem.caption}
            </p>
            <p className="text-slate-500 text-xs uppercase pt-2">
              View all 12 comments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
