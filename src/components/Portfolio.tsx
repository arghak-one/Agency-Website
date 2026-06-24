import { useState } from 'react';
import { ExternalLink, Layers, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_ITEMS } from '../data';

interface PortfolioProps {
  onSelectCaseStudy: (caseStudyId: string) => void;
}

export default function Portfolio({ onSelectCaseStudy }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Websites' | 'Automation' | 'AI Projects' | 'SaaS' | 'E-commerce'>('All');

  const filters: ('All' | 'Websites' | 'Automation' | 'AI Projects' | 'SaaS' | 'E-commerce')[] = [
    'All',
    'Websites',
    'Automation',
    'AI Projects',
    'SaaS',
    'E-commerce'
  ];

  const filteredItems = activeFilter === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === activeFilter);

  const handleCaseStudyClick = (caseStudyId?: string) => {
    if (!caseStudyId) return;
    onSelectCaseStudy(caseStudyId);
    const element = document.querySelector('#case-studies');
    if (element) {
      const offsetHeader = 88;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offsetHeader;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCustomAction = (item: any) => {
    if (item.caseStudyActionType === 'scroll-to-contact') {
      const element = document.querySelector('#contact');
      if (element) {
        const offsetHeader = 88;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offsetHeader;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      handleCaseStudyClick(item.caseStudyId);
    }
  };

  return (
    <section id="portfolio" className="relative overflow-hidden bg-transparent py-24 sm:py-32">
      {/* Absolute visual glows */}
      <div className="absolute top-0 right-1/4 -z-10 h-80 w-80 bg-blue-50/40 blur-3xl rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#2563EB] uppercase bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200/60 shadow-sm">
            Our Elite Showcase
          </span>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl font-display">
            Featured Projects & Applications
          </h2>
          <p className="mt-4 text-base text-slate-500">
            Explore custom products built by Nexora. Our software combines premium UI detailing with robust integration architectures to deliver high performance.
          </p>
        </div>

        {/* Dynamic Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              id={`portfolio-filter-${filter.toLowerCase().replace(' ', '-')}`}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all border cursor-pointer ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200 hover:scale-102'
                  : 'bg-white/60 text-slate-600 border-white/60 hover:bg-white/95'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          id="portfolio-items-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col justify-between glass-card border border-slate-200/50 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-300 hover:rotate-1 hover:scale-[1.01] transition-all duration-300"
              >
                {/* Thumbnail image with dynamic overlays */}
                <div className="relative aspect-video overflow-hidden bg-slate-50 border-b border-slate-100">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category Pill Overlaid */}
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#2563EB] rounded-full border border-slate-100 shadow-sm leading-none uppercase tracking-wider font-sans select-none z-10">
                    <Layers className="w-3 h-3 text-blue-500" />
                    {item.customCategoryBadge || item.category}
                  </span>
                </div>

                {/* Content block */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Industry */}
                    <span className="text-[10px] font-mono tracking-widest text-[#334155]/50 uppercase font-bold block mb-1.5">
                      {item.industry}{!item.hideClientIntegration && ' \u2022 CLIENT INTEGRATION'}
                    </span>
                    <h3 className="text-lg font-bold font-sans text-[#0F172A] group-hover:text-[#2563EB] transition-colors line-clamp-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#334155] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-slate-50 text-[10px] font-semibold text-slate-500 rounded-md border border-slate-100 leading-none"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Trust Element badge */}
                    {item.showLiveBadge && (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50/70 border border-emerald-100/80 px-2.5 py-1 rounded-lg w-fit select-none">
                        <span>✅</span> Live Website Available
                      </div>
                    )}

                    {/* CTA Actions */}
                    <div className="flex items-center gap-3 pt-2">
                      {item.liveDemoUrl && item.liveDemoUrl !== '#' ? (
                        <a
                          href={item.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-[#2563EB] bg-slate-50 hover:bg-slate-100 border border-slate-200/50 rounded-xl transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live UI Demo
                        </a>
                      ) : (
                        <div className="flex-1 h-9 flex items-center justify-center text-[10px] text-slate-400 font-medium bg-slate-50/50 rounded-xl select-none italic border border-slate-100">
                          🔒 Backend Core System Only
                        </div>
                      )}

                      {item.caseStudyId && (
                        item.caseStudyActionType === 'open-url' ? (
                          <a
                            href={item.caseStudyUrl || item.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:brightness-105 rounded-xl shadow-md shadow-blue-500/5 hover:shadow-blue-500/10 transition-all text-center cursor-pointer"
                          >
                            {item.caseStudyText || 'Case Study'}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleCustomAction(item)}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:brightness-105 rounded-xl shadow-md shadow-blue-500/5 hover:shadow-blue-500/10 transition-all cursor-pointer"
                          >
                            {item.caseStudyText || 'Case Study'}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
