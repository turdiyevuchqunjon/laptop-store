"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { PartyPopper, Send, ArrowLeft } from 'lucide-react';

export default function ThankYouPage() {
  const [seconds, setSeconds] = useState(10);
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || "Mijoz";

  useEffect(() => {
    // Har 1 soniyada taymerni kamaytirish
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    // 0 bo'lganda Telegramga o'tkazish
    if (seconds === 0) {
      window.location.href = "https://t.me/your_telegram_link"; // SHU YERGA TELEGRAM LINKINGIZNI QO'YING
    }

    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6 font-sans">
      
      {/* Orqa fon animatsiyasi */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/30 blur-[120px] rounded-full animate-pulse" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="relative z-10 bg-slate-800/40 p-10 md:p-16 rounded-[50px] border border-white/10 backdrop-blur-3xl max-w-xl w-full text-center shadow-2xl"
      >
        <motion.div 
          initial={{ y: 20 }} animate={{ y: 0 }}
          className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/30"
        >
          <PartyPopper size={48} className="text-white" />
        </motion.div>

        <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Rahmat, {name}!
        </h1>
        
        <p className="text-slate-400 mb-10 leading-relaxed italic">
          Buyurtmangiz muvaffaqiyatli qabul qilindi. Tez orada mutaxassislarimiz siz bilan bog'lanishadi.
        </p>

        {/* Taymer Animatsiyasi */}
        <div className="mb-10 relative inline-flex items-center justify-center">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-700" />
            <motion.circle
              cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-blue-500"
              strokeDasharray="377"
              animate={{ strokeDashoffset: 377 - (377 * seconds) / 10 }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </svg>
          <div className="absolute text-3xl font-mono font-bold">{seconds}</div>
        </div>

        <p className="text-xs text-blue-400 uppercase tracking-widest mb-10 font-bold animate-pulse">
          Telegram sahifasiga yo'naltirilmoqda...
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <button 
            onClick={() => router.push('/')}
            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-2xl font-bold transition-all active:scale-95"
          >
            <ArrowLeft size={20} /> Asosiyga qaytish
          </button>
          
          <button 
            onClick={() => window.location.href = "https://t.me/Arzon_texnika_sam"}
            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            <Send size={20} /> Telegramga o'tish
          </button>
        </div>
      </motion.div>
    </div>
  );
}