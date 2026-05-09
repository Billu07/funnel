"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import VoiceAgent from "@/components/VoiceAgent";
import DashboardFeatures from "@/components/DashboardFeatures";
import ClientTrustBlock from "@/components/ClientTrustBlock";
import ConversationDemo from "@/components/ConversationDemo";
import ProcessFlow from "@/components/ProcessFlow";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProblemsSection from "@/components/ProblemsSection";
import FloatingElement from "@/components/FloatingElement";
import CustomVideoPlayer from "@/components/CustomVideoPlayer";
import { motion } from "framer-motion";
import AnimatedHeader from "@/components/AnimatedHeader";
import { trackFunnelEvent } from "@/lib/analytics";
import { Check, ArrowRight, Menu, X, Mail, Linkedin } from "lucide-react";

const DASHBOARD_URL = "https://dashboard.voicium.live";
const CALENDAR_LINK =
  process.env.NEXT_PUBLIC_CALENDAR_LINK || "https://cal.com/autolinium-bd6vkq";
const onboardingSteps = [
  "Create Account",
  "Select Market",
  "Setup Your Agent",
  "Upload Data",
  "Start Calling",
];

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
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [notification, setNotification] = useState<{
    text: string;
    tone: "info" | "success";
  } | null>(null);
  const onboardingDialogRef = useRef<HTMLDivElement | null>(null);
  const onboardingTriggerRef = useRef<HTMLElement | null>(null);
  const notificationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNotification = (text: string, tone: "info" | "success" = "info") =>
    setNotification({ text, tone });

  // Helper function to open modal
  const openOnboarding = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    trackFunnelEvent("onboarding_opened", {
      source: event?.currentTarget?.dataset?.ctaSource || "unknown",
    });
    onboardingTriggerRef.current = event?.currentTarget ?? null;
    setIsRedirecting(false);
    setIsOnboardingOpen(true);
    setIsMobileMenuOpen(false);
  };

  const closeOnboarding = () => {
    setIsOnboardingOpen(false);
    setIsRedirecting(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const continueToDashboard = () => {
    trackFunnelEvent("dashboard_continue_clicked", {
      source: "onboarding_modal",
    });
    setIsRedirecting(true);
    showNotification("Redirecting to dashboard...", "success");
    window.location.href = DASHBOARD_URL;
  };

  const openCalendar = () => {
    trackFunnelEvent("calendar_cta_clicked", { location: "video_section" });
    window.open(CALENDAR_LINK, "_blank", "noopener,noreferrer");
    showNotification("Opening calendar in a new tab...");
  };

  useEffect(() => {
    if (!notification?.text) return;

    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
    }

    notificationTimerRef.current = setTimeout(() => {
      setNotification(null);
    }, 2800);

    return () => {
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
      }
    };
  }, [notification?.text]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isOnboardingOpen) {
      onboardingTriggerRef.current?.focus();
      return;
    }

    const dialog = onboardingDialogRef.current;
    if (!dialog) return;

    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelectors = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];

    const getFocusableElements = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelectors.join(",")),
      );

    const focusableElements = getFocusableElements();
    focusableElements[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOnboardingOpen(false);
        setIsRedirecting(false);
        return;
      }

      if (event.key !== "Tab") return;

      const currentFocusable = getFocusableElements();
      if (currentFocusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = currentFocusable[0];
      const last = currentFocusable[currentFocusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOnboardingOpen]);

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
            {["Features", "How it Works", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                className={`text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-slate-700 hover:text-cyan-glow"
                    : "text-slate-800 hover:text-black"
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <button
              onClick={openOnboarding}
              data-cta-source="nav_desktop"
              type="button"
              className={`px-6 py-2 rounded-lg font-sans font-semibold transition-all   ${
                isScrolled
                  ? "bg-blue-900 text-white hover:bg-blue-800 shadow-lg"
                  : "bg-blue-900 text-white hover:bg-blue-800"
              }`}
            >
              Start Your Free Trial
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
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-[#d2d2d7] p-6 flex flex-col gap-6 shadow-sm shadow-slate-200/50 animate-fade-in-down"
          >
            {["Features", "How it Works", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-700 hover:text-cyan-glow transition-colors"
              >
                {item}
              </a>
            ))}
            <button
              onClick={openOnboarding}
              data-cta-source="nav_mobile"
              type="button"
              className="w-full bg-blue-900 text-white hover:bg-blue-800 px-6 py-4 rounded-lg font-sans font-semibold hover:shadow-[0_0_20px_rgba(30,58,138,0.4)] transition-all"
            >
              Start Your Free Trial
            </button>
          </div>
        )}
      </nav>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {notification?.text || ""}
      </div>
      {notification && (
        <div
          className={`fixed top-6 right-6 z-[80] px-4 py-3 rounded-lg text-sm font-medium shadow-xl border ${
            notification.tone === "success"
              ? "bg-emerald-700 text-white border-emerald-600"
              : "bg-slate-900 text-white border-slate-700"
          }`}
        >
          {notification.text}
        </div>
      )}

      {isOnboardingOpen && (
        <div
          className="fixed inset-0 z-[70] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={closeOnboarding}
        >
          <div
            ref={onboardingDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="onboarding-title"
            aria-describedby="onboarding-desc"
            className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <h3
              id="onboarding-title"
              className="text-2xl font-bold text-slate-900 mb-2"
            >
              Start Your Free Trial
            </h3>
            <p id="onboarding-desc" className="text-slate-600 mb-6">
              Quick onboarding before you launch your first campaign.
            </p>
            <ol className="space-y-3 mb-8">
              {onboardingSteps.map((step, index) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-900 text-white text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="font-medium text-slate-800">{step}</span>
                </li>
              ))}
            </ol>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={closeOnboarding}
                type="button"
                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={continueToDashboard}
                type="button"
                disabled={isRedirecting}
                className="w-full sm:flex-1 px-6 py-3 rounded-lg bg-blue-900 text-white font-semibold hover:bg-blue-800 transition-colors inline-flex items-center justify-center gap-2"
              >
                {isRedirecting ? "Redirecting..." : "Continue to Dashboard"}
                {!isRedirecting && <ArrowRight size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}

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

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center"
          >
            <button
              onClick={openOnboarding}
              data-cta-source="hero"
              type="button"
              className="w-full sm:w-auto px-10 py-5 text-lg font-bold bg-[#003375] hover:bg-blue-800 text-white rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center gap-2"
            >
              Start Your Free Trial <ArrowRight size={20} />
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
                  onClick={openCalendar}
                  type="button"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-xl text-lg font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl group"
                >
                  Let&apos;s Have a Talk <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
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
                q: "What happens after my free trial? Am I automatically charged?",
                a: "No automatic billing. You can explore the dashboard trial with included free calls and decide when to upgrade.",
              },
              {
                q: "What's included in the free trial? Can I run a real campaign?",
                a: "Every trial account includes 20 free calls plus 3 test calls to your own number. You can configure your agent, upload your own lead data, and start a real campaign from dashboard.voicium.live.",
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
                key={faq.q}
                variants={itemVariants}
                initial={false}
                animate="visible"
                className={`group bg-white border border-slate-200 rounded-xl open:border-blue-500/30 transition-all ${!showAllFaqs && i >= 5 ? "hidden" : "block"}`}
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

            {/* See More Button */}
            <motion.div variants={itemVariants} className="pt-8 flex justify-center">
              <button
                onClick={() => {
                  const nextValue = !showAllFaqs;
                  setShowAllFaqs(nextValue);
                  trackFunnelEvent("faq_toggle_clicked", {
                    state: nextValue ? "expanded" : "collapsed",
                  });
                }}
                type="button"
                className="group flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 rounded-xl font-bold text-slate-900 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                {showAllFaqs ? "Show Less" : "See More Questions"}
                <motion.div
                  animate={{ rotate: showAllFaqs ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight size={20} className={showAllFaqs ? "-rotate-90" : "rotate-90"} />
                </motion.div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= 11. FINAL CTA SECTION ================= */}
      <section id="contact" className="py-32 bg-slate-50 relative overflow-hidden">
        <Image
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663063245286/4NbDCkjGg5zEcuxt8PVxUE/svg-accent-structural-framework-jr7Hx5UibBvkmRA3Gvrmqr.webp"
          alt="Decorative structural framework"
          width={600}
          height={200}
          className="absolute bottom-5 -left-15 animate-[breathe_7s_ease-in-out_infinite_alternate] pointer-events-none z-0 w-full md:w-1/2 object-cover"
        />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">
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
              Free Trial Live
            </motion.div>
            <AnimatedHeader
              text="Launch Your First Calling Campaign"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.1] text-gray-900 !text-left"
            />
            <motion.p
              variants={itemVariants}
              className="text-slate-700 text-xl mb-10 leading-relaxed font-light font-sans"
            >
              Your dashboard is ready with call logs, qualified leads, market
              upload, and campaign controls. Start with trial credits and go live
              immediately.
            </motion.p>
            <motion.div variants={itemVariants} className="flex">
              <button
                onClick={openOnboarding}
                data-cta-source="final_cta"
                type="button"
                className="bg-slate-900 text-white px-10 py-5 rounded-lg text-lg font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl font-sans inline-flex items-center gap-2"
              >
                Start Your Free Trial <ArrowRight size={20} />
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="bg-white border border-slate-200 p-10 rounded-2xl shadow-2xl relative z-10"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold tracking-tight mb-8 text-gray-900">
              Trial Includes
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-800">
                <Check className="w-5 h-5 text-blue-700" />
                20 free calls for every trial account
              </li>
              <li className="flex items-center gap-3 text-slate-800">
                <Check className="w-5 h-5 text-blue-700" />
                3 test calls to your own number
              </li>
              <li className="flex items-center gap-3 text-slate-800">
                <Check className="w-5 h-5 text-blue-700" />
                Call logs and qualified lead tracking
              </li>
              <li className="flex items-center gap-3 text-slate-800">
                <Check className="w-5 h-5 text-blue-700" />
                Data upload and one-click campaign start
              </li>
            </ul>
            <a
              href={DASHBOARD_URL}
              onClick={() =>
                trackFunnelEvent("dashboard_link_clicked", {
                  source: "trial_includes_card",
                })
              }
              className="mt-8 w-full bg-blue-900 text-white font-bold py-4 rounded-lg hover:bg-blue-800 transition-all inline-flex items-center justify-center gap-2"
            >
              Open Dashboard <ArrowRight size={18} />
            </a>
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
