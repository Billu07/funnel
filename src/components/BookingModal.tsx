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
          {/* 1. BACKDROP (Blurry Dark Overlay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-[60] cursor-pointer"
          />

          {/* 2. MODAL CONTENT */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl h-[85vh] bg-brand-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              {/* Header / Close Button */}
              <div className="absolute top-0 right-0 p-4 z-10">
                <button
                  onClick={onClose}
                  className="bg-brand-dark/50 hover:bg-red-500/80 hover:text-white text-slate-400 p-2 rounded-full transition-colors backdrop-blur-md"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Calendar Iframe */}
              <iframe
                src={calendarUrl}
                className="w-full h-full border-none bg-white" // bg-white ensures calendar looks correct
                title="Book Strategy Call"
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
