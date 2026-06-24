import { ArrowRight, Laptop, MessageSquareCode, Settings, Bot, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenProject: () => void;
}

export default function Hero({ onOpenProject }: HeroProps) {
  const handleScrollToPortfolio = () => {
    const portfolioSection = document.querySelector('#portfolio');
    if (portfolioSection) {
      const offsetHeader = 100;
      const elementPosition = portfolioSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offsetHeader;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent"
    >
      <div className="mx-auto max-w-7xl">
        {/* Large Rounded Hero Container with premium styles */}
        <div 
          className="relative w-full rounded-[40px] border border-white/90 shadow-[0_20px_50px_rgba(37,99,235,0.06)] overflow-hidden p-6 sm:p-10 lg:p-16 transition-all duration-300"
          style={{
            background: 'radial-gradient(circle at 5% 5%, #F5EEFF 0%, rgba(255,255,255,0.4) 35%, #FFFFFF 60%), radial-gradient(circle at 95% 30%, #EEF6FF 0%, rgba(255,255,255,0.2) 40%, #FFFFFF 70%), radial-gradient(circle at 50% 100%, #F3F0FF 0%, rgba(255,255,255,0) 50%, #FFFFFF 100%), #FFFFFF'
          }}
        >
          {/* Subtle white glassmorphism overlay */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] pointer-events-none" />

          {/* Dotted background matrix as seen in reference */}
          <div 
            className="absolute right-4 top-1/4 w-28 h-40 opacity-25 pointer-events-none hidden xl:block" 
            style={{ 
              backgroundImage: 'radial-gradient(#2563EB 1px, transparent 1px)', 
              backgroundSize: '12px 12px' 
            }} 
          />

          {/* Floating Luxury Elements & Spheres */}
          {/* Floating Purple 3D Sphere (Top-Right of image area) */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              x: [0, 5, 0],
              rotate: [0, 360]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-12 top-24 w-12 h-12 rounded-full bg-gradient-to-br from-[#E9D5FF] via-[#9333EA] to-[#581C87] shadow-[inset_-3px_-3px_8px_rgba(0,0,0,0.35),0_10px_20px_rgba(147,51,234,0.2)] border border-white/20 z-20 pointer-events-none hidden lg:block"
          />

          {/* Floating Blue 3D Sphere (Bottom-Right of image area) */}
          <motion.div
            animate={{ 
              y: [0, 12, 0],
              x: [0, -6, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute right-1/4 bottom-14 w-8 h-8 rounded-full bg-gradient-to-br from-[#E0F2FE] via-[#3B82F6] to-[#1E3A8A] shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.4),0_8px_16px_rgba(59,130,246,0.15)] border border-white/20 z-20 pointer-events-none hidden lg:block"
          />

          {/* Decorative glowing background centers */}
          <div className="absolute left-1/4 top-1/3 w-64 h-64 rounded-full bg-[#F5EEFF] blur-[80px] opacity-60 pointer-events-none" />
          <div className="absolute right-1/4 bottom-1/3 w-72 h-72 rounded-full bg-[#E8F2FF] blur-[90px] opacity-70 pointer-events-none" />

          {/* Hero Content Grid */}
          <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              {/* Top Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/40 text-slate-800 text-[11px] font-bold tracking-wider shadow-[0_2px_12px_rgba(0,0,0,0.03)] select-none">
                  <span className="text-sm">⭐</span> AI-POWERED DIGITAL GROWTH AGENCY
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-[54px] lg:text-[58px] xl:text-[62px] leading-[1.1] font-extrabold text-[#0D1527] tracking-tight font-display"
              >
                Websites, Automations &<br />
                AI Systems That <span className="text-[#2563EB] font-black">Grow</span><br />
                <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent font-black">
                  Businesses
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg leading-relaxed text-[#64748B] max-w-[620px] font-sans"
              >
                Scale your business with custom websites, intelligent AI chatbots, CRM workflows, and WhatsApp automation systems designed for elite performance.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <button
                  id="hero-cta-start"
                  onClick={onOpenProject}
                  className="group flex h-14 items-center justify-center gap-2 px-8 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] font-extrabold text-white shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 hover:opacity-95 transition-all duration-300 w-full sm:w-auto cursor-pointer"
                >
                  Start Your Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  id="hero-cta-portfolio"
                  onClick={handleScrollToPortfolio}
                  className="group flex h-14 items-center justify-center gap-2 px-8 rounded-full bg-white text-[#334155] border-2 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 w-full sm:w-auto cursor-pointer font-extrabold shadow-sm"
                >
                  <span className="flex items-center gap-1.5 grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all">👁️ View Portfolio</span>
                </button>
              </motion.div>
            </div>

            {/* Right Side Hero Visual */}
            <div className="lg:col-span-12 xl:col-span-5 relative flex flex-col items-center justify-center min-h-[440px] lg:min-h-[500px]">
              
              {/* Radial blue & lavender glow / lighting behind concentric rings */}
              <div className="absolute w-[440px] h-[440px] rounded-full bg-blue-400/10 blur-[90px] -z-20 pointer-events-none animate-pulse" />
              <div className="absolute w-[320px] h-[320px] rounded-full bg-[#E2EDFF]/45 blur-[40px] -z-15 pointer-events-none animate-pulse" />

              {/* Concentric rings background (7 beautiful rings exactly mimicking reference) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-visible scale-[1.15]">
                <div className="absolute w-[200px] h-[200px] rounded-full border border-blue-200/20 bg-white/[0.01]" />
                <div className="absolute w-[280px] h-[280px] rounded-full border border-blue-200/15" />
                <div className="absolute w-[360px] h-[360px] rounded-full border border-blue-200/12" />
                <div className="absolute w-[440px] h-[440px] rounded-full border border-blue-200/10 border-dashed" />
                <div className="absolute w-[520px] h-[520px] rounded-full border border-blue-100/10" />
                <div className="absolute w-[600px] h-[600px] rounded-full border border-blue-100/5" />
                <div className="absolute w-[680px] h-[680px] rounded-full border border-blue-100/5" />
              </div>

              {/* Centered Entrepreneur Image inside circular frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10 w-[260px] sm:w-[320px] md:w-[350px] aspect-square flex items-center justify-center"
              >
                <div className="relative w-full h-full p-2.5 rounded-full bg-white/70 backdrop-blur-md border border-white shadow-[0_25px_60px_rgba(37,99,235,0.12)] hover:rotate-1 transition-transform duration-500 overflow-hidden">
                  <img
                    src="/images/hero_entrepreneur_1782144970965.jpg"
                    alt="Nexora Entrepreneur"
                    className="w-full h-full rounded-full object-cover object-center transform hover:scale-[1.03] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle glass overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none rounded-full" />
                </div>
              </motion.div>

              {/* Floating glassmorphic cards (visible on desktop views (lg and up)) */}
              <div className="hidden lg:block absolute inset-0 z-20 pointer-events-none">
                {/* WhatsApp Automation card */}
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.1, ease: 'easeInOut' }}
                  className="absolute pointer-events-auto left-[-15px] top-[15%] xl:left-[-40px] flex items-center gap-3 px-4 py-2.5 bg-white/90 backdrop-blur-xl rounded-2xl border border-white shadow-lg shadow-blue-500/5 hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 shrink-0">
                    <MessageSquareCode className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block leading-none mb-1">WhatsApp Automation</span>
                    <span className="text-xs font-black text-slate-800 block leading-none">Instant Channels</span>
                  </div>
                </motion.div>

                {/* AI Chatbots card */}
                <motion.div
                  animate={{ y: [0, -9, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, delay: 0.3, ease: 'easeInOut' }}
                  className="absolute pointer-events-auto right-[0px] top-[18%] xl:right-[-30px] flex items-center gap-3 px-4 py-2.5 bg-white/90 backdrop-blur-xl rounded-2xl border border-white shadow-lg shadow-purple-500/5 hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 border border-purple-100 shrink-0">
                    <Bot className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block leading-none mb-1">AI Chatbots</span>
                    <span className="text-xs font-black text-slate-800 block leading-none">Smart Responders</span>
                  </div>
                </motion.div>

                {/* CRM Automation card */}
                <motion.div
                  animate={{ y: [0, -11, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
                  className="absolute pointer-events-auto left-[-35px] bottom-[30%] xl:left-[-70px] flex items-center gap-3 px-4 py-2.5 bg-white/90 backdrop-blur-xl rounded-2xl border border-white shadow-lg shadow-blue-500/5 hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 shrink-0">
                    <Settings className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block leading-none mb-1">CRM Automation</span>
                    <span className="text-xs font-black text-slate-800 block leading-none">Fast Operations</span>
                  </div>
                </motion.div>

                {/* Website Development card */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, delay: 0.7, ease: 'easeInOut' }}
                  className="absolute pointer-events-auto right-[-20px] bottom-[25%] xl:right-[-50px] flex items-center gap-3 px-4 py-2.5 bg-white/90 backdrop-blur-xl rounded-2xl border border-white shadow-lg shadow-indigo-500/5 hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 shrink-0">
                    <Laptop className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block leading-none mb-1">Web Development</span>
                    <span className="text-xs font-black text-slate-800 block leading-none">Premium Visuals</span>
                  </div>
                </motion.div>

                {/* Lead Generation card (bottom center-left) */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, delay: 0.9, ease: 'easeInOut' }}
                  className="absolute pointer-events-auto left-[15%] bottom-[-15px] flex items-center gap-3 px-4 py-2.5 bg-white/95 backdrop-blur-xl rounded-2xl border border-white shadow-lg shadow-orange-500/5 hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 border border-orange-100 shrink-0">
                    <Sparkles className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block leading-none mb-1">Lead Generation</span>
                    <span className="text-xs font-black text-slate-800 block leading-none">High Conversions</span>
                  </div>
                </motion.div>
              </div>

              {/* Floating mobile glass cards (Responsive layout layout for mobile/tablets to prevent horizontal overflow) */}
              <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 w-full mt-10">
                <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/80 border border-white/60 shadow-sm">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 shrink-0">
                    <MessageSquareCode className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block leading-none mb-0.5">WhatsApp</span>
                    <span className="text-[11px] font-black text-slate-850 tracking-tight leading-none">Instant Channels</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/80 border border-white/60 shadow-sm">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 shrink-0">
                    <Bot className="w-4 h-4 text-purple-500" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block leading-none mb-0.5">Chatbots</span>
                    <span className="text-[11px] font-black text-slate-850 tracking-tight leading-none">Smart Responders</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/80 border border-white/60 shadow-sm">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 shrink-0">
                    <Settings className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block leading-none mb-0.5">CRM</span>
                    <span className="text-[11px] font-black text-slate-850 tracking-tight leading-none">Fast Operations</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/80 border border-white/60 shadow-sm">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 shrink-0">
                    <Laptop className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block leading-none mb-0.5">Web Dev</span>
                    <span className="text-[11px] font-black text-slate-850 tracking-tight leading-none">Premium Visuals</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/80 border border-white/60 shadow-sm col-span-2 sm:col-span-1">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 shrink-0">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block leading-none mb-0.5">Lead Gen</span>
                    <span className="text-[11px] font-black text-slate-850 tracking-tight leading-none">High Conversions</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
