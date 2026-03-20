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

  // Lock body scroll when chat is open (fixes iOS bounce)
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
        {/* Top nav */}
        <nav
          className={`flex justify-between items-center px-6 md:px-16 pt-8 md:pt-10 opacity-0 ${
            mounted ? "animate-fade-in" : ""
          }`}
        >
          <span className="font-mono text-xs text-muted tracking-widest uppercase">
            Portfolio 2026
          </span>
          <a
            href="https://drive.google.com/file/d/1iLX4mlX0PY2bVm2a7lv3jC_C1N-wB4w0/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-accent transition-colors duration-300 tracking-widest uppercase border border-border px-3 py-2 md:px-4 hover:border-accent/40"
          >
            Resume ↗
          </a>
        </nav>

        {/* Hero */}
        <section className="flex-1 flex flex-col justify-center px-6 md:px-16 py-12 md:py-20">
          <div className="max-w-5xl">
            {/* Status badge */}
            <div
              className={`inline-flex items-center gap-2 mb-8 md:mb-10 opacity-0 ${
                mounted ? "animate-fade-up" : ""
              }`}
              style={{ animationDelay: "100ms" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-xs text-muted tracking-wider">
                Available for opportunities
              </span>
            </div>

            {/* Name — scales gracefully from mobile to desktop */}
            <h1
              className={`font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-medium leading-none text-text mb-4 opacity-0 ${
                mounted ? "animate-fade-up" : ""
              }`}
              style={{ animationDelay: "200ms" }}
            >
              Ganesh
              <br />
              <span className="italic font-normal text-accent">R</span>
              <br />
              <span className="italic font-normal text-accent">Pattanshetti</span>
            </h1>

            {/* Title */}
            <p
              className={`font-mono text-xs md:text-sm text-muted tracking-widest uppercase mt-5 mb-10 md:mb-12 opacity-0 ${
                mounted ? "animate-fade-up" : ""
              }`}
              style={{ animationDelay: "300ms" }}
            >
              Software Engineer · Aspiring Data Scientist
            </p>

            {/* Divider */}
            <div
              className={`w-12 md:w-16 h-px bg-border mb-10 md:mb-12 opacity-0 ${
                mounted ? "animate-fade-up" : ""
              }`}
              style={{ animationDelay: "350ms" }}
            />

            {/* Tagline */}
            <p
              className={`text-muted text-base md:text-xl font-light max-w-sm md:max-w-lg leading-relaxed mb-12 md:mb-16 opacity-0 ${
                mounted ? "animate-fade-up" : ""
              }`}
              style={{ animationDelay: "400ms" }}
            >
              CS graduate passionate about AI, data, and building things that
              matter. Quick learner. Entrepreneurial mindset. Open to
              opportunities across India.
            </p>

            {/* CTA Button */}
            <div
              className={`opacity-0 ${mounted ? "animate-fade-up" : ""}`}
              style={{ animationDelay: "500ms" }}
            >
              <button
                onClick={() => setChatOpen(true)}
                className="group relative inline-flex items-center gap-3 md:gap-4 bg-surface border border-border px-6 md:px-8 py-4 md:py-5 text-sm font-mono tracking-wide text-text hover:border-accent/50 transition-all duration-500 hover:bg-accent/5 active:scale-95"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                Talk to my AI Manager
                <span className="text-muted group-hover:text-accent transition-colors duration-300">
                  →
                </span>
              </button>

              <p className="mt-3 md:mt-4 font-mono text-xs text-muted/60 ml-1">
                Ask it anything — projects, skills, availability
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`flex justify-between items-end px-6 md:px-16 pb-8 md:pb-10 safe-bottom opacity-0 ${
            mounted ? "animate-fade-in" : ""
          }`}
          style={{ animationDelay: "600ms" }}
        >
          <div className="flex gap-4 md:gap-6">
            <a
              href="https://github.com/Ganesh6660"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-accent transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ganesh-pattanshetti-479b71312"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-accent transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href="mailto:ganesh.r.pattanshetti@gmail.com"
              className="font-mono text-xs text-muted hover:text-accent transition-colors duration-300"
            >
              Email
            </a>
          </div>
          <span className="font-mono text-xs text-muted/40">© 2026 Ganesh R Pattanshetti</span>
        </footer>
      </main>

      <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
