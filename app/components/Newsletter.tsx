"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-[#F8FAFC] text-white py-14 mt-10 text-center">
      <h2 className="text-2xl font-bold tracking-tight mb-2 text-[#0F172A]">
        Stay Updated
      </h2>
      <p className="text-[#64748B] text-sm mb-7 max-w-md mx-auto px-6">
        Subscribe to receive notifications about new inventory and special
        offers
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 max-w-sm mx-auto px-6">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-white/10 border border-gray-300 text-white placeholder:text-gray-500 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button className="bg-[#1E3A5F] hover:bg-[#162d4a] text-white px-5 py-3 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap sm:ml-2">
          Subscribe
        </button>
      </div>
    </section>
  );
}
