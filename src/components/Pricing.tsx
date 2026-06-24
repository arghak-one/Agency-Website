import { useState } from 'react';
import { Check, Star, ArrowRight, Rocket, TrendingUp, Bot, Gift } from 'lucide-react';
import { motion } from 'motion/react';

interface PricingProps {
  onBookCall: () => void;
}

export default function Pricing({ onBookCall }: PricingProps) {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      id: 'starter',
      name: 'Starter Website',
      description: 'Perfect for startups and local businesses getting online.',
      monthlyPrice: '₹999',
      yearlyPrice: '₹9,990',
      features: [
        'Premium Responsive Website',
        'Mobile Friendly Design',
        'Free Domain Included',
        'Free Hosting Included',
        'WhatsApp Integration',
        'Contact Form',
        'Basic SEO Setup',
        'Website Maintenance Included',
        'Monthly Technical Support',
        'No Hidden Charges'
      ],
      isHighlighted: false,
      icon: Rocket,
      iconBg: 'bg-blue-50 text-blue-600',
      checkColor: 'text-[#2563EB]',
      checkBg: 'bg-blue-50 border border-blue-100',
    },
    {
      id: 'business-pro',
      name: 'Business Website Pro',
      description: 'Perfect for growing businesses that want more leads and trust.',
      monthlyPrice: '₹1,499',
      yearlyPrice: '₹14,990',
      badge: '★ MOST POPULAR',
      isHighlighted: true,
      features: [
        'Everything in Starter',
        'Premium Custom Design',
        'Up to 10 Pages',
        'Advanced Animations',
        'Gallery / Portfolio Section',
        'Testimonials Section',
        'Blog Section (Optional)',
        'Speed Optimization',
        'Advanced SEO Setup',
        'Priority Support'
      ],
      icon: TrendingUp,
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
      checkColor: 'text-[#2563EB]',
      checkBg: 'bg-blue-50 border border-blue-100',
    },
    {
      id: 'ai-automation',
      name: 'AI Automation & Growth',
      description: 'For businesses wanting automation and lead generation systems.',
      monthlyPrice: '₹1,999',
      yearlyPrice: '₹19,990',
      isHighlighted: false,
      features: [
        'Everything in Business Pro',
        'AI Chatbot Integration',
        'WhatsApp Automation',
        'Lead Capture System',
        'CRM Integration',
        'Automated Follow-Ups',
        'Lead Tracking Dashboard',
        'Priority Support'
      ],
      icon: Bot,
      iconBg: 'bg-emerald-50 text-emerald-600',
      checkColor: 'text-emerald-600',
      checkBg: 'bg-emerald-50 border border-emerald-100/60',
    }
  ];

  return (
    <section className="relative overflow-hidden bg-transparent py-24 sm:py-32" id="pricing">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 right-0 -z-10 h-72 w-72 rounded-full bg-[#DBEAFE]/30 blur-3xl" />
      <div className="absolute bottom-1/4 left-0 -z-10 h-80 w-80 rounded-full bg-[#EDE9FE]/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#2563EB] uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 shadow-xs">
            TRANSPARENT & SIMPLE PRICING
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] font-sans">
            Simple Monthly Plans
          </h2>
          <p className="mt-4 text-base text-slate-500 leading-relaxed font-sans">
            Choose the perfect plan for your business. All plans include premium support, hosting, maintenance, and continuous updates.
          </p>
        </div>

        {/* Billing Toggle Section */}
        <div className="flex flex-col items-center justify-center mb-16 relative">
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-md border border-slate-100 px-6 py-4 rounded-2xl shadow-lg shadow-slate-200/50 relative">
            
            {/* Monthly Option Button */}
            <button
              type="button"
              onClick={() => setIsYearly(false)}
              className="text-left cursor-pointer focus:outline-none select-none pr-4 border-r border-slate-100"
            >
              <div className={`text-xs sm:text-sm font-bold font-sans transition-colors ${!isYearly ? 'text-[#0F172A]' : 'text-slate-400'}`}>
                Monthly Billing
              </div>
              <div className="text-[10px] text-slate-400 font-medium">
                Pay monthly, cancel anytime
              </div>
            </button>

            {/* Toggle Switch */}
            <button
              type="button"
              onClick={() => setIsYearly(!isYearly)}
              className="w-12 h-7 bg-slate-100 rounded-full p-1 cursor-pointer transition-colors relative flex items-center border border-slate-200/50 focus:outline-none shrink-0"
              aria-label="Toggle Billing Cycle"
            >
              <motion.div
                layout
                className="w-5 h-5 rounded-full shadow-md shrink-0"
                style={{ backgroundColor: isYearly ? '#2563EB' : '#94A3B8' }}
                animate={{ x: isYearly ? 20 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>

            {/* Yearly Option Button */}
            <button
              type="button"
              onClick={() => setIsYearly(true)}
              className="text-left cursor-pointer focus:outline-none select-none pl-4"
            >
              <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
                <span className={`text-xs sm:text-sm font-bold font-sans transition-colors ${isYearly ? 'text-[#0F172A]' : 'text-slate-400'}`}>
                  Yearly Billing
                </span>
                <span className="inline-flex items-center text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 shrink-0 leading-none">
                  Save 2 Months
                </span>
              </div>
              <div className="text-[10px] text-[#10B981] font-semibold flex items-center gap-1">
                🎁 Pay yearly & get 2 months free
              </div>
            </button>
          </div>

          {/* Curved Arrow pointer pointing at Yearly option */}
          <div className="hidden md:block absolute left-[calc(50%+196px)] -top-1 w-44 z-10 pointer-events-none select-none">
            <div className="relative flex items-center gap-2">
              <svg className="w-14 h-10 text-emerald-500 hover:scale-105 transition-transform" viewBox="0 0 54 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Handdrawn look curve */}
                <path d="M45 4C35 8 18 20 8 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                {/* Arrow head */}
                <path d="M5 21C6 24 7.5 27.5 8 28C10 27.5 13 25.5 15 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <span className="text-[11px] font-bold text-emerald-500 font-sans tracking-wide leading-none select-none bg-emerald-50/40 px-2 py-1 rounded-md border border-emerald-100/50">
                Save up to 16%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-stretch">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl transition-all duration-300 ${
                  plan.isHighlighted
                    ? 'bg-white border-2 border-[#2563EB] shadow-2xl shadow-blue-500/10 scale-102 z-10 hover:shadow-blue-500/15'
                    : 'bg-white border border-slate-100 shadow-xl shadow-slate-100/50 hover:border-blue-400/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/5'
                }`}
              >
                {/* Floating ribbon for featured card */}
                {plan.isHighlighted && plan.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] px-4 py-1.5 text-[10px] font-extrabold text-white shadow-md shadow-blue-500/15 uppercase tracking-wider leading-none font-sans whitespace-nowrap z-20">
                    <Star className="w-3 h-3 fill-white text-white" />
                    {plan.badge}
                  </span>
                )}

                {/* Content block */}
                <div>
                  <div className="flex items-center gap-3.5 mb-5 mb-6">
                    {/* Unique Icon Container */}
                    <div className={`p-2.5 rounded-xl shrink-0 ${plan.iconBg}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {/* Plan Name */}
                    <h3 className="text-lg font-bold font-sans text-[#0F172A] tracking-tight">
                      {plan.name}
                    </h3>
                  </div>

                  {/* Plan Description */}
                  <p className="text-xs text-slate-500 font-sans leading-relaxed min-h-[40px] mb-6">
                    {plan.description}
                  </p>

                  {/* Main Price Block */}
                  <div className="pb-6 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold font-sans tracking-tight text-[#0f172a]">
                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 font-sans">
                        / {isYearly ? 'year' : 'month'}
                      </span>
                    </div>

                    {/* Secondary alternate price capsule */}
                    <div className="mt-3 flex items-center gap-2 bg-slate-50/80 border border-slate-100 px-3 py-1.5 rounded-xl w-fit">
                      <span className="text-[10px] font-bold text-slate-500">
                        {isYearly ? `${plan.monthlyPrice} / month` : `${plan.yearlyPrice} / year`}
                      </span>
                      <span className="text-[10px] font-extrabold text-[#10B981] bg-emerald-50 px-1.5 py-0.5 rounded leading-none shrink-0 border border-emerald-100/50">
                        🎁 2 Months Free
                      </span>
                    </div>
                  </div>

                  {/* Features Comparative List */}
                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex gap-3 items-start">
                        <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${plan.checkBg}`}>
                          <Check className={`w-3 h-3 ${plan.checkColor}`} />
                        </div>
                        <span className="text-xs sm:text-sm text-[#334155] font-medium leading-normal">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plan.id === 'starter' && (
                    <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100/60 rounded-2xl text-left">
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed font-sans">
                        <span className="text-blue-600 font-bold">*</span>Free domain included with annual billing plans.
                        <br />
                        No setup fees. No hidden charges.
                      </p>
                    </div>
                  )}
                </div>

                {/* CTA Action Button */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onBookCall}
                    className={`group flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      plan.isHighlighted
                        ? 'bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:brightness-110 text-white shadow-lg shadow-blue-500/15'
                        : 'bg-white hover:bg-slate-50 border border-slate-200 text-[#0F172A] hover:text-[#2563EB]'
                    }`}
                  >
                    Start Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Annual Billing Info Bar */}
        <div className="mt-16 text-center max-w-2xl mx-auto p-4 bg-slate-50/70 border border-slate-100 rounded-2xl shadow-xs">
          <p className="text-xs text-slate-500 font-semibold leading-relaxed flex items-center justify-center gap-2 flex-wrap">
            <span>🎁</span> Annual billing includes 2 months free. Pay for 10 months and receive 12 months of premium service.
          </p>
        </div>

      </div>
    </section>
  );
}
