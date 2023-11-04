// components/ProductCard.tsx
import React from "react";
import Image from "next/image";
import Product from "../../types/product";

const ProductCard: React.FC<Product> = ({ ...product }) => {
const handleClick = (e: any) => {
    console.log("klik", e.target)
}
  return (
    <div onClick={e=>handleClick(e)} className="border p-4 rounded-lg">
      <Image
        src={product.image || "/placeholder.png"}
        alt={product.name}
        width={500}
        height={500}
        className="lg:w-full md:w-full sm:w-1/2 h-48 object-cover rounded-t-lg"
      />
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p className="text-md">{product.price} zł</p>
    </div>
  );
};

export default ProductCard;
