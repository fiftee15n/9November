export interface StoryMilestone {
  id: string;
  stepNumber: string;
  title: string;
  subtitle?: string;
  date: string;
  location?: string;
  story: string;
  image?: string;
  icon: "meet" | "hiking" | "monument" | "car" | "ski" | "cabin" | "house" | "trip" | "sushi" | "grad_m" | "grad_n" | "engaged" | "married" | "sparkles" | "heart";
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
    title: "FIRST MET",
    subtitle: "প্রথম দেখা",
    date: "০৯ সেপ্টেম্বর ২০২১",
    location: "ক্যাম্পাসের প্রাঙ্গণ",
    story: "চোখে চোখ পড়ার সেই প্রথম মুহূর্ত—যেখান থেকে শুরু হয়েছিল একটি অচেনা গল্পের অনাবিল সূচনা।",
    image: "/memories/memory-2.jpg",
    icon: "meet",
    accentColor: "#F43F5E", // Rose
    side: "center",
  },
  {
    id: "first-date",
    stepNumber: "০২",
    title: "FIRST DATE",
    subtitle: "প্রথম ডেট ও হাঁটা",
    date: "সেপ্টেম্বর ২০২১",
    location: "সবুজের মাঝে",
    story: "একসাথে হেঁটে চলা, প্রথমবার কফির কাপে আড্ডা আর হৃদস্পন্দনের দ্রুত ওঠানামা।",
    image: "/memories/memory-4.jpg",
    icon: "hiking",
    accentColor: "#10B981", // Emerald
    side: "right",
  },
  {
    id: "picnic",
    stepNumber: "০৩",
    title: "BIKE RIDE & PICNIC",
    subtitle: "টিএসসি ও মুক্ত বাতাস",
    date: "অক্টোবর ২০২১",
    location: "টিএসসি চত্বর",
    story: "বিকেলের নরম আলোয় রিকশায় পাশাপাশি বসে শহরের বুকে হারিয়ে যাওয়ার সেই অমলিন দিন।",
    image: "/memories/memory-3.jpg",
    icon: "monument",
    accentColor: "#3B82F6", // Blue
    side: "right",
  },
  {
    id: "adventure-drive",
    stepNumber: "০৪",
    title: "LATE NIGHT DRIVE",
    subtitle: "রাতের শহরের আলোয়",
    date: "নভেম্বর ২০২১",
    location: "উত্তরা এক্সপ্রেসওয়ে",
    story: "গান শুনতে শুনতে দীর্ঘ পথ পাড়ি দেওয়া—কোনো গন্তব্য ছিল না, কেবল দুজনের একান্তে থাকা।",
    image: "/memories/memory-1.jpg",
    icon: "car",
    accentColor: "#EC4899", // Pink
    side: "left",
  },
  {
    id: "first-trip",
    stepNumber: "০৫",
    title: "FIRST TRIP TOGETHER",
    subtitle: "প্রথম ভ্রমণ",
    date: "ডিসেম্বর ২০২১",
    location: "পাহাড়ের দেশে",
    story: "কুয়াশাঘেরা সকালে পাহাড়ের চূড়ায় দাঁড়িয়ে সূর্যের প্রথম কিরণ একসঙ্গে উপভোগ করা।",
    image: "/memories/memory-5.jpg",
    icon: "ski",
    accentColor: "#8B5CF6", // Violet
    side: "left",
  },
  {
    id: "dating-official",
    stepNumber: "০৬",
    title: "STARTED DATING",
    subtitle: "মনের কথা প্রকাশ",
    date: "জানুয়ারি ২০২২",
    location: "নদীর পাড়ে",
    story: "হাত ধরে এক অদ্ভুত মৌনতায় যখন বুঝতে পারলাম, আমরা দুজন দুজনের জন্যই সৃষ্ট।",
    image: "/hands-holding.jpg",
    icon: "cabin",
    accentColor: "#F59E0B", // Amber
    side: "center",
  },
  {
    id: "sweet-memories",
    stepNumber: "০৭",
    title: "SWEET MOMENTS",
    subtitle: "মিষ্টি মধুর স্মৃতি",
    date: "ফেব্রুয়ারি ২০২২",
    location: "ক্যাফে ও আড্ডা",
    story: "ছোট ছোট খুনসুটি, একসাথে কেক বানানো আর ঘণ্টার পর ঘণ্টা অর্থহীন হাসাহাসি।",
    image: "/memories/memory-4.jpg",
    icon: "house",
    accentColor: "#06B6D4", // Cyan
    side: "right",
  },
  {
    id: "big-vacation",
    stepNumber: "০৮",
    title: "SPECIAL GETAWAY",
    subtitle: "স্মৃতির অ্যালবাম",
    date: "মার্চ ২০২২",
    location: "সমুদ্র সৈকত",
    story: "সাগরের ঢেউয়ের শব্দে বালুকাবেলায় রেখে আসা আমাদের পায়ের ছাপ ও ভালোবাসার প্রতিশ্রুতি।",
    image: "/memories/memory-3.jpg",
    icon: "trip",
    accentColor: "#14B8A6", // Teal
    side: "right",
  },
  {
    id: "favorite-food",
    stepNumber: "০৯",
    title: "DINNER DATES",
    subtitle: "পছন্দের খাবার ও আড্ডা",
    date: "এপ্রিল ২০২২",
    location: "প্রিয় রেস্তোরাঁ",
    story: "নতুন নতুন খাবারের স্বাদ নেওয়া আর তোমার খাবারের প্রশংসা শুনে মুগ্ধ হওয়া।",
    image: "/memories/memory-1.jpg",
    icon: "sushi",
    accentColor: "#F97316", // Orange
    side: "left",
  },
  {
    id: "graduation-her",
    stepNumber: "১০",
    title: "HER MILESTONE",
    subtitle: "সাফল্যের আনন্দ",
    date: "মে ২০২২",
    location: "বিশ্ববিদ্যালয়",
    story: "তোমার প্রতিটি সফলতায় আমার গর্বিত মন—তোমার হাসিতে যেন গোটা পৃথিবী আলোকিত।",
    image: "/memories/memory-5.jpg",
    icon: "grad_m",
    accentColor: "#84CC16", // Lime
    side: "left",
  },
  {
    id: "graduation-him",
    stepNumber: "১১",
    title: "HIS MILESTONE",
    subtitle: "নতুন দিগন্তের সূচনা",
    date: "জুন ২০২২",
    location: "কনভোকেশন হল",
    story: "একসাথে স্বপ্ন দেখা এবং সেই স্বপ্নগুলো বাস্তবে রূপ নেওয়ার মুহূর্ত।",
    image: "/memories/memory-2.jpg",
    icon: "grad_n",
    accentColor: "#6366F1", // Indigo
    side: "center",
  },
  {
    id: "engaged",
    stepNumber: "১২",
    title: "ENGAGED!",
    subtitle: "চিরদিনের অঙ্গীকার",
    date: "জুলাই ২০২২",
    location: "এক অপূর্ব সূর্যাস্তে",
    story: "হাঁটু গেড়ে আঙুলে আংটি পরিয়ে দেওয়া—তোমার চোখের অশ্রুকণা আর মিষ্টি 'হ্যাঁ'।",
    image: "/hands-holding.jpg",
    icon: "engaged",
    accentColor: "#D946EF", // Fuchsia
    side: "left",
  },
  {
    id: "married",
    stepNumber: "১৩",
    title: "MARRIED & TOGETHER FOREVER",
    subtitle: "হাত ধরে অনন্তের পথে",
    date: "০৯ নভেম্বর",
    location: "আমাদের নীড়",
    story: "শুভ পরিণয়! দুই হৃদয় এক হলো আজীবনের তরে। আমাদের অনন্ত ভালোবাসার মহাযাত্রা শুরু হলো...",
    image: "/logo-cropped.png",
    icon: "married",
    accentColor: "#EF4444", // Red
    side: "center",
  },
];
