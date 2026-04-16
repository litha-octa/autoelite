"use client";

import Link from "next/link";
import { useState } from "react";
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useAppSelector } from "../../store/hooks";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "/" },
  { label: "Services", href: "/" },
  { label: "Financing", href: "/" },
  { label: "About", href: "/" },
  { label: "Contact", href: "/" },
];

export default function Navbar() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <div className="w-7 h-7 bg-[#1E3A5F] rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <span className="text-base font-bold tracking-tight text-[#1E3A5F]">
            Auto<span className="text-blue-500">Elite</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-7">
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

        {/* Right Icons */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:text-[#1E3A5F] transition-colors">
            <FiSearch className="w-[18px] h-[18px]" />
          </button>
          <Link
            href="/cart"
            className="relative p-2 text-gray-500 hover:text-[#1E3A5F] transition-colors"
          >
            <FiShoppingCart className="w-[18px] h-[18px]" />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>
          <button className="p-2 text-gray-500 hover:text-[#1E3A5F] transition-colors">
            <FiUser className="w-[18px] h-[18px]" />
          </button>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-gray-500"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
