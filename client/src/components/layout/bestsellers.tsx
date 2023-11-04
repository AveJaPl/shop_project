"use client"

import React, {useState, useEffect} from 'react';
import ProductCard from '../common/productCard';
import Product from '../../types/product';
const FeaturedProducts = () => {
  const [bestsellers, setBestsellers] = useState<Product[]>([])
  useEffect(() => {
      const fetchNewArrivals = async () => {
          setBestsellers([
              {
                  id: 1,
                  name: "Produkt 1",
                  price: 100,
                  
              },
              {
                  id: 2,
                  name: "Produkt 2",
                  price: 200,
                  
              },
              {
                  id: 3,
                  name: "Produkt 3",
                  price: 300,
                  
              }

          ])

      }
      fetchNewArrivals()
  }, [])
  return (
    <section>
      <h2 className="text-2xl font-bold my-6">Bestsellers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bestsellers.map(product => <ProductCard key={product.id} {...product} />)}
      </div>
    </section>
  );
};

export default FeaturedProducts;
