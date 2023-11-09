// components/ProductCard.tsx
import React from "react";
import Image from "next/image";
import { Product } from "../../types/product";
import { useRouter } from "next/navigation"; // This should be 'router' not 'navigation'

const ProductCard: React.FC<Product> = ({ id, name, price }) => { // Destructure props for cleaner access
  const router = useRouter();

  const createSlug = (name: string, id: number) => {
    return `${name.toLowerCase().split(" ").join("-")}-${id}`;
  };

  const handleClick = () => {
    const slug = createSlug(name, id);
    router.push(`/product/${slug}`);
  };

  // Using Tailwind's grid layout for a more modern look and responsive design
  return (
    <div
      onClick={handleClick}
      className="mx-2 my-4 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="relative h-48 w-full">
        <Image
          src="/placeholder.png"
          alt={name}
          layout="fill" // This will take up the full container size
          objectFit="cover" // This will ensure the image covers the area, crop if necessary
          className="transition duration-300 ease-in-out transform hover:scale-105" // Smooth transition on hover
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold truncate">{name}</h3> {/* 'truncate' will prevent overflow */}
        <p className="text-md font-semibold text-gray-700 mt-1">{price} zł</p>
      </div>
    </div>
  );
};

export default ProductCard;
