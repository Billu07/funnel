"use client";

import { useState, useEffect, useRef } from "react";

// Animated counter component
function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {count}
        {suffix}
      </div>
    </div>
  );
}

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
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Ghost icon
function GhostIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C7.58 2 4 5.58 4 10v9c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1c0-.55.45-1 1-1s1 .45 1 1v1c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1c0-.55.45-1 1-1s1 .45 1 1v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-9c0-4.42-3.58-8-8-8zm-2.5 9c-.83 0-1.5-.67-1.5-1.5S8.67 8 9.5 8s1.5.67 1.5 1.5S10.33 11 9.5 11zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 8 14.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}

// Check icon
function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

// Arrow icon
function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}

// Close icon
function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

// Menu icon
function MenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5h16"></path>
      <path d="M4 12h16"></path>
      <path d="M4 19h16"></path>
    </svg>
  );
}

// Cal.com Modal Component
function CalModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-[#0a0a0a] rounded-2xl w-full max-w-4xl h-[80vh] border border-white/10 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-2"
        >
          <span className="text-sm">Close</span>
          <CloseIcon className="w-6 h-6" />
        </button>
        <iframe
          src="https://cal.com/autolinium-bd6vkq/15min"
          className="w-full h-full rounded-2xl"
          frameBorder="0"
          allow="camera; microphone; fullscreen; display-capture"
        />
      </div>
    </div>
  );
}

// Mobile Menu
function MobileMenu({
  isOpen,
  onClose,
  onBookDemo,
}: {
  isOpen: boolean;
  onClose: () => void;
  onBookDemo: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/90" onClick={onClose}></div>
      <div className="relative bg-[#0a0a0a] w-full h-full p-6 flex flex-col">
        <button
          onClick={onClose}
          className="self-end text-white/70 hover:text-white mb-8"
        >
          <CloseIcon className="w-8 h-8" />
        </button>
        <nav className="flex flex-col gap-6">
          <a
            href="#features"
            onClick={onClose}
            className="text-xl font-medium text-slate-300 hover:text-cyan-400 transition-colors"
          >
            Features
          </a>
          <a
            href="#process"
            onClick={onClose}
            className="text-xl font-medium text-slate-300 hover:text-cyan-400 transition-colors"
          >
            How it Works
          </a>
          <a
            href="#pricing"
            onClick={onClose}
            className="text-xl font-medium text-slate-300 hover:text-cyan-400 transition-colors"
          >
            Pricing
          </a>
          <button
            onClick={() => {
              onClose();
              onBookDemo();
            }}
            className="mt-4 bg-rose-500 text-white px-6 py-3 rounded-full font-bold"
          >
            Book Strategy Call
          </button>
        </nav>
      </div>
    </div>
  );
}

