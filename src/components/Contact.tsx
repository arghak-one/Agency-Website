import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, MessageSquare, ShieldCheck, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactProps {
  initialServiceSelected?: string;
}

export default function Contact({ initialServiceSelected = '' }: ContactProps) {
  // Map simplified keys like 'chatbot' or 'web' to their formatted equivalents
  const getMappedService = (key: string) => {
    if (key === 'chatbot') return 'AI Chatbots';
    if (key === 'web') return 'Website Development';
    return key;
  };

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    serviceNeeded: getMappedService(initialServiceSelected) || '',
    budget: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const budgetOptions = [
    { label: '₹5,000 - ₹10,000', value: '₹5,000 - ₹10,000' },
    { label: '₹10,000 - ₹25,000', value: '₹10,000 - ₹25,000' },
    { label: '₹25,000 - ₹50,000', value: '₹25,000 - ₹50,000' },
    { label: '₹50,000 - ₹1,00,000', value: '₹50,000 - ₹1,00,000' },
    { label: '₹1,00,000+', value: '₹1,00,000+' },
  ];

  const serviceOptions = [
    { label: 'Website Development', value: 'Website Development' },
    { label: 'AI Chatbots', value: 'AI Chatbots' },
    { label: 'WhatsApp Automation', value: 'WhatsApp Automation' },
    { label: 'CRM Automation', value: 'CRM Automation' },
    { label: 'AI Voice Agents', value: 'AI Voice Agents' },
    { label: 'SaaS Development', value: 'SaaS Development' },
    { label: 'SEO Services', value: 'SEO Services' },
    { label: 'E-Commerce Development', value: 'E-Commerce Development' },
    { label: 'Custom Automation', value: 'Custom Automation' },
    { label: 'Other', value: 'Other' },
  ];

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    if (!formData.businessName.trim()) tempErrors.businessName = 'Business name is required';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email';
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone contact is required';
    } else if (!/^\+?[0-9\s\-()]{7,15}$/.test(formData.phone)) {
      tempErrors.phone = 'Please provide a valid phone number';
    }

    if (!formData.serviceNeeded) tempErrors.serviceNeeded = 'Please select a core service';
    if (!formData.budget) tempErrors.budget = 'Please select your project budget size';
    if (!formData.message.trim()) tempErrors.message = 'Please provide a small scope overview';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    setToast(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.name,
          businessName: formData.businessName,
          email: formData.email,
          phone: formData.phone,
          serviceRequired: formData.serviceNeeded,
          projectBudget: formData.budget,
          projectRequirements: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        setToast({
          message: 'Thank you! Your project request has been submitted successfully. We will contact you shortly.',
          type: 'success'
        });
        setTimeout(() => setToast(null), 8000);
        // Reset form variables
        setFormData({
          name: '',
          businessName: '',
          email: '',
          phone: '',
          serviceNeeded: '',
          budget: '',
          message: '',
        });
      } else {
        setToast({
          message: result.error || 'Failed to submit project request.',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      setToast({
        message: 'There was an error submitting your request. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-transparent py-24 sm:py-32" id="contact">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl border shadow-xl max-w-md ${
              toast.type === 'success'
                ? 'bg-emerald-50 border-emerald-250 text-emerald-800'
                : 'bg-rose-50 border-rose-250 text-rose-800'
            }`}
          >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
              toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
            }`}>
              <Check className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold leading-relaxed">
              {toast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Absolute styling flares */}
      <div className="absolute top-1/4 right-0 -z-10 h-96 w-96 rounded-full bg-[#DBEAFE]/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-[#EDE9FE]/40 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono font-bold tracking-widest text-[#2563EB] uppercase bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200/60 shadow-sm">
            Book Appointment & Quote
          </span>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl font-display">
            Initiate Your Venture Blueprint
          </h2>
          <p className="mt-4 text-base text-slate-500">
            Need high-performance websites or structured process automation? Connect with our technical architects to secure a detailed statement of work.
          </p>
        </div>

        {/* Outer Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-stretch">
          
          {/* Left Column: Contact info */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between space-y-10 glass-card border border-white/70 p-6 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl shadow-blue-500/5">
            <div className="absolute top-0 right-0 -z-10 h-40 w-40 bg-blue-150/10 blur-2xl rounded-full" />

            <div className="space-y-6">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block mb-4">
                Global Operations Headquarters
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-sans text-slate-800 leading-tight">
                Direct Client Support
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs">
                Have urgent specifications or wish to secure a direct Slack retainer channel? Use any official node below.
              </p>
              
              <div className="space-y-4 pt-4">
                {/* Email Node */}
                <a href="mailto:nexora.official.main@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/40 hover:border-blue-300 transition-all shadow-sm group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase leading-none mb-1">SEND EMAIL</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-[#2563EB] transition-colors leading-none block">nexora.official.main@gmail.com</span>
                  </div>
                </a>

                {/* Telephone Node */}
                <a href="tel:+919083026796" className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/40 hover:border-blue-300 transition-all shadow-sm group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 border border-purple-100 text-purple-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase leading-none mb-1">CALL AGENCY HOTLINE</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-purple-600 transition-colors leading-none block">+91 9083026796</span>
                  </div>
                </a>

                {/* WhatsApp Chat link */}
                <a href="https://wa.me/919932315643?text=Hello%20NEXORA%20Team%2C%20I%20would%20like%20to%20discuss%20my%20project." target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/40 hover:border-emerald-300 transition-all shadow-sm group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase leading-none mb-1">LAUNCH DIRECT CHAT</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-emerald-600 transition-colors leading-none block">+91 99323 15643</span>
                  </div>
                </a>

                {/* Local Node */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 border border-slate-200/30">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase leading-none mb-1">EXECUTIVE OFFICE</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-600 leading-none block">📍 Jaipur, Rajasthan, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificated badge */}
            <div className="pt-6 border-t border-slate-200/50 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
              <span className="text-[11px] font-semibold text-slate-400">
                Data secured with SSL & ISO compliant security guidelines.
              </span>
            </div>
          </div>

          {/* Right Column: Dynamic Intake Form */}
          <div className="lg:col-span-12 xl:col-span-7 glass-card border border-white/80 p-6 sm:p-10 rounded-3xl shadow-xl shadow-blue-500/5 relative backdrop-blur-xl">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  noValidate
                  id="intake-contact-form"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="name-input" className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider font-sans">
                        Full Name *
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-800 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/10 ${
                          errors.name ? 'border-rose-450 focus:ring-rose-500/10' : 'border-slate-200 focus:border-blue-500'
                        }`}
                      />
                      {errors.name && <p className="text-[10px] text-rose-500 mt-1.5 font-semibold font-sans">{errors.name}</p>}
                    </div>

                    {/* Business Name */}
                    <div>
                      <label htmlFor="biz-input" className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider font-sans">
                        Business Name *
                      </label>
                      <input
                        id="biz-input"
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => {
                          setFormData({ ...formData, businessName: e.target.value });
                          if (errors.businessName) setErrors({ ...errors, businessName: '' });
                        }}
                        placeholder="Enter your company name"
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-800 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/10 ${
                          errors.businessName ? 'border-rose-450 focus:ring-rose-500/10' : 'border-slate-200 focus:border-blue-500'
                        }`}
                      />
                      {errors.businessName && <p className="text-[10px] text-rose-500 mt-1.5 font-semibold font-sans">{errors.businessName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email Input */}
                    <div>
                      <label htmlFor="email-input" className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider font-sans">
                        Corporate Email *
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="Enter your business email"
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-800 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/10 ${
                          errors.email ? 'border-rose-450 focus:ring-rose-500/10' : 'border-slate-200 focus:border-blue-500'
                        }`}
                      />
                      {errors.email && <p className="text-[10px] text-rose-500 mt-1.5 font-semibold font-sans">{errors.email}</p>}
                    </div>

                    {/* Phone Input */}
                    <div>
                      <label htmlFor="phone-input" className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider font-sans">
                        Phone Number *
                      </label>
                      <input
                        id="phone-input"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        placeholder="Enter your contact number"
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-800 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/10 ${
                          errors.phone ? 'border-rose-450 focus:ring-rose-500/10' : 'border-slate-200 focus:border-blue-500'
                        }`}
                      />
                      {errors.phone && <p className="text-[10px] text-rose-500 mt-1.5 font-semibold font-sans">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Service Selection dropdown */}
                    <div>
                      <label htmlFor="service-dropdown" className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider font-sans">
                        Service Required *
                      </label>
                      <select
                        id="service-dropdown"
                        value={formData.serviceNeeded}
                        onChange={(e) => {
                          setFormData({ ...formData, serviceNeeded: e.target.value });
                          if (errors.serviceNeeded) setErrors({ ...errors, serviceNeeded: '' });
                        }}
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-800 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/10 cursor-pointer appearance-none ${
                          errors.serviceNeeded ? 'border-rose-450' : 'border-slate-200 focus:border-blue-500'
                        }`}
                      >
                        <option value="">Select core capability</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      {errors.serviceNeeded && <p className="text-[10px] text-rose-500 mt-1.5 font-semibold font-sans">{errors.serviceNeeded}</p>}
                    </div>

                    {/* Budget Selection dropdown */}
                    <div>
                      <label htmlFor="budget-dropdown" className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider font-sans">
                        Project Budget Size *
                      </label>
                      <select
                        id="budget-dropdown"
                        value={formData.budget}
                        onChange={(e) => {
                          setFormData({ ...formData, budget: e.target.value });
                          if (errors.budget) setErrors({ ...errors, budget: '' });
                        }}
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-800 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/10 cursor-pointer appearance-none ${
                          errors.budget ? 'border-rose-450' : 'border-slate-200 focus:border-blue-500'
                        }`}
                      >
                        <option value="">Select threshold level</option>
                        {budgetOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      {errors.budget && <p className="text-[10px] text-rose-500 mt-1.5 font-semibold font-sans">{errors.budget}</p>}
                    </div>
                  </div>

                  {/* Message Input block */}
                  <div>
                    <label htmlFor="message-textarea" className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider font-sans">
                      Functional Details & Scope Requirements *
                    </label>
                    <textarea
                      id="message-textarea"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      placeholder="Please explain the key requirements, legacy programs you use and target timelines..."
                      className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-800 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/10 ${
                        errors.message ? 'border-rose-450 focus:ring-rose-500/10' : 'border-slate-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.message && <p className="text-[10px] text-rose-500 mt-1.5 font-semibold font-sans">{errors.message}</p>}
                  </div>

                  {/* Submission Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      id="btn-contact-submit"
                      disabled={isSubmitting}
                      className="group flex h-14 items-center justify-center gap-2 w-full px-8 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#3B82F6] font-bold text-xs uppercase tracking-wider text-white hover:brightness-105 shadow-lg shadow-blue-500/10 active:scale-99 disabled:opacity-55 transition-all cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          SUBMITTING INQUIRY...
                        </>
                      ) : (
                        <>
                          START YOUR PROJECT
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center p-8 text-center h-full min-h-[400px]"
                  id="contact-success-state"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-500 mb-6 shadow-md animate-bounce">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold font-sans text-slate-850">
                    Project Request Received
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mt-2 leading-relaxed">
                    Thank you for contacting Nexora. Your project request has been received successfully. Our team will contact you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 text-xs font-bold text-[#2563EB] hover:underline cursor-pointer"
                  >
                    Edit / Submit another scope
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
