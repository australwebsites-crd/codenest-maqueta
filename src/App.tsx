/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { ArrowRight, Menu, X, Code2, Sparkles, Terminal, ChevronRight, Play, Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [activeNav, setActiveNav] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Initialize HLS Stream
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const streamUrl =
      'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8';

    let hlsInstance: Hls | null = null;

    if (Hls.isSupported()) {
      hlsInstance = new Hls({
        enableWorker: false, // ensures stability in sandboxed environments
        lowLatencyMode: true,
      });

      hlsInstance.loadSource(streamUrl);
      hlsInstance.attachMedia(video);

      hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Handled autoplay restrictions
        });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Safari HLS
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, []);

  const navLinks = ['PROJECTS', 'BLOG', 'ABOUT', 'RESUME'];

  return (
    <div className="relative min-h-screen w-full bg-[#070b0a] text-white font-inter overflow-x-hidden flex flex-col justify-between selection:bg-[#5ed29c]/25 selection:text-[#5ed29c]">
      {/* 1. BACKGROUND & LAYOUT */}
      
      {/* Full-screen HLS Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          muted={isVideoMuted}
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
        />

        {/* Dark linear gradient from the left (#070b0a to transparent) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b0a] via-[#070b0a]/75 to-transparent z-[1]" />

        {/* Bottom-up gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a] via-[#070b0a]/65 to-transparent z-[2]" />

        {/* Subtle radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,11,10,0.5)_100%)] z-[2]" />
      </div>

      {/* Grid System: Three thin vertical grid lines (white/10 opacity) at 25%, 50%, 75% marks */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-[3] overflow-hidden">
        <div className="hidden md:block absolute top-0 bottom-0 left-1/4 w-[1px] bg-white/10" />
        <div className="hidden md:block absolute top-0 bottom-0 left-2/4 w-[1px] bg-white/10" />
        <div className="hidden md:block absolute top-0 bottom-0 left-3/4 w-[1px] bg-white/10" />
      </div>

      {/* Central Glow: Large horizontal SVG ellipse glow with cyan/dark green hue and 25px Gaussian blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[340px] pointer-events-none z-[4] overflow-visible flex items-center justify-center opacity-85">
        <svg
          viewBox="0 0 1000 300"
          className="w-full h-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="centralGlowBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="25" />
            </filter>
            <radialGradient id="ellipseRadial" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#5ed29c" stopOpacity="0.48" />
              <stop offset="45%" stopColor="#14b8a6" stopOpacity="0.32" />
              <stop offset="75%" stopColor="#08332b" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#070b0a" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="horizontalAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#064e3b" stopOpacity="0" />
              <stop offset="30%" stopColor="#0f766e" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#5ed29c" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#0f766e" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
            </linearGradient>
          </defs>
          <ellipse
            cx="500"
            cy="70"
            rx="450"
            ry="90"
            fill="url(#ellipseRadial)"
            filter="url(#centralGlowBlur)"
          />
          <ellipse
            cx="500"
            cy="50"
            rx="320"
            ry="45"
            fill="url(#horizontalAccent)"
            filter="url(#centralGlowBlur)"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* 4. GLOBAL NAVIGATION */}
      <header className="relative z-30 w-full border-b border-white/[0.06] backdrop-blur-md bg-[#070b0a]/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Minimalist White Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="CodeNest Home"
          >
            <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:border-[#5ed29c]/50 group-hover:bg-[#5ed29c]/10">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white transition-colors duration-300 group-hover:text-[#5ed29c]"
              >
                <path
                  d="M8 6L3 12L8 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 6L21 12L16 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
            </div>
            <span className="font-inter font-bold text-lg tracking-wider text-white">
              CODENEST
            </span>
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveNav(link);
                }}
                className={`font-inter text-[16px] tracking-wider transition-colors duration-200 uppercase ${
                  activeNav === link
                    ? 'text-[#5ed29c]'
                    : 'text-white/80 hover:text-[#5ed29c]'
                }`}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Right Header Extras */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsVideoMuted(!isVideoMuted)}
              className="p-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors"
              title={isVideoMuted ? 'Unmute ambient video' : 'Mute ambient video'}
              aria-label="Toggle ambient sound"
            >
              {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#5ed29c]" />}
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border border-white/20 text-white/90 hover:text-white hover:border-[#5ed29c] transition-colors"
            >
              Enrollment 2025
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setIsVideoMuted(!isVideoMuted)}
              className="p-2 rounded-full border border-white/10 text-white/60"
              aria-label="Toggle video sound"
            >
              {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#5ed29c]" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg text-white hover:text-[#5ed29c] transition-colors focus:outline-none"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Dark Overlay for Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#070b0a]/98 backdrop-blur-2xl flex flex-col justify-between p-8 md:hidden transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-[#5ed29c]" />
              </div>
              <span className="font-inter font-bold tracking-wider text-white text-lg">
                CODENEST
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full border border-white/10 text-white hover:text-[#5ed29c] transition-colors focus:outline-none"
              aria-label="Close mobile menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-7 my-auto">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveNav(link);
                  setMobileMenuOpen(false);
                }}
                className="font-inter text-2xl font-bold tracking-wide text-white/90 hover:text-[#5ed29c] transition-colors flex items-center justify-between group"
              >
                <span>{link}</span>
                <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-[#5ed29c] transition-colors" />
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setModalOpen(true);
              }}
              className="w-full py-4 rounded-full bg-[#5ed29c] text-[#070b0a] font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-xs text-white/40">
              © 2025 CodeNest Inc. All rights reserved.
            </p>
          </div>
        </div>
      )}

      {/* MAIN HERO SECTION */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-16 md:pt-24 pb-20 md:pb-28 flex flex-col justify-center flex-grow">
        <div className="max-w-4xl relative">
          
          {/* 2. THE LIQUID GLASS CARD */}
          {/* Positioned above the main headline, shifted exactly 50px upwards using translate-y-[-50px] */}
          <div className="w-[200px] h-[200px] translate-y-[-50px] liquid-glass rounded-2xl p-4 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-default mb-2 select-none group">
            {/* Top row: [ 2025 ] tag (14px) */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[14px] text-white/80 font-medium tracking-widest">
                [ 2025 ]
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5ed29c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5ed29c]"></span>
              </span>
            </div>

            {/* Middle: 'Taught by Industry Professionals' headline (18px, using Instrument Serif italic for 'Industry') */}
            <div className="my-auto py-1">
              <h2 className="text-[18px] leading-[1.25] text-white font-medium">
                Taught by{' '}
                <span className="font-instrument-serif italic text-[22px] font-normal tracking-wide text-white underline decoration-[#5ed29c]/40 decoration-1 underline-offset-2">
                  Industry
                </span>{' '}
                Professionals
              </h2>
            </div>

            {/* Bottom: small description (11px) */}
            <div>
              <p className="text-[11px] leading-[1.35] text-white/60">
                Direct mentorship from Staff & Principal engineers at top-tier software companies.
              </p>
            </div>
          </div>

          {/* 3. HERO CONTENT & TYPOGRAPHY */}
          <div className="space-y-6">
            {/* Eyebrow: 'Career-Ready Curriculum' in Plus Jakarta Sans, bold, 11px, color #5ed29c */}
            <div className="inline-flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#5ed29c]" />
              <p className="font-plus-jakarta font-bold text-[11px] text-[#5ed29c] uppercase tracking-[0.22em]">
                Career-Ready Curriculum
              </p>
            </div>

            {/* Main Headline: 'LAUNCH YOUR CODING CAREER.' in Inter Extra Bold, uppercase, tracking-tight. Scale from 40px to 72px. Final period green (#5ed29c). */}
            <h1 className="font-inter font-extrabold uppercase tracking-tight text-[40px] md:text-[72px] leading-[1.04] text-white">
              LAUNCH YOUR CODING CAREER<span className="text-[#5ed29c]">.</span>
            </h1>

            {/* Description: 'Master in-demand coding skills...' in Inter, 14px, 70% white opacity, max-width 512px */}
            <p className="font-inter text-[14px] text-white/70 max-w-[512px] leading-relaxed">
              Master in-demand coding skills through immersive, production-grade project builds. Bridge the gap between theory and industry engineering with accelerated full-stack cohorts.
            </p>

            {/* Primary CTA: 'Get Started' button with an ArrowRight icon. Rounded-full, background #5ed29c, text #070b0a, uppercase, bold. */}
            <div className="pt-2 flex flex-wrap items-center gap-5">
              <button
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#5ed29c] hover:bg-[#4ecd93] text-[#070b0a] uppercase font-bold text-sm tracking-wider transition-all duration-200 shadow-[0_0_30px_rgba(94,210,156,0.35)] hover:shadow-[0_0_40px_rgba(94,210,156,0.55)] active:scale-[0.98] cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white/90 text-sm font-medium tracking-wide border border-white/10 hover:border-white/20 transition-all cursor-pointer backdrop-blur-sm"
              >
                <Terminal className="w-4 h-4 text-[#5ed29c]" />
                <span>Explore Syllabus</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar complementing the hero */}
        <div className="mt-16 pt-8 border-t border-white/[0.07] grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
          <div>
            <div className="font-mono text-2xl font-bold text-white tracking-tight">
              94.2<span className="text-[#5ed29c]">%</span>
            </div>
            <div className="text-xs text-white/50 uppercase tracking-wider mt-1">
              Hiring Placement
            </div>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-white tracking-tight">
              $128k<span className="text-[#5ed29c]">+</span>
            </div>
            <div className="text-xs text-white/50 uppercase tracking-wider mt-1">
              Avg. Starting Salary
            </div>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-white tracking-tight">
              1 : 6
            </div>
            <div className="text-xs text-white/50 uppercase tracking-wider mt-1">
              Mentor Ratio
            </div>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-white tracking-tight">
              16 <span className="text-[#5ed29c]">Wks</span>
            </div>
            <div className="text-xs text-white/50 uppercase tracking-wider mt-1">
              Accelerated Track
            </div>
          </div>
        </div>
      </main>

      {/* Footer subtle brand mark */}
      <footer className="relative z-20 border-t border-white/[0.04] py-6 px-6 lg:px-12 text-xs text-white/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#5ed29c]" />
          <span>CodeNest Cohort 2025 • Admissions Active</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#projects" className="hover:text-white transition-colors">PROJECTS</a>
          <a href="#blog" className="hover:text-white transition-colors">BLOG</a>
          <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
          <a href="#resume" className="hover:text-white transition-colors">RESUME</a>
        </div>
      </footer>

      {/* Modal for Enrollment / Syllabus */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0c1210] border border-white/15 rounded-2xl p-6 md:p-8 shadow-2xl">
            <button
              onClick={() => {
                setModalOpen(false);
                setFormSubmitted(false);
              }}
              className="absolute top-5 right-5 p-1.5 rounded-full text-white/50 hover:text-white border border-white/10 hover:border-white/30 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-[#5ed29c] font-plus-jakarta text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Winter 2025 Admissions</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
              Launch Your Engineering Career
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Join the elite engineering cohort mentored by principal developers from Stripe, Airbnb, and Google.
            </p>

            {formSubmitted ? (
              <div className="p-4 rounded-xl bg-[#5ed29c]/10 border border-[#5ed29c]/30 text-center space-y-2">
                <div className="text-[#5ed29c] font-semibold text-sm">Application Received</div>
                <p className="text-xs text-white/70">
                  Our admissions lead will reach out with your curriculum details and enrollment timeline.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setFormSubmitted(false);
                  }}
                  className="mt-3 px-5 py-2 text-xs font-bold uppercase tracking-wider bg-[#5ed29c] text-[#070b0a] rounded-full"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Rivera"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#5ed29c] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#5ed29c] text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#5ed29c] hover:bg-[#4ecd93] text-[#070b0a] uppercase font-bold text-sm tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(94,210,156,0.3)] mt-2 cursor-pointer"
                >
                  Apply for Cohort
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
