"use client"

import React, { useEffect, useState } from 'react';
import ProductCard from '../common/productCard';
import {Product} from '../../types/product';
import Slider from 'react-slick';
import carouselSettings from '../common/carouselSettings';
import { getRecommendedProducts } from '@/services/ProductService';

const RecommendedProducts = () => {
 const [recommended, setRecommended] = useState<Product[]>([])
  useEffect(() => {
      const fetchRecommended = async () => {
          const response = await getRecommendedProducts()
          setRecommended(response)
      }
      fetchRecommended()
  }, [])


  return (
    <section>
      <h2 className="text-2xl font-bold my-6">For You</h2>
      <Slider {...carouselSettings}>
        {/* {recommended.map(product => <ProductCard key={product.id} {...product} />)} */}
      </Slider>
    </section>
  );
};

export default RecommendedProducts;