export default function VoiciumFunnel() {
  const [isCalOpen, setIsCalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans antialiased overflow-x-hidden">
      {/* Cal.com Modal */}
      <CalModal isOpen={isCalOpen} onClose={() => setIsCalOpen(false)} />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onBookDemo={() => setIsCalOpen(true)}
      />

      {/* Custom styles */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scroll-x {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-x {
          animation: scroll-x 40s linear infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-40 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-[#0a0a0a] font-bold text-xl">V</span>
            </div>
            <span className="text-2xl font-bold tracking-tighter text-cyan-400">
              Voicium
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#process"
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              How it Works
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              Pricing
            </a>
          </div>
          <div className="hidden md:block">
            <button
              onClick={() => setIsCalOpen(true)}
              className="bg-rose-500 text-white px-6 py-2 rounded-full font-bold hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all hover:scale-105"
            >
              Book Strategy Call
            </button>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-slate-300 hover:text-white"
          >
            <MenuIcon className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-6 overflow-hidden min-h-[85vh] md:min-h-[90vh] flex items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10 w-full">
          <div className="text-left animate-fade-in order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 text-sm font-medium mb-6">
              <span className="animate-pulse-slow h-2 w-2 rounded-full bg-cyan-400"></span>
              AI-Powered Lead Qualification
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Stop Calling <span className="text-rose-500">Dead</span> Leads,
              <span className="block text-cyan-400">
                Talk only to motivated ones.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-lg">
              Our AI calls your real estate leads, analyzes every conversation,
              and shows you exactly who to call first.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={() => setIsCalOpen(true)}
                className="bg-white text-[#0a0a0a] px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20"
              >
                Book a Live Demo
              </button>
              <a
                href="https://www.voicium.live/#features"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full text-lg font-bold border border-slate-700 hover:bg-slate-800 transition-colors text-center"
              >
                Start 2-Day Free Trial
              </a>
            </div>

            <p className="text-slate-500 text-sm">
              Used by real estate teams across the US.
              <br />
              No contracts • Cancel anytime • Setup in 24 hours
            </p>
          </div>

          <div className="relative h-[300px] md:h-[500px] w-full order-1 lg:order-2 flex items-center justify-center">
            <FloatingElement>
              <div className="relative">
                <div className="absolute -inset-4 bg-cyan-500/10 rounded-3xl blur-2xl"></div>
                <img
                  src="/voicium/voicium_witty_carousel_page1_img1.png"
                  alt="AI Lead Qualification"
                  className="relative w-full max-w-md mx-auto rounded-2xl"
                />
              </div>
            </FloatingElement>
          </div>
        </div>
      </header>

      {/* Social Proof Bar */}
      <section className="py-12 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">
            Trusted by Real Estate Business Owners
          </p>
        </div>
        <div className="relative flex overflow-x-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-24 z-10 bg-[#0a0a0a]/80 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-24 z-10 bg-[#0a0a0a]/80 pointer-events-none"></div>
          <div className="flex animate-scroll-x w-max">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center">
                {[
                  "SmallBayFlex",
                  "AgentWorkForce",
                  "Diamond Equity",
                  "CrowdCopia",
                  "Property Pro",
                ].map((name, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center mx-12 md:mx-16 min-w-[150px] h-16 opacity-60 hover:opacity-100 transition-all duration-300"
                  >
                    <span className="text-slate-400 font-medium">{name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Real Estate Teams Waste Hours
              <br />
              <span className="text-rose-500">Calling The Wrong People</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "👻",
                title: "Calling dead leads every day",
                desc: "Wasting energy on people who will never convert.",
              },
              {
                icon: "📊",
                title: "No way to know who is serious",
                desc: "Scaling without data is just guessing.",
              },
              {
                icon: "💀",
                title: "CRM filled with messy, outdated data",
                desc: "Leads rot when they aren't contacted immediately.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 text-center hover:border-rose-500/30 transition-colors"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xl text-slate-300">
              Most teams talk to{" "}
              <span className="text-rose-500 font-bold">50+ people</span> to
              find{" "}
              <span className="text-cyan-400 font-bold">
                3 serious prospects
              </span>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section
        id="features"
        className="py-20 md:py-28 px-6 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-cyan-400">Our Offered Solution</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              We flip the funnel. Instead of you calling 50 leads to find 3
              prospects, we handle the 50, so you only talk to the 3.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <img
                src="/voicium/voicium_witty_carousel_page2_img1.png"
                alt="AI Solution"
                className="w-full max-w-lg mx-auto rounded-2xl"
              />
            </div>
            <div className="flex-1">
              <div className="space-y-8">
                {[
                  {
                    title: "We Scrape Targeted Leads",
                    desc: "Don't have a list? No problem. We scrape and verify high-quality leads for you.",
                  },
                  {
                    title: "Our AI Agents Start Calling",
                    desc: "Our AI agents dial thousands of numbers simultaneously with natural, human-like conversations.",
                  },
                  {
                    title: "Analysis of Every Call",
                    desc: "We analyze every call instantly, extract intent, and qualify leads based on your criteria.",
                  },
                  {
                    title: "Qualified Leads Dashboard",
                    desc: "Qualified leads pushed to your dashboard immediately with our built-in Mini CRM.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-cyan-400 rounded-lg flex items-center justify-center text-[#0a0a0a] font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        id="process"
        className="py-20 md:py-28 px-6 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Your New Lead Qualification{" "}
              <span className="text-cyan-400">Workflow</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Lead Summoning",
                desc: "We find fresh leads or you upload your own",
                img: "/voicium/voicium_witty_carousel_page3_img1.png",
              },
              {
                step: "02",
                title: "AI Interrogation",
                desc: "Natural conversations identifying true intent",
                img: "/voicium/voicium_carousel_page3_img1.png",
              },
              {
                step: "03",
                title: "Motivation Meter",
                desc: "Score leads based on actual interest",
                img: "/voicium/voicium_carousel_page4_img1.png",
              },
              {
                step: "04",
                title: "Hot Lead Delivery",
                desc: "Only the motivated land in your inbox",
                img: "/voicium/voicium_witty_carousel_page5_img1.png",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 text-center hover:border-cyan-400/30 transition-colors"
              >
                <div className="text-4xl font-bold text-cyan-400 mb-4">
                  {item.step}
                </div>
                <div className="w-20 h-20 mx-auto mb-4 rounded-xl overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <AnimatedCounter end={85} suffix="%" />
              <div className="text-slate-400 text-sm">
                Lead Qualification Rate
              </div>
            </div>
            <div>
              <AnimatedCounter end={1000} suffix="+" />
              <div className="text-slate-400 text-sm">Calls Per Day</div>
            </div>
            <div>
              <AnimatedCounter end={300} suffix="%" />
              <div className="text-slate-400 text-sm">Time Saved</div>
            </div>
            <div>
              <AnimatedCounter end={95} suffix="%" />
              <div className="text-slate-400 text-sm">
                Customer Satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-28 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <FloatingElement>
                <img
                  src="/voicium/voicium_witty_carousel_page4_img1.png"
                  alt="Benefits"
                  className="w-full max-w-lg mx-auto rounded-2xl"
                />
              </FloatingElement>
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
                      <CheckIcon className="w-4 h-4 text-[#0a0a0a]" />
                    </div>
                    <span className="text-lg text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Gallery */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See The <span className="text-cyan-400">Transformation</span>
            </h2>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {[
              "/voicium/voicium_carousel_page1_img1.png",
              "/voicium/voicium_carousel_page2_img1.png",
              "/voicium/voicium_carousel_page3_img1.png",
              "/voicium/voicium_carousel_page4_img1.png",
              "/voicium/voicium_carousel_page5_img1.png",
              "/voicium/voicium_witty_carousel_page1_img1.png",
              "/voicium/voicium_witty_carousel_page2_img1.png",
              "/voicium/voicium_witty_carousel_page3_img1.png",
              "/voicium/voicium_witty_carousel_page4_img1.png",
              "/voicium/voicium_witty_carousel_page5_img1.png",
            ].map((src, i) => (
              <div key={i} className="flex-shrink-0 snap-center">
                <img
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-xl border border-white/5 hover:border-cyan-400/30 transition-colors"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 md:py-28 px-6 border-t border-white/5"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Scalable <span className="text-cyan-400">Pricing</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-medium text-slate-400 mb-2">
                Starter Plan
              </h3>
              <div className="text-3xl font-bold text-white mb-1">
                $990
                <span className="text-lg font-normal text-slate-400">/mo</span>
              </div>
              <p className="text-sm text-slate-500 mb-6">(No Setup Charge)</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckIcon className="w-4 h-4 text-cyan-400" />
                  AI Calling Engine
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckIcon className="w-4 h-4 text-cyan-400" />
                  Unlimited Calls (Mon-Sat)
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckIcon className="w-4 h-4 text-cyan-400" />
                  Daily Transcription Reports
                </li>
              </ul>
              <button
                onClick={() => setIsCalOpen(true)}
                className="w-full py-3 rounded-full border border-slate-700 font-medium hover:bg-slate-800 transition-colors"
              >
                Book a Live Demo
              </button>
            </div>

            {/* Growth - Featured */}
            <div className="bg-slate-900 border border-cyan-400/30 rounded-2xl p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-400 text-[#0a0a0a] px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="text-lg font-medium text-slate-400 mb-2">
                Growth Plan
              </h3>
              <div className="text-3xl font-bold text-white mb-1">
                $1770
                <span className="text-lg font-normal text-slate-400">/mo</span>
              </div>
              <p className="text-sm text-slate-500 mb-6">(No Setup Charge)</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckIcon className="w-4 h-4 text-cyan-400" />
                  Everything in Starter
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckIcon className="w-4 h-4 text-cyan-400" />
                  Lead Scoring + Dashboard
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckIcon className="w-4 h-4 text-cyan-400" />
                  CRM + Analytics
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckIcon className="w-4 h-4 text-cyan-400" />
                  Full Automation Workflow
                </li>
              </ul>
              <a
                href="https://www.voicium.live/#features"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-full bg-cyan-400 text-[#0a0a0a] font-bold text-center hover:bg-cyan-300 transition-colors"
              >
                Start 2-Day Free Trial
              </a>
            </div>

            {/* Enterprise */}
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-medium text-slate-400 mb-2">
                Enterprise
              </h3>
              <div className="text-3xl font-bold text-white mb-1">Custom</div>
              <p className="text-sm text-slate-500 mb-6">For large teams</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckIcon className="w-4 h-4 text-cyan-400" />
                  Custom Workflows
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckIcon className="w-4 h-4 text-cyan-400" />
                  Dedicated Setup
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckIcon className="w-4 h-4 text-cyan-400" />
                  Multi-team Usage
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckIcon className="w-4 h-4 text-cyan-400" />
                  Priority Support
                </li>
              </ul>
              <button
                onClick={() => setIsCalOpen(true)}
                className="w-full py-3 rounded-full border border-slate-700 font-medium hover:bg-slate-800 transition-colors"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to <span className="text-cyan-400">Flip Your Funnel?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Stop letting your lead list haunt your sales. Start your 2-day free
            trial today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="https://www.voicium.live/#features"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#0a0a0a] px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20"
            >
              Start 2-Day Free Trial
            </a>
            <button
              onClick={() => setIsCalOpen(true)}
              className="px-8 py-4 rounded-full text-lg font-bold border border-slate-700 hover:bg-slate-800 transition-colors"
            >
              Book a Live Demo
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
            <span>✓ No credit card required</span>
            <span>✓ Setup in 24 hours</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-[#0a0a0a] font-bold">V</span>
              </div>
              <span className="text-lg font-bold text-cyan-400">Voicium</span>
            </div>
            <div className="text-slate-500 text-sm">
              © 2024 Voicium. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
