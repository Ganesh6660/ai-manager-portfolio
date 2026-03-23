"use client";

import { useState, useEffect } from "react";
import ChatModal from "@/components/ChatModal";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (chatOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [chatOpen]);

  return (
    <>
      <CustomCursor />

      <main className="min-h-screen min-h-[100dvh] bg-bg flex flex-col">

        {/* ── Nav ── */}
        <nav className={`flex justify-between items-center px-6 md:px-16 pt-8 flex-shrink-0 opacity-0 ${mounted ? "animate-fade-in" : ""}`}>
          <span className="font-mono text-xs text-muted tracking-widest uppercase">
            Portfolio 2026
          </span>
          <a
            href="https://drive.google.com/file/d/1iLX4mlX0PY2bVm2a7lv3jC_C1N-wB4w0/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-accent transition-colors duration-300 tracking-widest uppercase border border-border px-3 py-2 hover:border-accent/40"
          >
            Resume ↗
          </a>
        </nav>

        {/* ── Hero — two columns on desktop, stacked on mobile ── */}
        <section className="flex-1 flex items-center px-6 md:px-16 py-8 md:py-0">
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* ── LEFT — Photo + identity ── */}
            <div className="flex flex-col">

              {/* Photo */}
              <div className={`mb-7 opacity-0 ${mounted ? "animate-fade-up" : ""}`} style={{ animationDelay: "100ms" }}>
                <div className="relative w-28 h-28 md:w-36 md:h-36">
                  <div className="absolute inset-0 rounded-full border border-accent/20 scale-110" />
                  <div className="w-full h-full rounded-full overflow-hidden border border-border">
                    <img
                      src="/GaneshRP.jpg"
                      alt="Ganesh R Pattanshetti"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "center 10%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className={`inline-flex items-center gap-2 mb-5 opacity-0 ${mounted ? "animate-fade-up" : ""}`} style={{ animationDelay: "150ms" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-muted tracking-wider">
                  Available for opportunities
                </span>
              </div>

              {/* Name */}
              <h1
                className={`font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-none text-text mb-4 opacity-0 ${mounted ? "animate-fade-up" : ""}`}
                style={{ animationDelay: "200ms" }}
              >
                Ganesh
                <br />
                <span className="italic font-normal text-accent">
                  R
                </span>
                <br />
                <span className="italic font-normal text-accent">
                  Pattanshetti
                </span>
              </h1>

              {/* Title */}
              <p
                className={`font-mono text-xs text-muted tracking-widest uppercase mb-6 opacity-0 ${mounted ? "animate-fade-up" : ""}`}
                style={{ animationDelay: "250ms" }}
              >
                Software Engineer · Aspiring Data Scientist
              </p>

              {/* Social links */}
              <div className={`flex gap-4 opacity-0 ${mounted ? "animate-fade-up" : ""}`} style={{ animationDelay: "300ms" }}>
                <a href="https://github.com/Ganesh6660" target="_blank" rel="noopener noreferrer"
                  className="font-mono text-xs text-muted hover:text-accent transition-colors duration-300">
                  GitHub
                </a>
                <span className="text-border">·</span>
                <a href="https://www.linkedin.com/in/ganesh-pattanshetti-479b71312" target="_blank" rel="noopener noreferrer"
                  className="font-mono text-xs text-muted hover:text-accent transition-colors duration-300">
                  LinkedIn
                </a>
                <span className="text-border">·</span>
                <a href="mailto:ganesh.r.pattanshetti@gmail.com"
                  className="font-mono text-xs text-muted hover:text-accent transition-colors duration-300">
                  Email
                </a>
              </div>
            </div>

            {/* ── RIGHT — Tagline + CTA + Skills snapshot ── */}
            <div className="flex flex-col">

              {/* Divider line — desktop only */}
              <div className={`hidden md:block w-8 h-px bg-border mb-8 opacity-0 ${mounted ? "animate-fade-up" : ""}`} style={{ animationDelay: "200ms" }} />

              {/* Tagline */}
              <p
                className={`text-muted text-base md:text-lg font-light leading-relaxed mb-8 opacity-0 ${mounted ? "animate-fade-up" : ""}`}
                style={{ animationDelay: "250ms" }}
              >
                CS graduate passionate about AI, data, and building things that
                matter. I write clean code, think in systems, and learn fast.
              </p>

              {/* Skills snapshot */}
              <div className={`mb-10 opacity-0 ${mounted ? "animate-fade-up" : ""}`} style={{ animationDelay: "300ms" }}>
                <p className="font-mono text-[10px] text-muted/60 tracking-widest uppercase mb-3">
                  Core Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Python", "React.js", "SQL", "Machine Learning", "PHP", "Data Analysis"].map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs text-muted border border-border px-3 py-1 hover:border-accent/40 hover:text-accent transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className={`opacity-0 ${mounted ? "animate-fade-up" : ""}`} style={{ animationDelay: "380ms" }}>
                <button
                  onClick={() => setChatOpen(true)}
                  className="group inline-flex items-center gap-3 bg-surface border border-border px-6 py-4 text-sm font-mono tracking-wide text-text hover:border-accent/50 transition-all duration-500 hover:bg-accent/5 active:scale-95"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  Talk to my AI Manager
                  <span className="text-muted group-hover:text-accent transition-colors duration-300">→</span>
                </button>
                <p className="mt-3 font-mono text-xs text-muted/50 ml-1">
                  Ask about projects, skills, or availability
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ── Footer ── */}
        <footer
          className={`flex justify-between items-center px-6 md:px-16 pb-6 flex-shrink-0 opacity-0 ${mounted ? "animate-fade-in" : ""}`}
          style={{ animationDelay: "500ms" }}
        >
          <span className="font-mono text-xs text-muted/40">
            © 2026 Ganesh R Pattanshetti
          </span>
          <span className="font-mono text-xs text-muted/40">
            Dharwad, Karnataka, India
          </span>
        </footer>

      </main>

      <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
