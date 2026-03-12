"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, ShoppingCart, CheckCircle, Star, X, PartyPopper, ArrowLeft } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

const products: Product[] = [
  { id: 1, name: "MacBook Pro M3", price: 1999, category: "Apple", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, name: "ASUS ROG Strix", price: 2499, category: "Gaming", image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, name: "Dell XPS 15", price: 1799, category: "Business", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, name: "Razer Blade 16", price: 2999, category: "Gaming", image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1000&auto=format&fit=crop" },
  { id: 5, name: "Microsoft Surface", price: 1599, category: "Ultra", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop" },
  { id: 6, name: "HP Spectre x360", price: 1399, category: "2-in-1", image: "https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?q=80&w=1000&auto=format&fit=crop" },
];

export default function LuxuryStore() {
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  
  // Forma va Validatsiya uchun state-lar
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '+998', address: '' });
  const [error, setError] = useState('');

  const addToCart = (product: Product) => setCart((prev) => [...prev, product]);
  const addToFavorites = (product: Product) => setFavorites((prev) => [...prev, product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 1. Ism validatsiyasi (3 harfdan ko'p bo'lishi kerak, ya'ni kamida 4)
    if (formData.name.trim().length < 4) {
      setError("Ismingiz juda qisqa. Kamida 4 ta harf kiriting.");
      return;
    }

    // 2. Telefon validatsiyasi
    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (!formData.phone.startsWith('+998')) {
      setError("Faqat O'zbekiston raqamlarini kiriting (+998).");
      return;
    }
    if (digitsOnly.length < 12) {
      setError("Telefon raqami to'liq emas. 9 ta raqam bo'lishi shart.");
      return;
    }

    // Muvaffaqiyatli holat
    setIsSubmitted(true);
    setCart([]); // Savatni tozalaymiz
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- THANK YOU SAHIFASI ---
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 text-white font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="bg-slate-800/40 p-12 rounded-[50px] border border-blue-500/30 backdrop-blur-2xl max-w-lg text-center shadow-2xl"
        >
          <motion.div 
            initial={{ y: 20 }} animate={{ y: 0 }}
            className="w-24 h-24 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/20"
          >
            <PartyPopper size={48} className="text-white" />
          </motion.div>
          <h1 className="text-4xl font-black mb-4">Rahmat, {formData.name}!</h1>
          <p className="text-slate-400 mb-10 leading-relaxed">
            Sizning buyurtmangiz muvaffaqiyatli qabul qilindi. Operatorlarimiz tez orada <span className="text-blue-400 font-bold">{formData.phone}</span> raqami bilan bog'lanishadi.
          </p>
          <button 
            onClick={() => { setIsSubmitted(false); setFormData({ name: '', phone: '+998', address: '' }); }}
            className="group flex items-center gap-3 mx-auto px-8 py-4 bg-blue-600 rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-95"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/> Bosh sahifaga qaytish
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-blue-500">
      
      {/* 1. PREMIUM HEADER */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/70 border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent italic">
          LAPTOP.UZ
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <span className="flex items-center gap-2 text-white"><CheckCircle size={16} className="text-emerald-400"/> 2 yillik kafolat</span>
          <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400"/> Bepul dasturlash</span>
        </div>
        <div className="relative cursor-pointer" onClick={() => document.getElementById('cart')?.scrollIntoView({ behavior: 'smooth' })}>
          <ShoppingCart className="hover:text-blue-400 transition-colors" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
              {cart.length}
            </span>
          )}
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="py-20 px-6 text-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-bold mb-6">
          Kelajak texnologiyasi <br/><span className="text-blue-500">sizning qo'lingizda.</span>
        </motion.h1>
        <p className="text-slate-400 max-w-2xl mx-auto mb-10 italic">O'zbekistondagi eng kuchli noutbuklar do'koni.</p>
      </section>

      {/* 3. PRODUCT GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
        {products.map((item) => (
          <motion.div key={item.id} whileHover={{ y: -10 }} className="group relative bg-slate-800/50 rounded-3xl p-6 border border-white/5 hover:border-blue-500/50 transition-all overflow-hidden">
            <div className="h-56 w-full relative overflow-hidden rounded-2xl bg-slate-900 mb-6">
              <motion.img whileHover={{ scale: 1.1 }} src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <button onClick={() => addToFavorites(item)} className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-red-500 transition-colors"><Heart size={20}/></button>
                <button onClick={() => setViewProduct(item)} className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-blue-500 transition-colors"><Eye size={20}/></button>
                <button onClick={() => addToCart(item)} className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-emerald-500 transition-colors"><ShoppingCart size={20}/></button>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">{item.category}</span>
                <h3 className="text-xl font-semibold mt-1">{item.name}</h3>
              </div>
              <div className="text-right font-mono text-emerald-400 font-bold">${item.price}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4. SAVAT VA VALIDATSIYALI FORMA */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} id="cart" className="max-w-4xl mx-auto px-6 py-20 border-t border-white/10">
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 italic">Savat</h2>
            <div className="bg-slate-800/30 rounded-3xl p-8 backdrop-blur-xl border border-white/5">
              <div className="space-y-4 mb-10">
                {cart.map((c, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                    <span>{c.name}</span>
                    <span className="font-mono text-emerald-400">${c.price}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-6">Rasmiylashtirish</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <div className="md:col-span-2">
                  {error && <p className="text-red-400 text-sm mb-4 bg-red-400/10 p-4 rounded-xl border border-red-400/20">{error}</p>}
                </div>
                <input 
                  type="text" 
                  placeholder="To'liq ismingiz" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-slate-900 border border-white/10 p-4 rounded-xl focus:border-blue-500 outline-none" 
                />
                <input 
                  type="tel" 
                  placeholder="+998 90 000 00 00" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="bg-slate-900 border border-white/10 p-4 rounded-xl focus:border-blue-500 outline-none" 
                />
                <input 
                  type="text" 
                  placeholder="Manzilingiz" 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="md:col-span-2 bg-slate-900 border border-white/10 p-4 rounded-xl focus:border-blue-500 outline-none" 
                />
                <button type="submit" className="md:col-span-2 bg-blue-600 hover:bg-blue-700 p-5 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                  Buyurtmani tasdiqlash
                </button>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 5. OTZIVLAR (Siz xohlagandek pastda) */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-500 uppercase italic">Mijozlarimiz fikri</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 bg-slate-800 rounded-2xl border-l-4 border-blue-500 shadow-xl">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, starIdx) => <Star key={starIdx} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-300 italic">"Dizayniga gap yo'q, noutbuk ham juda tez keldi. Tavsiya qilaman!"</p>
                <div className="mt-4 font-bold text-sm text-blue-400">— Mijoz #{i}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {viewProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 max-w-4xl w-full rounded-[40px] p-6 md:p-10 relative border border-white/10 overflow-hidden shadow-2xl">
               <button onClick={() => setViewProduct(null)} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors z-10"><X size={32}/></button>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div className="group cursor-zoom-in overflow-hidden rounded-2xl bg-slate-950">
                    <img src={viewProduct.image} alt={viewProduct.name} className="w-full h-auto transform hover:scale-150 transition-transform duration-500 cursor-crosshair" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 italic text-blue-400">{viewProduct.name}</h2>
                    <p className="text-slate-400 mb-8 leading-relaxed text-sm">Professional ishlatish uchun mo'ljallangan eng so'nggi model. 2 yillik rasmiy kafolat bilan.</p>
                    <div className="text-3xl font-mono text-emerald-400 font-bold mb-8">${viewProduct.price}</div>
                    <button onClick={() => { addToCart(viewProduct); setViewProduct(null); }} className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20">
                      <ShoppingCart size={20}/> Savatga qo'shing
                    </button>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}