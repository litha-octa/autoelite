"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiSearch,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiHeart,
  FiChevronRight,
} from "react-icons/fi";
import { useAppSelector } from "../../store/hooks";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "/" },
  { label: "Financing", href: "/" },
  { label: "Contact", href: "/" },
];

export default function Navbar() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const totalWishlistItems = wishlistItems.length;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <>
      {/* Top Promotional Banner */}
      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            initial={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-[#1E3A5F] text-white text-center text-xs py-2 px-6 relative overflow-hidden"
          >
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setBannerVisible(false)}
                className=" text-white/70 hover:text-white transition-colors"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
              <span className="text-white/80">
                Premium Selection — Curated Top Quality Products.
              </span>
              <Link
                href="/"
                className="font-semibold text-white hover:underline inline-flex items-center gap-0.5"
              >
                Browse Inventory
                <FiChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Left: Logo + Nav Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-[#1E3A5F]">
                AutoElite
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[13px] font-medium text-gray-500 hover:text-[#1E3A5F] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            <button className="p-2 text-[#1E3A5F] hover:text-[#162d4a] transition-colors">
              <FiSearch className="w-[18px] h-[18px]" />
            </button>
            <Link
              href="/cart"
              className="relative p-2 text-[#1E3A5F] hover:text-[#162d4a] transition-colors hidden lg:block"
            >
              <FiShoppingCart className="w-[18px] h-[18px]" />
              {totalCartItems > 0 && (
                <motion.span
                  key={totalCartItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-[#1E3A5F] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                >
                  {totalCartItems}
                </motion.span>
              )}
            </Link>
            <Link
              href="/wishlist"
              className="relative p-2 text-[#1E3A5F] hover:text-[#162d4a] transition-colors"
            >
              <FiHeart className="w-[18px] h-[18px]" />
              {totalWishlistItems > 0 && (
                <motion.span
                  key={totalWishlistItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-[#1E3A5F] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                >
                  {totalWishlistItems}
                </motion.span>
              )}
            </Link>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-[#1E3A5F]"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-gray-100"
            >
              <div className="px-6 py-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-medium text-gray-600 py-2 hover:text-[#1E3A5F]"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 py-2 hover:text-[#1E3A5F]"
                >
                  Cart
                  {totalCartItems > 0 && (
                    <span className="bg-[#1E3A5F] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {totalCartItems}
                    </span>
                  )}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
