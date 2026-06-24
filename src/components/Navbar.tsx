import { useState, useEffect, MouseEvent } from 'react';
import { Menu, X, ArrowRight, Video, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenProject: () => void;
}

export default function Navbar({ onOpenBooking, onOpenProject }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Process', href: '#process' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offsetHeader = 100; // Adjusted for floating header
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offsetHeader;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className="fixed top-4 left-0 right-0 z-50 px-4 transition-all duration-300"
        id="app-navbar"
      >
        <div
          className={`mx-auto max-w-7xl transition-all duration-300 bg-white/95 backdrop-blur-xl border border-slate-200/50 shadow-xl px-5 sm:px-8 py-3 ${
            mobileMenuOpen ? 'rounded-[28px]' : 'rounded-full'
          } ${isScrolled ? 'shadow-blue-500/5 bg-white/98' : ''}`}
        >
          <div className="flex h-12 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <a href="#home" className="flex items-center gap-2" onClick={(e) => handleScrollClick(e, '#home')}>
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-200 transition-all duration-300 hover:rotate-12">
                  <div className="w-5 h-5 border-2 border-white rounded-sm rotate-45"></div>
                </div>
                <span className="font-display font-black tracking-tighter text-[#0F172A] text-2xl">
                  NEXORA
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScrollClick(e, item.href)}
                  className="font-sans text-xs xl:text-sm font-semibold text-[#64748B] hover:text-[#2563EB] transition-colors relative group py-2"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#2563EB] to-[#A78BFA] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                id="nav-btn-book"
                onClick={onOpenBooking}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-600/30 text-[#0F172A] bg-white hover:bg-slate-50 hover:border-blue-600/50 transition-all text-xs font-bold cursor-pointer shadow-sm hover:shadow-md active:scale-95"
              >
                <Video className="w-3.5 h-3.5 text-blue-600" />
                Book Call
              </button>
              <button
                id="nav-btn-start"
                onClick={onOpenProject}
                className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/15 text-xs font-extrabold hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                Start Project
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-lg p-2 text-[#334155] hover:bg-slate-50 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Panel */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="lg:hidden border-t border-slate-100 mt-3 pt-3 overflow-hidden"
                id="mobile-navigation"
              >
                <div className="space-y-1 pb-4">
                  {menuItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleScrollClick(e, item.href)}
                      className="block rounded-xl px-3 py-2 text-sm font-bold text-[#64748B] hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 mt-3">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenBooking();
                      }}
                      className="flex items-center justify-center gap-1.5 w-full px-3 py-2.5 text-xs font-extrabold text-[#0F172A] border border-blue-650/20 bg-white rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <Video className="w-3.5 h-3.5 text-blue-600" />
                      Book Call
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenProject();
                      }}
                      className="flex items-center justify-center gap-1 w-full px-3 py-2.5 text-xs font-extrabold text-white bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full shadow-md shadow-blue-500/10 hover:opacity-95 transition-all cursor-pointer"
                    >
                      Start Project
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
