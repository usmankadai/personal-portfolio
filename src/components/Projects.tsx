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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg bg-[#111827] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image / placeholder header */}
        <div className="relative h-52 shrink-0">
          {project.image ? (
            <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
          ) : (
            <AnimatedPlaceholder gradient={project.gradient} />
          )}
          <div className={`absolute inset-0 bg-linear-to-t from-[#111827] via-transparent to-transparent`} />
        </div>

        {/* Body */}
        <div className="p-6 pt-4">
          {/* Close button */}
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

          {/* Tags */}
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

          {/* Links */}
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold transition-all"
            >
              <GithubIcon size={15} />
              Source
            </a>
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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-[#111827] border border-white/5 rounded-3xl overflow-hidden card-hover flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Preview area */}
      <div className="relative h-52 overflow-hidden">
        {project.image ? (
          <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
        ) : (
          <AnimatedPlaceholder gradient={project.gradient} />
        )}

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center gap-4 z-10"
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-all hover:scale-105"
              >
                <GithubIcon size={16} />
                Source
              </a>
              {project.live !== "#" && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all hover:scale-105"
                >
                  <ExternalLink size={16} />
                  Live Site
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-indigo-600/90 backdrop-blur-sm text-xs font-bold text-white">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors md:h-14 overflow-hidden">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 md:h-18 overflow-hidden">
          {project.description}
        </p>

        {/* Tags */}
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

        {/* Footer */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-500 hover:text-indigo-400 text-xs font-medium transition-colors"
          >
            <GithubIcon size={13} />
            Source
          </a>
          {project.live !== "#" && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-500 hover:text-indigo-400 text-xs font-medium transition-colors"
            >
              <ExternalLink size={13} />
              Live Site
            </a>
          )}
          <button
            onClick={() => onViewMore(project)}
            className="ml-auto flex items-center gap-1 text-xs text-indigo-400 font-semibold hover:gap-2 transition-all"
          >
            View more <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Bottom gradient bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
      />
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
            className="text-gray-400 max-w-xl mx-auto text-lg"
          >
            Hover any card to explore the GitHub repo or live demo. Each project
            is something I built and shipped for real users.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onViewMore={setSelectedProject}
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/usmankadai?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-indigo-500/40 text-gray-300 hover:text-white font-semibold text-sm transition-all hover:bg-indigo-500/5"
          >
            <GithubIcon size={18} />
            View all projects on GitHub
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
