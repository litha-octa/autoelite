"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiArrowLeft, FiHeart, FiShoppingCart } from "react-icons/fi";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { removeFromWishlist } from "../store/wishlistSlice";
import { addToCart } from "../store/cartSlice";

export default function WishlistPage() {
  const items = useAppSelector((state) => state.wishlist.items);
  const dispatch = useAppDispatch();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <FiHeart className="w-16 h-16 text-[#1E3A5F] mx-auto mb-4" />
        <h2 className="text-xl font-bold text-[#1E3A5F] mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Start adding some products to your wishlist!
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#1E3A5F] hover:bg-[#162d4a] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wishlist</h1>
          <p className="text-sm text-gray-500 mt-1">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {items.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4 items-center"
            >
              <div className="bg-gray-50 rounded-lg p-2 flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={80}
                  height={80}
                  className="object-contain w-20 h-20"
                />
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${product.id}`}
                  className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                >
                  {product.title}
                </Link>
                <p className="text-xs text-gray-400 capitalize mt-1">
                  {product.category}
                </p>
                <p className="font-bold text-gray-900 mt-1">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => dispatch(addToCart(product))}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#1E3A5F] hover:bg-[#162d4a] text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  <FiShoppingCart className="w-3.5 h-3.5" />
                  Add to Cart
                </motion.button>

                <button
                  onClick={() => dispatch(removeFromWishlist(product.id))}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="block text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
