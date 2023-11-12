"use client";

import React, { useState, useEffect } from "react";
import CartItem from "@/components/common/cartItem";
import { getCart } from "@/services/cart";
import { CartProduct } from "@/types/product";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCart();
        setCartItems(response.cartDetails);
        setTotalPrice(response.totalValue);

        setIsLoading(false);
      } catch (error) {
        setError('error');
        setIsLoading(false);
      }
    }
    fetchData();
    setIsLoading(false);
  },[]);
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
