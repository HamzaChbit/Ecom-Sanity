'use client'
import { create } from 'zustand';

const useCartStore = create((set) => {
  // Check if localStorage is available before accessing it
  const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;

  // Initialize cart state from local storage or empty array if not present
  const initialCart = isLocalStorageAvailable ? JSON.parse(localStorage.getItem('cart')) || { cart: [], cartTotal: 0, totalItems: 0 } : { cart: [], cartTotal: 0, totalItems: 0 };

  return {
    cart: initialCart.cart,
    cartTotal: initialCart.cartTotal,
    totalItems: initialCart.totalItems,
    addToCart: ({ product, quantity, color }) =>
      set((state) => {
        const existingProductIndex = state.cart.findIndex((item) => item._id === product._id);
        const newQuantity = parseInt(quantity, 10);

        if (newQuantity <= 0) {
          // If the new quantity is less than or equal to zero, remove the item from the cart
          const updatedCart = state.cart.filter((item) => item._id !== product._id);
          const newCart = {
            cart: updatedCart,
            cartTotal: calculateCartTotal(updatedCart),
            totalItems: calculateTotalItems(updatedCart),
          };
          if (isLocalStorageAvailable) localStorage.setItem('cart', JSON.stringify(newCart));
          return newCart;
        }

        if (existingProductIndex !== -1) {
          // If the product already exists, update the quantity to the new quantity
          const updatedCart = [...state.cart];
          updatedCart[existingProductIndex].quantity = newQuantity;
          const newCart = {
            cart: updatedCart,
            cartTotal: calculateCartTotal(updatedCart),
            totalItems: calculateTotalItems(updatedCart),
          };
          if (isLocalStorageAvailable) localStorage.setItem('cart', JSON.stringify(newCart));
          return newCart;
        } else {
          // If the product doesn't exist, add it to the cart with the new quantity
          const newCart = {
            cart: [...state.cart, { ...product, quantity: newQuantity, color: color }],
            cartTotal: calculateCartTotal([...state.cart, { ...product, quantity: newQuantity }]),
            totalItems: calculateTotalItems([...state.cart, { ...product, quantity: newQuantity }]),
          };
          if (isLocalStorageAvailable) localStorage.setItem('cart', JSON.stringify(newCart));
          return newCart;
        }
      }),
    removeFromCart: (productId) =>
      set((state) => {
        const updatedCart = state.cart.filter((item) => item._id !== productId);
        const newCart = {
          cart: updatedCart,
          cartTotal: calculateCartTotal(updatedCart),
          totalItems: calculateTotalItems(updatedCart),
        };
        if (isLocalStorageAvailable) localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      }),
    clearCart: () => {
      if (isLocalStorageAvailable) localStorage.removeItem('cart');
      set({ cart: [], cartTotal: 0, totalItems: 0 });
    },
  };
});

// function calculateCartTotal(cart) {
//   return cart.reduce((total, item) => total + item.price * item.quantity, 0);
// }

function calculateTotalItems(cart) {
  return cart.reduce((total, item) => total + 1, 0);
}

function calculateCartTotal(cart) {
  return cart.reduce((total, item) => {
    const price = item.discount
      ? item.price * (1 - item.discount / 100)
      : item.price;
    return total + price * item.quantity;
  }, 0);
}

// function calculateTotalItems(cart) {
//   return cart.reduce((total, item) => total + item.quantity, 0);
// }


export default useCartStore;