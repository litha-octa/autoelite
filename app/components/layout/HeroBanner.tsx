"use client";

import { FiSearch } from "react-icons/fi";

interface HeroBannerProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function HeroBanner({
  searchTerm,
  setSearchTerm,
}: HeroBannerProps) {
  return (
    <section
      className="relative text-white py-16 sm:py-20 text-center overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #4171abab 0%, rgba(36, 74, 114, 0.9) 100%), url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&h=500&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <h1 className="text-xl sm:text-2xl md:text-[28px] font-bold tracking-tight mb-3 leading-tight">
          Premium Marketplace
        </h1>
        <p className="text-white/60 text-sm mb-8 max-w-lg mx-auto">
          Discover the best deals from our curated selection of premium
          products.
        </p>

        {/* Search bar */}
        {/* <div className="flex max-w-lg mx-auto">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by make, model, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/40 text-sm rounded-l-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg text-sm font-semibold transition-colors whitespace-nowrap">
            Search
          </button>
        </div> */}
      </div>
    </section>
  );
}
