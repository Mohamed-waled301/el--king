"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Search, Menu, X, Crown, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../app/context/LanguageContext';
import { useCart } from '../app/context/CartContext';
import { useTheme } from 'next-themes';

export function Navbar() {
  const { lang, setLang, tr, isRtl } = useLang();
  const { itemCount, setIsSidebarOpen } = useCart();
  const { theme, setTheme } = useTheme();
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === '/') {
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setSearchOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: tr.nav.home, path: '/' },
    { label: tr.nav.phones, path: '/phones' },
    { label: tr.nav.accessories, path: '/accessories' },
    { label: tr.nav.offers, path: '/offers' },
    { label: tr.nav.contact, path: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-background/80 border-b shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 sm:h-20">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 border border-primary/20">
            <Crown size={16} className="text-primary animate-pulse" strokeWidth={2.5} />
          </div>
          <span className="tracking-widest uppercase font-extrabold text-lg sm:text-xl">
            EL KING
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-md relative hover:text-primary ${isActive(link.path) ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {link.label}
              {isActive(link.path) && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-primary shadow-sm"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
          
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex w-9 h-9 items-center justify-center rounded-full transition-colors hover:bg-secondary text-muted-foreground hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          {/* Search trigger */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex w-9 h-9 items-center justify-center rounded-full transition-colors hover:bg-secondary text-muted-foreground hover:text-foreground"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="relative flex w-9 h-9 items-center justify-center rounded-full transition-colors hover:bg-secondary text-muted-foreground hover:text-foreground"
          >
            <ShoppingCart size={18} />
            {itemCount > 0 && (
              <motion.span
                key={itemCount}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [1, 1.25, 1], opacity: 1 }}
                className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] font-extrabold bg-primary text-primary-foreground shadow-sm"
              >
                {itemCount}
              </motion.span>
            )}
          </button>

          {/* Language Switch */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center rounded-full border text-xs font-semibold overflow-hidden shrink-0 bg-secondary/50 h-8 px-3"
            aria-label="Toggle language"
          >
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>

          {/* Mobile menu trigger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t bg-background px-6 py-4"
          >
            <div className="max-w-3xl mx-auto relative">
              <input
                type="text"
                placeholder={tr.nav.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full rounded-xl py-3 px-4 bg-secondary border text-foreground text-sm outline-none focus:border-primary transition-colors"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
