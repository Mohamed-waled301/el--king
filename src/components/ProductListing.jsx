import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useApp } from '../context/AppProvider';
import { products, categories, samsungModels, iphoneModels } from '../data/products';

const ITEMS_PER_PAGE = 15;

export default function ProductListing() {
  const { lang, t } = useApp();
  
  const [activeBrand, setActiveBrand] = useState('all');
  const [activeModel, setActiveModel] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Listen to header events
  useEffect(() => {
    const handleFilterSelected = (e) => {
      setActiveBrand(e.detail.brand);
      setActiveModel(e.detail.model);
      setCurrentPage(1);
    };
    window.addEventListener('filterSelected', handleFilterSelected);
    return () => window.removeEventListener('filterSelected', handleFilterSelected);
  }, []);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let results = [...products];

    if (activeBrand !== 'all') {
      results = results.filter(p => p.brand === activeBrand);
    }

    if (activeModel !== 'all') {
      results = results.filter(p => p.models && p.models.includes(activeModel));
    }

    if (activeCategory !== 'all') {
      results = results.filter(p => p.category === activeCategory);
    }

    results = results.filter(p => p.price <= maxPrice);

    if (minRating > 0) {
      results = results.filter(p => p.rating >= minRating);
    }

    switch(sortBy) {
      case 'price_asc':  results.sort((a,b) => a.price - b.price); break;
      case 'price_desc': results.sort((a,b) => b.price - a.price); break;
      case 'rating':     results.sort((a,b) => b.rating - a.rating); break;
      case 'bestseller': results.sort((a,b) => (b.isBestseller?1:0)-(a.isBestseller?1:0)); break;
      case 'newest':
      default:           results.sort((a,b) => (b.isNew?1:0)-(a.isNew?1:0)); break;
    }

    return results;
  }, [activeBrand, activeModel, activeCategory, maxPrice, minRating, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeBrand, activeModel, activeCategory, maxPrice, minRating, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentItems = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentModels = activeBrand === 'samsung' ? samsungModels : activeBrand === 'iphone' ? iphoneModels : [...samsungModels, ...iphoneModels];

  return (
    <section id="products" className="products-section container fade-in-up">
      <h2 className="section-title">{lang === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}</h2>
      
      <div className="filters-bar">
        <select className="filter-select" value={activeBrand} onChange={(e) => { setActiveBrand(e.target.value); setActiveModel('all'); }}>
          <option value="all">{t('filter_brand')} (All)</option>
          <option value="samsung">Samsung</option>
          <option value="iphone">iPhone</option>
        </select>
        
        <select className="filter-select" value={activeModel} onChange={(e) => setActiveModel(e.target.value)}>
          <option value="all">{t('filter_all_models')}</option>
          {currentModels.map(model => (
            <option key={model.value} value={model.value}>{model.label}</option>
          ))}
        </select>

        <select className="filter-select" value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)}>
          <option value="all">{t('filter_all_cats')}</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{lang === 'ar' ? cat.name : cat.nameEn}</option>
          ))}
        </select>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--input-bg)', padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>{t('filter_price')}: {maxPrice}</label>
          <input 
            type="range" 
            min="0" 
            max="1000" 
            step="50" 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(Number(e.target.value))} 
          />
        </div>

        <select className="filter-select" value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
          <option value={0}>{t('filter_rating')} (All)</option>
          <option value={3}>3+ Stars</option>
          <option value={4}>4+ Stars</option>
          <option value={4.5}>4.5+ Stars</option>
        </select>

        <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ marginInlineStart: 'auto' }}>
          <option value="newest">{t('sort_newest')}</option>
          <option value="price_asc">{t('sort_price_asc')}</option>
          <option value="price_desc">{t('sort_price_desc')}</option>
          <option value="rating">{t('sort_rating')}</option>
          <option value="bestseller">{t('sort_bestseller')}</option>
        </select>
      </div>

      <div className="products-grid">
        {currentItems.length > 0 ? (
          currentItems.map((product, index) => (
            <div key={product.id} style={{ animationDelay: `${(index % 10) * 0.1}s` }} className="fade-in-up">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{t('out_stock')}</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button className="page-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            {t('page_prev')}
          </button>
          
          {Array.from({ length: totalPages }).map((_, i) => (
            <button 
              key={i} 
              className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          
          <button className="page-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            {t('page_next')}
          </button>
        </div>
      )}
    </section>
  );
}
