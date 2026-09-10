import type { Metadata } from "next";
import { preload } from "react-dom";
import "./globals.css";
import { content } from "@/lib/content";
import { ThemeProvider } from "@/components/theme-provider";
import { DockBar } from "@/components/DockBar";
import { SiteShell } from "@/components/SiteShell";
import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-bengali",
  display: "swap",
});

const overusedGrotesk = localFont({
  src: "./fonts/OverusedGrotesk-Medium.woff2",
  weight: "500",
  variable: "--font-overused-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tamal & Diba's Story",
  description: "Tamal & Diba's Story",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-light.png" },
      { url: "/favicon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Hero images as head preloads: the welcome gate hides content with
  // visibility:hidden (loads start but unprioritized), so on a cold cache
  preload("/couple-sunset-bg.jpg", { as: "image" });
  preload("/farmgate.jpg", { as: "image" });
  preload("/logo.png", { as: "image" });
  preload("/logo-cropped.png", { as: "image" });
  preload("/memories/memory-1.jpg", { as: "image" });
  preload("/memories/memory-2.jpg", { as: "image" });
  preload("/memories/memory-3.jpg", { as: "image" });
  preload("/memories/memory-4.jpg", { as: "image" });
  preload("/memories/memory-5.jpg", { as: "image" });
  preload("/hands-holding.jpg", { as: "image" });
  preload("/avatar.gif", { as: "image" });
  preload("/badges/company-logo.svg", { as: "image" });
  preload("/badges/orbix.png", { as: "image" });
  preload("/badges/screens.png", { as: "image" });
  preload("/badges/pintop.png", { as: "image" });
  preload("/x-avatar.png", { as: "image" });
  preload("/linkedin-avatar.png", { as: "image" });

  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${overusedGrotesk.variable} ${hindSiliguri.variable}`}>
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SiteShell>{children}</SiteShell>
          <DockBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
