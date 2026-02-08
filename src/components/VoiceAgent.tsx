"use client";
import React, { useState, useEffect } from "react";
import Vapi from "@vapi-ai/web";
import { Mic, PhoneOff, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VoiceAgent() {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [callStatus, setCallStatus] = useState<
    "idle" | "connecting" | "active"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const vapiInstance = new Vapi(
      process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "",
    );
    setVapi(vapiInstance);

    // --- EVENT LISTENERS ---
    vapiInstance.on("call-start", () => {
      console.log("Call Started");
      setCallStatus("active");
      setErrorMessage(null);
    });

    vapiInstance.on("call-end", () => {
      console.log("Call Ended");
      setCallStatus("idle");
    });

    // Handle internal Vapi/Daily errors (like your NotReadableError)
    vapiInstance.on("error", (e: any) => {
      console.error("Vapi Error:", e);
      setCallStatus("idle");

      // specific check for the mic error
      if (
        JSON.stringify(e).includes("NotReadableError") ||
        JSON.stringify(e).includes("audio source")
      ) {
        setErrorMessage("Microphone is busy. Close other apps.");
      }
    });

    return () => {
      vapiInstance.stop();
    };
  }, []);

  const handleStartCall = async () => {
    if (!vapi) return;
    setErrorMessage(null);
    setCallStatus("connecting");

    try {
      // 1. Check Mic Permission manually first (Better debugging)
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // 2. Start Vapi
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || "");
    } catch (err: any) {
      console.error("Connection Failed:", err);
      setCallStatus("idle");

      if (
        err.name === "NotReadableError" ||
        err.message.includes("Could not start audio source")
      ) {
        setErrorMessage("Microphone is busy or blocked by Windows.");
      } else if (err.name === "NotAllowedError") {
        setErrorMessage("Microphone permission denied.");
      } else {
        setErrorMessage("Failed to connect. Check console.");
      }
    }
  };

  const handleHangUp = () => {
    if (!vapi) return;
    vapi.stop();
    setCallStatus("idle");
  };

  return (
    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center">
      {/* Header Text */}
      <div className="text-center mb-10 space-y-2">
        <h3 className="text-3xl font-bold text-white drop-shadow-md">
          {callStatus === "active" ? "Agent Connected" : "Talk to our AI"}
        </h3>
        <p className="text-slate-400 text-sm max-w-xs mx-auto">
          {callStatus === "active"
            ? "Tap the red button to hang up."
            : "Tap the microphone to start."}
        </p>
      </div>

      {/* BUTTON CONTAINER */}
      <div className="relative group">
        {/* Active Ring */}
        <AnimatePresence>
          {callStatus === "active" && (
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0.5, 0], scale: 1.5 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-red-500"
            />
          )}
        </AnimatePresence>

        {callStatus === "active" ? (
          /* HANG UP BUTTON */
          <motion.button
            key="hangup"
            onClick={handleHangUp}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.6)] bg-red-600 border-4 border-red-400"
          >
            <PhoneOff className="w-10 h-10 text-white fill-current" />
          </motion.button>
        ) : (
          /* START BUTTON */
          <motion.button
            key="start"
            onClick={handleStartCall}
            disabled={callStatus === "connecting"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] border-4 border-white/10 transition-colors
              ${callStatus === "connecting" ? "bg-slate-700 cursor-wait" : "bg-cyan-glow hover:bg-cyan-400"}
              ${errorMessage ? "border-red-500 shadow-red-500/20" : ""}
            `}
          >
            {callStatus === "connecting" ? (
              <Loader2 className="w-10 h-10 animate-spin text-white" />
            ) : (
              <Mic className="w-10 h-10 text-brand-dark" />
            )}
          </motion.button>
        )}
      </div>

      {/* ERROR MESSAGE DISPLAY */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center gap-2 text-red-400 bg-red-950/30 px-4 py-2 rounded-lg border border-red-500/20"
        >
          <AlertCircle size={16} />
          <span className="text-sm font-medium">{errorMessage}</span>
        </motion.div>
      )}

      {/* Visualizer / Status */}
      {!errorMessage && (
        <div className="mt-10 h-8 flex items-end gap-1.5 justify-center">
          {callStatus === "active" ? (
            [1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                animate={{ height: [8, 32, 8] }}
                transition={{
                  duration: 0.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"
              />
            ))
          ) : callStatus === "connecting" ? (
            <div className="text-cyan-glow text-sm animate-pulse">
              Connecting...
            </div>
          ) : (
            <div className="text-slate-600 text-xs uppercase tracking-[0.2em] font-medium">
              Ready
            </div>
          )}
        </div>
      )}
    </div>
  );
}
