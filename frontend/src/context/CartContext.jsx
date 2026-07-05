import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

const CART_KEY = "shopsphere_cart";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      const price = product.discountPrice > 0 ? product.discountPrice : product.price;

      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        toast.success(`Updated quantity in cart`);
        return prev.map((item) =>
          item._id === product._id ? { ...item, quantity: newQty } : item
        );
      }

      toast.success(`${product.name} added to cart`);
      return [
        ...prev,
        {
          _id: product._id,
          name: product.name,
          image: product.images?.[0]?.url || "",
          price,
          stock: product.stock,
          quantity: Math.min(quantity, product.stock),
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
    toast.success("Item removed from cart");
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_KEY);
  };

  const itemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingPrice = itemsPrice > 999 || itemsPrice === 0 ? 0 : 49;
  const totalPrice = itemsPrice + shippingPrice;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        itemsCount,
        itemsPrice,
        shippingPrice,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
