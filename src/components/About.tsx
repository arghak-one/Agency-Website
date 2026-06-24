import { useState } from 'react';
import { Target, Eye, FolderHeart, Smile, HelpCircle, Layers3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function About() {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision'>('mission');

  const stats = [
    {
      label: 'Projects Completed',
      value: '150+',
      icon: <FolderHeart className="w-5 h-5 text-blue-600" />,
      desc: 'Bespoke web & app structures launched globally.',
    },
    {
      label: 'Client Satisfaction',
      value: '98%',
      icon: <Smile className="w-5 h-5 text-purple-600" />,
      desc: 'Top-tier executive ratings and long-term retainer support.',
    },
    {
      label: 'Support Availability',
      value: '24/7',
      icon: <HelpCircle className="w-5 h-5 text-[#3B82F6]" />,
      desc: 'Direct Slack engineer communication channels.',
    },
    {
      label: 'Core Services',
      value: '5+',
      icon: <Layers3 className="w-5 h-5 text-[#A78BFA]" />,
      desc: 'Interconnected AI and high-speed web pipelines.',
    },
  ];

  const tabContent = {
    mission: {
      title: 'Our Dedicated Mission',
      icon: <Target className="w-5 h-5 text-[#2563EB]" />,
      text: 'To design high-performance, beautiful digital architecture and deploy automated software agents that erase commercial constraints. We partner closely with growth businesses to implement dependable tools that fuel sales speed and establish massive, long-term brand authority.',
      bullets: [
        'Eradicating repetitive administrative workflows through AI integration.',
        'Engineering ultra-fast e-commerce and SaaS platforms with edge delivery.',
        'Establishing absolute clarity, clean transparency, and robust security pipelines.',
      ],
    },
    vision: {
      title: 'Our Scaling Vision',
      icon: <Eye className="w-5 h-5 text-[#A78BFA]" />,
      text: 'To shape the future of enterprise operations by weaving reliable large language models, custom database structures, and high-speed design into one seamless commercial engine. Our systems ensure your business functions autonomously, scaling customer service and customer acquisition. ',
      bullets: [
        'Interconnecting all customer touchpoints withMeta WhatsApp APIs natively.',
        'Enabling client organizations to multiply results without expanding overhead.',
        'Democratizing enterprise-level custom software and API intelligence pipelines.',
      ],
    },
  };

  return (
    <section id="about" className="relative overflow-hidden bg-transparent py-24 sm:py-32">
      {/* Soft pastel decorative glow */}
      <div className="absolute right-0 top-1/4 -z-10 h-96 w-96 rounded-full bg-[#EDE9FE]/50 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#2563EB] uppercase bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200/60 shadow-sm">
            Engineering High-Level Performance
          </span>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl font-display">
            Technology That Helps Businesses Scale
          </h2>
          <p className="mt-4 text-base text-[#334155]">
            Nexora bridges the gap between complex software engineering, artificial intelligence model setups, and client-facing elegant experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 items-start">
          {/* Left Column: Team image inside Glass frame */}
          <div className="lg:col-span-6 relative">
            <div className="p-3 glass-card rounded-3xl shadow-xl hover:-rotate-1 transition-all duration-500 overflow-hidden">
              <img
                src="/images/about_team_1782142757748.jpg"
                alt="Nexora Collaborative Strategy Meeting"
                className="w-full h-auto rounded-2xl object-cover hover:scale-101 transition-transform duration-500 shadow-sm"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Overlay floating badge badge */}
            <div className="absolute -bottom-6 -right-4 bg-white/80 backdrop-blur-xl rounded-2xl border border-white p-4 shadow-xl max-w-[210px] hidden sm:block rotate-3 hover:rotate-0 transition-transform duration-300 cursor-pointer">
              <p className="text-xs font-mono font-bold text-[#2563EB] uppercase mb-1">⭐ COLLABORATION</p>
              <p className="text-xs font-semibold text-[#0F172A] leading-relaxed">
                Work closely with principal engineers and product managers.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Mission/Vision tabs */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex border-b border-slate-100">
              <button
                type="button"
                onClick={() => setActiveTab('mission')}
                className={`flex items-center gap-2 pb-4 text-sm font-bold tracking-wide transition-all border-b-2 px-6 cursor-pointer ${
                  activeTab === 'mission'
                    ? 'border-[#2563EB] text-[#2563EB]'
                    : 'border-transparent text-[#334155]/60 hover:text-[#334155]'
                }`}
              >
                <Target className="w-4 h-4" />
                Our Mission
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('vision')}
                className={`flex items-center gap-2 pb-4 text-sm font-bold tracking-wide transition-all border-b-2 px-6 cursor-pointer ${
                  activeTab === 'vision'
                    ? 'border-[#A78BFA] text-[#A78BFA]'
                    : 'border-transparent text-[#334155]/60 hover:text-[#334155]'
                }`}
              >
                <Eye className="w-4 h-4" />
                Our Vision
              </button>
            </div>

            <div className="min-h-[260px] glass-card p-6 sm:p-8 rounded-3xl shadow-lg border-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 text-[#0F172A]">
                    {tabContent[activeTab].icon}
                    <h3 className="text-lg font-bold font-sans">
                      {tabContent[activeTab].title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#334155] leading-relaxed">
                    {tabContent[activeTab].text}
                  </p>
                  <ul className="space-y-2 pt-2">
                    {tabContent[activeTab].bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#334155]/85">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#2563EB] shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Stats Grid featuring elegant Glassmorphic Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card p-6 rounded-3xl hover:translate-y-[-6px] hover:rotate-[1deg] hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 group-hover:bg-blue-50 transition-colors">
                  {stat.icon}
                </div>
                <span className="text-2xl font-black text-[#0F172A] font-mono tracking-tight">
                  {stat.value}
                </span>
              </div>
              <h4 className="text-sm font-bold font-sans text-[#0F172A] mb-1">
                {stat.label}
              </h4>
              <p className="text-xs text-[#334155]/70 leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
