"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLang } from "../app/context/LanguageContext";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

export function Hero() {
  const { tr, isRtl } = useLang();

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/20 blur-[120px] mix-blend-screen" />
      </div>

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          className={`flex flex-col gap-6 ${isRtl ? 'text-right' : 'text-left'}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary w-fit"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-bold tracking-wide uppercase">{tr.hero.badge || "Premium Collection"}</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            {tr.hero.headline || "El King —"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">
              {tr.hero.headline2 || "Your Mobile Store"}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] leading-relaxed">
            {tr.hero.sub || "Discover the latest premium phone accessories designed to protect, charge, and enhance your device."}
          </p>
          
          <div className={`flex flex-wrap gap-4 mt-4 ${isRtl ? 'justify-end lg:justify-start' : ''}`}>
            <Link href="/phones">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/30"
              >
                <ShoppingBag size={20} />
                {tr.hero.cta || "Shop Now"}
              </motion.button>
            </Link>
            <Link href="/offers">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-primary/20 hover:border-primary/50 font-bold transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}
              >
                {tr.hero.cta2 || "View Offers"}
                <ArrowRight size={20} className={isRtl ? "rotate-180" : ""} />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          className="relative hidden md:block w-full h-[500px]"
          initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Main Hero Image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[32px] transform rotate-3 scale-105" />
          <div className="absolute inset-0 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80" 
              alt="Premium Phone Accessories" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          
          {/* Floating Elements for Premium Feel */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-8 top-1/4 bg-background/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold">✓</div>
              <div>
                <p className="text-sm font-bold text-foreground">100% Original</p>
                <p className="text-xs text-muted-foreground">Premium Quality</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 bottom-1/4 bg-background/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">★</div>
              <div>
                <p className="text-sm font-bold text-foreground">Top Rated</p>
                <p className="text-xs text-muted-foreground">By 10,000+ Users</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
