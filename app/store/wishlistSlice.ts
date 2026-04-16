import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../lib/types";

interface WishlistState {
  items: Product[];
}

function loadWishlistFromStorage(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveWishlistToStorage(items: Product[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("wishlist", JSON.stringify(items));
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    hydrateWishlist(state) {
      state.items = loadWishlistFromStorage();
    },
    toggleWishlist(state, action: PayloadAction<Product>) {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      saveWishlistToStorage(state.items);
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveWishlistToStorage(state.items);
    },
  },
});

export const { hydrateWishlist, toggleWishlist, removeFromWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
