"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FiGrid, FiList } from "react-icons/fi";
import { useProducts, useCategories } from "./lib/api";
import HeroBanner from "./components/layout/HeroBanner";
import SideFilter from "./components/SideFilter";
import ProductCard from "./components/ProductCard";
import ProductCardSkeleton from "./components/ProductCardSkeleton";
import Newsletter from "./components/Newsletter";

export default function CatalogPage() {
  const { data: products, isLoading, isError, error } = useProducts();
  const { data: categories } = useCategories();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = [...products];

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    // Price range filter
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
    }

    return filtered;
  }, [products, selectedCategory, searchTerm, priceRange, sortBy]);

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-8">
        {/* Sidebar */}
        <SideFilter
          categories={categories ?? []}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          priceRange={priceRange}
          onSelectPriceRange={setPriceRange}
        />

        {/* Listings Area */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-bold text-gray-900">
                {isLoading ? "..." : filteredProducts.length}
              </span>{" "}
              products
            </p>

            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-400 whitespace-nowrap">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs border border-gray-200 bg-white rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-400"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-200 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-2.5 py-2 transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <FiGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-2.5 py-2 transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <FiList className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Error */}
          {isError && (
            <div className="text-center py-16">
              <p className="text-red-500 font-medium text-sm">
                Failed to load products: {(error as Error).message}
              </p>
            </div>
          )}

          {/* Loading Skeletons */}
          {isLoading && (
            <div
              className={`grid gap-5 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Product Grid */}
          {!isLoading && !isError && (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-400 text-sm">
                    No products found. Try adjusting your filters.
                  </p>
                </div>
              ) : (
                <motion.div
                  layout
                  className={`grid gap-5 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              )}

              {/* Browse more button */}
              {filteredProducts.length > 0 && (
                <div className="text-center mt-10">
                  <button className="border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm font-medium px-8 py-2.5 rounded-lg transition-colors">
                    Browse more Products
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
