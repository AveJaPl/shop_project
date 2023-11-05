"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { getCategoriesWithSubcategories } from "@/services/ProductService";
import { ICategoriesWithSubcategories } from "@/types/Category";
import UserIcon from "../common/userIcon";

const Header = () => {
  const [categoriesWithSubcategories, setCategoriesWithSubcategories] =
    useState<ICategoriesWithSubcategories[]>([]);
  const [activeSubcategories, setActiveSubcategories] = useState<
    ICategoriesWithSubcategories["subcategories"]
  >([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fetch categories and subcategories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategoriesWithSubcategories();
        setCategoriesWithSubcategories(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle mouse enter on categories
  const handleCategoryMouseEnter = (
    subcategories: ICategoriesWithSubcategories["subcategories"]
  ) => {
    setActiveSubcategories(subcategories);
    setIsMenuOpen(true); // Keep the menu open when hovering over categories
  };

  const handleCategoryLeave = () => {
    setActiveSubcategories([]); // Clear subcategories when not hovering
  };

  return (
    <header className="relative p-4 w-full bg-indigo-500 text-white flex justify-between items-center shadow-md">
      <div className="flex space-x-4">
        <Link href="/" className="text-lg font-semibold hover:text-indigo-300 transition duration-300">
          Logo/Home
        </Link>
        <div className="relative" onMouseLeave={handleCategoryLeave} ref={menuRef}>
          <button className="text-lg font-semibold hover:text-indigo-300 transition duration-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            Categories
          </button>
          {isMenuOpen && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-indigo-700 rounded-md shadow-lg z-20">
              {/* ... map categories ... */}
              {categoriesWithSubcategories.map((category) => (
                <div key={category.id} className="px-4 py-2 text-white hover:bg-indigo-400 transition duration-300" onMouseEnter={() => handleCategoryMouseEnter(category.subcategories)}>
                  {category.name}
                </div>
              ))}
              {activeSubcategories.length > 0 && (
            <div className="relative left-56 mt-1 w-56 bg-indigo-700 rounded-md shadow-lg z-10">
              {/* ... map subcategories ... */}
              {activeSubcategories.map((subcategory) => (
                <div key={subcategory.id} className="px-4 py-2 text-white hover:bg-indigo-400 transition duration-300">
                  {subcategory.name}
                </div>
              ))}
            </div>
          )}
            </div>
          )}
  
          
        </div>
      </div>
      <div className="flex-1 px-4">
        <input
          type="search"
          placeholder="Search for products..."
          className="w-full px-4 py-2 rounded-md text-white bg-gray-700 placeholder-gray-400"
        />
      </div>
      <div className="flex space-x-4">
        <Link href="/cart" className="relative">
          <AiOutlineShoppingCart className="h-8 w-8 text-white" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1 py-0.5 text-xs">
            1
          </span>
        </Link>
        <UserIcon className="h-8 w-8 text-white" />
      </div>
    </header>
  );
};

export default Header;
