"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/data";

// One carousel row per group in the data file, so every skill is shown.
const rows = Array.from(new Set(skills.map((s) => s.row))).map((row) =>
  skills.filter((s) => s.row === row),
);

function SkillBadge({ name, icon, category }: { name: string; icon: string; category: string }) {
  return (
    <div className="shrink-0 flex items-center gap-3 px-5 py-3 bg-[#111827] border border-white/5 rounded-2xl hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300 cursor-default group mx-2">
      <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
      <div>
        <div className="text-sm font-semibold text-white whitespace-nowrap">{name}</div>
        <div className="text-[10px] text-gray-600 uppercase tracking-wider">{category}</div>
      </div>
    </div>
  );
}

function InfiniteRow({
  items,
  direction = "left",
}: {
  items: typeof skills;
  direction?: "left" | "right";
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className="overflow-hidden pause-on-hover"
      style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)" }}
    >
      <div
        className={`flex ${direction === "left" ? "animate-scroll-left" : "animate-scroll-right"}`}
        // Longer rows take longer to loop, so every row moves at the same pace.
        style={{ width: "max-content", animationDuration: `${items.length * 3.5}s` }}
      >
        {doubled.map((skill, i) => (
          <SkillBadge key={`${skill.name}-${i}`} name={skill.name} icon={skill.icon} category={skill.category} />
        ))}
      </div>
    </div>
  );
}

const categoryColors: Record<string, string> = {
  Frontend: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Backend: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Language: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  Styling: "text-pink-400 bg-pink-400/10 border-pink-400/20",
  Database: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  DevOps: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  Cloud: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  API: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  Animation: "text-rose-400 bg-rose-400/10 border-rose-400/20",
  State: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  ORM: "text-teal-400 bg-teal-400/10 border-teal-400/20",
  Cache: "text-red-400 bg-red-400/10 border-red-400/20",
  Testing: "text-lime-400 bg-lime-400/10 border-lime-400/20",
  Accessibility: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Realtime: "text-green-400 bg-green-400/10 border-green-400/20",
  AI: "text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/20",
  "Data Viz": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Performance: "text-orange-300 bg-orange-300/10 border-orange-300/20",
  Monitoring: "text-purple-300 bg-purple-300/10 border-purple-300/20",
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 overflow-hidden relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-indigo-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Tech Stack
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Skills &amp;{" "}
            <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            A curated collection of tools I use to build fast, scalable, and beautiful products.
          </p>
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mt-8"
        >
          {Array.from(new Set(skills.map((s) => s.category))).map((cat) => (
            <span
              key={cat}
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                categoryColors[cat] ?? "text-gray-400 bg-gray-400/10 border-gray-400/20"
              }`}
            >
              {cat}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Infinite carousel rows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-col gap-4"
      >
        {rows.map((items, i) => (
          <InfiniteRow key={i} items={items} direction={i % 2 === 0 ? "left" : "right"} />
        ))}
      </motion.div>
    </section>
  );
}
