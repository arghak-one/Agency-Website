import { useState } from 'react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { Service } from '../types';

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getIcon = (name: string, colorClass: string) => {
    const IconComponent = (Icons as any)[name];
    if (!IconComponent) {
      return <Icons.HelpCircle className={`w-6 h-6 ${colorClass}`} />;
    }
    return <IconComponent className={`w-6 h-6 ${colorClass}`} />;
  };

  const getServiceColor = (id: string) => {
    switch (id) {
      case 'web-dev': return { bg: 'bg-blue-50 border-blue-100', text: 'text-blue-600', fill: 'from-blue-500/10 to-blue-500/0' };
      case 'ai-chatbots': return { bg: 'bg-indigo-50 border-indigo-100', text: 'text-indigo-600', fill: 'from-indigo-500/10 to-indigo-500/0' };
      case 'whatsapp-auto': return { bg: 'bg-emerald-50 border-emerald-100', text: 'text-emerald-600', fill: 'from-emerald-500/10 to-emerald-500/0' };
      case 'ai-voice': return { bg: 'bg-purple-50 border-purple-100', text: 'text-purple-600', fill: 'from-purple-500/10 to-purple-500/0' };
      case 'crm-auto': return { bg: 'bg-violet-50 border-violet-100', text: 'text-violet-600', fill: 'from-violet-500/10 to-violet-500/0' };
      default: return { bg: 'bg-slate-50 border-slate-100', text: 'text-[#2563EB]', fill: 'from-blue-500/5 to-blue-500/0' };
    }
  };

  return (
    <section id="services" className="relative overflow-hidden bg-transparent py-24 sm:py-32">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-[#DBEAFE]/40 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#EDE9FE]/50 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header content */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <span className="text-xs font-mono font-bold tracking-widest text-[#2563EB] uppercase bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200/60 shadow-sm">
              Engine of Growth
            </span>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl font-display">
              Our Core Services
            </h2>
            <p className="mt-4 text-base text-[#334155]">
              We design, build, and optimize high-end visual solutions and business automation pipelines that scale operations and increase cash flow.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
            >
              Request Custom Consultation
              <Icons.ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Services Grid with beautiful Horizontal/Vertical cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {SERVICES.map((service, index) => {
            const colors = getServiceColor(service.id);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative flex flex-col md:flex-row gap-6 p-6 sm:p-8 glass-card border border-slate-200/60 rounded-3xl hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 transform hover:scale-[1.01] hover:rotate-[-0.5deg]"
              >
                {/* Visual Gradient Background Accent on Hover */}
                <span className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${colors.fill} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />

                {/* Left Section: Service Icon */}
                <div className="flex-shrink-0">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${colors.bg}`}>
                    {getIcon(service.iconName, colors.text)}
                  </div>
                </div>

                {/* Right Section: Content & features */}
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <h3 className="text-lg font-bold font-sans text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                        {service.title}
                      </h3>
                      {service.badge && (
                        <span className="inline-flex h-5 items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#334155] leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Highlights list - horizontal previews on desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    {service.features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <Icons.CheckIcon className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                        <span className="text-[11px] font-medium text-slate-500 truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-2">
                    <button
                      id={`btn-service-${service.id}`}
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB]/80 group-hover:text-[#2563EB] pr-4 py-1.5 cursor-pointer"
                    >
                      Learn More Specs
                      <Icons.ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Modal/Drawer details view */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-sm"
              id="services-modal-backdrop"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] z-10"
              id="services-modal-body"
            >
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
                aria-label="Close modal"
              >
                <Icons.X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-[#2563EB]">
                  {getIcon(selectedService.iconName, 'text-[#2563EB]')}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-sans text-[#0F172A]">
                    {selectedService.title}
                  </h3>
                  <span className="inline-flex h-5 items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-[#2563EB] mt-1">
                    {selectedService.badge || 'Executive SLA'}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Service Capabilities & Philosophy
                  </h4>
                  <p className="text-sm text-[#334155] leading-relaxed">
                    {selectedService.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Technical Deliverables & Standards
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedService.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <Icons.CheckIcon className="w-4.5 h-4.5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-[#334155]">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 font-medium">
                    ⚡ Integrated into growth pipelines natively.
                  </span>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setSelectedService(null)}
                      className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-slate-100 rounded-lg justify-center w-full sm:w-auto cursor-pointer"
                    >
                      Close Specs
                    </button>
                    <a
                      href="#contact"
                      onClick={() => setSelectedService(null)}
                      className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-lg shadow-md hover:brightness-105 text-center justify-center w-full sm:w-auto"
                    >
                      Book Free Consultation
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
