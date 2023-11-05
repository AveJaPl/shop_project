import React, { useState } from "react";
import ICategoryProps from "@/types/ICategoryProps";

const Category: React.FC<ICategoryProps> = ({ name, onMouseEnter }) => {
  const [isOpen, setIsOpen] = useState(name === "Shoes"); // Domyślnie otwarte dla "Shoes"
    const handleMouseEnter = () => {
        onMouseEnter();
        setIsOpen(true);
    };
  return (
    <div
      className="relative"
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-600 hover:text-white">
        <span className="ml-2">{name}</span>
      </button>
      
    </div>
  );
};

export default Category;
