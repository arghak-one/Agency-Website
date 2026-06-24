import { MessageSquareCode } from 'lucide-react';

export default function WhatsAppButton() {
  const number = '9932315643';
  const text = encodeURIComponent('Hello, I want to discuss a project.');
  const whatsappUrl = `https://wa.me/${number}?text=${text}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group cursor-pointer"
      id="floating-whatsapp-trigger"
      title="Discuss your project on WhatsApp"
    >
      {/* Hidden description label that slides out on hover */}
      <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 bg-white border border-slate-200/90 text-xs text-slate-800 font-bold px-4 py-2.5 rounded-full shadow-lg whitespace-nowrap leading-none">
        Discuss Project
      </span>

      {/* Pulsing button widget */}
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all duration-300">
        {/* Pulsing ring waves animation */}
        <span className="absolute inset-0 rounded-full border-4 border-emerald-400 animate-ping opacity-35" />
        <MessageSquareCode className="w-6 h-6 text-white" />
      </div>
    </a>
  );
}
