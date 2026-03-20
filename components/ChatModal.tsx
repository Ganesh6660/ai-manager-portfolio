"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What are your strongest skills?",
  "Tell me about your projects",
  "Are you open to new roles?",
  "How do you approach a new project?",
];

// Renders AI markdown responses with styled elements
function MarkdownMessage({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Bold → accent color
        strong: ({ children }) => (
          <strong className="font-semibold text-accent">{children}</strong>
        ),
        // Italic → slightly dimmed
        em: ({ children }) => (
          <em className="italic text-text/70">{children}</em>
        ),
        // Paragraphs with spacing
        p: ({ children }) => (
          <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
        ),
        // Bullet lists
        ul: ({ children }) => (
          <ul className="mt-1 mb-2 space-y-1 pl-1">{children}</ul>
        ),
        li: ({ children }) => (
          <li className="flex gap-2 items-start">
            <span className="text-accent mt-1 flex-shrink-0">▸</span>
            <span>{children}</span>
          </li>
        ),
        // Numbered lists
        ol: ({ children }) => (
          <ol className="mt-1 mb-2 space-y-1 list-decimal pl-4">{children}</ol>
        ),
        // Inline code
        code: ({ children }) => (
          <code className="bg-accent/10 text-accent font-mono text-xs px-1.5 py-0.5 rounded">
            {children}
          </code>
        ),
        // Headings (rare but just in case)
        h3: ({ children }) => (
          <h3 className="font-display text-accent font-medium text-base mb-1 mt-2">
            {children}
          </h3>
        ),
        // Links
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 hover:text-accent/70 transition-colors"
          >
            {children}
          </a>
        ),
        // Horizontal rule as divider
        hr: () => <hr className="border-border my-2" />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [visible, setVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Animate in/out
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      // Delay focus slightly on mobile to avoid keyboard jump
      setTimeout(() => inputRef.current?.focus(), 400);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  // Close on Escape (desktop)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMsg: Message = { role: "user", content: trimmed };
      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setInput("");
      setIsLoading(true);
      setStreamingText("");

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Request failed");
        }

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let full = "";

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            full += chunk;
            setStreamingText(full);
          }
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: full },
        ]);
        setStreamingText("");
      } catch (err: any) {
        if (err.name === "AbortError") return;
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, I ran into an issue. Make sure the API key is set up correctly in `.env.local`.",
          },
        ]);
        setStreamingText("");
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  if (!isOpen && !visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal
          Mobile: slides up from bottom, full width, 92% height
          Desktop: centered, max-w-2xl, 75% height
      */}
      <div
        className={`fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-8 transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div
          className="w-full md:max-w-2xl bg-surface border border-border flex flex-col overflow-hidden shadow-2xl"
          style={{
            height: "92dvh",
            maxHeight: "92dvh",
          }}
          // Prevent tap-through to backdrop on the modal itself
          onClick={(e) => e.stopPropagation()}
        >
          {/* Handle bar — mobile only drag hint */}
          <div className="flex justify-center pt-3 pb-1 md:hidden">
            <div className="w-10 h-1 bg-border rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <span className="text-accent text-xs font-mono">AI</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-surface" />
              </div>
              <div>
                <p className="text-sm font-medium text-text">Ganesh's AI Manager</p>
                <p className="text-xs text-muted font-mono">Always available</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-muted hover:text-text transition-colors duration-200 font-mono text-lg leading-none"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto chat-scroll px-6 py-6 space-y-5">
            {messages.length === 0 && !isLoading && (
              <div className="animate-fade-up">
                {/* Greeting */}
                <div className="flex gap-3 mb-8">
                  <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-accent text-[10px] font-mono">AI</span>
                  </div>
                  <div className="bg-bg border border-border rounded-sm px-4 py-3 max-w-xs">
                    <p className="text-sm text-text leading-relaxed">
                      Hey! I'm Ganesh's AI Manager. Ask me anything about his
                      work, skills, or availability. 👋
                    </p>
                  </div>
                </div>

                {/* Suggested questions */}
                <div className="ml-9">
                  <p className="font-mono text-xs text-muted mb-3 tracking-wider">
                    SUGGESTED
                  </p>
                  {/* 2-col grid on mobile for suggested questions */}
                  <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-xs text-muted border border-border px-3 py-2 hover:border-accent/40 hover:text-accent transition-all duration-200 font-mono"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 animate-slide-in ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-accent text-[10px] font-mono">AI</span>
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-sm text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent/10 border border-accent/20 text-text ml-auto max-w-[80%]"
                      : "bg-bg border border-border text-text/90 max-w-[85%]"
                  }`}
                >
                  {msg.role === "user" ? (
                    msg.content
                  ) : (
                    <MarkdownMessage content={msg.content} />
                  )}
                </div>
              </div>
            ))}

            {/* Streaming message */}
            {(isLoading || streamingText) && (
              <div className="flex gap-3 animate-slide-in">
                <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent text-[10px] font-mono">AI</span>
                </div>
                <div className="bg-bg border border-border px-4 py-3 rounded-sm max-w-[85%] text-sm leading-relaxed text-text/90">
                  {streamingText ? (
                    <>
                      <MarkdownMessage content={streamingText} />
                      <span className="inline-block w-0.5 h-3.5 bg-accent ml-0.5 animate-blink" />
                    </>
                  ) : (
                    <span className="flex gap-1 items-center h-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  )}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input — safe-bottom handles iPhone notch */}
          <div className="flex-shrink-0 border-t border-border px-4 py-3 safe-bottom">
            <form onSubmit={handleSubmit} className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about Alex..."
                disabled={isLoading}
                // font-size 16px prevents iOS auto-zoom on input focus
                className="flex-1 bg-bg border border-border text-text text-base md:text-sm px-4 py-3 outline-none focus:border-accent/40 transition-colors duration-200 placeholder-muted font-sans disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-accent/10 border border-accent/30 text-accent px-4 py-3 text-sm font-mono hover:bg-accent/20 active:bg-accent/30 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                →
              </button>
            </form>
            <p className="font-mono text-[10px] text-muted/40 mt-2 ml-1 hidden md:block">
              Powered by Groq · Press Esc to close
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
