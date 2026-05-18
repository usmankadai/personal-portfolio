"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Send, MapPin, CheckCircle2 } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/SocialIcons";
import { personalInfo } from "@/data";

const socials = [
  {
    icon: GithubIcon,
    href: personalInfo.github,
    label: "GitHub",
    handle: "@usmankadai",
  },
  {
    icon: LinkedinIcon,
    href: personalInfo.linkedin,
    label: "LinkedIn",
    handle: "in/usman-muhammad-kadai",
  },
  {
    icon: TwitterIcon,
    href: personalInfo.twitter,
    label: "Twitter / X",
    handle: "@usmankadai",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a network call — wire up to your preferred service
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3 block"
          >
            Get in Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-4"
          >
            Let&apos;s{" "}
            <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Work Together
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto text-lg"
          >
            Whether it&apos;s a new project, a freelance opportunity, or just a
            chat — my inbox is always open.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Email card */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="group flex items-center gap-4 p-5 bg-[#111827] border border-white/5 rounded-2xl hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 group-hover:scale-110 transition-transform">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">
                  Email
                </div>
                <div className="text-white font-semibold">
                  {personalInfo.email}
                </div>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-4 p-5 bg-[#111827] border border-white/5 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">
                  Location
                </div>
                <div className="text-white font-semibold">
                  {personalInfo.location}
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="p-5 bg-[#111827] border border-white/5 rounded-2xl">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-4">
                Find me on
              </div>
              <div className="flex flex-col gap-3">
                {socials.map(({ icon: Icon, href, label, handle }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-indigo-400 transition-colors group"
                  >
                    <Icon
                      size={16}
                      className="group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm">
                      <span className="font-medium text-gray-300">{label}</span>
                      <span className="text-gray-600 mx-1">·</span>
                      <span className="text-gray-500">{handle}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability blurb */}
            <div className="p-5 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-sm font-semibold">
                  Available for work
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Currently open to full-time roles and select freelance projects.
                Response time: within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#111827] border border-white/5 rounded-3xl p-6 sm:p-8"
          >
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <CheckCircle2 size={56} className="text-emerald-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">Message sent!</h3>
                <p className="text-gray-400 text-sm max-w-xs">
                  Thanks for reaching out. I&apos;ll get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-lg font-bold text-white mb-1">
                  Send a message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs text-gray-500 uppercase tracking-wider mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Usman Kadai"
                      className="w-full bg-[#1f2937] border border-white/5 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs text-gray-500 uppercase tracking-wider mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="usmankadai@gmail.com"
                      className="w-full bg-[#1f2937] border border-white/5 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs text-gray-500 uppercase tracking-wider mb-2"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Hi Usman, I'd love to discuss..."
                    className="w-full bg-[#1f2937] border border-white/5 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
