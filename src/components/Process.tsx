import { MessageSquare, ClipboardList, Code, Rocket } from 'lucide-react';
import { motion } from 'motion/react';

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Audit Call',
      subtitle: 'Identify Key Lever Points',
      desc: 'We hop on a call to thoroughly review your current lead acquisition methods, CRM pipeline bottlenecks, and repetitive labor habits. We identify exact software integrations or AI solutions that generate immediate ROI.',
      icon: <MessageSquare className="w-5 h-5 text-blue-600" />,
      color: 'bg-blue-50 border-blue-100',
    },
    {
      number: '02',
      title: 'Planning & Architecture',
      subtitle: 'Define Blueprints & Milestones',
      desc: 'We map out a clear technical blueprint, detailing exact database schemas, user-flow maps, prompt behaviors, and API boundaries. You receive a structured scope of work with transparent milestones and deadlines.',
      icon: <ClipboardList className="w-5 h-5 text-[#A78BFA]" />,
      color: 'bg-purple-50 border-purple-100',
    },
    {
      number: '03',
      title: 'Iterative Engineering',
      subtitle: 'Premium Code & Strict Guidelines',
      desc: 'Our senior developers write clean, modular React components, configure headless database records, and implement Meta APIs server-side. You receive private preview test-links to check progress incrementally.',
      icon: <Code className="w-5 h-5 text-emerald-600" />,
      color: 'bg-emerald-50 border-emerald-100',
    },
    {
      number: '04',
      title: 'Launch & Expansion',
      subtitle: 'Secure Deployment & Warranty',
      desc: 'We configure DNS settings, launch your static app onto global Edge CDNs, activate custom backend triggers, and hand over complete system training. Includes a dedicated SLA warranty for continuous technical upkeep.',
      icon: <Rocket className="w-5 h-5 text-rose-600" />,
      color: 'bg-rose-50 border-rose-100',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-transparent py-24 sm:py-32" id="process">
      {/* Visual background flourishes */}
      <div className="absolute right-0 top-10 -z-10 h-72 w-72 rounded-full bg-blue-50/40 blur-3xl opacity-50" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header content */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <span className="text-xs font-mono font-bold tracking-widest text-[#2563EB] uppercase bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200/60 shadow-sm">
            Our Proven Framework
          </span>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl font-display">
            How We Build & Scale
          </h2>
          <p className="mt-4 text-base text-slate-500">
            Structured execution that erases uncertainty. We translate your commercial objectives into high-speed production assets.
          </p>
        </div>

        {/* Timeline representation */}
        <div className="relative mt-16">
          {/* Central connecting line for desktop */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 -translate-x-[1px] -z-10 hidden md:block" />

          <div className="space-y-12 md:space-y-20">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } relative`}
                >
                  {/* Point Indicator on central line */}
                  <div className="absolute left-4 md:left-1/2 top-4 -translate-x-[17px] z-10 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 border border-white text-white shadow-md hidden md:flex">
                    <span className="text-[10px] font-black font-mono">
                      {step.number}
                    </span>
                  </div>

                  {/* Empty balance block for grid symmetry */}
                  <div className="w-full md:w-1/2 hidden md:block" />

                  {/* Active content card node */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="w-full md:w-[45%] pl-10 md:pl-0 space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${step.color} shadow-sm`}>
                        {step.icon}
                      </div>
                      <span className="text-xs font-bold text-[#2563EB] tracking-wide font-sans bg-blue-100 px-2.5 py-0.5 rounded-full uppercase md:hidden">
                        STEP {step.number}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">
                        {step.subtitle}
                      </span>
                      <h3 className="text-lg font-bold font-sans text-[#0F172A]">
                        {step.title}
                      </h3>
                    </div>

                    <div className="text-sm leading-relaxed text-[#334155] glass-card p-5 rounded-3xl border-white hover:border-blue-300 hover:scale-[1.01] hover:rotate-[0.5deg] hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer">
                      {step.desc}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
