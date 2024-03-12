/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import {
  addProducToCart,
  finalizePurchase,
  getCartById,
  removeCartById,
} from "../api/carts";

const CartContext = createContext();

export const UseCarts = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCarts must be used within a CartProvider");
  }

  return context;
};

export function CartProvider({ children }) {
  const [cartData, setCartData] = useState(null);
  const [purchaseCompleted, setPurchaseCompleted] = useState(null);

  const addProdToCart = async (cid, pid, obj) => {
    try {
      await addProducToCart(cid, pid, obj);
    } catch (error) {
      console.log(error);
    }
  };

  const cartById = async (cid) => {
    try {
      const cart = await getCartById(cid);
      setCartData(cart);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartById = async (cid, pid) => {
    try {
      await removeCartById(cid, pid);
    } catch (error) {
      console.log(error);
    }
  };

  const purchase = async (cid) => {
    try {
      const purchaseCompleted = await finalizePurchase(cid);
      setPurchaseCompleted(purchaseCompleted);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        addProdToCart,
        cartById,
        cartData,
        deleteCartById,
        purchase,
        purchaseCompleted,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
