import React from 'react';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppProvider';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { lang, t } = useApp();

  const stars = [];
  const rating = parseFloat(product.rating);
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <svg key={i} className="star" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    } else {
      stars.push(
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }
  }

  const name = lang === 'ar' ? product.nameAr : product.name;

  return (
    <div className="product-card">
      <div className="product-image-container">
        
        <div className="badges">
          {product.isNew && <span className="badge badge-new">{t('new_badge')}</span>}
          {product.isBestseller && <span className="badge badge-best">{t('bestseller_badge')}</span>}
          {product.discount > 0 && <span className="badge badge-discount">-{product.discount}%</span>}
        </div>
        
        <img src={product.image} alt={name} className="product-image" loading="lazy" />
      </div>
      
      <div className="product-info">
        <div className="product-brand">{product.brand === 'samsung' ? 'Samsung' : 'Apple'} - {lang === 'ar' ? 'متوافق' : 'Compatible'}</div>
        <h3 className="product-title">{name}</h3>
        
        <div className="product-rating">
          <div style={{ display: 'flex' }}>{stars}</div>
          <span>({product.reviewCount})</span>
        </div>
        
        <div className="product-price-row">
          <span className="price">{product.price} ج.م</span>
        </div>
        
        <button className="btn add-to-cart-btn" onClick={() => addToCart(product)}>
          {t('add_to_cart')}
        </button>
      </div>
    </div>
  );
}
