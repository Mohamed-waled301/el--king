"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Package, AlertCircle } from "lucide-react";

interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  originalPrice: number;
  discount: number;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew: boolean;
  isBestseller: boolean;
  image: string;
}

const emptyForm: Omit<Product, "id" | "discount" | "rating" | "reviewCount"> = {
  name: "",
  nameAr: "",
  price: 0,
  originalPrice: 0,
  category: "cases",
  brand: "iphone",
  inStock: true,
  isNew: false,
  isBestseller: false,
  image: "",
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({ name: product.name, nameAr: product.nameAr, price: product.price, originalPrice: product.originalPrice, category: product.category, brand: product.brand, inStock: product.inStock, isNew: product.isNew, isBestseller: product.isBestseller, image: product.image });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products?id=${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const handleSave = async () => {
    setSaving(true);
    if (editingProduct) {
      await fetch("/api/products", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: editingProduct.id }) });
    } else {
      await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setSaving(false);
    setShowForm(false);
    setEditingProduct(null);
    setForm(emptyForm);
    fetchProducts();
  };

  const categories = ["cases", "screen", "chargers", "audio", "camera", "stands", "powerbank"];

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "bg-blue-500" },
    { label: "Out of Stock", value: products.filter(p => !p.inStock).length, icon: AlertCircle, color: "bg-red-500" },
    { label: "New Items", value: products.filter(p => p.isNew).length, icon: Plus, color: "bg-green-500" },
    { label: "Bestsellers", value: products.filter(p => p.isBestseller).length, icon: Package, color: "bg-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-slate-900">Product Management</h1>
        <button onClick={() => { setEditingProduct(null); setForm(emptyForm); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div key={stat.label} whileHover={{ y: -2 }} className="bg-white rounded-xl p-4 shadow-sm border flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500">{stat.label}</p>
              <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">{editingProduct ? "Edit Product" : "Add Product"}</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Name (EN)", key: "name" as const },
                { label: "Name (AR)", key: "nameAr" as const },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="text-xs text-slate-500 font-medium block mb-1">{label}</label>
                  <input value={String(form[key])} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" />
                </div>
              ))}
              {[
                { label: "Price (EGP)", key: "price" as const, type: "number" },
                { label: "Original Price", key: "originalPrice" as const, type: "number" },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="text-xs text-slate-500 font-medium block mb-1">{label}</label>
                  <input type={type} value={Number(form[key])} onChange={e => setForm(f => ({ ...f, [key]: Number(e.target.value) }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" />
                </div>
              ))}
              <div>
                <label className="text-xs text-slate-500 font-medium block mb-1">Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium block mb-1">Brand</label>
                <select value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500">
                  <option value="iphone">Apple / iPhone</option>
                  <option value="samsung">Samsung</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-xs text-slate-500 font-medium block mb-1">Image URL</label>
                <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" placeholder="https://..." />
              </div>
              <div className="col-span-2 flex gap-6">
                {(["inStock", "isNew", "isBestseller"] as const).map(key => (
                  <label key={key} className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                    <input type="checkbox" checked={Boolean(form[key])} onChange={e => setForm(f => ({ ...f, [key]: e.target.checked }))} className="rounded" />
                    {key === "inStock" ? "In Stock" : key === "isNew" ? "New" : "Bestseller"}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} disabled={saving} className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-60 transition-colors">
                {saving ? "Saving..." : "Save Product"}
              </button>
              <button onClick={() => setShowForm(false)} className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Product Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                {["Product", "Brand", "Category", "Price", "Stock", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-slate-100 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                products.map(product => (
                  <motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0" />
                        <div>
                          <p className="font-semibold text-slate-900 line-clamp-1">{product.name}</p>
                          <p className="text-xs text-slate-400">{product.nameAr}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize text-slate-600">{product.brand}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-medium capitalize">{product.category}</span>
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-900">{product.price} EGP</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {product.inStock ? "In Stock" : "Out"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(product)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors">
                          <Edit size={15} />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
