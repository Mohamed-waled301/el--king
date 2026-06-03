"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { useLang } from "../app/context/LanguageContext";
import { Sparkles } from "lucide-react";

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

interface RecommendationsProps {
  currentProduct: Product;
  allProducts: Product[];
  maxCount?: number;
}

// Maps product categories to related categories for cross-selling
const relatedCategoryMap: Record<string, string[]> = {
  cases: ["screen", "camera", "chargers"],
  screen: ["cases", "chargers"],
  chargers: ["audio", "powerbank", "cases"],
  audio: ["chargers", "stands"],
  camera: ["cases", "stands", "chargers"],
  stands: ["chargers", "audio"],
  powerbank: ["chargers", "audio", "stands"],
};

export function Recommendations({ currentProduct, allProducts, maxCount = 4 }: RecommendationsProps) {
  const { lang } = useLang();

  const recommendations = useMemo(() => {
    const relatedCategories = relatedCategoryMap[currentProduct.category] || [];

    // Score-based system
    const scored = allProducts
      .filter((p) => p.id !== currentProduct.id)
      .map((p) => {
        let score = 0;

        // Same brand = +3
        if (p.brand === currentProduct.brand) score += 3;

        // Shared device models = +2 per model
        const sharedModels = p.models.filter((m) => currentProduct.models.includes(m));
        score += sharedModels.length * 2;

        // Related category = +4
        if (relatedCategories.includes(p.category)) score += 4;

        // Same category = +1
        if (p.category === currentProduct.category) score += 1;

        // Highly rated = +1
        if (p.rating >= 4.5) score += 1;

        return { product: p, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxCount)
      .map((item) => item.product);

    return scored;
  }, [currentProduct, allProducts, maxCount]);

  if (recommendations.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-12 py-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="text-primary" size={22} />
          <h2 className="text-2xl font-bold">
            {lang === "ar" ? "قد يعجبك أيضاً" : "You May Also Like"}
          </h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-bold ml-1">
            {lang === "ar" ? "مقترح" : "Suggested"}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recommendations.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
