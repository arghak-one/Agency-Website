import { MouseEvent } from 'react';
import { Linkedin, Instagram, Facebook, X, Send, ArrowRight } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offsetHeader = 88;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offsetHeader;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const links = {
    company: [
      { name: 'About Team', href: '#about' },
      { name: 'Solutions Core', href: '#solutions' },
      { name: 'Why Choose Us', href: '#why-choose-us' },
      { name: 'Contact Agency', href: '#contact' }
    ],
    services: [
      { name: 'React Development', href: '#services' },
      { name: 'AI Chatbots', href: '#services' },
      { name: 'WhatsApp API', href: '#services' },
      { name: 'CRM Automations', href: '#services' }
    ],
    resources: [
      { name: 'Success Records', href: '#results' },
      { name: 'Project Timeline', href: '#process' },
      { name: 'Flat-Fee FAQ', href: '#faq' },
      { name: 'SLA Packages', href: '#pricing' }
    ],
    portfolio: [
      { name: 'Web Dev Cases', href: '#portfolio' },
      { name: 'SaaS Platforms', href: '#portfolio' },
      { name: 'AI Automations', href: '#portfolio' },
      { name: 'Enterprise API', href: '#portfolio' }
    ],
    contact: [
      { name: 'Hotline: +91 90830 26796', href: 'tel:+919083026796', isExternal: true },
      { name: 'Email: nexora.official.main@gmail.com', href: 'mailto:nexora.official.main@gmail.com', isExternal: true },
      { name: 'WhatsApp: +91 99323 15643', href: 'https://wa.me/919932315643', isExternal: true }
    ]
  };

  return (
    <footer className="bg-white/35 backdrop-blur-md border-t border-white/50 font-sans" id="app-footer">
      {/* Top Footer links section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <a href="#home" onClick={handleScrollToTop} className="flex items-center gap-2">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#A78BFA] p-0.5">
                  <span className="text-white font-sans font-bold text-lg tracking-tight">N</span>
                </div>
                <span className="font-sans font-bold tracking-widest text-[#0F172A] text-xl">
                  NEXORA
                </span>
              </a>
            </div>
            <p className="text-xs leading-relaxed text-[#334155]/85 max-w-sm">
              We help businesses scale with custom websites, AI chatbots, WhatsApp automation, CRM workflows, and intelligent business systems.
            </p>
            {/* Social media badges */}
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-[#2563EB] hover:border-[#2563EB]/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer" aria-label="LinkedIn profile">
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a href="https://www.instagram.com/nexora_official_main?utm_source=qr&igsh=dmJ0empsN2MwNXZr" target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-pink-600 hover:border-pink-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer" aria-label="Instagram profile">
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61590541081358" target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer" aria-label="Facebook page">
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a href="https://x.com/nexoramain" target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-slate-950 hover:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer" aria-label="X (Twitter) profile">
                <X className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Links structure columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:col-span-8 gap-8">
            {/* Column Company */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-wider text-[#0F172A] uppercase">Company</h4>
              <ul className="space-y-2.5">
                {links.company.map((l) => (
                  <li key={l.name}>
                    <a href={l.href} onClick={(e) => handleLinkClick(e, l.href)} className="text-xs text-[#334155]/85 hover:text-[#2563EB] transition-colors leading-none block py-1">
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column Services */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-wider text-[#0F172A] uppercase">Services</h4>
              <ul className="space-y-2.5">
                {links.services.map((l) => (
                  <li key={l.name}>
                    <a href={l.href} onClick={(e) => handleLinkClick(e, l.href)} className="text-xs text-[#334155]/85 hover:text-[#2563EB] transition-colors leading-none block py-1">
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column Resources */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-wider text-[#0F172A] uppercase">Resources</h4>
              <ul className="space-y-2.5">
                {links.resources.map((l) => (
                  <li key={l.name}>
                    <a href={l.href} onClick={(e) => handleLinkClick(e, l.href)} className="text-xs text-[#334155]/85 hover:text-[#2563EB] transition-colors leading-none block py-1">
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column Portfolio */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-wider text-[#0F172A] uppercase">Portfolio</h4>
              <ul className="space-y-2.5">
                {links.portfolio.map((l) => (
                  <li key={l.name}>
                    <a href={l.href} onClick={(e) => handleLinkClick(e, l.href)} className="text-xs text-[#334155]/85 hover:text-[#2563EB] transition-colors leading-none block py-1">
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column Contact nodes */}
            <div className="space-y-4 sm:col-span-2">
              <h4 className="text-xs font-mono font-bold tracking-wider text-[#0F172A] uppercase">Contact Direct</h4>
              <ul className="space-y-2.5">
                {links.contact.map((l) => (
                  <li key={l.name}>
                    <a href={l.href} target={l.isExternal ? '_blank' : undefined} rel={l.isExternal ? 'noreferrer' : undefined} className="text-xs text-[#334155]/85 hover:text-[#2563EB] transition-colors leading-none block py-1">
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom attribution block */}
      <div className="border-t border-slate-200/50 py-8 text-center text-[11px] text-slate-400 font-medium">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {currentYear} NEXORA. All Rights Reserved.</span>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-slate-600 transition-colors">Privacy Statement</a>
            <a href="#terms" className="hover:text-slate-600 transition-colors">Agency Terms of Service</a>
            <a href="#admin" className="hover:text-[#2563EB] transition-colors font-semibold">Admin Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
