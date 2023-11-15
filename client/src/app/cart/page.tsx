"use client";

import React, { useState, useEffect } from "react";
import CartItem from "@/components/common/cartItem";
import { CartProduct, ResponseCart } from "@/types/product";
import { getSocket } from "@/services/getSocket";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState(0);

  const socket = getSocket();
  useEffect(() => {
    socket.on("cart-data", (cart: ResponseCart) => {
      setCartItems(cart.cartDetails);
      setTotalPrice(cart.totalValue);
    });

    socket.emit("get-cart");
    setIsLoading(false);
  }, [socket]);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      <div className="bg-white shadow-lg rounded-lg p-8">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <div className="flex justify-between items-center mt-8">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl font-bold">{totalPrice} zł</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
