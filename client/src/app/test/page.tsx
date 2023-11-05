"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/types/product";
import axios from "axios";
interface Filters {
  players: string[];
  brands: string[];
  priceFrom: number;
  priceTo: number;
}

function Form() {
  const [filters, setFilters] = useState<Filters>({
    players: [],
    brands: [],
    priceFrom: 0,
    priceTo: 100000,
  });

  const sportsman = [
    "Stephen Curry",
    "Lebron James",
    "Kevin Durant",
    "Kobe Bryant",
    "Michael Jordan",
  ];

  const brands = ["Nike", "Adidas", "Under Armour", "Puma", "New Balance"];

  const handlePlayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked
        ? [...prevFilters.players, value]
        : prevFilters.players.filter((player) => player !== value),
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(filters);
  };
  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked
        ? [...prevFilters.brands, value]
        : prevFilters.brands.filter((brand) => brand !== value),
    }));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <form onSubmit={handleSubmit} name="filters">
        <div>
          <label htmlFor="players" className="font-bold">
            Players
          </label>
          {sportsman.map((player) => (
            <div key={player} className="flex items-center mt-2">
              <input
                type="checkbox"
                onChange={handlePlayerChange}
                name="players"
                value={player}
                id={player}
                className="mr-2"
              />
              <label htmlFor={player}>{player}</label>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <label htmlFor="brands" className="font-bold">
            Brands
          </label>
          {brands.map((brand) => (
            <div key={brand} className="flex items-center mt-2">
              <input
                type="checkbox"
                name="brands"
                value={brand}
                id={brand}
                className="mr-2"
                onChange={handleBrandChange}
              />
              <label htmlFor={brand}>{brand}</label>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <label htmlFor="priceFrom" className="font-bold">
            Price from
          </label>
          <input
            type="number"
            name="priceFrom"
            onChange={handlePriceChange}
            id="priceFrom"
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="priceTo" className="font-bold">
            Price to
          </label>
          <input
            type="number"
            name="priceTo"
            onChange={handlePriceChange}
            id="priceTo"
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 mt-6 bg-blue-600 text-white rounded shadow"
        >
          Apply
        </button>
      </form>
    </div>
  );
}

export default Form;
