// components/ProductCard.tsx
import React from "react";
import Image from "next/image";
import { Product } from "../../types/product";
import { useRouter } from "next/navigation";

const ProductCard: React.FC<Product> = ({ ...product }) => {
  const router = useRouter();

  const createSlug = (name: string, id:number) => {
    return name.toLowerCase().split(" ").join("-") + "-" + id;
  }


  const handleClick = () => {
    const slug = createSlug(product.name, product.id)
    router.push(`/products/${slug}`);
  };
  return (
    <div onClick={handleClick} className=" mx-1.5 border px-4 py-2 rounded-lg">
      <Image
        src="/placeholder.png"
        alt={product.name}
        width={500}
        height={500}
        className="lg:w-full md:w-full sm:w-1/2 h-48 object-cover rounded-t-lg"
        priority={true}
      />
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p className="text-md">{product.price} zł</p>
    </div>
  );
};

export default ProductCard;
