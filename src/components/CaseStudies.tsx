import { useState, useEffect } from 'react';
import { HelpCircle, Sparkles, TrendingUp, Landmark, ShieldAlert, BadgeCheck, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CASE_STUDIES } from '../data';

interface CaseStudiesProps {
  selectedCaseStudyId: string | null;
  onClearCaseSelection: () => void;
}

export default function CaseStudies({ selectedCaseStudyId, onClearCaseSelection }: CaseStudiesProps) {
  const [activeCaseId, setActiveCaseId] = useState(CASE_STUDIES[0].id);

  // If a parent forces selection from the portfolio view
  useEffect(() => {
    if (selectedCaseStudyId) {
      const match = CASE_STUDIES.find((cs) => cs.id === selectedCaseStudyId);
      if (match) {
        setActiveCaseId(match.id);
      }
    }
  }, [selectedCaseStudyId]);

  const activeCase = CASE_STUDIES.find((cs) => cs.id === activeCaseId) || CASE_STUDIES[0];

  return (
    <section className="relative overflow-hidden bg-transparent py-24 sm:py-32" id="case-studies">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-28 left-0 -z-10 h-72 w-72 rounded-full bg-[#DBEAFE]/30 blur-3xl" />
      <div className="absolute bottom-10 right-0 -z-10 h-80 w-80 rounded-full bg-[#EDE9FE]/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#2563EB] uppercase bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200/60 shadow-sm">
            Durable Impact Records
          </span>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl font-display">
            In-Depth Case Studies
          </h2>
          <p className="mt-4 text-base text-slate-500">
            See the exact blueprints, operational constraints, and technical structures we engineered to transform our client organisations.
          </p>
        </div>

        {/* Outer Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Navigation: Case selector tabs */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block mb-4">
              Select Client Venture
            </span>
            {CASE_STUDIES.map((cs) => (
              <button
                key={cs.id}
                type="button"
                id={`btn-case-select-${cs.id}`}
                onClick={() => {
                  setActiveCaseId(cs.id);
                  onClearCaseSelection(); // Clear external override when user clicks manually
                }}
                className={`w-full text-left p-5 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                  activeCaseId === cs.id
                    ? 'bg-white border-blue-600 shadow-xl shadow-blue-500/5'
                    : 'bg-white/45 border-white/50 hover:bg-white/90 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono font-bold tracking-wide text-[#2563EB] uppercase bg-blue-100 px-2.5 py-0.5 rounded-full">
                    {cs.industry}
                  </span>
                </div>
                <h3 className="text-sm font-bold font-sans text-slate-900 leading-snug">
                  {cs.client}
                </h3>
                <span className="text-xs text-slate-500 mt-2 line-clamp-1">
                  {cs.title}
                </span>
              </button>
            ))}
          </div>

          {/* Right Area: Dynamic Detailed View */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCaseId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45 }}
                className="glass-card border border-white p-6 sm:p-10 rounded-3xl shadow-xl shadow-blue-500/5 backdrop-blur-xl"
                id="case-study-details-card"
              >
                {/* Header info */}
                <div className="mb-8">
                  <span className="text-xs font-mono font-bold text-[#A78BFA] uppercase tracking-wider block mb-1">
                    {activeCase.industry} &bull; FULL EXECUTION ARCHITECTURE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-sans text-[#0F172A] leading-tight">
                    {activeCase.title}
                  </h3>
                </div>

                {/* Metrics Blocks Row */}
                <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
                  {activeCase.metrics.map((m, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100/90 text-center">
                      <span className="text-xl sm:text-3xl font-black text-[#2563EB] font-mono tracking-tight block mb-1">
                        {m.value}
                      </span>
                      <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest block font-sans leading-none">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Problem & Solution block */}
                <div className="space-y-6">
                  {/* Problem */}
                  <div className="flex gap-4 items-start p-5 bg-rose-50/40 border border-rose-100 rounded-2xl">
                    <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest mb-1.5 leading-none">
                        The Operational Bottleneck
                      </h4>
                      <p className="text-xs leading-relaxed text-[#334155]">
                        {activeCase.problem}
                      </p>
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="flex gap-4 items-start p-5 bg-emerald-50/40 border border-emerald-100 rounded-2xl">
                    <BadgeCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest mb-1.5 leading-none">
                        Our Engineered Architecture
                      </h4>
                      <p className="text-xs leading-relaxed text-[#334155]">
                        {activeCase.solution}
                      </p>
                    </div>
                  </div>

                  {/* Concrete Results list */}
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-4">
                      Documented Production Success Metrics
                    </h4>
                    <ul className="space-y-3">
                      {activeCase.results.map((res, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-[#334155]/95 font-medium leading-relaxed">
                          <CheckCircle className="w-4.5 h-4.5 text-[#2563EB] shrink-0 mt-0.5" />
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
