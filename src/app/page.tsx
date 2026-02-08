"use client"; // 👈 Added this so we can use State for the Modal
import React, { useState } from "react";
import Image from "next/image";
import VoiceAgent from "@/components/VoiceAgent";
import InstaDeck from "@/components/InstaDeck";
import ProcessFlow from "@/components/ProcessFlow";
import BookingModal from "@/components/BookingModal"; // 👈 Import the Modal
import {
  CheckCircle,
  XCircle,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  Phone,
  Zap,
  Play,
  Volume2,
  ArrowRight,
} from "lucide-react";

// 👈 Your Google Calendar Link
const CALENDAR_LINK = "https://calendar.app.google/1YYTXKxWK5PFaSzV8?gv=true";

export default function Home() {
  // 👈 State to control the Modal
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Helper function to open modal
  const openBooking = () => setIsBookingOpen(true);

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
          <div className="flex items-center gap-3">
            {/* Logo Image */}
            <div className="relative w-10 h-10">
              <Image
                src="/images/logo.png"
                alt="Autolinium Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-glow to-blue-deep">
              Autolinium
            </span>
          </div>
          <button
            onClick={openBooking} // 👈 Wired up
            className="hidden md:block bg-gradient-to-r from-cyan-glow to-blue-deep text-white px-6 py-2 rounded-full font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:scale-105"
          >
            Book Strategy Call
          </button>
        </div>
      </nav>

      {/* ================= HERO SECTION (With Video) ================= */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-glow/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          {/* Text Content */}
          <div className="text-left animate-fade-in order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/10 text-cyan-glow text-sm font-medium mb-6">
              <span className="animate-pulse-slow h-2 w-2 rounded-full bg-cyan-glow"></span>
              AI-Powered Outbound System
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Turn Cold Calls <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow to-blue-deep text">
                Into Revenue
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-lg">
              Scale your outreach with Custom AI agents that sound human, book
              meetings, and qualify leads consistently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={openBooking} // 👈 Wired up
                className="bg-white text-brand-dark px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-cyan-glow/20"
              >
                Start Scaling Today
              </button>
              <button className="px-8 py-4 rounded-full text-lg font-bold border border-slate-700 hover:bg-slate-800 transition-colors">
                View Pricing
              </button>
            </div>
          </div>

          {/* Video Container with Masking */}
          <div className="relative h-[400px] md:h-[600px] w-full order-1 lg:order-2 flex items-center justify-center">
            {/* The Mask: Radial gradient fades edges to transparent */}
            <div className="relative w-full h-full [mask-image:radial-gradient(circle_at_center,black_40%,transparent_70%)]">
              <video
                className="w-full h-full object-cover opacity-90"
                autoPlay
                loop
                muted
                playsInline
                // Adding a key forces React to reload element if src changes
                key="hero-video"
              >
                <source src="/videos/hero-video.mp4" type="video/mp4" />
                {/* Fallback if video fails */}
                <div className="flex items-center justify-center h-full w-full bg-brand-primary">
                  <p>Video loading...</p>
                </div>
              </video>
            </div>
          </div>
        </div>
      </header>

      {/* ================= PROBLEM SECTION ================= */}
      <section className="py-24 bg-brand-primary border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why Most Outbound Calling{" "}
            <span className="text-red-400">Fails</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: <TrendingUp className="rotate-180 text-red-400" />,
                title: "Low Response",
                desc: "Calls ignored due to poor timing and fatigue.",
              },
              {
                icon: <Users className="text-red-400" />,
                title: "Brand Damage",
                desc: "Untrained agents ruin reputation instantly.",
              },
              {
                icon: <XCircle className="text-red-400" />,
                title: "High Cost",
                desc: "Paying for manual dialing time, not outcomes.",
              },
              {
                icon: <Target className="text-red-400" />,
                title: "No Follow-up",
                desc: "Leads lost because humans forget to call back.",
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

          {/* Agitation Visuals */}
          <div className="mt-20 flex flex-wrap justify-center gap-6 text-center">
            <div className="px-8 py-4 rounded-full border border-slate-700 text-slate-400 flex items-center gap-2">
              <XCircle size={16} /> Slow Growth
            </div>
            <div className="px-10 py-6 rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-xl shadow-[0_0_30px_rgba(220,38,38,0.4)] scale-110 z-10">
              Missed Opportunities
            </div>
            <div className="px-8 py-4 rounded-full border border-slate-700 text-slate-400 flex items-center gap-2">
              <XCircle size={16} /> Wasted Time
            </div>
          </div>
        </div>
      </section>

      {/* ================= AUDIO DEMO SECTION ================= */}
      <section className="py-24 bg-brand-dark relative overflow-hidden">
        {/* Grid Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">
            Experience the Intelligence
          </h2>
          <p className="text-slate-400 mb-12">
            Talk to our AI live, or listen to past success stories.
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* 1. LIVE DEMO (The New Microphone Component) */}
            <div className="md:row-span-2 h-full min-h-[300px]">
              <VoiceAgent />
            </div>

            {/* 2. RECORDED CALLS COLUMN */}
            <div className="flex flex-col gap-6 h-full justify-center">
              {/* Call 1 */}
              <div className="bg-brand-card border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 hover:border-cyan-glow/30 transition-all">
                <div className="bg-slate-700 p-3 rounded-full text-slate-300">
                  <Volume2 size={20} />
                </div>
                <div className="text-left flex-1 w-full">
                  <div className="font-bold text-white">
                    Real Estate Qualification
                  </div>
                  <div className="text-xs text-slate-400">
                    Outcome: Booked Meeting (3:09)
                  </div>
                </div>
                <audio
                  controls
                  className="w-full md:w-[200px] h-8 rounded-full opacity-90 accent-cyan-500"
                >
                  <source src="/audio/demo-call-1.wav" type="audio/mpeg" />
                </audio>
              </div>

              {/* Call 2 */}
              <div className="bg-brand-card border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 hover:border-cyan-glow/30 transition-all">
                <div className="bg-slate-700 p-3 rounded-full text-slate-300">
                  <Volume2 size={20} />
                </div>
                <div className="text-left flex-1 w-full">
                  <div className="font-bold text-white">B2B SaaS Outreach</div>
                  <div className="text-xs text-slate-400">
                    Outcome: Qualified Lead (4:13)
                  </div>
                </div>
                <audio
                  controls
                  className="w-full md:w-[200px] h-8 rounded-full opacity-90 accent-cyan-500"
                >
                  <source src="/audio/demo-call-2.wav" type="audio/mpeg" />
                </audio>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SOLUTION SECTION ================= */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* MASKED IMAGE: Robot Lady */}
          <div className="relative h-[500px] w-full group">
            {/* Linear Gradient Mask to fade bottom into background */}
            <div className="relative w-full h-full [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]">
              <Image
                src="/images/solution-robot.webp"
                alt="Smart Calling Agent"
                fill
                className="object-cover rounded-3xl"
              />
            </div>
            {/* Extra overlay at bottom just in case */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-brand-dark to-transparent"></div>
          </div>

          <div>
            <div className="text-cyan-glow font-bold mb-2 uppercase tracking-widest text-sm">
              Our Solution
            </div>
            <h2 className="text-4xl font-bold mb-6">The Smart Calling Agent</h2>
            <p className="text-xl text-slate-300 mb-8 italic border-l-4 border-cyan-glow pl-4">
              "We don't just make calls, we deliver outcomes."
            </p>

            <ul className="space-y-5">
              {[
                "Professionally trained calling agents",
                "Custom scripts aligned with your offer",
                "Human + AI assisted call workflow",
                "Real-time CRM tracking & reporting",
              ].map((text, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 bg-brand-card p-4 rounded-xl border border-white/5 hover:border-cyan-glow/30 transition-colors"
                >
                  <CheckCircle className="text-cyan-glow size-6 shrink-0" />
                  <span className="text-lg font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= SOCIAL PROOF DASHBOARD (InstaDeck) ================= */}
      <section className="py-24 bg-brand-primary border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Inside the Engine</h2>
          <p className="text-slate-400 mb-12">
            See exactly what our agents see.
          </p>

          <InstaDeck />
        </div>
      </section>

      {/* ================= HOW IT WORKS (Linked List Flow) ================= */}
      <section className="py-24 bg-brand-primary border-y border-white/5 relative overflow-hidden">
        {/* Subtle Background Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The Workflow
            </h2>
            <p className="text-slate-400 text-lg">
              A seamless chain of intelligence.
            </p>
          </div>
          {/* The New Flow Component */}
          <ProcessFlow />
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="py-24 px-6 bg-brand-primary border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Scalable Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="p-8 rounded-3xl bg-brand-card border border-white/5 flex flex-col hover:border-white/20 transition-colors">
              <h3 className="text-xl font-bold text-slate-300">Starter Plan</h3>
              <div className="text-3xl font-bold mt-4 mb-2">BDT 25,000</div>
              <p className="text-sm text-slate-500 mb-8">
                Best for testing waters
              </p>
              <ul className="text-slate-300 space-y-4 mb-8 text-sm flex-1">
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-cyan-glow" /> 1 Agent
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-cyan-glow" /> 500 Calls
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-cyan-glow" /> Weekly
                  Reports
                </li>
              </ul>
              <button
                onClick={openBooking} // 👈 Wired up
                className="w-full py-3 border border-slate-600 rounded-xl font-bold hover:bg-white hover:text-black transition"
              >
                Buy Now
              </button>
            </div>

            {/* Growth */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-brand-card to-brand-primary border-2 border-cyan-glow relative transform md:-translate-y-6 shadow-[0_0_40px_rgba(6,182,212,0.15)] flex flex-col">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-glow to-blue-deep mx-8"></div>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-glow text-brand-dark text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mt-2">
                Growth Plan
              </h3>
              <div className="text-4xl font-bold mt-4 mb-2">BDT 50,000</div>
              <p className="text-sm text-cyan-glow/80 mb-8">
                For growing teams
              </p>
              <ul className="text-white space-y-4 mb-8 text-sm flex-1">
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-cyan-glow" /> 2 Agents
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-cyan-glow" /> 1,200
                  Calls
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-cyan-glow" /> Custom
                  Scripts
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-cyan-glow" /> CRM
                  Tracking
                </li>
              </ul>
              <button
                onClick={openBooking} // 👈 Wired up
                className="w-full py-4 bg-gradient-to-r from-cyan-glow to-blue-deep text-white rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Scale */}
            <div className="p-8 rounded-3xl bg-brand-card border border-white/5 flex flex-col hover:border-white/20 transition-colors">
              <h3 className="text-xl font-bold text-slate-300">Scale Plan</h3>
              <div className="text-3xl font-bold mt-4 mb-2">Custom</div>
              <p className="text-sm text-slate-500 mb-8">For enterprises</p>
              <ul className="text-slate-300 space-y-4 mb-8 text-sm flex-1">
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-cyan-glow" /> Dedicated
                  Manager
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-cyan-glow" /> High
                  Volume
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-cyan-glow" /> Advanced
                  Analytics
                </li>
              </ul>
              <button
                onClick={openBooking} // 👈 Wired up
                className="w-full py-3 border border-slate-600 rounded-xl font-bold hover:bg-white hover:text-black transition"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT FORM ================= */}
      <section id="contact" className="py-24 bg-brand-dark relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-brand-card border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl grid md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Scale?</h2>
              <p className="text-slate-400 mb-8">
                Let Autolinium handle your calling outreach — professionally,
                consistently, and at scale.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cyan-glow font-bold">
                    1
                  </div>
                  <p className="text-sm font-medium">Fill out the form</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cyan-glow font-bold">
                    2
                  </div>
                  <p className="text-sm font-medium">Get a strategy call</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-glow to-blue-deep text-white font-bold flex items-center justify-center shadow-lg">
                    3
                  </div>
                  <p className="text-sm font-bold text-white">
                    Start closing deals
                  </p>
                </div>
              </div>
            </div>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-brand-dark p-4 rounded-xl border border-white/10 outline-none focus:border-cyan-glow transition-colors placeholder:text-slate-600"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-brand-dark p-4 rounded-xl border border-white/10 outline-none focus:border-cyan-glow transition-colors placeholder:text-slate-600"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company"
                  className="bg-brand-dark p-4 rounded-xl border border-white/10 outline-none focus:border-cyan-glow transition-colors placeholder:text-slate-600"
                />
                <input
                  type="text"
                  placeholder="Mo. Volume"
                  className="bg-brand-dark p-4 rounded-xl border border-white/10 outline-none focus:border-cyan-glow transition-colors placeholder:text-slate-600"
                />
              </div>
              <textarea
                placeholder="Your Message"
                className="w-full bg-brand-dark p-4 rounded-xl border border-white/10 outline-none focus:border-cyan-glow transition-colors h-32 resize-none placeholder:text-slate-600"
              ></textarea>
              <button className="w-full bg-white text-brand-dark font-bold py-4 rounded-xl hover:bg-cyan-glow hover:text-white transition-all text-lg shadow-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-12 border-t border-white/10 bg-black text-center text-slate-600 text-sm">
        <p className="mb-2">&copy; 2026 Autolinium. All rights reserved.</p>
        <p>AI-Powered Outbound Automation.</p>
      </footer>
    </main>
  );
}
