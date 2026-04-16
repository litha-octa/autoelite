"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
  FiMinus,
  FiPlus,
  FiStar,
} from "react-icons/fi";
import { useProduct, useProducts } from "../../lib/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCart } from "../../store/cartSlice";
import { toggleWishlist } from "../../store/wishlistSlice";
import type { Product } from "../../lib/types";
import ProductCard from "../../components/ProductCard";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const productId = Number(id);
  const { data: product, isLoading, isError } = useProduct(productId);
  const { data: allProducts } = useProducts();
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [additionalInfoOpen, setAdditionalInfoOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const isWishlisted = product
    ? wishlistItems.some((item) => item.id === product.id)
    : false;

  // Generate fake gallery images (fakestoreapi only has 1 image per product)
  const images = product
    ? [product.image, product.image, product.image, product.image]
    : [];

  const relatedProducts = allProducts
    ?.filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    dispatch(toggleWishlist(product));
  };

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="bg-gray-100 rounded-xl h-[400px] animate-pulse" />
            <div className="flex gap-3 mt-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-lg h-20 w-20 animate-pulse"
                />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse mt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="text-red-500 font-medium">Failed to load product.</p>
        <Link
          href="/"
          className="text-blue-600 hover:underline text-sm mt-2 inline-block"
        >
          Back to catalog
        </Link>
      </div>
    );
  }

  const originalPrice = (product.price * 1.15).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-8"
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600 transition-colors">
          Home
        </Link>
        <FiChevronRight className="w-3 h-3" />
        <Link href="/" className="hover:text-gray-600 transition-colors">
          Inventory
        </Link>
        <FiChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-medium truncate max-w-[200px]">
          {product.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Image Gallery */}
        <div>
          {/* Main Image */}
          <div className="relative bg-gray-50 rounded-xl overflow-hidden h-[400px] flex items-center justify-center group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-full h-full p-8"
              >
                <Image
                  src={images[currentImage]}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="object-contain max-h-[350px]"
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <FiChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <FiChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-md">
              {currentImage + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  currentImage === i
                    ? "border-gray-300 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.title} thumbnail ${i + 1}`}
                  fill
                  className="object-contain p-2"
                />
                {currentImage !== i && (
                  <div className="absolute inset-0 bg-white/60" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] leading-tight">
            {product.title}
          </h1>

          <p className="text-sm text-gray-500 leading-relaxed mt-3">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-5">
            <span className="text-3xl font-bold text-[#1E3A5F]">
              $
              {product.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
            <span className="text-lg text-gray-400 line-through">
              $
              {Number(originalPrice).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          {/* Rating */}
          <div className="mt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1.5">
              Rating
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating.rate)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
          </div>

          {/* Category */}
          <div className="mt-5">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">
              Category
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1.5 text-xs font-semibold border border-[#1E3A5F] text-[#1E3A5F] rounded-md">
                {product.category}
              </span>
            </div>
          </div>

          {/* Quantity + Wishlist */}
          <div className="flex items-center gap-3 mt-7">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className=" px-3 py-2.5 text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <FiMinus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2.5 text-sm font-semibold min-w-[3rem] text-center border-x border-gray-200">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2.5 text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleWishlist}
              className={`flex flex-1 items-center justify-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                isWishlisted
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FiHeart
                className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
              />
              Wishlist
            </motion.button>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="w-full mt-5 bg-[#1E3A5F] hover:bg-[#162d4a] text-white py-3.5 rounded-lg font-semibold text-sm transition-colors"
          >
            Add to Cart
          </motion.button>

          {/* Product Info */}
          <div className="mt-6 space-y-0 text-sm">
            <div className="flex justify-between py-2.5">
              <span className="text-gray-400">SKU</span>
              <span className="text-gray-700 font-medium">{product.id}</span>
            </div>
            <div className="flex justify-between py-2.5 border-t border-gray-100">
              <span className="text-gray-400">Category</span>
              <span className="text-gray-700 font-medium capitalize">
                {product.category}
              </span>
            </div>
            <div className="flex justify-between py-2.5 border-t border-gray-100">
              <span className="text-gray-400">Rating</span>
              <span className="text-gray-700 font-medium">
                {product.rating.rate} / 5
              </span>
            </div>
          </div>

          {/* Expandable Sections */}
          <div className="mt-2 border-t border-gray-100">
            <button
              onClick={() => setAdditionalInfoOpen(!additionalInfoOpen)}
              className="flex items-center justify-between w-full py-4 text-sm font-medium text-gray-700"
            >
              Additional Info
              <FiChevronRight
                className={`w-4 h-4 transition-transform ${
                  additionalInfoOpen ? "rotate-90" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {additionalInfoOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-gray-500 pb-4 leading-relaxed">
                    {product.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-t border-gray-100">
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="flex items-center justify-between w-full py-4 text-sm font-medium text-gray-700"
            >
              Details
              <FiChevronRight
                className={`w-4 h-4 transition-transform ${
                  detailsOpen ? "rotate-90" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {detailsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="text-sm text-gray-500 pb-4 space-y-1">
                    <p>Reviews: {product.rating.count}</p>
                    <p>Rating: {product.rating.rate} out of 5</p>
                    <p>Category: {product.category}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* You might also like */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-black">
              You might also like
            </h2>
            <Link
              href="/"
              className="text-sm font-semibold text-[#1E3A5F] hover:underline flex items-center gap-1"
            >
              More Products
              <FiChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
