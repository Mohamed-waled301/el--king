"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "../../components/Hero";
import { ProductCard } from "../../components/ProductCard";
import { useLang } from "../context/LanguageContext";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";

interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  originalPrice: number;
  discount: number;
  category: string;
  models: string[];
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew: boolean;
  isBestseller: boolean;
  image: string;
  description: string;
}

const ITEMS_PER_PAGE = 12;

export default function HomePage() {
  const { lang, tr } = useLang();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = [
    { id: "all", labelEn: "All", labelAr: "الكل" },
    { id: "cases", labelEn: "Cases", labelAr: "كفرات" },
    { id: "screen", labelEn: "Screen Protectors", labelAr: "حماية شاشة" },
    { id: "chargers", labelEn: "Chargers", labelAr: "شواحن" },
    { id: "audio", labelEn: "Audio", labelAr: "سماعات" },
    { id: "camera", labelEn: "Camera", labelAr: "كاميرا" },
    { id: "stands", labelEn: "Stands", labelAr: "حاملات" },
    { id: "powerbank", labelEn: "Power Banks", labelAr: "باور بانك" },
  ];

  const filtered = useMemo(() => {
    let list = [...products];
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameAr.includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (brand !== "all") list = list.filter((p) => p.brand === brand);
    if (sort === "price_asc") list = list.sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") list = list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = list.sort((a, b) => b.rating - a.rating);
    else if (sort === "discount") list = list.sort((a, b) => b.discount - a.discount);
    return list;
  }, [products, debouncedSearch, category, brand, sort]);

  const paginated = filtered.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Products Section */}
      <section className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Search + Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 space-y-4"
        >
          <h2 className="text-3xl font-extrabold text-foreground">
            {lang === "ar" ? "المنتجات" : "Products"}
          </h2>

          {/* Search */}
          <div className="relative max-w-lg">
            <Search size={18} className="absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder={lang === "ar" ? "ابحث عن منتج، موديل، ماركة..." : "Search products, models, brands..."}
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm outline-none focus:border-primary transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute top-1/2 -translate-y-1/2 right-3 text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setCategory(cat.id); setPage(1); }}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  category === cat.id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {lang === "ar" ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Sort + Brand Row */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{lang === "ar" ? "ترتيب:" : "Sort:"}</span>
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm px-3 py-1.5 rounded-lg bg-secondary border border-border text-foreground outline-none focus:border-primary"
            >
              <option value="newest">{lang === "ar" ? "الأحدث" : "Newest"}</option>
              <option value="price_asc">{lang === "ar" ? "السعر: الأقل" : "Price: Low to High"}</option>
              <option value="price_desc">{lang === "ar" ? "السعر: الأعلى" : "Price: High to Low"}</option>
              <option value="rating">{lang === "ar" ? "الأعلى تقييماً" : "Top Rated"}</option>
              <option value="discount">{lang === "ar" ? "أعلى خصم" : "Best Discount"}</option>
            </select>
            <select
              value={brand}
              onChange={(e) => { setBrand(e.target.value); setPage(1); }}
              className="text-sm px-3 py-1.5 rounded-lg bg-secondary border border-border text-foreground outline-none focus:border-primary"
            >
              <option value="all">{lang === "ar" ? "كل الماركات" : "All Brands"}</option>
              <option value="iphone">Apple / iPhone</option>
              <option value="samsung">Samsung</option>
            </select>

            <span className="text-xs text-muted-foreground ml-auto">
              {filtered.length} {lang === "ar" ? "منتج" : "products"}
            </span>
          </div>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-secondary/50 animate-pulse aspect-[3/4]" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <Search size={64} className="text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-bold mb-2">{lang === "ar" ? "لا توجد نتائج" : "No Results Found"}</h3>
            <p className="text-muted-foreground">{lang === "ar" ? "جرب البحث بكلمات أخرى" : "Try different search terms"}</p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {paginated.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i % ITEMS_PER_PAGE} />
                ))}
              </AnimatePresence>
            </div>

            {hasMore && (
              <div className="mt-10 flex justify-center">
                <motion.button
                  onClick={() => setPage((p) => p + 1)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-3 rounded-xl bg-primary text-primary-foreground font-bold shadow-md"
                >
                  {lang === "ar" ? "عرض المزيد" : "Load More"}
                </motion.button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
