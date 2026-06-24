import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Trust from './components/Trust';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Results from './components/Results';
import Testimonials from './components/Testimonials';
import CaseStudies from './components/CaseStudies';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import AdminCRM from './components/AdminCRM';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string | null>(null);
  const [contactInitialService, setContactInitialService] = useState<string>('');
  const [isAdminMode, setIsAdminMode] = useState(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    return path.startsWith('/admin') || hash.startsWith('#admin');
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      setIsAdminMode(path.startsWith('/admin') || hash.startsWith('#admin'));
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  if (isAdminMode) {
    return <AdminCRM />;
  }

  const scrollSection = (href: string) => {
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

  const handleOpenBooking = () => {
    setContactInitialService('chatbot'); // Pre-fill service selection if they click booking
    scrollSection('#contact');
  };

  const handleOpenProject = () => {
    setContactInitialService('web'); // Pre-fill website development service
    scrollSection('#contact');
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen geometric-bg text-[#0F172A] selection:bg-[#2563EB]/10 selection:text-[#2563EB]"
        >
          {/* Header navigation bar */}
          <Navbar onOpenBooking={handleOpenBooking} onOpenProject={handleOpenProject} />

          {/* Main content nodes sequential */}
          <main className="relative">
            {/* Hero module */}
            <Hero onOpenProject={handleOpenProject} />

            {/* Partners showcase */}
            <Trust />

            {/* About & facts */}
            <About />

            {/* Core Capabilities */}
            <Services />

            {/* Competitive advantages */}
            <WhyChooseUs />

            {/* Feature cases showcase */}
            <Portfolio onSelectCaseStudy={(id) => setSelectedCaseStudyId(id)} />

            {/* Roadmap schedule */}
            <Process />

            {/* Stats counters */}
            <Results />

            {/* Customer vocal reviews */}
            <Testimonials />

            {/* Detailed metrics analysis */}
            <CaseStudies
              selectedCaseStudyId={selectedCaseStudyId}
              onClearCaseSelection={() => setSelectedCaseStudyId(null)}
            />

            {/* Flat-Fee plans pricing comparisons */}
            <Pricing onBookCall={handleOpenBooking} />

            {/* Accordions */}
            <FAQ />

            {/* Dynamic Intake forms split panels */}
            <Contact initialServiceSelected={contactInitialService} />
          </main>

          {/* High-contrast footer */}
          <Footer />

          {/* Always-on pulsing float WhatsApp widget */}
          <WhatsAppButton />
        </motion.div>
      )}
    </>
  );
}
