"use client"

import React, { useEffect, useState } from 'react';
import ProductCard from '../common/productCard';
import Product from '../../types/product';
const RecommendedProducts = () => {
 const [recommended, setRecommended] = useState<Product[]>([])
  useEffect(() => {
      const fetchNewArrivals = async () => {
          setRecommended([
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
                  
              },
              {
                  id: 4,
                  name: "Produkt 4",
                  price: 400,
              },
              {
                  id: 5,
                  name: "Produkt 5",
                  price: 500,
              },
              {
                id: 6,
                name: "Produkt 6",
                price: 600,
              }

          ])

      }
      fetchNewArrivals()
  }, [])


  return (
    <section>
      <h2 className="text-2xl font-bold my-6">For You</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommended.map(product => <ProductCard key={product.id} {...product} />)}
      </div>
    </section>
  );
};

export default RecommendedProducts;