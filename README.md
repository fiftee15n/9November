# 🌸 Tamal & Diba's Story (৯ নভেম্বর)

> **আমাদের জীবনের সুন্দরতম অধ্যায়গুলোর স্মৃতিময় মানচিত্র ও ভালোবাসার অমলিন গল্প।**  
> *A personalized, interactive digital memory book and story roadmap celebrating Tamal & Diba.*

---

## ✨ Overview

**Tamal & Diba's Story** is an interactive web experience crafted with love to chronicle memories, milestones, and shared moments. Built with **Next.js 16 (App Router)**, **Motion (v13)**, **Tailwind CSS v4**, and **Three.js**, the site combines rich Bengali typography, handcrafted felt-doll art, dynamic 3D physics, and ambient background music.

---

## 🌟 Key Features

### 1. 📜 Typewriter Story (`TypewriterStory`)
- Poetic Bengali narrative recounting how the journey began on campus.
- Real-time character-by-character typewriter effect with custom pause timings and cursor blinking.
- **Cinematic Auto-Reveal**: Seamlessly and slowly scrolls the viewport down to bring the Story Map into view upon story completion.

### 2. 🗺️ Illustrated Story Map (`OurStoryMap` — ৪৪টি মাইলস্টোন)
- **44 Handcrafted Milestones**: Tracking every significant memory from the first encounter in September 2021 to 2024.
- **3D Alive Photo Cards (`MapPhotoCard`)**:
  - Interactive mouse-tracking 3D tilt with damped spring physics.
  - Realistic specular light reflection overlay on hover.
  - Alternating organic paper tilts (`rotateZ`), dashed sticker borders, and ambient colored halo glow.
- **Fullscreen Cinema Modal**:
  - Click any card to expand into an immersive darkroom cinema view.
  - Complete with high-resolution image viewing, location tags, dates, and poetic descriptions.
  - Keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`) and smooth slide transitions.
- **Hand-Drawn Road Map Arrows (`MapDoodles`)**:
  - Connecting curving SVG paths guiding the visitor through alternating left-and-right milestone stops.
  - Themed doodle icons (`heart`, `camera`, `sparkles`, `flower`, `coffee`, `hiking`, `cabin`, `video`, etc.).

### 3. 🎵 Ambient Music Experience (`MusicToggle` & `MusicContext`)
- Embedded background score (`music.webm` / `music.m4a`) creating an emotional atmosphere.
- Top-right floating glassmorphism audio player with animated soundwave visualizer and mute/play toggle.
- Synchronized with the story flow to start playing automatically on typewriter completion.

### 4. 💌 Chirkut & Memories (`/chirkut`)
- Collection of heartfelt love notes and handwritten-style letters with soft pastel styling and Bengali typography.

### 5. ✨ Icche / Wishes (`/icche`, `/ecche`)
- Shared wishlist and dream bucket list celebrating future goals and aspirations.

### 6. 🤝 Hat Dhoro (`/hatdhoro`, `/hat-dhora`)
- Interactive digital hand-holding experience symbolizing presence and emotional connection across distances.

### 7. 🪐 3D Memory World (`/playground` — `MemoryWorld3D`)
- Interactive 3D memory cosmos built with **Three.js** and **React Three Fiber**.
- Floating photo planes, orbit controls, starfields, and particle effects.

### 8. 🎨 Design Aesthetics & Micro-Interactions
- **Typography**: Optimized typography pairing **Hind Siliguri** (`--font-bengali`) for Bengali text, alongside **Geist Sans/Mono** and **Overused Grotesk**.
- **Dark & Light Mode**: Seamless theme toggling with smooth circular mask animations via the CSS View Transitions API (`next-themes`).
- **Floating Dock (`DockBar`)**: Smooth macOS-style navigation dock with spring physics and tooltips.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16.3.1](https://nextjs.org/) (App Router, Turbopack, Static Export) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **UI Library** | [React 19.2.8](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), CSS View Transitions, Glassmorphism |
| **Animation** | [Motion (Framer Motion v13.1.0)](https://motion.dev/) |
| **3D & Canvas** | [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei) |
| **Icons** | [Lucide React](https://lucide.dev/), Morphicons, Custom SVG Doodles |
| **Audio** | HTML5 Audio, React Context |

---

## 📁 Project Structure

```text
├── app/
│   ├── layout.tsx             # Root layout with fonts, ThemeProvider, MusicProvider
│   ├── page.tsx               # Homepage: Typewriter Story & OurStoryMap
│   ├── globals.css            # Tailwind CSS v4 design tokens and theme rules
│   ├── chirkut/               # Digital love letters & notes
│   ├── icche/ & ecche/        # Shared wishlist & dreams
│   ├── hatdhoro/              # Hand-holding interactive page
│   └── playground/            # 3D Three.js Memory World
├── components/
│   ├── StoryMap/
│   │   ├── OurStoryMap.tsx    # Roadmap timeline, 3D tilt cards & cinema modal
│   │   └── MapDoodles.tsx     # Hand-drawn SVG curving arrows & doodle icons
│   ├── Hero/
│   │   └── TypewriterStory.tsx# Bengali typewriter narration component
│   ├── audio/
│   │   ├── MusicContext.tsx   # Global background audio state provider
│   │   └── MusicToggle.tsx    # Animated floating audio player button
│   ├── 3d/
│   │   └── MemoryWorld3D.tsx  # Three.js 3D photo constellation
│   └── DockBar.tsx            # Floating glassmorphism bottom dock
├── lib/
│   ├── ourStoryData.ts        # Milestone data (44 illustrated memories)
│   ├── banglaCalendar.ts      # Revised Bangla Academy calendar calculation
│   └── content.ts             # Metadata and shared configuration
└── public/                    # 44 milestone photos, music assets & icons
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fiftee15n/9November.git
   cd 9November
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 💖 Story Milestones (৪৪টি স্মরণীয় অধ্যায়)

