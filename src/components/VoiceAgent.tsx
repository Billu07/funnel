"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { Mic, PhoneOff, Loader2, AlertCircle, Phone, ArrowRight, CheckCircle2, User, MapPin } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { formatUsPhoneInput } from "@/lib/funnel-validation";
import { trackFunnelEvent } from "@/lib/analytics";

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

export default function VoiceAgent() {
  const shouldReduceMotion = useReducedMotion();
  const vapiPublicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
  const isVoiceDemoConfigured = Boolean(vapiPublicKey && assistantId);
  const vapi = useMemo(
    () => (vapiPublicKey ? new Vapi(vapiPublicKey) : null),
    [vapiPublicKey],
  );

  const [callStatus, setCallStatus] = useState<"idle" | "connecting" | "active">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const phoneStatusResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- Phone Call State ---
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "+1",
    website: "",
  });
  const [phoneCallStatus, setPhoneCallStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [phoneCallError, setPhoneCallError] = useState<string | null>(null);

  useEffect(() => {
    if (!vapi) return;

    vapi.on("call-start", () => {
      setCallStatus("active");
      setErrorMessage(null);
    });

    vapi.on("call-end", () => {
      setCallStatus("idle");
    });

    vapi.on("error", (e: unknown) => {
      console.error("Vapi Error:", e);
      setCallStatus("idle");
      if (JSON.stringify(e).includes("NotReadableError") || JSON.stringify(e).includes("audio source")) {
        setErrorMessage("Microphone is busy. Close other apps.");
      }
    });

    return () => {
      vapi.stop();
    };
  }, [vapi]);

  useEffect(() => {
    return () => {
      if (phoneStatusResetTimerRef.current) {
        clearTimeout(phoneStatusResetTimerRef.current);
      }
    };
  }, []);

  const handleStartCall = async () => {
    if (!vapi || !assistantId || !isVoiceDemoConfigured) {
      setErrorMessage("Live voice demo is temporarily unavailable.");
      trackFunnelEvent("voice_demo_start_failed", {
        reason: "not_configured",
      });
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setErrorMessage("Browser does not support microphone access.");
      trackFunnelEvent("voice_demo_start_failed", {
        reason: "unsupported_browser",
      });
      return;
    }

    trackFunnelEvent("voice_demo_start_clicked");
    setErrorMessage(null);
    setCallStatus("connecting");
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await vapi.start(assistantId);
    } catch (err: unknown) {
      console.error("Connection Failed:", err);
      setCallStatus("idle");
      const errorObj = err as { name?: string; message?: string };
      if (errorObj.name === "NotReadableError" || errorObj.message?.includes("Could not start audio source")) {
        setErrorMessage("Microphone is busy or blocked by Windows.");
      } else if (errorObj.name === "NotAllowedError") {
        setErrorMessage("Microphone permission denied.");
      } else {
        setErrorMessage("Failed to connect. Check console.");
      }
      trackFunnelEvent("voice_demo_start_failed", {
        reason: errorObj.name || "unknown_error",
      });
    }
  };

  const handleHangUp = () => {
    if (!vapi) return;
    trackFunnelEvent("voice_demo_ended");
    vapi.stop();
    setCallStatus("idle");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setFormData((prev) => ({ ...prev, phone: formatUsPhoneInput(value) }));
      return;
    }

    const field = name as keyof typeof formData;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneCallError(null);
    setPhoneCallStatus("sending");
    trackFunnelEvent("demo_call_submit_clicked");

    try {
      const response = await fetch("/api/demo-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setPhoneCallStatus("success");
        trackFunnelEvent("demo_call_submit_succeeded");
        setFormData({ name: "", address: "", phone: "+1", website: "" });

        if (phoneStatusResetTimerRef.current) {
          clearTimeout(phoneStatusResetTimerRef.current);
        }
        phoneStatusResetTimerRef.current = setTimeout(() => {
          setPhoneCallStatus("idle");
        }, 5000);
      } else {
        const result = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        setPhoneCallError(result?.error || "Submission failed. Please try again.");
        setPhoneCallStatus("error");
        trackFunnelEvent("demo_call_submit_failed", {
          status: response.status,
        });
      }
    } catch (error) {
      console.error("Phone submission error:", error);
      setPhoneCallError("Network error. Please try again.");
      setPhoneCallStatus("error");
      trackFunnelEvent("demo_call_submit_failed", {
        status: "network_error",
      });
    }
  };

  return (
    <motion.div 
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start max-w-5xl mx-auto">
        
        {/* === LEFT CARD: WEB CALL (Mic) === */}
        <motion.div 
          variants={itemVariants}
          className="bg-white border border-slate-200 rounded-sm p-6 md:p-8 flex flex-col items-center justify-center min-h-[350px] md:min-h-[400px] relative overflow-hidden shadow-sm shadow-slate-200/50 hover:shadow-slate-300/50 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
          
          <div className="text-center mb-8 md:mb-10 relative z-10">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 mb-2">Talk to AI Now</h3>
            <p className="text-slate-700 text-sm">Use your microphone to chat instantly.</p>
          </div>

          <div className="relative z-10">
            <AnimatePresence>
              {callStatus === "active" && (
                <motion.div
                  initial={{ opacity: 0, scale: 1 }}
                  animate={
                    shouldReduceMotion
                      ? { opacity: 0.15, scale: 1 }
                      : { opacity: [0.3, 0], scale: 1.5 }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 1.5, repeat: Infinity }
                  }
                  className="absolute inset-0 rounded-none bg-slate-500"
                />
              )}
            </AnimatePresence>

            {callStatus === "active" ? (
              <motion.button
                onClick={handleHangUp}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                aria-label="End live voice demo call"
                className="relative z-10 w-24 h-24 rounded-none flex items-center justify-center shadow-sm bg-slate-500 text-white border-4 border-slate-200"
              >
                <PhoneOff className="w-10 h-10 fill-current" />
              </motion.button>
            ) : (
              <motion.button
                onClick={handleStartCall}
                disabled={callStatus === "connecting" || !isVoiceDemoConfigured}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                aria-label={
                  callStatus === "connecting"
                    ? "Connecting live voice demo"
                    : "Start live voice demo call"
                }
                className={`
                  relative z-10 w-24 h-24 rounded-none flex items-center justify-center shadow-sm border-4 transition-colors
                  ${callStatus === "connecting" || !isVoiceDemoConfigured
                    ? "bg-slate-100 border-slate-200 cursor-wait text-slate-400" 
                    : "bg-slate-900 hover:bg-black border-slate-200 text-white"}
                `}
              >
                {callStatus === "connecting" ? (
                  <Loader2 className="w-10 h-10 animate-spin" />
                ) : (
                  <Mic className="w-10 h-10" />
                )}
              </motion.button>
            )}
          </div>

          {errorMessage && (
            <div
              role="alert"
              aria-live="assertive"
              className="mt-6 flex items-center gap-2 text-red-600 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 relative z-10"
            >
              <AlertCircle size={16} />
              <span className="text-sm font-medium">{errorMessage}</span>
            </div>
          )}

           {/* Visualizer / Status */}
          {!errorMessage && (
            <div
              aria-live="polite"
              className="mt-8 h-8 flex items-end gap-1.5 justify-center relative z-10"
            >
              {callStatus === "active" ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    animate={shouldReduceMotion ? { height: 8 } : { height: [8, 32, 8] }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.5 + i * 0.1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                    className="w-1.5 bg-slate-500 rounded-full"
                  />
                ))
              ) : callStatus === "connecting" ? (
                <div className="text-slate-900 text-sm font-medium animate-pulse">
                  Connecting...
                </div>
              ) : (
                <div className="text-slate-400 text-xs uppercase tracking-widest font-medium">
                  Ready
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* === RIGHT CARD: PHONE CALL FORM === */}
        <motion.div 
          variants={itemVariants}
          className="bg-white border border-slate-200 rounded-sm p-8 min-h-[400px] relative overflow-hidden shadow-sm shadow-slate-200/50 hover:shadow-slate-300/50 transition-all flex flex-col justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
          
          <div className="text-center mb-6 relative z-10">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">Get a Phone Call</h3>
            <p className="text-slate-700 text-sm">We&apos;ll call your mobile number instantly.</p>
          </div>

          <form onSubmit={handlePhoneSubmit} className="space-y-4 relative z-10 w-full max-w-sm mx-auto">
            <div>
              <label htmlFor="callback-name" className="text-xs uppercase tracking-widest text-slate-700 font-semibold block mb-1">
                Your Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  id="callback-name"
                  type="text"
                  name="name"
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:border-slate-200 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400 text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="callback-address" className="text-xs uppercase tracking-widest text-slate-700 font-semibold block mb-1">
                Address (for context)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  id="callback-address"
                  type="text"
                  name="address"
                  required
                  minLength={5}
                  maxLength={200}
                  autoComplete="street-address"
                  placeholder="123 Main St"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:border-slate-200 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400 text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="callback-phone" className="text-xs uppercase tracking-widest text-slate-700 font-semibold block mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  id="callback-phone"
                  type="tel"
                  name="phone"
                  required
                  inputMode="tel"
                  maxLength={16}
                  autoComplete="tel"
                  placeholder="+1 555 123 4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:border-slate-200 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400 font-mono text-sm"
                />
              </div>
            </div>

            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={handleInputChange}
              className="hidden"
              aria-hidden="true"
            />

            <button
              type="submit"
              disabled={phoneCallStatus === "sending" || phoneCallStatus === "success"}
              className={`w-full py-3 rounded-lg font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 mt-2
                ${phoneCallStatus === "success" 
                  ? "bg-slate-500 text-white cursor-default" 
                  : "bg-slate-900 text-white hover:bg-slate-800 hover:scale-[1.02]"
                }
                disabled:opacity-70 disabled:cursor-not-allowed
              `}
            >
              {phoneCallStatus === "sending" ? (
                <Loader2 className="animate-spin" size={18} />
              ) : phoneCallStatus === "success" ? (
                <>
                  <CheckCircle2 size={18} /> Call Initiated
                </>
              ) : (
                <>
                  Call Me Now <ArrowRight size={18} />
                </>
              )}
            </button>

            {phoneCallStatus === "error" && (
              <p
                role="alert"
                aria-live="assertive"
                className="text-slate-900 text-xs text-center mt-2 font-medium"
              >
                {phoneCallError || "Submission failed. Please try again."}
              </p>
            )}
            {phoneCallStatus === "success" && (
              <p aria-live="polite" className="text-slate-900 text-xs text-center mt-2 font-medium">
                Demo call request accepted. You should receive a call shortly.
              </p>
            )}
          </form>
        </motion.div>

      </div>
    </motion.div>
  );
}
