"use client";

import Link from "next/link";
import UserIcon from "../common/userIcon";
import { useState, useRef, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai"; // Zaimportuj ikonę koszyka (załóżmy, że używasz react-icons)
import Category from "../common/category";
import Subcategories from "../common/subcategories";

const Header = () => {
  const [subcategories, setSubCategory] = useState([
    {
      name: "Sneakers",
      href: "/sneakers",
    },
  ]);
  const categories = [
    {
      title: "Shoes",
      icon: "👟",
      subcategories: [
        {
          name: "Sneakers",
          href: "/sneakers",
        },
        {
          name: "Boots",
          href: "/boots",
        },
      ],
    },
    {
      title: "Shirts",
      icon: "👕",
      subcategories: [
        {
          name: "Casual shirts",
          href: "/casual-shirts",
        },
        {
          name: "Formal shirts",
          href: "/formal-shirts",
        },
      ],
    },
    {
      title: "Shorts",
      icon: "🩳",
      subcategories: [
        {
          name: "Casual shorts",
          href: "/casual-shorts",
        },
        {
          name: "Formal shorts",
          href: "/formal-shorts",
        },
      ],
    },
    {
      title: "Hats",
      icon: "🧢",
      subcategories: [
        {
          name: "Casual hats",
          href: "/casual-hats",
        },
        {
          name: "Formal hats",
          href: "/formal-hats",
        },
      ],
    },
  ];
  const handleSubCategoryChange = (subcategories: any) => {
    setIsMenuOpen(subcategories.length > 0);
    setSubCategory(subcategories);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Dla rozwijanego menu kategorii
  const menuRef = useRef<HTMLDivElement>(null);
  const linkStyle =
    "text-lg font-semibold hover:text-indigo-300 transition duration-300";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header className=" relative p-8 w-full bg-indigo-500 text-white flex justify-between items-center shadow-lg">
      <div className="left flex space-x-4">
        {/* Link do Home */}
        <Link href="/" className={linkStyle}>
          Logo/Home
        </Link>
        {/* Rozwijane menu kategorii */}
        <div
          onClick={() => setIsMenuOpen(true)}
          ref={menuRef} // referencja do tego kontenera
          className="relative first-letter:"
        >
          <button className={linkStyle}>Categories</button>
          {isMenuOpen && (
            <div className="absolute flex top-full left-0 bg-white rounded-md shadow-lg z-20 border border-gray-200 mt-1">
              <div className="categories">
              {categories.map((category) => (
                <Category
                  key={category.title}
                  title={category.title}
                  icon={<span>{category.icon}</span>} // Ikona jako komponent React
                  subcategories={category.subcategories}
                  onMouseEnter={() =>
                    handleSubCategoryChange(category.subcategories)
                  }
                />
              ))}
              </div>
              
              <div className="">
                <Subcategories subcategories={subcategories} />
              </div>
            </div>
          )}
        </div>
        {/* Istniejące linki */}
        {/* ... */}
      </div>
      <div className="center flex-1 px-4">
        <input
          type="search"
          placeholder="Search for products..."
          className="w-full px-4 py-2 rounded-md text-gray-700"
        />
      </div>
      <div className="right w-1/5 flex justify-around">
        <Link href="/cart" className="relative">
          <AiOutlineShoppingCart className="h-8 w-8" />
          {/* Dodaj badge z liczbą produktów w koszyku: */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1 py-0.5 text-xs">
            1
          </span>
        </Link>
        <UserIcon className="h-8 w-8" />
        {/* Możesz dodać tu rozwijane menu konta użytkownika */}
      </div>
    </header>
  );
};

export default Header;
