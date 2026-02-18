import React, { useState, useEffect } from "react";
import Vapi from "@vapi-ai/web";
import { Mic, PhoneOff, Loader2, AlertCircle, Phone, ArrowRight, CheckCircle2, User, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const N8N_WEBHOOK_URL = "https://walkermusic.app.n8n.cloud/webhook/demo";

export default function VoiceAgent() {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [callStatus, setCallStatus] = useState<
    "idle" | "connecting" | "active"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // --- NEW: Phone Call State ---
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "+1 ",
  });
  const [phoneCallStatus, setPhoneCallStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    // ... (rest of useEffect remains mostly the same, ensuring vapi is initialized)
    const vapiInstance = new Vapi(
      process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "",
    );
    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => {
      console.log("Call Started");
      setCallStatus("active");
      setErrorMessage(null);
    });

    vapiInstance.on("call-end", () => {
      console.log("Call Ended");
      setCallStatus("idle");
    });

    vapiInstance.on("error", (e: any) => {
      console.error("Vapi Error:", e);
      setCallStatus("idle");
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
    setShowPhoneInput(false); // Hide phone input if starting web call

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || "");
    } catch (err: any) {
      console.error("Connection Failed:", err);
      setCallStatus("idle");
      // ... error handling ...
      if (
        err.name === "NotReadableError" ||
        err.message?.includes("Could not start audio source")
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

  // --- NEW: Phone Call Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "phone") {
       if (!value.startsWith("+1 ")) return;
       const numberPart = value.substring(3);
       if (!/^[\d\s]*$/.test(numberPart)) return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneCallStatus("sending");
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setPhoneCallStatus("success");
        setFormData({ name: "", address: "", phone: "+1 " });
        setTimeout(() => {
          setPhoneCallStatus("idle");
          setShowPhoneInput(false);
        }, 5000);
      } else {
        setPhoneCallStatus("error");
      }
    } catch (error) {
      console.error("Phone submission error:", error);
      setPhoneCallStatus("error");
    }
  };

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center relative p-6">
      {/* Header Text */}
      <div className="text-center mb-8 space-y-2">
        <h3 className="text-3xl font-bold text-white drop-shadow-md">
          {callStatus === "active" ? "Agent Connected" : "Talk to our AI"}
        </h3>
        <p className="text-slate-400 text-sm max-w-xs mx-auto h-5">
          {callStatus === "active"
            ? "Tap the red button to hang up."
            : !showPhoneInput && "Tap the microphone to start."}
        </p>
      </div>

      {/* MAIN INTERACTION AREA */}
      <div className="relative group mb-8 w-full flex justify-center">
        <AnimatePresence mode="wait">
          {showPhoneInput ? (
            /* PHONE INPUT FORM */
            <motion.div
              key="phone-form"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-brand-card border border-white/10 p-6 rounded-2xl w-full max-w-sm shadow-2xl relative z-20"
            >
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                
                {/* Name Input */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-brand-dark border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-cyan-glow transition-colors placeholder:text-slate-600 font-sans text-sm"
                    />
                  </div>
                </div>

                {/* Address Input */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="123 Main St"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-brand-dark border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-cyan-glow transition-colors placeholder:text-slate-600 font-sans text-sm"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                      type="text"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-brand-dark border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-cyan-glow transition-colors placeholder:text-slate-600 font-mono text-sm"
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={phoneCallStatus === "sending" || phoneCallStatus === "success"}
                  className={`w-full py-3 rounded-lg font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2
                    ${phoneCallStatus === "success" 
                      ? "bg-green-500 text-white" 
                      : "bg-gradient-to-r from-cyan-glow to-blue-deep text-white hover:shadow-cyan-glow/20"
                    }
                  `}
                >
                  {phoneCallStatus === "sending" ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : phoneCallStatus === "success" ? (
                    <>
                      <CheckCircle2 size={18} /> Calling...
                    </>
                  ) : (
                    <>
                      Call Me <ArrowRight size={18} />
                    </>
                  )}
                </button>
                
                {phoneCallStatus === "error" && (
                  <p className="text-red-400 text-xs text-center">Failed. Try again.</p>
                )}
                
                <button
                  type="button"
                  onClick={() => setShowPhoneInput(false)}
                  className="text-xs text-slate-500 hover:text-white underline w-full text-center block mt-2"
                >
                  Cancel
                </button>
              </form>
            </motion.div>
          ) : (
            /* MIC BUTTON */
            <div key="mic-button" className="relative">
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
                <motion.button
                  onClick={handleHangUp}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.6)] bg-red-600 border-4 border-red-400"
                >
                  <PhoneOff className="w-10 h-10 text-white fill-current" />
                </motion.button>
              ) : (
                <motion.button
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
          )}
        </AnimatePresence>
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

      {/* TOGGLE BUTTON (Only show if not in active web call and phone input hidden) */}
      {!showPhoneInput && callStatus !== "active" && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowPhoneInput(true)}
          className="mt-4 flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-glow/30 transition-all text-sm text-slate-300 group"
        >
          <Phone size={16} className="text-cyan-glow group-hover:scale-110 transition-transform" />
          <span>Call my phone instead</span>
        </motion.button>
      )}

      {/* Visualizer / Status */}
      {!errorMessage && !showPhoneInput && (
        <div className="mt-8 h-8 flex items-end gap-1.5 justify-center">
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
