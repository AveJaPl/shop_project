"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../common/productCard";
import { Product } from "../../types/product";
import { getNewArrivalProducts } from "@/services/ProductService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carouselSettings from "@/components/common/carouselSettings";
function NewArrivals() {
  

  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  useEffect(() => {
    const fetchNewArrivals = async () => {
      const response = await getNewArrivalProducts();
      console.log("odpowiedz", response);
      setNewArrivals(response);
    };
    fetchNewArrivals();
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold my-6">New Arrivals</h2>
      <Slider {...carouselSettings}>
        {newArrivals.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </Slider>
    </section>
  );
}

export default NewArrivals;
