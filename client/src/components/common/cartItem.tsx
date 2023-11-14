import React from "react";
import Image from "next/image";
import { CartProduct } from "@/types/product";
import { getSocket } from "@/services/getSocket";

type CartItemProps = {
  item: CartProduct;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const socket = getSocket();

  const handleRemove = async() => {
    try{
      socket.emit('remove-from-cart', item.id);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="flex justify-between items-center border-b border-gray-200 py-4">
      <div className="flex items-center">
        <Image
          src="/placeholder.png"
          width={80}
          height={80}
          alt={item.name}
          className="h-20 w-20 object-cover mr-4"
        />
        <div>
          <p className="text-lg font-semibold">{item.name}</p>
          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
        </div>
        <button onClick={handleRemove}>Remove</button>
      </div>
      <span className="text-lg font-semibold">{item.price} zł</span>
    </div>
  );
};

export default CartItem;
