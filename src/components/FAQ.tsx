import { useState } from 'react';
import { HelpCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative overflow-hidden bg-transparent py-24 sm:py-32" id="faq">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-12 left-0 -z-10 h-72 w-72 rounded-full bg-[#DBEAFE]/30 blur-3xl" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#2563EB] uppercase bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200/60 shadow-sm">
            Inquiries & Operational Facts
          </span>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl font-display">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-slate-500">
            Have inquiries about custom software timelines, Meta integrations, or SLAs? See our direct technical guidelines below.
          </p>
        </div>

        {/* Accordions Container */}
        <div className="space-y-4" id="faq-accordions">
          {FAQS.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`glass-card rounded-2xl transition-all duration-300 cursor-pointer ${
                  isOpen
                    ? 'border-blue-600 shadow-xl shadow-blue-500/5 bg-white/80'
                    : 'border-white/50 hover:border-blue-300 bg-white/30'
                }`}
              >
                {/* Trigger Button Header */}
                <button
                  type="button"
                  id={`btn-faq-trigger-${faq.id}`}
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="flex items-center justify-between w-full p-5 sm:p-6 text-left cursor-pointer focus:outline-none"
                >
                  <div className="flex gap-4 items-center">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg border shrink-0 ${
                      isOpen ? 'bg-blue-50 border-blue-100 text-[#2563EB]' : 'bg-slate-50 border-slate-100 text-slate-400'
                    }`}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className="text-sm sm:text-base font-bold text-[#0F172A] font-sans">
                      {faq.question}
                    </span>
                  </div>

                  <span className={`p-1 text-slate-400 transform transition-transform duration-300 ${isOpen ? 'rotate-90 text-[#2563EB]' : ''}`}>
                    <ChevronRight className="w-5 h-5" />
                  </span>
                </button>

                {/* Collapsible Panel content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-slate-100 text-xs sm:text-sm leading-relaxed text-[#334155] pl-16 whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
