import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppProvider';

export default function Hero() {
  const { lang, t } = useApp();
  
  const phrases = lang === 'ar' 
    ? ["سامسونج الترا", "ايفون برو ماكس", "حماية قصوى", "جودة فاخرة"]
    : ["Samsung Ultra", "iPhone Pro Max", "Maximum Protection", "Premium Quality"];
    
  const [currentText, setCurrentText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Reset when language changes
    setCurrentText('');
    setPhraseIndex(0);
    setIsDeleting(false);
  }, [lang]);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    
    const timer = setTimeout(() => {
      // Safety check in case phraseIndex is out of bounds after lang change
      const safeIndex = phraseIndex % phrases.length;
      const currentPhrase = phrases[safeIndex];
      
      if (!isDeleting) {
        setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        
        if (currentText === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 2000); 
        }
      } else {
        setCurrentText(currentPhrase.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, phrases]);

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <h1 className="fade-in-up">
            {t('hero_static')} <br />
            <span className="typing-text">{currentText}</span>
            <span className="cursor-blink">|</span>
          </h1>
          <p className="hero-subtitle fade-in-up delay-100">
            {t('hero_sub')}
          </p>
          <div className="hero-buttons fade-in-up delay-200">
            <button className="btn btn-primary" onClick={() => document.getElementById('products').scrollIntoView()}>
              {t('cta_shop')}
            </button>
            <button className="btn btn-outline" onClick={() => document.getElementById('hot-deals').scrollIntoView()}>
              {t('cta_deals')}
            </button>
          </div>
        </div>
        
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop" 
            alt="Accessories" 
          />
        </div>
      </div>
    </section>
  );
}
