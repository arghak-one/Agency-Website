import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { Award, Layers, Bot, HeartHandshake, ArrowUpRight } from 'lucide-react';

interface StatCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function StatCounter({ value, suffix = '', duration = 2.5 }: StatCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayVal, setDisplayVal] = useState('0');

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: 'easeOut',
    });

    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayVal(latest.toLocaleString());
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, value, duration, rounded]);

  return (
    <span>
      {displayVal}
      {suffix}
    </span>
  );
}

export default function Results() {
  const statsList = [
    {
      label: 'Projects Completed',
      value: 150,
      suffix: '+',
      icon: <Award className="w-5 h-5 text-blue-600" />,
      desc: 'High-end React applications and SaaS builds.'
    },
    {
      label: 'Automations Systems',
      value: 50,
      suffix: '+',
      icon: <Bot className="w-5 h-5 text-purple-600" />,
      desc: 'Seamless pipeline synchers and databases.'
    },
    {
      label: 'Success Satisfaction',
      value: 98,
      suffix: '%',
      icon: <HeartHandshake className="w-5 h-5 text-emerald-600" />,
      desc: 'Retained support contracts and active referrals.'
    },
    {
      label: 'Impressions Generated',
      value: 10,
      suffix: 'M+',
      icon: <Layers className="w-5 h-5 text-rose-600" />,
      desc: 'Customer events managed through custom systems.'
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-tr from-[#0F172A] to-[#1E293B] py-20 sm:py-28 text-white" id="results">
      {/* Dynamic background lighting */}
      <div className="absolute top-0 right-0 h-64 w-64 bg-[#3B82F6]/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 h-80 w-80 bg-[#A78BFA]/10 blur-3xl rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column Text Details */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <span className="text-xs font-mono font-bold tracking-widest text-[#2563EB] bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full uppercase">
              Proven Performance
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight font-display sm:text-4xl text-white">
              Concrete Business Metrics We Generated
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We focus on building functional systems, eliminating hours of human manual labor and positioning our clients as market leaders.
            </p>
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-full px-5 py-2.5 transition-colors"
              >
                Scale Your Business
                <ArrowUpRight className="w-4 h-4 text-blue-400" />
              </a>
            </div>
          </div>

          {/* Right Column Stats Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {statsList.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-6 sm:p-8 bg-white/[0.03] border border-white/10 rounded-3xl backdrop-blur-xl hover:border-blue-500/40 hover:bg-white/[0.06] hover:translate-y-[-4px] hover:rotate-1 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 group-hover:bg-blue-500/10 transition-colors">
                    {stat.icon}
                  </div>
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white group-hover:text-blue-400 transition-colors">
                    <StatCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold font-sans text-slate-100 mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
