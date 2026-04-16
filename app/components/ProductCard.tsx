"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/cartSlice";
import type { Product } from "../lib/types";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Link href={`/products/${product.id}`} className="block group">
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          {/* Image */}
          <div className="relative bg-gray-50 overflow-hidden h-48 flex items-center justify-center p-4">
            <Image
              src={product.image}
              alt={product.title}
              width={180}
              height={180}
              className="object-contain max-h-40 group-hover:scale-105 transition-transform duration-500"
            />
            {/* Category badge */}
            <span className="absolute top-3 left-3 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-1 mb-1">
              {product.title}
            </h3>
            <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed mb-3">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold text-gray-900">
                ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className={`flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-md transition-colors ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
                }`}
              >
                <FiShoppingCart className="w-3 h-3" />
                {added ? "Added!" : "View"}
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
