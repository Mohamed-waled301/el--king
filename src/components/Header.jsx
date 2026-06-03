import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppProvider';
import { products, samsungModels, iphoneModels } from '../data/products';

export default function Header() {
  const { itemCount, setIsSidebarOpen } = useCart();
  const { lang, toggleLang, theme, toggleTheme, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  const [animateBadge, setAnimateBadge] = useState(false);
  useEffect(() => {
    if (itemCount > 0) {
      setAnimateBadge(true);
      const timer = setTimeout(() => setAnimateBadge(false), 500);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    
    setIsSearching(true);
    const timer = setTimeout(() => {
      const term = searchTerm.toLowerCase();
      const results = products.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.nameAr.includes(term) ||
        p.brand.includes(term)
      ).slice(0, 5);
      setSearchResults(results);
      setIsSearching(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearching(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dispatch custom event to trigger filter from header
  const handleModelSelect = (brand, modelValue) => {
    const event = new CustomEvent('filterSelected', { detail: { brand, model: modelValue } });
    window.dispatchEvent(event);
    setIsMobileMenuOpen(false);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header">
      <div className="container header-content">
        <a href="/" className="logo">
          KING-STORE
        </a>

        <nav className="nav-menu">
          <div className="nav-item">
            <a href="#">{t('nav_accessories')} ▼</a>
            
            <div className="dropdown-container">
              <div className="dropdown-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                  {t('all_samsung')}
                </div>
                <div className="nested-dropdown">
                  {samsungModels.map(model => (
                    <div key={model.value} onClick={() => handleModelSelect('samsung', model.value)} className="dropdown-item" style={{ fontSize: '0.875rem' }}>
                      {model.label}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="dropdown-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path><path d="M10 2c1 .5 2 2 2 5"></path></svg>
                  {t('all_iphone')}
                </div>
                <div className="nested-dropdown">
                  {iphoneModels.map(model => (
                    <div key={model.value} onClick={() => handleModelSelect('iphone', model.value)} className="dropdown-item" style={{ fontSize: '0.875rem' }}>
                      {model.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="nav-item"><a href="#hot-deals">{t('nav_deals')}</a></div>
          <div className="nav-item"><a href="#new-arrivals">{t('nav_new')}</a></div>
          <div className="nav-item"><a href="#about">{t('nav_about')}</a></div>
        </nav>

        <div className="header-actions">
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>
          
          <button className="lang-btn" onClick={toggleLang}>
            {lang === 'ar' ? 'EN' : 'ع'}
          </button>

          <div className="search-bar" ref={searchRef}>
            <input 
              type="text" 
              className="search-input" 
              placeholder={t('search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => { if(searchTerm) setIsSearching(true) }}
            />
            {isSearching && searchTerm && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, right: 0, 
                backgroundColor: 'var(--dropdown-bg)', border: '1px solid var(--border)',
                borderRadius: '8px', marginTop: '0.5rem', boxShadow: 'var(--dropdown-shadow)', zIndex: 100
              }}>
                {searchResults.length > 0 ? (
                  <>
                    {searchResults.map(result => (
                      <div key={result.id} style={{ display: 'flex', gap: '1rem', padding: '0.75rem', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}>
                        <img src={result.image} alt={result.name} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{lang === 'ar' ? result.nameAr : result.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>{result.price} ج.م</div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>لا توجد نتائج مطابقة</div>
                )}
              </div>
            )}
          </div>

          <div className="cart-icon-wrapper" onClick={() => setIsSidebarOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {itemCount > 0 && (
              <span className={`cart-badge ${animateBadge ? 'animate' : ''}`}>
                {itemCount}
              </span>
            )}
          </div>

          <button className="hamburger-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </div>

      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <a href="#" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>{t('nav_accessories')}</a>
        <a href="#hot-deals" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>{t('nav_deals')}</a>
        <a href="#new-arrivals" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>{t('nav_new')}</a>
        <a href="#about" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>{t('nav_about')}</a>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
          <button className="btn btn-outline" onClick={toggleTheme} style={{ flexGrow: 1 }}>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button className="btn btn-outline" onClick={toggleLang} style={{ flexGrow: 1 }}>
            {lang === 'ar' ? 'English' : 'عربي'}
          </button>
        </div>
      </div>
    </header>
  );
}
