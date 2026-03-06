"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  calendarUrl: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  calendarUrl,
}: BookingModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] cursor-pointer"
          />

          {/* 2. MODAL CONTENT */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
            >
              {/* Premium Header Bar */}
              <div className="flex items-center justify-between px-8 py-4 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                    Schedule Your Strategy Session
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-200 text-slate-500 hover:text-slate-900 rounded-full transition-all duration-200 active:scale-95"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Calendar Container */}
              <div className="flex-1 w-full bg-white relative">
                <iframe
                  src={calendarUrl}
                  className="w-full h-full border-none"
                  title="Book Strategy Call"
                />
              </div>

              {/* Bottom Accent */}
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-cyan-glow to-blue-600" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
