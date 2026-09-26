import type { Metadata } from "next";
import { TrimatrikClientPage } from "@/components/3d/TrimatrikClientPage";

export const metadata: Metadata = {
  title: "ত্রিমাত্রিক স্মৃতি | Tamal & Diba",
  description: "সূর্যাস্তের মায়াবী আলোয় তুমি আর আমি, চিরদিনের জন্য এক ফ্রেমে — থ্রি.জেএস ৩ডি ভিউ।",
};

export default function TrimatrikPage() {
  return <TrimatrikClientPage />;
}
