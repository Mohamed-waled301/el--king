import React from 'react';
import { useApp } from '../context/AppProvider';

export default function Footer() {
  const { lang, t } = useApp();
  
  return (
    <footer className="footer fade-in-up">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              KING-STORE
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.8 }}>
              {t('footer_about')}
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h3>{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h3>
            <ul className="footer-links">
              <li><a href="/">{lang === 'ar' ? 'الرئيسية' : 'Home'}</a></li>
              <li><a href="#hot-deals">{t('nav_deals')}</a></li>
              <li><a href="#contact">{lang === 'ar' ? 'التواصل معنا' : 'Contact Us'}</a></li>
              <li><a href="#returns">{lang === 'ar' ? 'سياسة الإرجاع' : 'Return Policy'}</a></li>
              <li><a href="#terms">{lang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>{lang === 'ar' ? 'تواصل معنا' : 'Contact'}</h3>
            <ul className="footer-links">
              <li style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span dir="ltr">+20 100 123 4567</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>support@king-store.com</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>{lang === 'ar' ? 'القاهرة، مدينة نصر' : 'Nasr City, Cairo'}</span>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>{lang === 'ar' ? 'موقعنا' : 'Location'}</h3>
            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '150px', background: 'var(--bg-tertiary)' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.61185038753!2d31.32849141014529!3d30.05961134336048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate%2C%20Egypt!5e0!3m2!1sen!2sus!4v1714589234567!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t('footer_rights')} © 2025 — KING-STORE | {t('footer_dev')}</p>
        </div>
      </div>
    </footer>
  );
}