1. **০১** • প্রথম দেখা (ক্যাম্পাসের প্রাঙ্গণে শুরু)
2. **০২** • দূর থেকে দেখা (সন্ধ্যাবেলার আলোয় মুগ্ধতা)
3. **০৩** • প্রথম ডেট (সবুজের মাঝে হাঁটা)
4. **০৪** • রিকশায় পাশাপাশি (টিএসসি ও একগুচ্ছ ফুল)
5. **০৫** • এক কাপ চা ও আড্ডা (চায়ের টং)
6. **০৬** • রেস্টুরেন্ট ডেট ও সেলফি (গোল্ড ক্যাফে)
7. **০৭** • হাতে হাত রেখে অপেক্ষা (বিমানবন্দর টার্মিনাল)
8. **০৮** • দোলনার পাশে মিষ্টি আলাপ (বাগানের স্নিগ্ধতা)
9. **০৯** • খুনসুটি ও আদুরে হাসি (চিবুক ছুঁয়ে ভালোবাসা)
10. **১০** • একগুচ্ছ শুভ্র ফুল (ভালোবাসার একমুঠো সুবাস)
...
31. **৩১** • লাল ইটের পথে পাশাপাশি (ক্যাম্পাস লেকভিউ ওয়াকওয়ে)
32. **৩২** • কাঁধে চিবুক ও স্নেহের আলিঙ্গন (হিজাবের স্নিগ্ধতায় নির্ভরতা)
33. **৩৩** • আয়নায় মিষ্টি ফ্রেম ও সেলফি (ক্যাফের উষ্ণ আলো)
34. **৩৪** • বেটার টুগেদার কেক ও উদযাপন (Better Together Cake)
35. **৩৫** • আয়নায় আদুরে খুনসুটি (নীল সোয়েটারের উষ্ণতা)
36. **৩৬** • কপালে স্নেহের পরশ ও ফুল (বেলি ফুলের মালা ও চুম্বন)
37. **৩৭** • সবুজ পাতার ছায়ায় মিষ্টি রোদ্দুর (রোদের ঝিলিক ও মধুর হাসি)
38. **৩৮** • নীল পোশাকে উৎসবের সন্ধ্যা (ফেয়ারি লাইট ও বাগান)
39. **৩৯** • দিবার জন্য ভালোবাসার কেক (জন্মদিনের দোয়া ও শুভকামনা)
40. **৪০** • মেহেদি রাঙা হাতে আদুরে খুনসুটি (ঐতিহাসিক ইটের দেওয়াল)
41. **৪১** • ভিডিও কলে মিষ্টি মুহূর্ত (স্ক্রিনের দুই প্রান্তে ভালোবাসা)
42. **৪২** • হঠাৎ তোলা মিষ্টি সেলফি (হলুদ দোকানের সামনে স্মৃতি)
43. **৪৩** • রেস্টুরেন্টে মাথায় মাথা রেখে (ক্যাফের কোণে নির্ভরতা)
44. **৪৪** • দেওয়াল জুড়ে রঙের মেলা (দেওয়ালে আঁকা ভালোবাসার রঙিন স্মৃতি)

---

## 📜 License

Created with ❤️ by Shakib Ali for **Tamal & Diba** (৯ নভেম্বর). All rights reserved.
