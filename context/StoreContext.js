import React, { createContext, useContext, useMemo, useState } from "react";
import { defaultFavouriteIds, getProductById } from "../data";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [cartItems, setCartItems] = useState({});
  const [favouriteIds, setFavouriteIds] = useState(defaultFavouriteIds);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: ["eggs"],
    brands: ["cocola"],
  });

  const addToCart = (productId) => {
    setCartItems((current) => ({
      ...current,
      [productId]: (current[productId] || 0) + 1,
    }));
  };

  const updateCartQuantity = (productId, nextQuantity) => {
    setCartItems((current) => {
      if (nextQuantity <= 0) {
        const updated = { ...current };
        delete updated[productId];
        return updated;
      }

      return {
        ...current,
        [productId]: nextQuantity,
      };
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((current) => {
      const updated = { ...current };
      delete updated[productId];
      return updated;
    });
  };

  const toggleFavourite = (productId) => {
    setFavouriteIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  };

  const addAllFavouritesToCart = () => {
    setCartItems((current) => {
      const updated = { ...current };

      favouriteIds.forEach((id) => {
        updated[id] = (updated[id] || 0) + 1;
      });

      return updated;
    });
  };

  const cartProducts = Object.entries(cartItems)
    .map(([productId, quantity]) => {
      const product = getProductById(productId);
      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity,
      };
    })
    .filter(Boolean);

  const favouriteProducts = favouriteIds
    .map((id) => getProductById(id))
    .filter(Boolean);

  const cartTotal = cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = useMemo(
    () => ({
      addAllFavouritesToCart,
      addToCart,
      cartItems,
      cartProducts,
      cartTotal,
      favouriteIds,
      favouriteProducts,
      filtersApplied,
      removeFromCart,
      setFiltersApplied,
      selectedFilters,
      setSelectedFilters,
      toggleFavourite,
      updateCartQuantity,
    }),
    [
      cartItems,
      cartProducts,
      cartTotal,
      favouriteIds,
      favouriteProducts,
      filtersApplied,
      selectedFilters,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
}
