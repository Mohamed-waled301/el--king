import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppProvider';

export default function Checkout({ onBack }) {
  const { items, subtotal, discount, total, coupon, clearCart } = useCart();
  const { lang, t } = useApp();
  
  const [step, setStep] = useState(1); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [shippingData, setShippingData] = useState({
    fullName: '',
    phone: '',
    email: '',
    governorate: 'Cairo',
    city: '',
    street: '',
    building: '',
    notes: '',
    deliveryOption: 'standard'
  });

  const governorates = [
    "Cairo", "Giza", "Alexandria", "Dakahlia", "Red Sea", "Beheira", "Fayoum", 
    "Gharbia", "Ismailia", "Menofia", "Minya", "Qaliubiya", "New Valley", 
    "Suez", "Aswan", "Assiut", "Beni Suef", "Port Said", "Damietta", 
    "Sharkia", "South Sinai", "Kafr Al sheikh", "Matrouh", "Luxor", "Qena", 
    "North Sinai", "Sohag"
  ];

  const deliveryCost = shippingData.deliveryOption === 'express' ? 90 : (total >= 500 ? 0 : 50);
  const finalTotal = total + deliveryCost;

  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    if (step === 4) {
      setOrderId(`KS-${Math.floor(100000 + Math.random() * 900000)}`);
      clearCart();
    }
  }, [step]);

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (shippingData.fullName && shippingData.phone && shippingData.city && shippingData.street) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      alert(lang === 'ar' ? "يرجى إكمال جميع الحقول الإلزامية" : "Please fill all required fields");
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4);
      window.scrollTo(0, 0);
    }, 2000);
  };

  if (items.length === 0 && step < 4) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2>{t('cart_empty')}</h2>
        <button className="btn btn-primary" onClick={onBack} style={{ marginTop: '2rem' }}>
          {lang === 'ar' ? 'العودة للتسوق' : 'Back to Shop'}
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container fade-in-up">
      {step < 4 && (
        <>
          <button className="btn btn-outline" onClick={step === 1 ? onBack : () => setStep(step - 1)} style={{ marginBottom: '2rem' }}>
            {lang === 'ar' ? '→ رجوع' : '← Back'}
          </button>
          
          <div className="checkout-steps">
            <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>1. {t('step1')}</div>
            <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>2. {t('step2')}</div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3. {t('step3')}</div>
          </div>
        </>
      )}

      {step === 1 && (
        <div className="checkout-card fade-in-up">
          <h2 style={{ marginBottom: '1.5rem' }}>{t('step1')}</h2>
          <form onSubmit={handleShippingSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{lang === 'ar' ? 'الاسم بالكامل *' : 'Full Name *'}</label>
                <input type="text" className="form-input" required value={shippingData.fullName} onChange={e => setShippingData({...shippingData, fullName: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'ar' ? 'رقم الهاتف *' : 'Phone Number *'}</label>
                <input type="tel" className="form-input" placeholder="01XXXXXXXXX" pattern="^01[0-2,5]{1}[0-9]{8}$" required value={shippingData.phone} onChange={e => setShippingData({...shippingData, phone: e.target.value})} />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">{lang === 'ar' ? 'البريد الإلكتروني (اختياري)' : 'Email (Optional)'}</label>
              <input type="email" className="form-input" value={shippingData.email} onChange={e => setShippingData({...shippingData, email: e.target.value})} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{lang === 'ar' ? 'المحافظة *' : 'Governorate *'}</label>
                <select className="form-input" required value={shippingData.governorate} onChange={e => setShippingData({...shippingData, governorate: e.target.value})}>
                  {governorates.map(gov => <option key={gov} value={gov}>{gov}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'ar' ? 'المدينة / المنطقة *' : 'City / Area *'}</label>
                <input type="text" className="form-input" required value={shippingData.city} onChange={e => setShippingData({...shippingData, city: e.target.value})} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{lang === 'ar' ? 'اسم الشارع *' : 'Street Name *'}</label>
              <input type="text" className="form-input" required value={shippingData.street} onChange={e => setShippingData({...shippingData, street: e.target.value})} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{lang === 'ar' ? 'رقم المبنى / الدور / الشقة' : 'Building / Floor / Apt'}</label>
                <input type="text" className="form-input" value={shippingData.building} onChange={e => setShippingData({...shippingData, building: e.target.value})} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{lang === 'ar' ? 'ملاحظات التوصيل (اختياري)' : 'Delivery Notes (Optional)'}</label>
              <textarea className="form-input" rows="3" value={shippingData.notes} onChange={e => setShippingData({...shippingData, notes: e.target.value})}></textarea>
            </div>

            <h3 style={{ margin: '2rem 0 1rem' }}>{lang === 'ar' ? 'خيارات التوصيل' : 'Delivery Options'}</h3>
            <div className="radio-group">
              <div style={{ position: 'relative' }}>
                <input type="radio" id="standard" name="delivery" className="radio-input" style={{ position: 'absolute', opacity: 0 }} checked={shippingData.deliveryOption === 'standard'} onChange={() => setShippingData({...shippingData, deliveryOption: 'standard'})} />
                <label htmlFor="standard" className="radio-label">
                  <div style={{ flexGrow: 1 }}>
                    <strong>{lang === 'ar' ? 'توصيل عادي (3-5 أيام عمل)' : 'Standard Delivery (3-5 Days)'}</strong>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{total >= 500 ? (lang === 'ar' ? 'مجاناً للطلبات فوق 500 ج.م' : 'Free for orders over 500 EGP') : '50 ج.م'}</div>
                  </div>
                  <span style={{ fontWeight: 700 }}>{total >= 500 ? (lang === 'ar' ? 'مجانًا' : 'Free') : '50 ج.م'}</span>
                </label>
              </div>
              <div style={{ position: 'relative' }}>
                <input type="radio" id="express" name="delivery" className="radio-input" style={{ position: 'absolute', opacity: 0 }} checked={shippingData.deliveryOption === 'express'} onChange={() => setShippingData({...shippingData, deliveryOption: 'express'})} />
                <label htmlFor="express" className="radio-label">
                  <div style={{ flexGrow: 1 }}>
                    <strong>{lang === 'ar' ? 'توصيل سريع (1-2 يوم عمل)' : 'Express Delivery (1-2 Days)'}</strong>
                  </div>
                  <span style={{ fontWeight: 700 }}>90 ج.م</span>
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
              {t('page_next')}
            </button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="checkout-card fade-in-up">
          <h2 style={{ marginBottom: '1.5rem' }}>{t('step2')}</h2>
          
          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1rem' }}>{lang === 'ar' ? 'عنوان التوصيل' : 'Shipping Address'}</h3>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }} onClick={() => setStep(1)}>
                {lang === 'ar' ? 'تعديل' : 'Edit'}
              </button>
            </div>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{shippingData.fullName}</p>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{shippingData.phone}</p>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{shippingData.street}, {shippingData.city}, {shippingData.governorate}</p>
          </div>

          <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>{lang === 'ar' ? 'المنتجات' : 'Products'}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                <img src={item.image} alt={lang === 'ar' ? item.nameAr : item.name} style={{ width: '60px', height: '60px', objectFit: 'contain', background: 'var(--bg-tertiary)', borderRadius: '8px' }} />
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontWeight: 600 }}>{lang === 'ar' ? item.nameAr : item.name}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{lang === 'ar' ? 'الكمية:' : 'Qty:'} {item.quantity}</div>
                </div>
                <div style={{ fontWeight: 700, fontFamily: 'var(--font-latin)' }}>{item.price * item.quantity} ج.م</div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            <div className="cart-summary-row"><span>{lang === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span><span>{subtotal} ج.م</span></div>
            {coupon && <div className="cart-summary-row" style={{ color: 'var(--success)' }}><span>{lang === 'ar' ? 'خصم' : 'Discount'} ({coupon.code})</span><span>-{discount} ج.م</span></div>}
            <div className="cart-summary-row"><span>{lang === 'ar' ? 'رسوم الشحن' : 'Shipping Fee'}</span><span>{deliveryCost === 0 ? (lang === 'ar' ? 'مجانًا' : 'Free') : `${deliveryCost} ج.م`}</span></div>
            <div className="cart-total-row" style={{ marginTop: '0.5rem' }}><span>{lang === 'ar' ? 'الإجمالي الكلي' : 'Grand Total'}</span><span>{finalTotal} ج.م</span></div>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }} onClick={() => setStep(3)}>
            {lang === 'ar' ? 'تأكيد الطلب' : 'Confirm Order'}
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="checkout-card fade-in-up">
          <h2 style={{ marginBottom: '1.5rem' }}>{t('step3')}</h2>
          
          <div className="radio-group">
            <div style={{ position: 'relative' }}>
              <input type="radio" id="card" name="payment" className="radio-input" style={{ position: 'absolute', opacity: 0 }} checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
              <label htmlFor="card" className="radio-label" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                    {lang === 'ar' ? 'بطاقة ائتمان / خصم مباشر' : 'Credit / Debit Card'}
                  </strong>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <div style={{ width: '32px', height: '20px', background: '#1A1F71', borderRadius: '2px' }}></div>
                    <div style={{ width: '32px', height: '20px', background: '#EB001B', borderRadius: '2px' }}></div>
                  </div>
                </div>
                {paymentMethod === 'card' && (
                  <div style={{ marginTop: '1.5rem' }} className="fade-in-up">
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.875rem' }}>{lang === 'ar' ? 'رقم البطاقة' : 'Card Number'}</label>
                      <input type="text" className="form-input" placeholder="XXXX XXXX XXXX XXXX" style={{ fontFamily: 'var(--font-latin)' }} />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.875rem' }}>{lang === 'ar' ? 'تاريخ الانتهاء' : 'Expiry Date'}</label>
                        <input type="text" className="form-input" placeholder="MM/YY" style={{ fontFamily: 'var(--font-latin)' }} />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.875rem' }}>CVV</label>
                        <input type="password" className="form-input" placeholder="***" maxLength="3" style={{ fontFamily: 'var(--font-latin)' }} />
                      </div>
                    </div>
                  </div>
                )}
              </label>
            </div>

            <div style={{ position: 'relative' }}>
              <input type="radio" id="vodafone" name="payment" className="radio-input" style={{ position: 'absolute', opacity: 0 }} checked={paymentMethod === 'vodafone'} onChange={() => setPaymentMethod('vodafone')} />
              <label htmlFor="vodafone" className="radio-label" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <strong style={{ color: '#E60000', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                    {lang === 'ar' ? 'فودافون كاش' : 'Vodafone Cash'}
                  </strong>
                </div>
                {paymentMethod === 'vodafone' && (
                  <div style={{ marginTop: '1rem' }} className="fade-in-up">
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{lang === 'ar' ? 'الرجاء تحويل المبلغ إلى الرقم التالي: 010XXXXXXXX ثم كتابة الرقم الذي قمت بالتحويل منه.' : 'Transfer to 010XXXXXXXX then enter your number below.'}</p>
                    <input type="tel" className="form-input" placeholder={lang === 'ar' ? 'رقم المحفظة المحول منها' : 'Sender Wallet Number'} style={{ marginTop: '0.5rem' }} />
                  </div>
                )}
              </label>
            </div>

            <div style={{ position: 'relative' }}>
              <input type="radio" id="cod" name="payment" className="radio-input" style={{ position: 'absolute', opacity: 0 }} checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
              <label htmlFor="cod" className="radio-label">
                <div style={{ flexGrow: 1 }}>
                  <strong>{lang === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery'}</strong>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{lang === 'ar' ? 'يتم إضافة 10 ج.م رسوم تحصيل' : 'Extra 10 EGP fee applied'}</div>
                </div>
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{lang === 'ar' ? 'الإجمالي:' : 'Total:'} {paymentMethod === 'cod' ? finalTotal + 10 : finalTotal} ج.م</span>
            <button className="btn btn-primary" onClick={handlePayment} disabled={isProcessing} style={{ minWidth: '150px' }}>
              {isProcessing ? (
                <svg className="spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                  <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
              ) : (lang === 'ar' ? 'ادفع الآن' : 'Pay Now')}
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="checkout-card fade-in-up" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ width: '80px', height: '80px', margin: '0 auto 2rem', color: 'var(--success)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2 style={{ color: 'var(--success)', marginBottom: '1rem' }}>{lang === 'ar' ? 'شكراً لتسوقك مع KING-STORE' : 'Thank you for shopping with KING-STORE'}</h2>
          
          <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px', display: 'inline-block', textAlign: lang === 'ar' ? 'right' : 'left', minWidth: '300px', marginBottom: '2rem' }}>
            <p style={{ margin: '0 0 0.5rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>{lang === 'ar' ? 'رقم الطلب:' : 'Order ID:'}</span>
              <strong style={{ fontFamily: 'var(--font-latin)' }}>#{orderId}</strong>
            </p>
            <p style={{ margin: '0 0 0.5rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>{lang === 'ar' ? 'الإجمالي:' : 'Total:'}</span>
              <strong style={{ color: 'var(--accent)', fontFamily: 'var(--font-latin)' }}>{paymentMethod === 'cod' ? finalTotal + 10 : finalTotal} ج.م</strong>
            </p>
          </div>
          
          <div>
            <button className="btn btn-primary" onClick={onBack}>
              {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
