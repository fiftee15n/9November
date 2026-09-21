export interface StoryMilestone {
  id: string;
  stepNumber: string;
  title: string;
  subtitle?: string;
  date: string;
  location?: string;
  story: string;
  image?: string;
  imageAspect?: "portrait" | "landscape" | "square";
  icon: "meet" | "hiking" | "monument" | "car" | "ski" | "cabin" | "house" | "trip" | "sushi" | "coffee" | "grad_m" | "grad_n" | "engaged" | "married" | "sparkles" | "heart" | "camera" | "luggage" | "flower" | "cat" | "video";
  accentColor: string; // Tailwind / Hex color
  side: "left" | "right" | "center";
}

export const OUR_STORY_HEADER = {
  title: "Tamal & Diba's Story",
  bengaliTitle: "তমাল ও দিবা'র গল্প",
  coupleNames: "Tamal & Diba",
  bengaliNames: "তমাল ও দিবা",
  subtitle: "আমাদের জীবনের সুন্দরতম অধ্যায়গুলোর স্মৃতিময় মানচিত্র",
};

export const STORY_MILESTONES: StoryMilestone[] = [
  {
    id: "first-met",
    stepNumber: "০১",
    title: "প্রথম দেখা",
    subtitle: "ক্যাম্পাসের প্রাঙ্গণে শুরু",
    date: "০৯ সেপ্টেম্বর ২০২১",
    location: "ক্যাম্পাসের প্রাঙ্গণ",
    story: "চোখে চোখ পড়ার সেই প্রথম মুহূর্ত—যেখান থেকে শুরু হয়েছিল একটি অচেনা গল্পের অনাবিল সূচনা।",
    image: "/first-met.jpg",
    icon: "meet",
    accentColor: "#F43F5E", // Rose
    side: "center",
  },
  {
    id: "first-glance",
    stepNumber: "০২",
    title: "দূর থেকে দেখা",
    subtitle: "সন্ধ্যাবেলার আলোয় মুগ্ধতা",
    date: "সেপ্টেম্বর ২০২১",
    location: "ক্যাম্পাসের চত্বর",
    story: "আলো-আঁধারির মাঝে দূর থেকে দাঁড়িয়ে তোমাকে প্রথম লক্ষ্য করা—সেই মায়াবী দৃষ্টিতে হৃদয়ে জেগেছিল এক অচেনা অনুভূতি।",
    image: "/first-glance.jpg",
    icon: "sparkles",
    accentColor: "#F59E0B", // Amber
    side: "right",
  },
  {
    id: "first-date",
    stepNumber: "০৩",
    title: "প্রথম ডেট",
    subtitle: "প্রথম ডেট ও হাঁটা",
    date: "সেপ্টেম্বর ২০২১",
    location: "সবুজের মাঝে",
    story: "একসাথে হেঁটে চলা, প্রথমবার কফির কাপে আড্ডা আর হৃদস্পন্দনের দ্রুত ওঠানামা।",
    image: "/first-date.jpg",
    icon: "hiking",
    accentColor: "#10B981", // Emerald
    side: "left",
  },
  {
    id: "rickshaw-ride",
    stepNumber: "০৪",
    title: "রিকশায় পাশাপাশি",
    subtitle: "টিএসসি ও একগুচ্ছ ফুল",
    date: "অক্টোবর ২০২১",
    location: "টিএসসি চত্বর",
    story: "বিকেলের নরম আলোয় রিকশায় পাশাপাশি বসে শহরের বুকে হারিয়ে যাওয়ার সেই অমলিন দিন—সাথে ভালোবাসার একগুচ্ছ ফুল।",
    image: "/rickshaw-ride.jpg",
    icon: "monument",
    accentColor: "#3B82F6", // Blue
    side: "right",
  },
  {
    id: "tea-date",
    stepNumber: "০৫",
    title: "এক কাপ চা ও আড্ডা",
    subtitle: "ধোঁয়া ওঠা চায়ের কাপে",
    date: "অক্টোবর ২০২১",
    location: "ক্যাম্পাসের চায়ের টং",
    story: "ধোঁয়া ওঠা চায়ের কাপ হাতে নিয়ে ঘণ্টার পর ঘণ্টা কথা—যেখানে প্রতিটি চুমুকে মিশে ছিল না-বলা হাজারো মিষ্টি অনুভূতি।",
    image: "/tea-date.jpg",
    icon: "coffee",
    accentColor: "#D97706", // Amber / Caramel
    side: "left",
  },
  {
    id: "cafe-date",
    stepNumber: "০৬",
    title: "রেস্টুরেন্ট ডেট ও সেলফি",
    subtitle: "গোল্ড ক্যাফেতে মিষ্টি সন্ধ্যা",
    date: "নভেম্বর ২০২১",
    location: "গোল্ড রেস্টুরেন্ট অ্যান্ড ক্যাফে",
    story: "রেস্টুরেন্টের উষ্ণ আলো, একসাথে খাবারের মধুর আড্ডা আর আয়নায় ফ্রেমবন্দী মিষ্টি সেলফি—মুহূর্তটি যেন আজীবনের ভালোবাসায় রঙিন হয়ে রইল।",
    image: "/cafe-date.jpg",
    icon: "camera",
    accentColor: "#8B5CF6", // Purple / Violet
    side: "right",
  },
  {
    id: "airport-journey",
    stepNumber: "০৭",
    title: "হাতে হাত রেখে অপেক্ষা",
    subtitle: "এয়ারপোর্টে একসাথে অপেক্ষার মুহূর্ত",
    date: "ডিসেম্বর ২০২১",
    location: "বিমানবন্দর টার্মিনাল",
    story: "ভ্রমণের প্রস্তুতি, লাল স্যুটকেস পাশে রেখে মেঝেতে পাশাপাশি বসা। কোলাহলের মাঝেও তোমার হাত শক্ত করে ধরে থাকার সেই নিশ্চিন্ত নির্ভরতা।",
    image: "/airport-journey.jpg",
    icon: "luggage",
    accentColor: "#E11D48", // Rose Red / Crimson
    side: "left",
  },
  {
    id: "garden-swing",
    stepNumber: "০৮",
    title: "দোলনার পাশে মিষ্টি আলাপ",
    subtitle: "বাগানের স্নিগ্ধতায় চোখের মায়া",
    date: "ফেব্রুয়ারি ২০২২",
    location: "বাগানের প্রাঙ্গণ",
    story: "গাছের ডালে ঝুলন্ত ফেয়ারি লাইটের আলো, দোলনার পাশে দাঁড়িয়ে মিষ্টি আলাপ আর চোখে চোখ রেখে ভালোবাসার অমলিন নির্ভরতা।",
    image: "/garden-date.jpg",
    icon: "sparkles",
    accentColor: "#0D9488", // Teal / Botanical Garden Green
    side: "right",
  },
  {
    id: "playful-smile",
    stepNumber: "০৯",
    title: "খুনসুটি ও আদুরে হাসি",
    subtitle: "চিবুক ছুঁয়ে ভালোবাসার প্রকাশ",
    date: "ফেব্রুয়ারি ২০২২",
    location: "সবুজের মাঝে",
    story: "ক্যামেরার ফ্রেমে মিষ্টি খুনসুটি, আদুরে স্পর্শে চিবুক ধরে রাখার সেই মায়াবী হাসি—যে হাসিতে মিশে ছিল নিখাদ আনন্দ আর চিরদিনের অধিকার।",
    image: "/playful-smile.jpg",
    icon: "heart",
    accentColor: "#EC4899", // Warm Pink / Magenta
    side: "left",
  },
  {
    id: "flower-bouquet",
    stepNumber: "১০",
    title: "একগুচ্ছ শুভ্র ফুল",
    subtitle: "ভালোবাসার একমুঠো সুবাস",
    date: "বসন্ত ২০২২",
    location: "ফুলের দোকান",
    story: "তোমার পছন্দের শুভ্র ফুলের তোড়া হাতে নেওয়ার মুহূর্ত। প্রতিটি পাপড়িতে মিশে থাকা পবিত্র স্নিগ্ধতা যেন তোমারই সুন্দর হাসির প্রতিচ্ছবি।",
    image: "/flower-bouquet.jpg",
    imageAspect: "portrait",
    icon: "flower",
    accentColor: "#10B981", // Fresh Emerald Green
    side: "right",
  },
  {
    id: "two-bouquets",
    stepNumber: "১১",
    title: "লাল গোলাপ ও শুভ্র উপহার",
    subtitle: "দুই হাতে ভালোবাসার সুবাস",
    date: "বসন্ত ২০২২",
    location: "ভালোবাসার প্রাঙ্গণ",
    story: "এক হাতে শুভ্র বেলি আর অন্য হাতে একগুচ্ছ টকটকে লাল গোলাপ। তোমার মুখে ফুটে ওঠা সেই মায়াবী হাসিই ছিল আমার সবচেয়ে সুন্দর প্রাপ্তি।",
    image: "/two-bouquets.jpg",
    imageAspect: "portrait",
    icon: "flower",
    accentColor: "#E11D48", // Vivid Rose Red
    side: "left",
  },
  {
    id: "follow-me-walk",
    stepNumber: "১২",
    title: "হাত ধরে এগিয়ে চলা",
    subtitle: "বৃষ্টিস্নাত লাল ইটের পথে মায়াবী দৃষ্টি",
    date: "বর্ষা ২০২২",
    location: "বৃষ্টিভেজা ক্যাম্পাস প্রাঙ্গণ",
    story: "বৃষ্টিভেজা লাল ইটের পথ, ভেজা বাতাসের স্নিগ্ধতা আর আমার হাত ধরে তোমার পেছন ফিরে তাকানো—সেই মায়াবী এক পলকে যেন পুরো পৃথিবী থমকে গিয়েছিল।",
    image: "/follow-me-walk.jpg",
    imageAspect: "portrait",
    icon: "hiking",
    accentColor: "#0284C7", // Sky / Lake Blue
    side: "right",
  },
  {
    id: "mehendi-hand",
    stepNumber: "১৩",
    title: "মেহেদি রাঙা হাত",
    subtitle: "হাতে আঁকা ভালোবাসার আলপনা",
    date: "শরৎ ২০২২",
    location: "উৎসবের প্রাঙ্গণ",
    story: "তোমার মেহেদি রাঙা হাতটি যখন প্রথমবার আমার হাতের ওপর রাখলে, সেই স্নিগ্ধ স্পর্শে মিশে ছিল উৎসবের আনন্দ আর চিরন্তন ভালোবাসার গভীর রং।",
    image: "/mehendi-hand.jpg",
    imageAspect: "portrait",
    icon: "sparkles",
    accentColor: "#D97706", // Mehendi Amber / Warm Henna
    side: "left",
  },
  {
    id: "forehead-kiss",
    stepNumber: "১৪",
    title: "কপালে স্নেহের পরশ",
    subtitle: "নীল আকাশের নিচে মিষ্টি নির্ভরতা",
    date: "শরৎ ২০২২",
    location: "খোলা আকাশের নিচে",
    story: "নীল আকাশ, হাতে শুভ্র ফুল আর কপালে এঁকে দেওয়া স্নেহের এক ফোঁটা পরশ—যেখানে মিশে ছিল নিখাদ যত্ন, সম্মান আর আজীবন পাশে থাকার অঙ্গীকার।",
    image: "/forehead-kiss.jpg",
    imageAspect: "portrait",
    icon: "heart",
    accentColor: "#0891B2", // Ocean Cyan / Teal
    side: "right",
  },
  {
    id: "daisy-rose-bouquet",
    stepNumber: "১৫",
    title: "গোলাপ ও ডেইজির তোড়া",
    subtitle: "ভালোবাসার রঙে সাজানো একগুচ্ছ ফুল",
    date: "শরৎ ২০২২",
    location: "আমাদের প্রিয় প্রাঙ্গণ",
    story: "গোলাপি গোলাপ আর সাদা ডেইজির স্নিগ্ধতায় সাজানো ছোট্ট একটি তোড়া। পাশাপাশি দাঁড়িয়ে ভালোবাসার সুবাস ভাগ করে নেওয়ার চিরন্তন স্মৃতি।",
    image: "/daisy-rose-bouquet.jpg",
    imageAspect: "square",
    icon: "flower",
    accentColor: "#FB7185", // Coral Rose / Soft Peach
    side: "left",
  },
  {
    id: "cozy-swing-selfie",
    stepNumber: "১৬",
    title: "কাঁধে মাথা রেখে নির্ভরতা",
    subtitle: "বেতের দোলনায় কাটানো এক সন্ধ্যা",
    date: "শীত ২০২২",
    location: "আরামদায়ক ক্যাফে কোণ",
    story: "বেতের দোলনায় পাশাপাশি বসা, তোমার মাথাটি আমার কাঁধে আলতো করে রাখা—এই নিঃশব্দ নির্ভরতার মাঝেই খুঁজে পাই জীবনের সবচেয়ে শান্তির আশ্রয়।",
    image: "/cozy-swing-selfie.jpg",
    imageAspect: "portrait",
    icon: "heart",
    accentColor: "#0E7490", // Deep Petrol / Teal Blue
    side: "right",
  },
  {
    id: "cute-kitten",
    stepNumber: "১৭",
    title: "বিড়ালছানা ও আদুরে মুহূর্ত",
    subtitle: "ছোট্ট বিড়ালছানার মায়াবী চোখ",
    date: "শীত ২০২২",
    location: "শহরের মায়াবী গলি",
    story: "হঠাৎ দেখা পাওয়া ছোট্ট তুলতুলে বিড়ালছানাটাকে কোলে তুলে নেওয়ার মুহূর্ত। তোমার চোখের অপলক মায়া আর নিষ্পাপ হাসিতে জড়িয়ে ছিল অফুরন্ত স্নেহ।",
    image: "/cute-kitten.jpg",
    imageAspect: "portrait",
    icon: "cat",
    accentColor: "#F97316", // Warm Ginger Orange
    side: "left",
  },
  {
    id: "video-call",
    stepNumber: "১৮",
    title: "ভিডিও কলে দূর থেকে কাছে",
    subtitle: "স্ক্রিনের ওপারে তোমার মিষ্টি হাসি",
    date: "২০২৩",
    location: "স্ক্রিনের দুই প্রান্তে",
    story: "দূরত্ব যতই হোক, স্ক্রিনের ওপারে তোমার সেই মায়াবী হাসি আর ঘণ্টার পর ঘণ্টা কথা—এক নিমিষেই ভুলিয়ে দিত সব ক্লান্তি আর একাকিত্ব।",
    image: "/video-call.jpg",
    imageAspect: "portrait",
    icon: "video",
    accentColor: "#6366F1", // Indigo / Digital Connection
    side: "right",
  },
  {
    id: "matching-blue",
    stepNumber: "১৯",
    title: "আকাশি রঙে দুজন",
    subtitle: "একই রঙে রাঙানো সুন্দর একটি দিন",
    date: "২০২৩",
    location: "ক্যাফের মায়াবী আলোয়",
    story: "দুজনের একই রঙের আকাশি পোশাকে সেজে ওঠা একটি বিশেষ দিন। পাশাপাশি মাথা রেখে উষ্ণ আলোর নিচে ফ্রেমবন্দী হওয়া—যেখানে প্রতিটি হাসিতে মিশে ছিল গভীর নির্ভরতা।",
    image: "/matching-blue.jpg",
    imageAspect: "portrait",
    icon: "heart",
    accentColor: "#0EA5E9", // Sky Blue
    side: "left",
  },
  {
    id: "sari-portrait",
    stepNumber: "২০",
    title: "শাড়িতে মায়াবী রূপ",
    subtitle: "বুনো ফুলের সুবাসে স্নিগ্ধ হাসি",
    date: "২০২৩",
    location: "সবুজের আঙিনায়",
    story: "নীল শাড়ির স্নিগ্ধ সাজ, এলোমেলো চুল আর হাতে একগুচ্ছ হলুদ বুনো ফুল। তোমার সেই লাজুক মধুর হাসিতে পুরো প্রকৃতি যেন এক নিমিষেই আলোকিত হয়ে উঠেছিল।",
    image: "/sari-portrait.jpg",
    imageAspect: "portrait",
    icon: "flower",
    accentColor: "#EAB308", // Sunflower Gold
    side: "right",
  },
];
