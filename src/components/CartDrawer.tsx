"use client";

import React from "react";
import { useCart } from "../app/context/CartContext";
import { useLang } from "../app/context/LanguageContext";
import { X, Trash2 } from "lucide-react";

export function CartDrawer() {
  const { isSidebarOpen, setIsSidebarOpen, items, total, removeFromCart, updateQuantity } = useCart();
  const { tr, lang } = useLang();

  if (!isSidebarOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={() => setIsSidebarOpen(false)} 
      />
      
      {/* Drawer */}
      <div className={`relative w-full max-w-md bg-background shadow-2xl h-full flex flex-col animate-in slide-in-from-${lang === 'ar' ? 'left' : 'right'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold">{tr.nav.cart}</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground mt-10">Cart is empty</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded bg-secondary" />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{lang === 'ar' ? item.nameAr : item.name}</h4>
                  <p className="text-primary font-bold mt-1">{item.price} {tr.products.egp}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-2 border rounded">
                      <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 hover:bg-secondary">-</button>
                      <span className="text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 hover:bg-secondary">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-auto">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-4 border-t bg-secondary/50">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>{total} {tr.products.egp}</span>
            </div>
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
