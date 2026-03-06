"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import VoiceAgent from "@/components/VoiceAgent";
import DashboardFeatures from "@/components/DashboardFeatures";
import ClientTrustBlock from "@/components/ClientTrustBlock";
import ConversationDemo from "@/components/ConversationDemo";
import ProcessFlow from "@/components/ProcessFlow";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookingModal from "@/components/BookingModal";
import ProblemsSection from "@/components/ProblemsSection";
import FloatingElement from "@/components/FloatingElement";
import AnimatedDemoBg from "@/components/AnimatedDemoBg";
import CustomVideoPlayer from "@/components/CustomVideoPlayer";
import { motion } from "framer-motion";
import AnimatedHeader from "@/components/AnimatedHeader";
import { Check, ArrowRight, Menu, X, Mail, Linkedin } from "lucide-react";

// 👈 Your Cal.com Link
const CALENDAR_LINK = "https://cal.com/autolinium-bd6vkq";

// 🔴 REPLACE THIS WITH YOUR N8N WEBHOOK URL
const N8N_WEBHOOK_URL = "https://walkermusic.app.n8n.cloud/webhook/demo"; // Fallback demo webhook, adjust as necessary

export default function Home() {
  // 👈 State to control the scroll behavior
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👈 State to control the Modal
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper function to open modal
  const openBooking = () => {
    setIsBookingOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // ================= FORM STATE LOGIC (New) =================
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    businessType: "",
    knowledgeBase: "",
    volume: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("success");
        setFormData({
          fullName: "",
          email: "",
          company: "",
          businessType: "",
          knowledgeBase: "",
          volume: "",
          message: "",
        }); // Clear form

        // Optional: Reset success message after 5 seconds
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setFormStatus("error");
    }
  };
  // ==========================================================

  // Animation variants from inspiration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <main className="bg-slate-50 text-slate-900 min-h-screen font-sans selection:bg-cyan-glow selection:text-white overflow-clip scrollbar-hide">
      {/* ================= BOOKING MODAL COMPONENT ================= */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        calendarUrl={CALENDAR_LINK}
      />

      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200 py-2 shadow-sm"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a
            href="https://autolinium.com"
            className="flex items-center gap-3 group"
          >
            {/* Logo Image */}
            <div className="relative w-10 h-10">
              <Image
                src="/images/logo.png"
                alt="Voicium Logo"
                fill
                sizes="64px"
                className={`object-contain transition-all duration-300 ${!isScrolled && "brightness-0"}`}
              />
            </div>
            <span
              className={`text-2xl font-sans font-bold tracking-tight transition-colors ${
                isScrolled
                  ? "bg-clip-text text-transparent bg-gradient-to-r from-cyan-glow to-blue-deep"
                  : "text-black"
              } group-hover:opacity-80`}
            >
              Voicium
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "How it Works", "Pricing", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                className={`text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-slate-700 hover:text-cyan-glow"
                    : "text-slate-800 hover:text-black"
                }`}
              >
                {item === "HowitWorks" ? "How it Works" : item}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <button
              onClick={openBooking}
              className={`px-6 py-2 rounded-lg font-sans font-semibold transition-all   ${
                isScrolled
                  ? "bg-blue-900 text-white hover:bg-blue-800 shadow-lg"
                  : "bg-blue-900 text-white hover:bg-blue-800"
              }`}
            >
              Book Strategy Call
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors ${
              isScrolled
                ? "text-slate-700 hover:text-slate-900"
                : "text-slate-800 hover:text-black"
            }`}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-[#d2d2d7] p-6 flex flex-col gap-6 shadow-sm shadow-slate-200/50 animate-fade-in-down">
            {["Features", "How it Works", "Pricing", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-700 hover:text-cyan-glow transition-colors"
              >
                {item === "HowitWorks" ? "How it Works" : item}
              </a>
            ))}
            <button
              onClick={openBooking}
              className="w-full bg-blue-900 text-white hover:bg-blue-800 px-6 py-4 rounded-lg font-sans font-semibold hover:shadow-[0_0_20px_rgba(30,58,138,0.4)] transition-all"
            >
              Book Strategy Call
            </button>
          </div>
        )}
      </nav>

      {/* ================= HERO SECTION ================= */}
      <header className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image from Inspiration - Now using local copy to bypass remotePatterns config issue */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/inspiration_hero_bg.webp"
            alt="Voicium Hero Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-white/30 z-10" />

        {/* Content Container */}
        <motion.div
          className="relative z-20 max-w-6xl mx-auto px-6 lg:px-12 py-20 lg:py-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Headline with Color Highlights */}
          <div className="mb-8 lg:mb-12 overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] text-black text-center tracking-tight"
            >
              Stop Calling{" "}
              <span className="inline-block bg-[#FF1322] text-white px-4 py-2 rounded-xl mx-1 md:mx-2 rotate-[-1deg] shadow-lg">
                Dead
              </span>{" "}
              Leads
            </motion.h1>
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] text-black text-center tracking-tight"
            >
              Talk Only to{" "}
              <span className="text-[#0000FF] font-extrabold">Motivated</span>{" "}
              Ones
            </motion.h1>
          </div>

          {/* Subheading */}
          <motion.div variants={itemVariants} className="mb-12 lg:mb-16">
            <p className="text-lg sm:text-xl md:text-2xl text-slate-700 max-w-3xl leading-relaxed mx-auto text-center font-medium">
              Our AI calls your real estate leads, analyzes every conversation,
              and delivers highly qualified prospects directly to your pipeline.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 lg:gap-8 justify-center items-center"
          >
            <button
              onClick={openBooking}
              className="w-full sm:w-auto px-10 py-5 text-lg font-bold bg-[#003375] hover:bg-blue-800 text-white rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Book a Live Demo
            </button>
            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto px-10 py-5 text-lg font-bold border-2 border-[#0000FF] text-[#0000FF] hover:bg-blue-50 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              Start 2 Days Free Trial <ArrowRight size={20} />
            </button>
          </motion.div>
        </motion.div>

        {/* Subtle Bottom Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-4"
        >
          <div className="w-px h-12 bg-gradient-to-b from-black/0 via-black/20 to-black/0" />
          <span className="text-[9px] uppercase tracking-[0.5em] text-black/40 font-bold">
            Scroll
          </span>
        </motion.div>
      </header>

      {/* ================= 2. PROBLEM SECTION ================= */}
      <ProblemsSection />

      {/* ================= 3. HOW IT WORKS (ProcessFlow - The Solution) ================= */}
      <section
        id="howitworks"
        className="pt-12 lg:pt-16 bg-white border-b border-gray-200 relative"
      >
        {/* Decorative Top-Right Accent - Building Blocks */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <Image
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663063245286/4NbDCkjGg5zEcuxt8PVxUE/svg-accent-building-blocks-EaHmfa6vaxmYj4pkwMC5Gw.webp"
            alt="Decorative building blocks"
            width={400}
            height={400}
            className="absolute top-20 right-10 animate-[breathe_6s_ease-in-out_infinite_alternate] w-64 h-64 md:w-96 md:h-96"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            className="text-center mb-20 lg:mb-24"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Voicium Logo in "What we have brought" section */}
            <a
              href="https://autolinium.com"
              className="block relative w-16 h-16 mx-auto mb-6 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/logo.png"
                alt="Voicium Logo"
                fill
                sizes="64px"
                className="object-contain"
              />
            </a>
            <motion.p
              variants={itemVariants}
              className="text-sm lg:text-base font-semibold text-blue-600 uppercase tracking-wider mb-3"
            >
              Our Offered Solution
            </motion.p>
            <AnimatedHeader
              text="We completely flip the funnel."
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight"
            />
            <motion.p 
              variants={itemVariants}
              className="text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            >
              Instead of you calling <span className="text-red-600 font-bold">80-100 cold leads</span> to find 3 prospects, our AI handles the calling, so you <span className="text-blue-600 font-bold">only talk to the 3</span>. Voicium doesn&apos;t just <span className="text-blue-600 font-bold">QUALIFY</span> the leads you already have. <span className="text-blue-600 font-bold">We FIND them for you.</span>
            </motion.p>          </motion.div>
        </div>
        {/* The New Flow Component */}
        <ProcessFlow />
      </section>

      {/* ================= TRUST BLOCK SECTION ================= */}
      <ClientTrustBlock />

      {/* ================= TESTIMONIALS SECTION ================= */}
      <TestimonialsSection />

      {/* ================= CONVERSATION DEMO SECTION ================= */}
      <ConversationDemo />

      {/* ================= 4. DASHBOARD FEATURES SECTION ================= */}
      <section
        id="features"
        className="py-32 bg-slate-50 border-y border-[#e5e5ea] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              variants={itemVariants}
              className="text-sm lg:text-base font-semibold text-blue-600 uppercase tracking-wider mb-3"
            >
              Powerful Analytics
            </motion.p>
            <AnimatedHeader
              text="Everything In One Dashboard"
              className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-gray-900"
            />
            <motion.p variants={itemVariants} className="text-slate-700">
              Upload leads, see motivation scores, and track your pipeline.
            </motion.p>
          </motion.div>

          <DashboardFeatures />
        </div>
      </section>

      {/* ================= 5. DEMO VIDEO SECTION ================= */}
      <section className="py-32 bg-slate-50 border-y border-[#e5e5ea] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <AnimatedHeader
              text="See how it works"
              className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900"
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left: Video Player (Constrained to Mobile Shape) */}
            <motion.div 
              className="relative w-full max-w-[300px] mx-auto md:ml-0"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="relative w-full aspect-[9/16] rounded-[2.5rem] overflow-hidden border-[8px] border-white shadow-2xl bg-white ring-1 ring-slate-200">
                <div className="absolute inset-0 border border-slate-100 rounded-[2rem] z-10 pointer-events-none" />
                <CustomVideoPlayer
                  videoSrc="/videos/hero-video-2.mp4"
                  posterSrc="/images/frame2.webp"
                />
              </div>
            </motion.div>

            {/* Right: CTA Text & Button */}
            <motion.div
              className="flex-1 flex flex-col items-center text-center h-full justify-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <AnimatedHeader
                text="Call your Qualified Sellers within 24 Hours. Need Clarity?"
                className="text-4xl lg:text-5xl font-bold tracking-tight mb-12 text-gray-900 leading-tight"
              />

              <motion.div variants={itemVariants} className="flex justify-center w-full">
                <button 
                  onClick={openBooking}
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-xl text-lg font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl group"
                >
                  Let&apos;s have a talk <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= 6. VOICE AGENT (Audio Demos) ================= */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Grid Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              variants={itemVariants}
              className="text-sm lg:text-base font-semibold text-blue-600 uppercase tracking-wider mb-3"
            >
              Interactive Agent
            </motion.p>
            <AnimatedHeader
              text="Experience the Intelligence"
              className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-gray-900"
            />
            <motion.p variants={itemVariants} className="text-slate-700 mb-12">
              Talk to our AI live, or get an instant call to your phone.
            </motion.p>
          </motion.div>

          {/* New Side-by-Side Layout handled inside VoiceAgent */}
          <VoiceAgent />
        </div>
      </section>

      {/* ================= 7. BENEFITS SECTION ================= */}
      <section className="py-32 bg-slate-50 border-y border-[#e5e5ea] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* MASKED IMAGE: Robot Lady - Enhanced with Premium Framing */}
            <div className="relative h-[500px] w-full group">
              <div className="absolute -inset-4 bg-blue-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              <FloatingElement>
                <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border-[6px] border-white shadow-2xl group-hover:border-blue-500/20 transition-all duration-700">
                  {/* Internal Blue Frame */}
                  <div className="absolute inset-0 border border-blue-600/10 rounded-xl z-10 pointer-events-none" />

                  {/* Linear Gradient Mask to fade bottom into background */}
                  <div className="relative w-full h-[500px] [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]">
                    <Image
                      src="/images/solution-robot.png"
                      alt="Smart Calling Agent"
                      fill
                      className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                    />
                  </div>

                  {/* Subtle Blue Glow Overlay */}
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/[0.05] transition-colors duration-700 pointer-events-none" />
                </div>
              </FloatingElement>

              {/* Corner Accents */}
              <div className="absolute -top-2 -right-2 w-16 h-16 border-t-2 border-r-2 border-blue-500/20 rounded-tr-3xl" />
              <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-2 border-l-2 border-blue-500/20 rounded-bl-3xl" />
            </div>

            <motion.div
              className="flex-1"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p
                variants={itemVariants}
                className="text-sm lg:text-base font-semibold text-blue-600 uppercase tracking-wider mb-3"
              >
                The Transformation
              </motion.p>
              <AnimatedHeader
                text="What Changes After Using This"
                className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900 !text-left"
              />
              <motion.p
                variants={itemVariants}
                className="text-lg text-slate-700 mb-10"
              >
                &quot;We sell results, not just software.&quot;
              </motion.p>

              <div className="space-y-4">
                {[
                  "No more cold calling all day",
                  "Only real conversations with interested leads",
                  "Clear pipeline. Real data. More deals.",
                  "Automated follow-up sequences",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check
                        className="w-4 h-4 text-slate-900"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="text-lg text-slate-900">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 9. PRICING ================= */}
      <section
        id="pricing"
        className="py-32 px-6 bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              variants={itemVariants}
              className="text-sm lg:text-base font-semibold text-blue-600 uppercase tracking-wider mb-3"
            >
              Simple Plans
            </motion.p>
            <AnimatedHeader
              text="Scalable Pricing"
              className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900"
            />
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-8 items-stretch"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Starter */}
            <motion.div
              variants={itemVariants}
              className="p-10 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col hover:border-blue-500/30 transition-all hover:shadow-xl group"
            >
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-sans">
                Starter Plan
              </h3>
              <div className="text-4xl font-bold mt-6 mb-2 text-slate-900 font-sans">
                $990
                <span className="text-lg font-normal text-slate-500">/mo</span>
              </div>
              <p className="text-sm text-slate-500 mb-10 font-sans">
                (No Setup Charge)
              </p>
              <ul className="space-y-5 mb-10 text-slate-700 flex-1 font-sans">
                {[
                  "AI Calling Engine",
                  "Unlimited Calls (Mon-Sat)",
                  "Daily Transcription Reports",
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-600" strokeWidth={3} />
                    <span className="text-base font-medium">{text}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={openBooking}
                className="w-full py-4 border-2 border-slate-900 text-slate-900 rounded-lg font-bold hover:bg-slate-900 hover:text-white transition-all duration-300 font-sans"
              >
                Book a Live Demo
              </button>
            </motion.div>

            {/* Growth - Featured */}
            <motion.div
              variants={itemVariants}
              className="p-10 rounded-2xl bg-white border-2 border-[#0000FF] relative transform lg:-translate-y-6 shadow-2xl flex flex-col"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0000FF] text-white text-xs font-bold px-6 py-2 rounded-full uppercase tracking-widest font-sans">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mt-2 font-sans">
                Growth Plan
              </h3>
              <div className="text-5xl font-bold mt-6 mb-2 text-[#0000FF] font-sans">
                $1770
                <span className="text-lg font-normal text-slate-500">/mo</span>
              </div>
              <p className="text-sm text-blue-600/80 mb-10 font-medium font-sans">
                (No Setup Charge)
              </p>
              <ul className="space-y-5 mb-10 text-slate-700 flex-1 font-sans">
                {[
                  "Everything in Starter",
                  "Lead Scoring + Dashboard",
                  "CRM + Analytics",
                  "Full Automation Workflow",
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-600" strokeWidth={3} />
                    <span className="text-base font-semibold">{text}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToContact}
                className="w-full py-5 bg-[#0000FF] text-white rounded-lg font-bold hover:bg-blue-800 transition-all duration-300 shadow-lg shadow-blue-500/20 font-sans"
              >
                Start 2-Day Free Trial
              </button>
            </motion.div>

            {/* Scale */}
            <motion.div
              variants={itemVariants}
              className="p-10 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col hover:border-blue-500/30 transition-all hover:shadow-xl group"
            >
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-sans">
                Enterprise
              </h3>
              <div className="text-4xl font-bold mt-6 mb-2 text-slate-900 font-sans">
                Custom
              </div>
              <p className="text-sm text-slate-500 mb-10 font-sans">
                For large teams
              </p>
              <ul className="space-y-5 mb-10 text-slate-700 flex-1 font-sans">
                {[
                  "Custom Workflows",
                  "Dedicated Setup",
                  "Multi-team Usage",
                  "Priority Support",
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-600" strokeWidth={3} />
                    <span className="text-base font-medium">{text}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={openBooking}
                className="w-full py-4 border-2 border-slate-900 text-slate-900 rounded-lg font-bold hover:bg-slate-900 hover:text-white transition-all duration-300 font-sans"
              >
                Contact Sales
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= 10. OBJECTION HANDLING (FAQ) ================= */}
      <section id="faq" className="py-32 relative overflow-hidden bg-white">
        {/* Decorative Right Accent */}
        <Image
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663063245286/4NbDCkjGg5zEcuxt8PVxUE/svg-accent-abstract-nodes-gqMJYkDG3XrGJ6wUYRmAwK.webp"
          alt="Decorative nodes accent"
          width={400}
          height={400}
          className="absolute top-10 -left-5 animate-[breathe_8s_ease-in-out_infinite_alternate-reverse] pointer-events-none z-0 w-64 h-64 md:w-96 md:h-96"
        />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              variants={itemVariants}
              className="text-sm lg:text-base font-semibold text-blue-600 uppercase tracking-wider mb-3"
            >
              Clear Answers
            </motion.p>
            <AnimatedHeader
              text="Frequently Asked Questions"
              className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900"
            />
          </motion.div>
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                q: "On average, how many leads does Voicium qualify per campaign?",
                a: "Qualifying rates vary by lead quality, but on average, our users see a 10-15% qualification rate from raw data. Because the AI can handle thousands of dials simultaneously, the sheer volume of qualified leads delivered daily far exceeds what a traditional human team can produce.",
              },
              {
                q: "What kind of results have other real estate investors seen?",
                a: "Investors using Voicium report a 4x increase in lead-to-deal conversion rates. By eliminating the 'speed to lead' gap and ensuring every lead is touched immediately, teams are closing deals that previously would have rotted in their CRM.",
              },
              {
                q: "How is the AI actually having good conversations and not scaring leads away?",
                a: "Our AI uses advanced Natural Language Processing (NLP) with low-latency response times (under 500ms). It doesn't follow a rigid script; it understands context, nuances, and even objections, responding with a natural, human-like cadence that builds trust rather than sounding like a typical 'robocall'.",
              },
              {
                q: "Can I listen to actual call recordings before I sign up?",
                a: "Absolutely. We believe in total transparency. You can listen to live demos on our site, and during your personalized demo, we can play back recordings from various industries so you can hear exactly how the AI handles real-world scenarios.",
              },
              {
                q: "What happens if a lead doesn't answer? Does Voicium leave a voicemail?",
                a: "Yes. If the system detects a voicemail box, it can leave a personalized, high-conversion message. It also tracks non-answers and can automatically re-attempt the call at a later time based on your custom cadence settings.",
              },
              {
                q: "How does the AI know when a lead is motivated versus just being polite?",
                a: "The AI is trained on thousands of real estate conversations. It looks for specific 'intent markers'—like urgency, specific property details, and openness to an offer—rather than just surface-level politeness. Our sentiment analysis engine scores each lead based on these deep insights.",
              },
              {
                q: "Can I customize what the AI says on the call?",
                a: "Yes. You have full control over the 'Knowledge Base' and the primary objectives of the call. Whether you want to focus on distressed sellers, creative finance, or retail listings, you can tailor the AI's persona and goals to match your specific strategy.",
              },
              {
                q: "What languages does the AI support?",
                a: "Voicium currently supports fluent conversations in over 20 languages, including English, Spanish, French, and German. It can even detect the lead's language automatically and switch mid-conversation if necessary.",
              },
              {
                q: "Can I use my own lead list, or do I have to use yours?",
                a: "You can upload your own lead lists (CSV/XLS) directly into the platform. We also offer integrations with popular skip-tracing services and data providers if you need help sourcing fresh, high-intent leads.",
              },
              {
                q: "What happens after my 2-day free trial? Am I automatically charged?",
                a: "No. We don't believe in 'gotcha' billing. At the end of your 2-day trial, the system will pause. You'll have the option to choose a plan and activate your account manually if you're satisfied with the results.",
              },
              {
                q: "What's included in the free trial? Can I run a real campaign?",
                a: "The 2-day trial includes a fully functional AI agent customized for your business and a limited number of outbound minutes. You can upload a segment of your own leads and see the AI in action, qualifying real prospects in real-time.",
              },
              {
                q: "What happens if someone asks to be removed during the call?",
                a: "The AI instantly recognizes 'Do Not Call' (DNC) requests. It will politely end the call and automatically move that lead to your internal DNC list, ensuring they are never contacted by the system again.",
              },
              {
                q: "Are you compliant with state-level regulations like California and Texas?",
                a: "Yes. Voicium is built with a 'Compliance-First' architecture. We adhere to TCPA guidelines, state-specific calling hours, and data privacy regulations like CCPA to ensure your outreach is both effective and legally sound.",
              },
              {
                q: "Who do I contact if something goes wrong?",
                a: "All users have access to our dedicated support team via email and live chat. Growth and Enterprise plans also include a dedicated account manager and priority technical support with guaranteed response times.",
              },
              {
                q: "Do you offer onboarding help, or do I figure it out myself?",
                a: "Every new user receives a 'Success Kickoff' session where we help you configure your first agent, upload your leads, and set up your CRM integrations. We're invested in your success from day one.",
              },
              {
                q: "What happens to my data? Is it stored securely?",
                a: "Your data is encrypted both at rest and in transit using bank-grade AES-256 encryption. We never sell your lead data, and your call recordings are stored on secure, private servers that only you can access.",
              },
              {
                q: "Can I cancel anytime and get my data back?",
                a: "Yes. Our plans are month-to-month with no long-term contracts. If you decide to cancel, you can export all your leads, call recordings, and transcriptions at any time before your account closes.",
              },
            ].map((faq, i) => (
              <motion.details
                key={i}
                variants={itemVariants}
                className="group bg-white border border-slate-200 rounded-xl open:border-blue-500/30 transition-all"
              >
                <summary className="flex items-center justify-between p-8 cursor-pointer font-bold text-lg list-none text-slate-900 font-sans">
                  {faq.q}
                  <span className="transition group-open:rotate-180 text-blue-600">
                    <ArrowRight className="rotate-90" />
                  </span>
                </summary>
                <div className="px-8 pb-8 text-slate-700 leading-relaxed font-medium font-sans">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= 11. FINAL CTA SECTION & FORM ================= */}
      <section
        id="contact"
        className="py-32 bg-slate-50 relative overflow-hidden"
      >
        {/* Decorative Bottom Accent - Structural Framework */}
        <Image
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663063245286/4NbDCkjGg5zEcuxt8PVxUE/svg-accent-structural-framework-jr7Hx5UibBvkmRA3Gvrmqr.webp"
          alt="Decorative structural framework"
          width={600}
          height={200}
          className="absolute bottom-5 -left-15 animate-[breathe_7s_ease-in-out_infinite_alternate] pointer-events-none z-0 w-full md:w-1/2 object-cover"
        />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">
          {/* Left: CTA Text */}
          <motion.div
            className="text-left"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 text-sm font-bold mb-8 font-sans"
            >
              <span className="animate-pulse h-2.5 w-2.5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]"></span>
              2-Day Free Trial
            </motion.div>
            <AnimatedHeader
              text="Get Your Custom AI Demo Agent."
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.1] text-gray-900 !text-left"
            />
            <motion.p
              variants={itemVariants}
              className="text-slate-700 text-xl mb-10 leading-relaxed font-light font-sans"
            >
              Fill out the form, and we&apos;ll build a demo agent specifically
              for your business. We&apos;ll email you a link to talk to it live
              within 24 hours.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6"
            >
              <button
                onClick={openBooking}
                className="bg-slate-900 text-white px-10 py-5 rounded-lg text-lg font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl font-sans"
              >
                Book a Live Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            className="bg-white border border-slate-200 p-10 rounded-2xl shadow-2xl relative z-10"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold tracking-tight mb-8 text-gray-900">
              Claim Your Free Trial
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-2 font-sans">
                    Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400 font-medium font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-2 font-sans">
                    Business Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    placeholder="john@company.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400 font-medium font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-2 font-sans">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleFormChange}
                    placeholder="Real Estate Co."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400 font-medium font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-2 font-sans">
                    Business Type
                  </label>
                  <input
                    type="text"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleFormChange}
                    placeholder="e.g. Real Estate, SaaS"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400 font-medium font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-2 font-sans">
                  Knowledge Base / Website URL
                </label>
                <input
                  type="text"
                  name="knowledgeBase"
                  value={formData.knowledgeBase}
                  onChange={handleFormChange}
                  placeholder="Link to your website or documentation"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400 font-medium font-sans"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-2 font-sans">
                  Lead Volume / Month
                </label>
                <input
                  type="text"
                  name="volume"
                  value={formData.volume}
                  onChange={handleFormChange}
                  placeholder="e.g. 500 leads"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400 font-medium font-sans"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-2 font-sans">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  rows={3}
                  placeholder="Tell us about your needs..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400 font-medium resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="w-full bg-[#0000FF] text-white font-bold py-5 rounded-lg hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 font-sans"
              >
                {formStatus === "loading" ? "Sending..." : "Send Message"}
                {!formStatus.startsWith("load") && <ArrowRight size={20} />}
              </button>

              {formStatus === "success" && (
                <p className="text-green-600 text-center font-bold text-sm bg-green-50 py-3 rounded-lg animate-fade-in border border-green-200 font-sans">
                  Message sent successfully!
                </p>
              )}
              {formStatus === "error" && (
                <p className="text-red-600 text-center font-bold text-sm bg-red-50 py-3 rounded-lg animate-fade-in border border-red-200 font-sans">
                  Error sending message. Please try again.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-12 border-t border-[#d2d2d7] bg-slate-50 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-slate-700 text-sm">
            {/* Left: Branding & Contact */}
            <div className="text-left space-y-2">
              <p className="font-medium text-slate-700">
                &copy; 2026 Autolinium. All rights reserved.
              </p>
              <p>AI-Powered Outbound Automation.</p>
              <a
                href="mailto:office@autolinium.com"
                className="flex items-center gap-2 hover:text-cyan-glow transition-colors mt-2"
              >
                <Mail size={16} />
                <span>office@autolinium.com</span>
              </a>
            </div>

            {/* Center: Links */}
            <div className="flex flex-wrap gap-6 md:gap-8 justify-center">
              <a
                href="https://www.linkedin.com/company/autolinium/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cyan-glow transition-colors"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </a>
              <a
                href="/privacy"
                className="hover:text-cyan-glow transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="hover:text-cyan-glow transition-colors"
              >
                Terms of Service
              </a>
            </div>

            {/* Right: Credits */}
            <div className="text-right">
              <p>
                Built by{" "}
                <a
                  href="https://autolinium.com"
                  className="text-slate-900 hover:text-cyan-glow transition-colors font-medium"
                >
                  Autolinium
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
