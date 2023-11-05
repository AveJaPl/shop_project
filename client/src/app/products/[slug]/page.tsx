"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getProductById } from "@/services/ProductService";
import React from "react";
import { Product } from "@/types/product";
import FullProductPage from "@/components/layout/fullproductpage";

function ProductPage() {
  const pathname = usePathname();
  const [product, setProduct] = useState<Product | null>(null);
  const slug = pathname.split("/").pop();
  useEffect(() => {
    const fetchProduct = async () => {
      if (typeof slug === "string") {
        const getIdFromSlug = (slug: string) => {
          const parts = slug.split("-");
          const id = parts.pop();
          return id ? parseInt(id, 10) : null;
        };

        const id = getIdFromSlug(slug);
        if (id !== null) {
          const response = await getProductById(id);
          setProduct(response as Product);
        }
      }
    };

    fetchProduct();
  },[slug]);

  return (
    <div>
      {product ? (
        <FullProductPage/>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ProductPage;
