"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, X } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { projects } from "@/data";

type Project = (typeof projects)[0];

function AnimatedPlaceholder({ gradient }: { gradient: string }) {
  return (
    <div
      className={`w-full h-full bg-linear-to-br ${gradient} animated-gradient relative overflow-hidden`}
    >
      <div className="absolute top-0 left-0 right-0 h-8 bg-black/30 flex items-center px-3 gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
      </div>
      <div className="absolute top-12 left-4 right-4 space-y-2">
        <div className="h-2 bg-white/20 rounded-full w-3/4" />
        <div className="h-2 bg-white/15 rounded-full w-1/2" />
      </div>
      <div className="absolute top-24 left-4 right-4 grid grid-cols-3 gap-2">
        <div className="h-12 bg-white/10 rounded-lg" />
        <div className="h-12 bg-white/15 rounded-lg" />
        <div className="h-12 bg-white/10 rounded-lg" />
      </div>
      <div className="absolute bottom-4 left-4 right-4 space-y-2">
        <div className="h-2 bg-white/10 rounded-full" />
        <div className="h-2 bg-white/10 rounded-full w-5/6" />
        <div className="h-2 bg-white/10 rounded-full w-4/6" />
      </div>
      <motion.div
        className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent"
        animate={{ y: ["-100%", "200%"] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 0.5 }}
        style={{ height: "30%" }}
      />
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg bg-[#111827] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-52 shrink-0">
          {project.image ? (
            <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
          ) : (
            <AnimatedPlaceholder gradient={project.gradient} />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[#111827] via-transparent to-transparent" />
        </div>
        <div className="p-6 pt-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={15} />
          </button>
          <h3 className="text-xl font-black text-white mb-3 leading-snug pr-8">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-[#1f2937] text-gray-400 text-xs font-medium border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold transition-all"
              >
                <GithubIcon size={15} />
                Source
              </a>
            )}
            {project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all"
              >
                <ExternalLink size={15} />
                Live Site
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  onViewMore,
}: {
  project: Project;
  index: number;
  onViewMore: (p: Project) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative bg-[#111827] border border-white/5 rounded-3xl overflow-hidden card-hover flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-52 overflow-hidden">
        {project.image ? (
          <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
        ) : (
          <AnimatedPlaceholder gradient={project.gradient} />
        )}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center gap-4 z-10"
            >
              {project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-all hover:scale-105"
                >
                  <GithubIcon size={16} />
                  Source
                </a>
              )}
              {project.live !== "#" ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all hover:scale-105"
                >
                  <ExternalLink size={16} />
                  Live Site
                </a>
              ) : "category" in project && (
                <span className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-500 text-sm font-semibold cursor-not-allowed select-none">
                  <ExternalLink size={16} />
                  Live Site
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {"category" in project && project.category && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs font-semibold text-gray-300 border border-white/10">
            {project.category}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors md:h-14 overflow-hidden">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 md:h-18 overflow-hidden">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4 md:min-h-14 content-start">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg bg-[#1f2937] text-gray-400 text-xs font-medium border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center pt-4 border-t border-white/5 mt-auto">
          <button
            onClick={() => onViewMore(project)}
            className="ml-auto flex items-center gap-1 text-xs text-indigo-400 font-semibold hover:gap-2 transition-all"
          >
            View more <ArrowRight size={13} />
          </button>
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
      />
    </motion.div>
  );
}


const PAGE_SIZE = 6;

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<"personal" | "client">("personal");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const clientCategories = [
    "All",
    ...Array.from(
      new Set(
        projects
          .filter((p) => p.type === "client" && "category" in p)
          .map((p) => (p as { category: string }).category)
      )
    ),
  ];

  const filtered = projects.filter((p) => {
    if (p.type !== activeTab) return false;
    if (activeTab === "client" && activeCategory !== "All") {
      return "category" in p && p.category === activeCategory;
    }
    return true;
  });

  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE);
  const hasMore = filtered.length > PAGE_SIZE;

  const handleTabChange = (tab: "personal" | "client") => {
    setActiveTab(tab);
    setActiveCategory("All");
    setShowAll(false);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setShowAll(false);
  };

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3 block"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-4"
          >
            Selected{" "}
            <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto text-lg mb-8"
          >
            {activeTab === "personal"
              ? "Projects I built for myself — hover any card to explore the repo or live demo."
              : "Client and internal work delivered across my career — enterprise design systems, API integrations, WordPress builds, and embedded systems work with safety-critical hardware."}
          </motion.p>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10"
          >
            {(["personal", "client"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab === "personal" ? "Personal" : "Client Work"}
              </button>
            ))}
          </motion.div>

          {/* Category chips — only when Client Work is active */}
          <AnimatePresence>
            {activeTab === "client" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-wrap justify-center gap-2 mt-4"
              >
                {clientCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                      activeCategory === cat
                        ? "bg-white/10 text-white border-white/20"
                        : "text-gray-500 border-white/5 hover:text-gray-300 hover:border-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop: always a grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onViewMore={setSelectedProject}
            />
          ))}
        </div>

        {/* Mobile: single-column card grid for both tabs */}
        <div className="md:hidden grid grid-cols-1 gap-6">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onViewMore={setSelectedProject}
            />
          ))}
        </div>

        {/* View all / GitHub CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          {hasMore && !showAll && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all hover:scale-105"
            >
              View all {filtered.length} projects
              <ArrowRight size={16} />
            </motion.button>
          )}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            href="https://github.com/usmankadai?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-indigo-500/40 text-gray-300 hover:text-white font-semibold text-sm transition-all hover:bg-indigo-500/5"
          >
            <GithubIcon size={18} />
            View all on GitHub
            <ArrowRight size={16} />
          </motion.a>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
