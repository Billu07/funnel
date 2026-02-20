"use client";
import React, { useState } from "react";
import Image from "next/image";
import VoiceAgent from "@/components/VoiceAgent";
import DashboardFeatures from "@/components/DashboardFeatures";
import ClientTrustBlock from "@/components/ClientTrustBlock";
import ConversationDemo from "@/components/ConversationDemo";
import ProcessFlow from "@/components/ProcessFlow";
import BookingModal from "@/components/BookingModal";
import {
  Check,
  Users,
  Target,
  BarChart3,
  ArrowRight,
  Menu,
  X,
  Mail,
  Linkedin,
} from "lucide-react";

// 👈 Your Cal.com Link
const CALENDAR_LINK = "https://cal.com/autolinium-bd6vkq";

// 🔴 REPLACE THIS WITH YOUR N8N WEBHOOK URL
// Floating animation component
function FloatingElement({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="animate-float"
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
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

  return (
    <main className="bg-brand-dark text-white min-h-screen font-sans selection:bg-cyan-glow selection:text-brand-dark overflow-x-hidden">
      {/* ================= BOOKING MODAL COMPONENT ================= */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        calendarUrl={CALENDAR_LINK}
      />

      {/* ================= NAVBAR ================= */}
      <nav className="fixed w-full top-0 z-50 border-b border-white/5 bg-brand-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
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
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-glow to-blue-deep group-hover:opacity-80 transition-opacity">
              Voicium
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-slate-300 hover:text-cyan-glow transition-colors"
            >
              Features
            </a>
            <a
              href="#process"
              className="text-sm font-medium text-slate-300 hover:text-cyan-glow transition-colors"
            >
              How it Works
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-slate-300 hover:text-cyan-glow transition-colors"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-slate-300 hover:text-cyan-glow transition-colors"
            >
              FAQ
            </a>
          </div>

          <div className="hidden md:block">
            <button
              onClick={openBooking}
              className="bg-gradient-to-r from-red-400 to-red-400 text-white px-6 py-2 rounded-full font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:scale-105"
            >
              Book Strategy Call
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-brand-dark/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 shadow-2xl animate-fade-in-down">
            <a
              href="#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-300 hover:text-cyan-glow transition-colors"
            >
              Features
            </a>
            <a
              href="#process"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-300 hover:text-cyan-glow transition-colors"
            >
              How it Works
            </a>
            <a
              href="#pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-300 hover:text-cyan-glow transition-colors"
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-300 hover:text-cyan-glow transition-colors"
            >
              FAQ
            </a>
            <button
              onClick={openBooking}
              className="w-full bg-gradient-to-r from-red-400 to-red-400 text-white px-6 py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
            >
              Book Strategy Call
            </button>
          </div>
        )}
      </nav>

      {/* ================= HERO SECTION (With Video) ================= */}
      <header className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-6 overflow-hidden min-h-[85vh] md:min-h-[90vh] flex items-center">
        {/* Background Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-glow/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10 w-full">
          {/* Text Content */}
          <div className="text-left animate-fade-in order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/10 text-cyan-glow text-sm font-medium mb-6">
              <span className="animate-pulse-slow h-2 w-2 rounded-full bg-cyan-glow"></span>
              AI-Powered Lead Qualification
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Stop Calling{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-500 text">
                Dead
              </span>{" "}
              Leads,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-500 text">
                Talk only to motivated ones.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-lg">
              Our AI calls your real estate leads, analyzes every conversation,
              and shows you exactly who to call first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={openBooking}
                className="bg-white text-brand-dark px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-cyan-glow/20"
              >
                Book a Live Demo
              </button>
              <button
                onClick={scrollToContact}
                className="px-8 py-4 rounded-full text-lg font-bold border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                Start 2-Day Free Trial
              </button>
            </div>
            <p className="text-slate-500 text-sm">
              Used by real estate teams across the US.
              <br />
              No contracts • Cancel anytime • Setup in 24 hours
            </p>
          </div>

          {/* Video Container with Masking */}
          <div className="relative h-[300px] md:h-[600px] w-full order-1 lg:order-2 flex items-center justify-center">
            {/* The Mask: Radial gradient fades edges to transparent */}
            <div className="relative w-full h-full [mask-image:radial-gradient(circle_at_center,black_40%,transparent_70%)]">
              <video
                className="w-full h-full object-cover opacity-90"
                autoPlay
                loop
                muted
                playsInline
                poster="/images/frame1.webp"
                key="hero-video"
              >
                <source src="/videos/hero-video2.mp4" type="video/mp4" />
                <div className="flex items-center justify-center h-full w-full bg-brand-primary">
                  <p>Video loading...</p>
                </div>
              </video>
            </div>
          </div>
        </div>
      </header>

      {/* ================= TRUST BLOCK SECTION ================= */}
      <ClientTrustBlock />

      {/* ================= 2. PROBLEM SECTION ================= */}
      <section className="py-24 bg-brand-primary border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Real Estate Teams Waste Hours <br />
            <span className="text-red-400">Calling The Wrong People</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Target className="text-red-400" />,
                title: "Calling dead leads every day",
                desc: "Wasting energy on people who will never convert.",
              },
              {
                icon: <Users className="text-red-400" />,
                title: "No way to know who is serious",
                desc: "Scaling without data is just guessing.",
              },
              {
                icon: <BarChart3 className="text-red-400" />,
                title: "CRM filled with messy, outdated data",
                desc: "Leads rot when they aren't contacted immediately.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-brand-card p-8 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all group hover:-translate-y-1"
              >
                <div className="mb-4 bg-red-500/10 w-fit p-3 rounded-xl">
                  {item.icon}
                </div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl text-slate-400 font-medium">
              Most teams talk to{" "}
              <span className="text-white font-bold underline decoration-red-500">
                50+ people
              </span>{" "}
              to find{" "}
              <span className="text-white font-bold underline decoration-red-500">
                3 serious prospects
              </span>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ================= 3. HOW IT WORKS (ProcessFlow - The Solution) ================= */}
      <section
        id="process"
        className="py-24 bg-brand-dark border-y border-white/5 relative overflow-hidden"
      >
        {/* Subtle Background Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            {/* Voicium Logo in "What we have brought" section */}
            <a
              href="https://autolinium.com"
              className="block relative w-16 h-16 mx-auto mb-6 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/logo.png"
                alt="Voicium Logo"
                fill
                className="object-contain"
              />
            </a>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Offered Solution
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              We flip the funnel. Instead of you calling 50 leads to find 3
              prospects,{" "}
              <span className="text-white font-bold">
                we handle the 50, so you only talk to the 3.
              </span>
            </p>
          </div>
          {/* The New Flow Component */}
          <ProcessFlow />
        </div>
      </section>

      {/* ================= CONVERSATION DEMO SECTION ================= */}
      <ConversationDemo />

      {/* ================= 4. DASHBOARD FEATURES SECTION ================= */}
      <section
        id="features"
        className="py-24 bg-brand-primary border-y border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything In One Dashboard
            </h2>
            <p className="text-slate-400">
              Upload leads, see motivation scores, and track your pipeline.
            </p>
          </div>

          <DashboardFeatures />
        </div>
      </section>

      {/* ================= 5. DEMO VIDEO SECTION ================= */}
      <section className="py-24 bg-brand-dark border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">See How It Works</h2>
          <p className="text-slate-400 mb-12">
            Watch how our AI handles lead qualification in real-time.
          </p>

          <div className="relative aspect-[9/16] max-w-sm mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-12">
            <video
              className="w-full h-full object-cover"
              controls
              playsInline
              poster="/images/frame2.webp"
            >
              <source src="/videos/hero-video-2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <button
            onClick={openBooking}
            className="bg-gradient-to-r from-cyan-glow to-blue-deep text-white px-10 py-4 rounded-full text-xl font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:scale-105"
          >
            Then Book Your Demo
          </button>
        </div>
      </section>

      {/* ================= 6. VOICE AGENT (Audio Demos) ================= */}
      <section className="py-24 bg-brand-primary relative overflow-hidden">
        {/* Grid Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">
            Experience the Intelligence
          </h2>
          <p className="text-slate-400 mb-12">
            Talk to our AI live, or get an instant call to your phone.
          </p>

          {/* New Side-by-Side Layout handled inside VoiceAgent */}
          <VoiceAgent />
        </div>
      </section>

      {/* ================= 7. BENEFITS SECTION ================= */}
      <section className="py-24 bg-brand-dark border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* MASKED IMAGE: Robot Lady */}
            <div className="relative h-[500px] w-full group">
              <FloatingElement>
                {/* Linear Gradient Mask to fade bottom into background */}
                <div className="relative w-full h-[500px] [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]">
                  <Image
                    src="/images/solution-robot.png"
                    alt="Smart Calling Agent"
                    fill
                    className="object-cover rounded-3xl"
                  />
                </div>
              </FloatingElement>
              {/* Extra overlay at bottom just in case */}
              <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-brand-dark to-transparent"></div>
            </div>

            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                What Changes After{" "}
                <span className="text-cyan-400">Using This</span>
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                &quot;We sell results, not just software.&quot;
              </p>

              <div className="space-y-4">
                {[
                  "No more cold calling all day",
                  "Only real conversations with interested leads",
                  "Clear pipeline. Real data. More deals.",
                  "Automated follow-up sequences",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check
                        className="w-4 h-4 text-[#0a0a0a]"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="text-lg text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 8. PRICING ================= */}
      <section
        id="pricing"
        className="py-24 px-6 bg-brand-primary border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Scalable <span className="text-cyan-400">Pricing</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 flex flex-col hover:border-cyan-400/30 transition-colors">
              <h3 className="text-xl font-bold text-slate-300">Starter Plan</h3>
              <div className="text-3xl font-bold mt-4 mb-2 text-white">
                $990
                <span className="text-lg font-normal text-slate-400">/mo</span>
              </div>
              <p className="text-sm text-slate-500 mb-8">(No Setup Charge)</p>
              <ul className="space-y-4 mb-8 text-sm flex-1">
                {[
                  "AI Calling Engine",
                  "Unlimited Calls (Mon-Sat)",
                  "Daily Transcription Reports",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-slate-300"
                  >
                    <Check className="w-4 h-4 text-cyan-400" strokeWidth={3} />
                    {text}
                  </li>
                ))}
              </ul>
              <button
                onClick={openBooking}
                className="w-full py-3 border border-slate-600 rounded-xl font-bold hover:bg-white hover:text-black transition"
              >
                Book a Live Demo
              </button>
            </div>

            {/* Growth */}
            <div className="p-8 rounded-3xl bg-slate-900 border-2 border-cyan-400 relative transform md:-translate-y-6 shadow-[0_0_40px_rgba(6,182,212,0.15)] flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-400 text-[#0a0a0a] text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mt-2">
                Growth Plan
              </h3>
              <div className="text-4xl font-bold mt-4 mb-2 text-white">
                $1770
                <span className="text-lg font-normal text-slate-400">/mo</span>
              </div>
              <p className="text-sm text-cyan-400/80 mb-8">(No Setup Charge)</p>
              <ul className="space-y-4 mb-8 text-sm flex-1">
                {[
                  "Everything in Starter",
                  "Lead Scoring + Dashboard",
                  "CRM + Analytics",
                  "Full Automation Workflow",
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-2 text-white">
                    <Check className="w-4 h-4 text-cyan-400" strokeWidth={3} />
                    {text}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToContact}
                className="w-full py-4 bg-cyan-400 text-[#0a0a0a] rounded-xl font-bold hover:bg-cyan-300 transition-all"
              >
                Start 2-Day Free Trial
              </button>
            </div>

            {/* Scale */}
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 flex flex-col hover:border-cyan-400/30 transition-colors">
              <h3 className="text-xl font-bold text-slate-300">Enterprise</h3>
              <div className="text-3xl font-bold mt-4 mb-2 text-white">
                Custom
              </div>
              <p className="text-sm text-slate-500 mb-8">For large teams</p>
              <ul className="space-y-4 mb-8 text-sm flex-1">
                {[
                  "Custom Workflows",
                  "Dedicated Setup",
                  "Multi-team Usage",
                  "Priority Support",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-slate-300"
                  >
                    <Check className="w-4 h-4 text-cyan-400" strokeWidth={3} />
                    {text}
                  </li>
                ))}
              </ul>
              <button
                onClick={openBooking}
                className="w-full py-3 border border-slate-600 rounded-xl font-bold hover:bg-white hover:text-black transition"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-glow/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="relative w-full max-w-3xl mx-auto h-[300px] md:h-[500px] mb-12">
            {/* The Mask: Exact same settings as the successful hero section */}
            <div className="relative w-full h-full [mask-image:radial-gradient(circle_at_center,black_40%,transparent_70%)]">
              <Image
                src="/images/voicium_ad_3.png"
                alt="Flip Your Funnel"
                fill
                className="object-contain opacity-90"
              />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8">
            Ready to <span className="text-cyan-400">Flip Your Funnel?</span>
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Stop losing leads to slow follow-ups. Join the future of real estate
            sales with AI-powered calling.
          </p>
          <button
            onClick={scrollToContact}
            className="bg-white text-brand-dark px-12 py-5 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-2xl shadow-cyan-glow/20"
          >
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* ================= 9. OBJECTION HANDLING (FAQ) ================= */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <details className="group bg-brand-card border border-white/5 rounded-2xl open:border-cyan-glow/30 transition-all">
            <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg list-none">
              Is this legal in the US?
              <span className="transition group-open:rotate-180">
                <ArrowRight className="rotate-90" />
              </span>
            </summary>
            <div className="px-6 pb-6 text-slate-300 leading-relaxed">
              Yes. The system is designed to follow standard outreach safeguards
              used by real estate teams. Calling windows are restricted to
              appropriate hours, opt-out requests are respected, and suppression
              rules can be applied to prevent further contact when requested.
              You remain in control of how your outreach is used and which leads
              are contacted.
            </div>
          </details>

          <details className="group bg-brand-card border border-white/5 rounded-2xl open:border-cyan-glow/30 transition-all">
            <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg list-none">
              Do I need technical skills to use this?
              <span className="transition group-open:rotate-180">
                <ArrowRight className="rotate-90" />
              </span>
            </summary>
            <div className="px-6 pb-6 text-slate-300 leading-relaxed">
              No technical experience is required. The workflow is simple:
              upload your leads, choose your settings, and start the automation.
              The platform handles calling, logging, scoring, and reporting
              automatically, so your team can focus on conversations and deals
              instead of setup or technical tasks.
            </div>
          </details>

          <details className="group bg-brand-card border border-white/5 rounded-2xl open:border-cyan-glow/30 transition-all">
            <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg list-none">
              How quickly can I get started?
              <span className="transition group-open:rotate-180">
                <ArrowRight className="rotate-90" />
              </span>
            </summary>
            <div className="px-6 pb-6 text-slate-300 leading-relaxed">
              Most teams are ready to launch within 24 hours after onboarding.
              Once your account is set up and your lead list is uploaded, the
              system can begin calling and populating your dashboard right away.
            </div>
          </details>
        </div>
      </section>

      {/* ================= 10. FINAL CTA SECTION & FORM ================= */}
      <section
        id="contact"
        className="py-24 bg-brand-dark relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: CTA Text */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/10 text-cyan-glow text-sm font-medium mb-6">
              <span className="animate-pulse-slow h-2 w-2 rounded-full bg-cyan-glow"></span>
              2-Day Free Trial
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Get Your Custom <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow to-blue-deep">
                AI Demo Agent.
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Fill out the form, and we&apos;ll build a demo agent specifically
              for your business. We&apos;ll email you a link to talk to it live
              within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={openBooking}
                className="bg-white text-brand-dark px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-cyan-glow/20"
              >
                Book a Live Demo
              </button>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-brand-card/50 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Claim Your Free Trial
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow transition-colors placeholder:text-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">
                    Business Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    placeholder="john@company.com"
                    className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow transition-colors placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleFormChange}
                    placeholder="Real Estate Co."
                    className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow transition-colors placeholder:text-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">
                    Business Type
                  </label>
                  <input
                    type="text"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleFormChange}
                    placeholder="e.g. Real Estate, SaaS"
                    className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow transition-colors placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">
                  Knowledge Base / Website URL
                </label>
                <input
                  type="text"
                  name="knowledgeBase"
                  value={formData.knowledgeBase}
                  onChange={handleFormChange}
                  placeholder="Link to your website or documentation"
                  className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow transition-colors placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">
                  Lead Volume / Month
                </label>
                <input
                  type="text"
                  name="volume"
                  value={formData.volume}
                  onChange={handleFormChange}
                  placeholder="e.g. 500 leads"
                  className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow transition-colors placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  rows={3}
                  placeholder="Tell us about your needs..."
                  className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-glow transition-colors placeholder:text-slate-600 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="w-full bg-gradient-to-r from-cyan-glow to-blue-deep text-white font-bold py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {formStatus === "loading" ? "Sending..." : "Send Message"}
                {!formStatus.startsWith("load") && <ArrowRight size={18} />}
              </button>

              {formStatus === "success" && (
                <p className="text-green-400 text-center text-sm bg-green-400/10 py-2 rounded-lg animate-fade-in">
                  Message sent successfully!
                </p>
              )}
              {formStatus === "error" && (
                <p className="text-red-400 text-center text-sm bg-red-400/10 py-2 rounded-lg animate-fade-in">
                  Error sending message. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-12 border-t border-white/10 bg-black text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-slate-500 text-sm">
            {/* Left: Branding & Contact */}
            <div className="text-left space-y-2">
              <p className="font-medium text-slate-400">
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
                  className="text-white hover:text-cyan-glow transition-colors font-medium"
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
