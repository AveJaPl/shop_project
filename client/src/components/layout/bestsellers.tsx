"use client"

import React, {useState, useEffect} from 'react';
import ProductCard from '../common/productCard';
import {Product} from '../../types/product';
import carouselSettings from '../common/carouselSettings';
import { getBestSellerProducts } from '@/services/ProductService';

import Slider from 'react-slick';
const FeaturedProducts = () => {
  const [bestsellers, setBestsellers] = useState<Product[]>([])
  useEffect(() => {
      const fetchBestsellers = async () => {
          const response = await getBestSellerProducts()
          setBestsellers(response)
      }
      fetchBestsellers()
  }, [])
  return (
    <section>
      <h2 className="text-2xl font-bold my-6">Bestsellers</h2>
      <Slider {...carouselSettings}>
        {bestsellers.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </Slider>
    </section>
  );
};

export default FeaturedProducts;
