import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('kingStoreCart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load cart', e);
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('kingStoreCart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Show toast using a custom event
    const event = new CustomEvent('showToast', { detail: 'item_added' });
    window.dispatchEvent(event);
  };

  const removeFromCart = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    // Sample coupons: KING10 (10% off), WAVE20 (20% off), FIRST50 (50 EGP off)
    const upperCode = code.toUpperCase();
    if (upperCode === 'KING10') setCoupon({ code: upperCode, type: 'percent', value: 10 });
    else if (upperCode === 'WAVE20') setCoupon({ code: upperCode, type: 'percent', value: 20 });
    else if (upperCode === 'FIRST50') setCoupon({ code: upperCode, type: 'fixed', value: 50 });
    else return false; // Invalid coupon
    return true;
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
  let discount = 0;
  if (coupon) {
    if (coupon.type === 'percent') {
      discount = subtotal * (coupon.value / 100);
    } else {
      discount = coupon.value;
    }
  }

  const value = {
    items,
    itemCount,
    subtotal,
    discount,
    total: Math.max(0, subtotal - discount),
    coupon,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    isSidebarOpen,
    setIsSidebarOpen
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
