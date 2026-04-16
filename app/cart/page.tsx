"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiShoppingBag } from "react-icons/fi";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";

export default function CartPage() {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <FiShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Start adding some products to your cart!
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
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
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-sm text-gray-500 mt-1">
            {items.reduce((s, i) => s + i.quantity, 0)} item
            {items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.product.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4 items-center"
            >
              <div className="bg-gray-50 rounded-lg p-2 flex-shrink-0">
                <Image
                  src={item.product.image}
                  alt={item.product.title}
                  width={80}
                  height={80}
                  className="object-contain w-20 h-20"
                />
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.product.id}`}
                  className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                >
                  {item.product.title}
                </Link>
                <p className="text-xs text-gray-400 capitalize mt-1">
                  {item.product.category}
                </p>
                <p className="font-bold text-gray-900 mt-1">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.product.id,
                          quantity: item.quantity - 1,
                        }),
                      )
                    }
                    className="px-2 py-1.5 text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <FiMinus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 py-1.5 text-sm font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.product.id,
                          quantity: item.quantity + 1,
                        }),
                      )
                    }
                    className="px-2 py-1.5 text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <FiPlus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.product.id))}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600 text-sm">Subtotal</span>
          <span className="font-bold text-lg text-gray-900">
            ${total.toFixed(2)}
          </span>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm">
          Proceed to Checkout
        </button>
        <Link
          href="/"
          className="block text-center text-sm text-gray-500 hover:text-gray-700 mt-3 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
