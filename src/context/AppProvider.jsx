import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  ar: {
    nav_accessories: "اكسسوارات",
    nav_deals: "احدث العروض",
    nav_new: "وصل حديثا",
    nav_about: "من نحن",
    search_placeholder: "ابحث عن منتج، موديل...",
    add_to_cart: "اضف للسلة",
    cart_title: "سلة المشتريات",
    cart_empty: "السلة فارغة",
    checkout_btn: "متابعة الشراء",
    filter_brand: "الماركة",
    filter_model: "الموديل",
    filter_category: "القسم",
    filter_sort: "الترتيب",
    filter_price: "السعر للحد",
    filter_rating: "التقييم",
    filter_all_models: "كل الموديلات",
    filter_all_cats: "كل الاقسام",
    hero_static: "اكسسوارات ",
    hero_sub: "اختار اكسسواراتك بالاسم والموديل — توصيل سريع لكل مكان",
    cta_shop: "تسوق الان",
    cta_deals: "شاهد العروض",
    in_stock: "متاح",
    out_stock: "نفد",
    new_badge: "جديد",
    bestseller_badge: "الاكثر مبيعا",
    step1: "بيانات الشحن",
    step2: "مراجعة الطلب",
    step3: "الدفع",
    footer_rights: "جميع الحقوق محفوظة",
    footer_dev: "تطوير مجموعة Wave-dev",
    footer_about: "متجرك الاول لاكسسوارات الموبايل",
    page_prev: "السابق",
    page_next: "التالي",
    sort_newest: "الاحدث",
    sort_price_asc: "السعر: من الاقل",
    sort_price_desc: "السعر: من الاعلى",
    sort_rating: "الاعلى تقييما",
    sort_bestseller: "الاكثر مبيعا",
    item_added: "تم اضافة المنتج للسلة",
    all_samsung: "كل سامسونج الترا",
    all_iphone: "كل الايفون",
  },
  en: {
    nav_accessories: "Accessories",
    nav_deals: "Latest Deals",
    nav_new: "New Arrivals",
    nav_about: "About Us",
    search_placeholder: "Search product or model...",
    add_to_cart: "Add to Cart",
    cart_title: "Shopping Cart",
    cart_empty: "Your cart is empty",
    checkout_btn: "Proceed to Checkout",
    filter_brand: "Brand",
    filter_model: "Model",
    filter_category: "Category",
    filter_sort: "Sort By",
    filter_price: "Max Price",
    filter_rating: "Rating",
    filter_all_models: "All Models",
    filter_all_cats: "All Categories",
    hero_static: "Accessories for ",
    hero_sub: "Choose your accessories by name and model — fast delivery everywhere",
    cta_shop: "Shop Now",
    cta_deals: "View Deals",
    in_stock: "In Stock",
    out_stock: "Out of Stock",
    new_badge: "New",
    bestseller_badge: "Bestseller",
    step1: "Shipping Info",
    step2: "Order Review",
    step3: "Payment",
    footer_rights: "All Rights Reserved",
    footer_dev: "Developed by Wave-dev Group",
    footer_about: "Your #1 Mobile Accessories Store",
    page_prev: "Previous",
    page_next: "Next",
    sort_newest: "Newest",
    sort_price_asc: "Price: Low to High",
    sort_price_desc: "Price: High to Low",
    sort_rating: "Top Rated",
    sort_bestseller: "Best Selling",
    item_added: "Product added to cart",
    all_samsung: "All Samsung Ultra",
    all_iphone: "All iPhones",
  }
};

const AppContext = createContext();

export function AppProvider({ children }) {
  const [lang, setLang] = useState('ar');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('ks-theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ks-theme', newTheme);
  };

  const toggleLang = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const t = (key) => translations[lang][key] || key;

  return (
    <AppContext.Provider value={{ lang, toggleLang, theme, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
