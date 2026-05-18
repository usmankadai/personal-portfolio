import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Usman Kadai – Full Stack Developer",
  description:
    "Full Stack Developer based in London. Building beautiful, scalable web experiences with React, Next.js, and Node.js.",
  keywords: ["Usman Kadai", "Full Stack Developer", "React", "Next.js", "Portfolio"],
  authors: [{ name: "Usman Kadai" }],
  openGraph: {
    title: "Usman Kadai – Full Stack Developer",
    description: "Full Stack Developer based in London. Building beautiful, scalable web experiences.",
    type: "website",
    url: "https://usmankadai.dev",
    siteName: "Usman Kadai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Usman Kadai – Full Stack Developer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">{children}</body>
    </html>
  );
}
