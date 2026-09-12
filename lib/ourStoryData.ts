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
    title: "প্রথম দেখা",
    subtitle: "ক্যাম্পাসের প্রাঙ্গণে শুরু",
    date: "০৯ সেপ্টেম্বর ২০২১",
    location: "ক্যাম্পাসের প্রাঙ্গণ",
    story: "চোখে চোখ পড়ার সেই প্রথম মুহূর্ত—যেখান থেকে শুরু হয়েছিল একটি অচেনা গল্পের অনাবিল সূচনা।",
    image: "/memories/memory-2.jpg",
    icon: "meet",
    accentColor: "#F43F5E", // Rose
    side: "center",
  },
];
