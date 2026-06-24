import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 600); // Allow complete state to animate out
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
        id="loading-screen"
      >
        <div className="absolute inset-x-0 -top-40 -z-10 flex justify-center overflow-hidden">
          <div className="aspect-[1155/678] w-[72.1875rem] flex-none bg-gradient-to-tr from-[#DBEAFE] via-[#A78BFA]/10 to-[#2563EB]/10 opacity-30 blur-3xl md:w-[90rem]"></div>
        </div>

        <div className="text-center px-4 relative z-10">
          {/* Logo animation */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#A78BFA] p-0.5 shadow-lg shadow-blue-500/10">
              <span className="text-white font-sans font-bold text-xl tracking-tight">N</span>
            </div>
            <span className="font-sans font-bold tracking-widest text-[#0F172A] text-2xl">
              NEXORA
            </span>
          </motion.div>

          <p className="text-xs font-mono text-[#334155]/60 uppercase tracking-widest mb-8">
            AI-POWERED DIGITAL GROWTH
          </p>

          {/* Loading bar container */}
          <div className="w-56 h-[3px] bg-slate-100 rounded-full overflow-hidden relative mx-auto mb-2">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#2563EB] via-[#A78BFA] to-[#C4B5FD]"
            />
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-mono text-[#334155]/40"
          >
            INITIALIZING CORE OPERATIONS &bull; {Math.min(progress, 100)}%
          </motion.span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
