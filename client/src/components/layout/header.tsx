"use client"

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { getCategoriesWithSubcategories } from '@/services/ProductService';
import { ICategoriesWithSubcategories } from '@/types/Category';
import UserIcon from '../common/userIcon';

const Header = () => {
  const [categoriesWithSubcategories, setCategoriesWithSubcategories] =
    useState<ICategoriesWithSubcategories[]>([]);
  const [activeSubcategories, setActiveSubcategories] = useState<
    ICategoriesWithSubcategories['subcategories']
  >([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategoriesWithSubcategories();
        if (response) {
          setCategoriesWithSubcategories(response);
          setActiveSubcategories(response[0].subcategories);
        } else {
          setCategoriesWithSubcategories([]);
          setActiveSubcategories([]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategoryMouseEnter = (
    subcategories: ICategoriesWithSubcategories['subcategories']
  ) => {
    setActiveSubcategories(subcategories);
    setIsMenuOpen(true);
  };

  return (
    <header className="p-4 w-full bg-indigo-400 text-white flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-lg font-semibold hover:text-gray-500 transition duration-300">Logo/Home
        </Link>
        <div className="relative" ref={menuRef}>
          <button
            className="text-lg font-semibold hover:text-indigo-300 transition duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Categories
          </button>
          {isMenuOpen && (
            <div className="absolute flex top-full left-0 mt-3 w-96 rounded-md shadow-lg bg-white z-20">
              <div className="w-1/2 bg-indigo-700 rounded-l-md">
                {categoriesWithSubcategories.map((category) => (
                  <div
                    key={category.id}
                    className="px-6 py-3 border-r border-indigo-500 text-white hover:bg-indigo-400 cursor-pointer"
                    onMouseEnter={() =>
                      handleCategoryMouseEnter(category.subcategories)
                    }
                  >
                    {category.name}
                  </div>
                ))}
              </div>
              <div className="w-1/2 bg-indigo-600 rounded-r-md">
                {activeSubcategories.length > 0 && (
                  <div className="w-full">
                    {activeSubcategories.map((subcategory) => (
                      <div
                        key={subcategory.id}
                        className="px-8 py-2 text-white hover:bg-indigo-400 cursor-pointer"
                      >
                        {subcategory.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-10 sm:mr-5 md:mr-8 lg-mr-10">
        <div className="relative">
          <input
            type="search"
            placeholder="Search for products..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition duration-300"
            style={{ maxWidth: '300px' }} // Ograniczenie szerokości paska wyszukiwania
          />
        </div>
        <Link href="/cart" className="relative">
          <AiOutlineShoppingCart className="h-6 w-6 text-gray-700" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
            1
          </span>
        </Link>
        <UserIcon className="h-6 w-6 text-gray-700" />
      </div>
    </header>
  );
};

export default Header;
