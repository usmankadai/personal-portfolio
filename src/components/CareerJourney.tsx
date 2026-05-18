"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import { career } from "@/data";

type CareerItem = typeof career[0];

function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: CareerItem;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start md:items-center gap-0">
      {/* Left content (desktop) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`hidden md:block flex-1 ${isLeft ? "pr-12 text-right" : "pr-12 opacity-0 pointer-events-none"}`}
      >
        {isLeft && (
          <TimelineCard item={item} />
        )}
      </motion.div>

      {/* Center spine */}
      <div className="relative flex flex-col items-center shrink-0 z-10">
        {/* Icon bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.1, type: "spring" }}
          className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center ${
            item.type === "education"
              ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
              : "bg-indigo-500/10 border-indigo-500/50 text-indigo-400"
          }`}
        >
          {item.type === "education" ? <GraduationCap size={20} /> : <Briefcase size={20} />}
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
            style={{ originY: 0 }}
            className="w-0.5 h-16 md:h-20 bg-linear-to-b from-indigo-500/50 to-transparent mt-1"
          />
        )}
      </div>

      {/* Right content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`flex-1 pl-6 md:pl-12 pb-8 md:pb-0 ${
          isLeft ? "md:opacity-0 md:pointer-events-none" : ""
        }`}
      >
        {/* Mobile: always show */}
        <div className="md:hidden">
          <TimelineCard item={item} />
        </div>
        {/* Desktop: only right items */}
        {!isLeft && (
          <div className="hidden md:block">
            <TimelineCard item={item} />
          </div>
        )}
      </motion.div>
    </div>
  );
}

function TimelineCard({ item }: { item: CareerItem }) {
  return (
    <div className="bg-[#111827] border border-white/5 rounded-2xl p-5 hover:border-indigo-500/30 transition-colors group">
      {/* Year badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
          item.type === "education"
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-indigo-500/10 text-indigo-400"
        }`}>
          <Calendar size={10} />
          {item.year}
        </span>
      </div>

      <h3 className="text-base font-bold text-white mb-0.5 group-hover:text-indigo-400 transition-colors">
        {item.role}
      </h3>
      <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-1">
        <span className="font-medium text-gray-300">{item.company}</span>
        <span className="text-gray-600">·</span>
        <MapPin size={11} className="text-gray-500" />
        <span className="text-gray-500">{item.location}</span>
      </div>

      <p className="text-gray-500 text-sm leading-relaxed mt-2 mb-3">
        {item.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md bg-[#1f2937] text-gray-500 text-xs border border-white/5"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CareerJourney() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="journey" className="py-24 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3 block"
          >
            Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-4"
          >
            Career{" "}
            <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Journey
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto text-lg"
          >
            From intern to senior developer — here&apos;s the road that got me here.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical spine (desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-indigo-500/30 via-purple-500/20 to-transparent" />

          <div className="space-y-0 md:space-y-8">
            {career.map((item, i) => (
              <TimelineItem
                key={`${item.year}-${item.role}`}
                item={item}
                index={i}
                isLast={i === career.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
