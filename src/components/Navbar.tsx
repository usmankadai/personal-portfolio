"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { personalInfo } from "@/data";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const sectionIds = links.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (href: string) => {
    setActive(href);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold tracking-tight flex items-center gap-2 group"
            onClick={() => handleClick("")}
          >
            <span className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-black group-hover:scale-110 transition-transform">
              UK
            </span>
            <span className="text-white hidden sm:block">
              {personalInfo.name.split(" ")[0]}
              <span className="text-indigo-400">.</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => handleClick(link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active === link.href
                      ? "text-indigo-400 bg-indigo-500/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
            >
              Resume
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden bg-[#0d0d0d]/95 backdrop-blur-xl border-b border-white/5"
          >
            <ul className="flex flex-col p-4 gap-1">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => handleClick(link.href)}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: links.length * 0.05 }}
              >
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="block mt-2 px-4 py-3 rounded-lg text-sm font-semibold text-center bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                >
                  Resume
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
