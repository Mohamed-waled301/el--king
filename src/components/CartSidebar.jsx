import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppProvider';

export default function CartSidebar({ onCheckout }) {
  const { 
    items, 
    subtotal, 
    discount, 
    total, 
    coupon, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    applyCoupon,
    isSidebarOpen,
    setIsSidebarOpen
  } = useCart();
  
  const { lang, t } = useApp();
  
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (!success) {
      setCouponError(lang === 'ar' ? 'كود الخصم غير صحيح' : 'Invalid coupon');
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  return (
    <>
      <div className={`cart-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      
      <div className={`cart-sidebar`}>
        <div className="cart-header">
          <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {t('cart_title')}
          </h2>
          <button className="cart-close" onClick={() => setIsSidebarOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div className="cart-items">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '4rem' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1rem' }}>
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <p>{t('cart_empty')}</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item fade-in-up">
                <img src={item.image} alt={lang === 'ar' ? item.nameAr : item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <div className="cart-item-title">{lang === 'ar' ? item.nameAr : item.name}</div>
                  <div className="cart-item-price">{item.price} ج.م</div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <input type="text" className="qty-input" value={item.quantity} readOnly />
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                    <button className="cart-item-remove" onClick={() => {
                      if(window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف المنتج؟' : 'Are you sure?')) removeFromCart(item.id);
                    }}>
                      {lang === 'ar' ? 'حذف' : 'Remove'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {items.length > 0 && (
          <div className="cart-footer">
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input 
                type="text" 
                className="search-input" 
                placeholder={lang === 'ar' ? 'كوبون الخصم' : 'Coupon code'} 
                style={{ flexGrow: 1 }}
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
              <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }} onClick={handleApplyCoupon}>
                {lang === 'ar' ? 'تطبيق' : 'Apply'}
              </button>
            </div>
            {couponError && <p style={{ color: 'var(--error)', fontSize: '0.875rem', marginTop: '-1rem', marginBottom: '1rem' }}>{couponError}</p>}
            
            <div className="cart-summary-row">
              <span>{lang === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
              <span>{subtotal} ج.م</span>
            </div>
            {coupon && (
              <div className="cart-summary-row" style={{ color: 'var(--success)' }}>
                <span>{lang === 'ar' ? 'خصم' : 'Discount'} ({coupon.code})</span>
                <span>-{discount} ج.م</span>
              </div>
            )}
            
            <div className="cart-total-row">
              <span>{lang === 'ar' ? 'الإجمالي' : 'Total'}</span>
              <span>{total} ج.م</span>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                className="btn btn-primary checkout-btn" 
                onClick={() => { setIsSidebarOpen(false); onCheckout(); }}
              >
                {t('checkout_btn')}
              </button>
              <button 
                className="btn btn-outline" 
                style={{ padding: '0 1rem' }}
                onClick={() => {
                  if(window.confirm(lang === 'ar' ? 'هل أنت متأكد من مسح السلة؟' : 'Clear cart?')) clearCart();
                }}
                title={lang === 'ar' ? 'مسح السلة' : 'Clear Cart'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
