# 🤖 AI Portfolio — Your Personal AI Manager

A minimal, dark portfolio with an AI chat interface that answers questions about you on your behalf. Built with Next.js, Tailwind CSS, and Groq AI (free, no card needed).

---

## ✨ Features

- **AI Manager** — Chat interface powered by Groq (Llama 3.1, completely free)
- **Markdown rendering** — AI responses render with bold, bullets, links — not plain text
- **Dark minimal design** — Clean typography, custom cursor, noise texture
- **Streaming responses** — Real-time character-by-character AI replies
- **Suggested questions** — Pre-filled prompts to get visitors started
- **Fully customizable** — One file to edit for all your info
- **Deploy in minutes** — Works perfectly on Vercel (free tier)

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/ai-portfolio.git
cd ai-portfolio
npm install
```

### 2. Get a Free Groq API Key (No card needed)

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up with your Google account
3. Go to **API Keys** → **Create API Key**
4. Copy the key — it looks like `gsk_...`

### 3. Set Up Environment

```bash
cp .env.example .env.local
```

Open `.env.local` and paste your key:
```
GROQ_API_KEY=gsk_your-key-here
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📝 Customizing Your Content

**Everything the AI knows about you lives in one file:**

```
lib/portfolio-data.ts
```

Edit the `PORTFOLIO_OWNER` object:

```ts
export const PORTFOLIO_OWNER = {
  name: "Your Name",           // ← Change this
  title: "Your Title",         // ← Change this
  email: "you@email.com",      // ← Change this
  github: "https://...",       // ← Change this
  linkedin: "https://...",     // ← Change this

  bio: `Your bio here...`,     // ← Change this

  skills: {
    frontend: ["React", ...],  // ← Your skills
    backend: ["Node.js", ...],
  },

  projects: [
    {
      name: "Project Name",
      description: "What it does",
      tech: ["React", "..."],
      link: "https://...",
      status: "Live",
    }
  ],

  // ... experience, availability, personality
};
```

The AI Manager instantly gets smarter with everything you add here.

> ⚠️ Note: `lib/portfolio-data.ts` only controls what the **AI knows**.
> The visible text on the landing page is in `app/page.tsx` — update both!

---

## 🗺️ File Map — What Controls What

| File | What it controls |
|------|-----------------|
| `lib/portfolio-data.ts` | ⭐ AI Manager's knowledge — skills, projects, bio |
| `app/page.tsx` | Landing page — your name, tagline, links, status |
| `app/layout.tsx` | Browser tab title & SEO description |
| `components/ChatModal.tsx` | Chat UI — header name, greeting, suggested questions |
| `app/globals.css` | Colors, fonts, animations |
| `tailwind.config.js` | Design tokens (colors, font names) |
| `app/api/chat/route.ts` | AI backend — model, token limits |
| `.env.local` | Your secret API key (never commit this) |

---

## 🌐 Deploying to Vercel (Free)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add environment variable:
   - Key: `GROQ_API_KEY`
   - Value: `gsk_your-key-here`
4. Click **Deploy** ✅

Your site will be live at `yourname.vercel.app` in ~2 minutes.

---

## 🎨 Customizing the Design

### Changing the accent color
In `app/globals.css`:
```css
--accent: #e8d5b7;  /* warm gold — swap to any hex you like */
```
Also update the same color in `tailwind.config.js` under `colors.accent`.

### Changing fonts
Replace the Google Fonts `@import` URL at the top of `app/globals.css` and update the font family names below it.

### Adding your photo
1. Drop your photo into the `/public/` folder as `photo.jpg`
2. In `app/page.tsx`, add inside the hero section:
```tsx
import Image from "next/image";

<Image
  src="/photo.jpg"
  alt="Your Name"
  width={120}
  height={120}
  className="rounded-full border border-border mb-6"
/>
```

---

## 💡 Tips

- **Smarter AI** — The more detail you put in `portfolio-data.ts`, the better it answers tough recruiter questions
- **Test it hard** — Run locally and ask your AI Manager things like *"Why should I hire you?"* or *"What's your biggest weakness?"* — tune the system prompt until you're happy
- **One key, many projects** — Your `gsk_...` key works across all your projects. Best practice is to create a separate key per project from [console.groq.com](https://console.groq.com)
- **Keep keys secret** — Never paste your API key directly in code. Always use `.env.local` — it's already in `.gitignore` so it won't be pushed to GitHub

---

## 📁 Project Structure

```
ai-portfolio/
├── app/
│   ├── api/chat/route.ts     ← AI backend (Groq API call)
│   ├── globals.css           ← Global styles, colors, fonts
│   ├── layout.tsx            ← HTML shell + SEO metadata
│   └── page.tsx              ← Landing page (edit your name here)
├── components/
│   ├── ChatModal.tsx         ← Chat UI with markdown rendering
│   └── CustomCursor.tsx      ← Custom cursor animation
├── lib/
│   └── portfolio-data.ts     ← ⭐ AI brain — your info goes here
├── public/                   ← Put your photo here
├── .env.example              ← Copy to .env.local
├── .env.local                ← Your secret keys (not on GitHub)
└── README.md
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | ✅ Yes | Free API key from [console.groq.com](https://console.groq.com) |

---

## 🆓 Groq Free Tier Limits

| | |
|-|-|
| Cost | Completely free |
| Card needed | ❌ No |
| Model | Llama 3.1 8B Instant |
| Requests | 14,400 per day / 30 per minute |
| Works in India | ✅ Yes |

More than enough for a portfolio site.

---

Built with ❤️ using Next.js + Groq AI