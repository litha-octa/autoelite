"use client";

import { FiSliders } from "react-icons/fi";

interface SideFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (cat: string | null) => void;
  priceRange: string | null;
  onSelectPriceRange: (range: string | null) => void;
}

const priceRanges = [
  { label: "All Prices", value: null },
  { label: "Under $20", value: "0-20" },
  { label: "$20 - $50", value: "20-50" },
  { label: "$50 - $100", value: "50-100" },
  { label: "$100 - $500", value: "100-500" },
  { label: "$500+", value: "500-9999" },
];

export default function SideFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  priceRange,
  onSelectPriceRange,
}: SideFilterProps) {
  return (
    <aside className="w-56 flex-shrink-0 hidden lg:block">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-20">
        {/* Header */}
        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
          <FiSliders className="w-4 h-4 text-[#1E3A5F]" />
          <span className="text-sm font-bold text-[#1E3A5F] uppercase tracking-wider">
            Filters
          </span>
        </div>

        {/* Category / Type */}
        <div className="mb-6">
          <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-3">
            Category
          </p>
          <ul className="space-y-2">
            <li>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCategory === null}
                  onChange={() => onSelectCategory(null)}
                  className="accent-blue-600 w-3.5 h-3.5 rounded"
                />
                <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">
                  All Categories
                </span>
              </label>
            </li>
            {categories.map((cat) => (
              <li key={cat}>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCategory === cat}
                    onChange={() =>
                      onSelectCategory(selectedCategory === cat ? null : cat)
                    }
                    className="accent-blue-600 w-3.5 h-3.5 rounded"
                  />
                  <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors capitalize">
                    {cat}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Range */}
        <div>
          <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-3">
            Price Range
          </p>
          <ul className="space-y-2">
            {priceRanges.map((range) => (
              <li key={range.label}>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={priceRange === range.value}
                    onChange={() =>
                      onSelectPriceRange(
                        priceRange === range.value ? null : range.value,
                      )
                    }
                    className="accent-blue-600 w-3.5 h-3.5 rounded"
                  />
                  <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">
                    {range.label}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
