"use client";

import { Heart, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/SocialIcons";
import { personalInfo } from "@/data";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: GithubIcon, href: personalInfo.github, label: "GitHub" },
  { icon: LinkedinIcon, href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: TwitterIcon, href: personalInfo.twitter, label: "Twitter" },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2 mb-3 group">
              <span className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-black">
                UK
              </span>
              <span className="text-white font-bold">{personalInfo.name}</span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed">
              {personalInfo.title} based in {personalInfo.location}. Building beautiful things for the web.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs text-gray-600 uppercase tracking-widest mb-4">Navigation</h4>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + back to top */}
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-xs text-gray-600 uppercase tracking-widest mb-4">Follow</h4>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-xl bg-[#111827] border border-white/5 hover:border-indigo-500/30 hover:text-indigo-400 text-gray-500 flex items-center justify-center transition-all"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <button
              onClick={scrollTop}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-400 transition-colors self-start"
            >
              <ArrowUp size={14} />
              Back to top
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm flex items-center gap-1">
            © {new Date().getFullYear()} {personalInfo.name}. Made with{" "}
            <Heart size={12} className="fill-indigo-400 text-indigo-400" />
          </p>
          <p className="text-gray-700 text-xs">
            Built with Next.js · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
