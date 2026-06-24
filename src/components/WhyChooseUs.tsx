import { Zap, Target, Bot, Smartphone, Milestone, ShieldCheck, Globe, MessageSquareDiff } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyChooseUs() {
  const cards = [
    {
      title: 'Fast Delivery',
      desc: 'Our modular development framework allows us to assemble custom React interfaces and deploy functional CRM automations in days, not months.',
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      color: 'hover:border-amber-200'
    },
    {
      title: 'Business Focused',
      desc: 'We do not build technology for technology’s sake. Every line of code, form qualification, and AI agent we build tracks directly to conversions and margin growth.',
      icon: <Target className="w-6 h-6 text-rose-500" />,
      color: 'hover:border-rose-200'
    },
    {
      title: 'Automation Experts',
      desc: 'Deep integration specialists who understand webhooks, asynchronous jobs, AI prompts, vector indices, and official Meta developer cloud structures.',
      icon: <Bot className="w-6 h-6 text-[#2563EB]" />,
      color: 'hover:border-blue-200'
    },
    {
      title: 'Mobile Responsive',
      desc: 'Tested across diverse device parameters. Your designs translate beautifully on massive desktop screens down to standard mobile views, with zero overlap.',
      icon: <Smartphone className="w-6 h-6 text-emerald-500" />,
      color: 'hover:border-emerald-200'
    },
    {
      title: 'Conversion Optimized',
      desc: 'Engineered using behavioral funnel methods. We include clean action-oriented banners, frictionless input layouts, and fast loading parameters.',
      icon: <Milestone className="w-6 h-6 text-indigo-500" />,
      color: 'hover:border-indigo-200'
    },
    {
      title: 'Secure & Scalable',
      desc: 'Leverages secure token auth (JWT), standard Firebase schemas, Firestore rules, secure Edge SSL delivery, and serverless architectures.',
      icon: <ShieldCheck className="w-6 h-6 text-purple-500" />,
      color: 'hover:border-purple-200'
    },
    {
      title: 'Global Support',
      desc: 'No matter which continent your operations occupy, our systems execute 24/7. We guarantee support coverage across major business timezones.',
      icon: <Globe className="w-6 h-6 text-sky-500" />,
      color: 'hover:border-sky-200'
    },
    {
      title: 'Dedicated Communication',
      desc: 'Say goodbye to slow email ticketing. Track implementation milestones with a shared premium Slack channel, maintaining absolute transparency.',
      icon: <MessageSquareDiff className="w-6 h-6 text-[#A78BFA]" />,
      color: 'hover:border-violet-200'
    }
  ];

  return (
    <section className="relative overflow-hidden bg-transparent py-24 sm:py-32" id="why-choose-us">
      {/* Subtle styling accent */}
      <div className="absolute left-1/2 bottom-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#DBEAFE]/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <span className="text-xs font-mono font-bold tracking-widest text-[#2563EB] uppercase bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200/60 shadow-sm">
            Our Edge & Standards
          </span>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl font-display">
            Why Modern Startups Run With Nexora
          </h2>
          <p className="mt-4 text-base text-slate-500">
            We replace scattered software systems with bespoke digital solutions contextually matched to your operation.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`flex flex-col justify-between p-6 glass-card rounded-3xl hover:translate-y-[-4px] hover:rotate-[0.5deg] hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 group cursor-pointer`}
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200/40 mb-4 group-hover:scale-105 transition-transform">
                  {card.icon}
                </div>
                <h3 className="text-base font-bold font-sans text-[#0F172A] mb-2 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#334155]/85">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
