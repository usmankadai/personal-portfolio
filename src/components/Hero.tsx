"use client";

import { useEffect, useState, useRef } from "react"; // useRef kept for TypeWriter
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/SocialIcons";
import { personalInfo, stats } from "@/data";

function TypeWriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const current = texts[idx];
    if (!deleting && displayed === current) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    } else {
      const speed = deleting ? 40 : 80;
      timeoutRef.current = setTimeout(() => {
        setDisplayed(deleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1));
      }, speed);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, deleting, idx, texts]);

  return (
    <span>
      {displayed}
      <span className="cursor-blink text-indigo-400 ml-0.5">|</span>
    </span>
  );
}

const socialLinks = [
  { icon: GithubIcon, href: personalInfo.github, label: "GitHub" },
  { icon: LinkedinIcon, href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: TwitterIcon, href: personalInfo.twitter, label: "Twitter" },
];


export default function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-pattern"
    >
      {/* Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-blob animation-delay-0 absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="animate-blob animation-delay-2000 absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl" />
        <div className="animate-blob animation-delay-4000 absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-pink-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6"
            >
              <Sparkles size={14} />
              Available for hire
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-4"
            >
              Hi, I&apos;m{" "}
              <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent glow-text">
                {personalInfo.name.split(" ")[0]}
              </span>
            </motion.h1>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start gap-2 mb-4"
            >
              <Code2 size={22} className="text-indigo-400" />
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-300">
                {personalInfo.title}
              </h2>
            </motion.div>

            {/* Typewriter */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl sm:text-2xl text-indigo-300 font-medium mb-6 h-8"
            >
              <TypeWriter texts={personalInfo.taglines} />
            </motion.p>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 hover:scale-105 pulse-glow"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl border border-white/10 hover:border-indigo-500/50 text-gray-300 hover:text-white font-semibold text-sm transition-all duration-200 hover:bg-white/5"
              >
                Get in Touch
              </a>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/30 flex items-center justify-center text-gray-400 hover:text-indigo-400 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Avatar + stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="shrink-0 flex flex-col items-center gap-8"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-3xl bg-linear-to-br from-indigo-500 via-purple-600 to-pink-500 p-1 pulse-glow">
                <div className="w-full h-full rounded-[22px] overflow-hidden relative">
                  <Image
                    src="/avatar.png"
                    alt="Usman Kadai"
                    fill
                    className="object-cover object-top"
                    priority
                    unoptimized
                  />
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#1f2937] border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-gray-300 font-medium">Open to relocation</span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#111827] border border-white/5 rounded-2xl p-4 text-center hover:border-indigo-500/30 transition-colors"
                >
                  <div className="text-2xl font-black text-indigo-400">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#skills"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600 hover:text-indigo-400 transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
}
