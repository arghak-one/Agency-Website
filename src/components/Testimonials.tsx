import { useEffect, useState, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === TESTIMONIALS.length - 1 ? 0 : prevIndex + 1
        ),
      6000
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative overflow-hidden bg-transparent py-24 sm:py-32" id="testimonials">
      {/* Absolute glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 h-80 w-80 rounded-full bg-[#EDE9FE]/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#2563EB] uppercase bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200/60 shadow-sm">
            Client Voices & Outcomes
          </span>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl font-display">
            What Our Partners Say
          </h2>
          <p className="mt-4 text-base text-slate-500">
            Nexora works with forward-thinking operators to automate manual systems and engineer luxury digital storefronts.
          </p>
        </div>

        {/* Real Testimonial Display Area */}
        <div className="relative max-w-4xl mx-auto px-4 md:px-12">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6 sm:p-10 glass-card border border-white/70 rounded-3xl shadow-xl shadow-blue-500/5 flex flex-col md:flex-row gap-8 items-center"
            >
              {/* Quote marks background decoration */}
              <Quote className="absolute right-8 top-8 w-16 h-16 text-slate-100/40 -z-10 select-none" />

              {/* Client Face & Brand */}
              <div className="flex-shrink-0 text-center space-y-3 relative z-10">
                <div className="relative inline-block p-1 bg-white rounded-full border border-slate-200 shadow-sm">
                  <img
                    src={TESTIMONIALS[currentIndex].photoUrl}
                    alt={TESTIMONIALS[currentIndex].name}
                    className="h-20 w-20 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Floating rating badge */}
                  <span className="absolute bottom-0 right-0 h-6 w-6 bg-amber-400 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-md">
                    ★
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A] font-sans">
                    {TESTIMONIALS[currentIndex].name}
                  </h4>
                  <p className="text-[11px] font-mono tracking-wide text-slate-400 uppercase">
                    {TESTIMONIALS[currentIndex].role}
                  </p>
                  <p className="text-xs font-semibold text-[#2563EB]">
                    {TESTIMONIALS[currentIndex].company}
                  </p>
                </div>
              </div>

              {/* Review Statement content */}
              <div className="flex-1 flex flex-col justify-between space-y-4 relative z-10">
                {/* Visual Stars */}
                <div className="flex items-center gap-0.5 justify-center md:justify-start">
                  {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-amber-400 text-amber-500" />
                  ))}
                </div>

                <p className="text-sm leading-relaxed text-[#334155]/90 font-medium italic text-center md:text-left">
                  "{TESTIMONIALS[currentIndex].text}"
                </p>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Nav Controls Left/Right */}
          <div className="flex items-center justify-between md:absolute md:inset-x-0 md:top-1/2 md:-translate-y-1/2 mt-8 md:mt-0 px-2">
            <button
              onClick={handlePrev}
              type="button"
              id="btn-testimonial-prev"
              className="flex h-11 w-11 items-center justify-center rounded-full glass-card border border-white/60 text-slate-500 hover:text-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              type="button"
              id="btn-testimonial-next"
              className="flex h-11 w-11 items-center justify-center rounded-full glass-card border border-white/60 text-slate-500 hover:text-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center gap-1.5 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                id={`btn-testimonial-indicator-${idx}`}
                onClick={() => {
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-6 bg-blue-600' : 'w-2 bg-slate-200'
                }`}
                aria-label={`Go to testimonial slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
