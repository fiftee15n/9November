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
  icon: "meet" | "hiking" | "monument" | "car" | "ski" | "cabin" | "house" | "trip" | "sushi" | "coffee" | "grad_m" | "grad_n" | "engaged" | "married" | "sparkles" | "heart" | "camera" | "luggage" | "flower";
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
];
