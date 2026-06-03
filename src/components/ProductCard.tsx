"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, type Product } from "../app/context/CartContext";
import { useLang } from "../app/context/LanguageContext";
import { ShoppingCart, Star, Zap } from "lucide-react";
import Image from "next/image";

// Category to default image mapping
const categoryDefaultImages: Record<string, string> = {
  screen: "https://images.unsplash.com/photo-1553545204-4f7d339aa06a?w=300&h=300&fit=crop",
  cases: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop",
  chargers: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop",
  audio: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&h=300&fit=crop",
  camera: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop",
  stands: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop",
  powerbank: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop",
};

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const { lang, tr } = useLang();
  const [added, setAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    product.image || categoryDefaultImages[product.category] || categoryDefaultImages.cases
  );

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const displayName = lang === "ar" ? product.nameAr : product.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative bg-card border border-border rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.isNew && (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500 text-white">
            {lang === "ar" ? "جديد" : "NEW"}
          </span>
        )}
        {product.isBestseller && (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white">
            {lang === "ar" ? "الأكثر مبيعاً" : "BESTSELLER"}
          </span>
        )}
        {product.discount > 0 && (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative pt-[100%] bg-secondary/50 overflow-hidden">
        <img
          src={imgSrc}
          alt={displayName}
          onError={() => setImgSrc(categoryDefaultImages[product.category] || categoryDefaultImages.cases)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-muted-foreground mb-1 capitalize">{product.brand}</p>
        <h3 className="font-semibold text-sm leading-tight mb-2 flex-1 line-clamp-2">{displayName}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-extrabold text-primary">
            {product.price} {tr.products.egp}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-muted-foreground line-through">
              {product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <motion.button
          onClick={handleAddToCart}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
            added
              ? "bg-green-500 text-white"
              : "bg-secondary text-foreground group-hover:bg-primary group-hover:text-primary-foreground"
          }`}
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span key="added" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1">
                <Zap size={14} /> {lang === "ar" ? "أضيف!" : "Added!"}
              </motion.span>
            ) : (
              <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1">
                <ShoppingCart size={14} /> {tr.products.addCart}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}
