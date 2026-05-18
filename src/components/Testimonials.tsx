"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { testimonials } from "@/data";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const autoRef = useRef<ReturnType<typeof setInterval>>(null);

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setCurrent((next + testimonials.length) % testimonials.length);
  }, []);

  const prev = () => go(current - 1, -1);
  const next = useCallback(() => go(current + 1, 1), [current, go]);

  // Autoplay
  useEffect(() => {
    autoRef.current = setInterval(next, 5000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const testimonial = testimonials[current];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-indigo-950/10 to-transparent pointer-events-none" />

      {/* Large quote watermark */}
      <div className="absolute top-8 left-8 text-[200px] leading-none text-white/[0.02] font-serif select-none pointer-events-none">
        &ldquo;
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3 block"
          >
            Social Proof
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-4"
          >
            What People{" "}
            <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Say
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto text-lg"
          >
            Kind words from the people I&apos;ve had the pleasure of working with.
          </motion.p>
        </div>

        {/* Main carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative"
        >
          {/* Card */}
          <div className="relative bg-[#111827] border border-white/5 rounded-3xl p-8 sm:p-10 overflow-hidden min-h-[280px]">
            {/* Accent corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-indigo-600/20 to-transparent rounded-3xl" />

            <Quote
              size={40}
              className="absolute top-6 right-8 text-indigo-500/20"
              strokeWidth={1.5}
            />

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                {/* Stars */}
                <div className="mb-6">
                  <StarRating count={testimonial.rating} />
                </div>

                {/* Quote */}
                <blockquote className="text-lg sm:text-xl text-gray-200 leading-relaxed font-medium mb-8">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-linear-to-br ${testimonial.avatarGradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">
                      {testimonial.role}
                      <span className="text-gray-600 mx-1">·</span>
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > current ? 1 : -1)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-indigo-500" : "w-2 bg-gray-700 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-xl bg-[#1f2937] hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/30 text-gray-400 hover:text-indigo-400 flex items-center justify-center transition-all"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-xl bg-[#1f2937] hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/30 text-gray-400 hover:text-indigo-400 flex items-center justify-center transition-all"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mini cards below */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.name}
              onClick={() => go(i, i > current ? 1 : -1)}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
              className={`p-3 rounded-2xl border text-left transition-all ${
                i === current
                  ? "bg-indigo-500/10 border-indigo-500/40"
                  : "bg-[#111827] border-white/5 hover:border-white/10"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className={`w-7 h-7 rounded-lg bg-linear-to-br ${t.avatarGradient} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}
                >
                  {t.avatar}
                </div>
                <span className="text-xs font-semibold text-white truncate">{t.name}</span>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">{t.text}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
