"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-[#0d1520] text-white py-14 mt-10 text-center">
      <h2 className="text-2xl font-bold tracking-tight mb-2">Stay Updated</h2>
      <p className="text-gray-400 text-sm mb-7 max-w-md mx-auto px-6">
        Subscribe to our newsletter to receive the latest offers and updates directly in your inbox.
      </p>
      <div className="flex gap-0 max-w-sm mx-auto px-6">
        <input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-white/10 border border-white/15 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-l-lg focus:outline-none focus:border-blue-500"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-r-lg text-sm font-semibold transition-colors whitespace-nowrap">
          Subscribe
        </button>
      </div>
    </section>
  );
}
